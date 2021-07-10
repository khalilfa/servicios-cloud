"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.artistRouter = void 0;
const express_1 = __importDefault(require("express"));
const badParamError_1 = __importDefault(require("../exceptions/badParamError"));
const artist_service_1 = require("../services/artist.service");
exports.artistRouter = express_1.default.Router();
exports.artistRouter.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { unqfy } = req.app.locals;
    artist_service_1.setUnqfy(unqfy);
    next();
}));
// Search artists
exports.artistRouter.get("/artists", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let name = req.query.name;
        let artists = artist_service_1.searchArtists(name);
        let response = [];
        artists.forEach(artist => response.push({
            id: artist.id,
            name: artist.name,
            albums: artist.getIndexAlbums(),
            country: artist.country,
        }));
        res.status(200).json(response);
        next();
    }
    catch (err) {
        next(err);
    }
    ;
}));
// Get specific artist
exports.artistRouter.get("/artists/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        let artist = artist_service_1.getArtistById(id);
        res.status(200).json({
            id: artist.id,
            name: artist.name,
            albums: artist.getIndexAlbums(),
            country: artist.country,
        });
        next();
    }
    catch (err) {
        next(err);
    }
    ;
}));
// Create artist
exports.artistRouter.post("/artists", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { name, country } = req.body;
        if (!name || !country)
            throw new badParamError_1.default(['name', 'country']);
        let artist = artist_service_1.createArtist(name, country);
        res.status(201).json({
            id: artist.id,
            name: artist.name,
            albums: artist.albums,
            country: artist.country,
        });
        next();
    }
    catch (err) {
        next(err);
    }
    ;
}));
// Update artist
exports.artistRouter.put("/artists/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        let { name, country } = req.body;
        if (!name || !country)
            throw new badParamError_1.default(['name', 'country']);
        let artist = artist_service_1.updateArtist(id, name, country);
        res.status(200).json({
            id: artist.id,
            name: artist.name,
            albums: artist.albums,
            country: artist.country,
        });
        next();
    }
    catch (err) {
        next(err);
    }
    ;
}));
// Delete artist
exports.artistRouter.delete("/artists/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        artist_service_1.deleteArtist(id);
        res.status(204).send('El artista se elimino con exito');
        next();
    }
    catch (err) {
        next(err);
    }
    ;
}));
//# sourceMappingURL=artist.route.js.map