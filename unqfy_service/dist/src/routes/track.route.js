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
exports.trackRouter = void 0;
const express_1 = __importDefault(require("express"));
const track_service_1 = require("../services/track.service");
exports.trackRouter = express_1.default.Router();
exports.trackRouter.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { unqfy } = req.app.locals;
    track_service_1.setUnqfy(unqfy);
    next();
}));
// Search artists
exports.trackRouter.get("/tracks/:id/lyrics", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            Name: track_service_1.getTrackName(req.params.id),
            lyrics: yield track_service_1.getLyricsByTrack(req.params.id)
        });
        next();
    }
    catch (err) {
        next(err);
    }
    ;
}));
//# sourceMappingURL=track.route.js.map