"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const artist_route_1 = require("./routes/artist.route");
const morgan_1 = __importDefault(require("morgan"));
const connection_1 = require("./database/connection");
const entityAlreadyExist_1 = __importDefault(require("./exceptions/entityAlreadyExist"));
const entityNotFountError_1 = __importDefault(require("./exceptions/entityNotFountError"));
const badParamError_1 = __importDefault(require("./exceptions/badParamError"));
const album_route_1 = require("./routes/album.route");
const track_route_1 = require("./routes/track.route");
const playlist_route_1 = require("./routes/playlist.route");
const users_route_1 = require("./routes/users.route");
// App Variables
const PORT = 5000;
const app = express_1.default();
const Unqfy = connection_1.getUNQfy();
// App Configuration
app.use(cors_1.default());
app.use(express_1.default.json());
// -- Log http requests
app.use(morgan_1.default('combined'));
// -- Load Unqfy data
app.locals.unqfy = Unqfy;
app.use((req, res, next) => {
    res.status(888);
    next();
});
// -- Routes
app.use('/api', artist_route_1.artistRouter);
app.use('/api', playlist_route_1.playlistRoute);
app.use('/api', track_route_1.trackRouter);
app.use('/api', album_route_1.albumRouter);
app.use('/api', users_route_1.usersRoute);
// console.log(listEndpoints(app));
// -- Invalid URL error
app.all('*', (req, res, next) => {
    if (res.statusCode === 888)
        res.status(404).json({ status: 404, errorCode: "RELATED_RESOURCE_NOT_FOUND" }).end();
});
// -- Error handler
app.use((err, req, res, next) => {
    if (err instanceof entityAlreadyExist_1.default) {
        res.status(409).json({ status: 409, errorCode: "RESOURCE_ALREADY_EXISTS" });
    }
    else if (err instanceof entityNotFountError_1.default) {
        res.status(404).json({ status: 404, errorCode: "RESOURCE_NOT_FOUND" });
    }
    else if (err instanceof badParamError_1.default) {
        res.status(400).json({ status: 400, errorCode: "BAD_REQUEST" });
    }
    else {
        res.status(500).json({ status: 500, errorCode: "INTERNAL_SERVER_ERROR" });
    }
    res.end();
});
// -- Save Unqfy data
app.use(function (req, res, next) {
    connection_1.saveUNQfy(app.locals.unqfy);
    next();
});
// Server Activation
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
//# sourceMappingURL=app.js.map