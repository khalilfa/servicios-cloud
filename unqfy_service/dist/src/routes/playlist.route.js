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
exports.playlistRoute = void 0;
const express_1 = __importDefault(require("express"));
const playlist_service_1 = require("../services/playlist.service");
// import Artist from "../model/artist";
exports.playlistRoute = express_1.default.Router();
exports.playlistRoute.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { unqfy } = req.app.locals;
    playlist_service_1.setUnqfy(unqfy);
    next();
}));
// Create PLaylist
exports.playlistRoute.post('/playlists', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = JSON.parse(req.body);
        let pl = playlist_service_1.createRandomPlaylistByGenre(body.name, body.genre, body.maxDuration);
        let bodyResponse = {
            id: pl.id,
            name: pl.name,
            duration: pl.duration,
            tracks: pl.tracks
        };
        res.status(201).json(bodyResponse);
        next();
    }
    catch (err) {
        next(err);
    }
    ;
}));
// Create PLaylist
exports.playlistRoute.post('/playlists', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = JSON.parse(req.body);
        let pl = playlist_service_1.createPlaylistByTracks(body.name, body.tracks);
        let bodyResponse = {
            id: pl.id,
            name: pl.name,
            duration: pl.duration,
            tracks: pl.tracks
        };
        res.status(201).json(bodyResponse);
        next();
    }
    catch (err) {
        next(err);
    }
    ;
}));
// get Playlist
exports.playlistRoute.get("/playlists/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pl = playlist_service_1.getPlaylistById(req.params.id);
        res.status(200).json({
            id: pl.id,
            name: pl.name,
            duration: pl.duration
        });
        next();
    }
    catch (err) {
        next(err);
    }
    ;
}));
// Delete playlist
exports.playlistRoute.delete('/playlists/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        playlist_service_1.deletePlaylist(req.params.id);
        res.status(204).send('Status Code: 204');
        next();
    }
    catch (err) {
        next(err);
    }
    ;
}));
//buscar Playlist
exports.playlistRoute.get("/playlists", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let plsName = playlist_service_1.searchPlaylists(req.params.name, parseInt(req.params.durationLT), parseInt(req.params.durationGT));
        res.status(200).send(JSON.stringify(plsName));
        next();
    }
    catch (err) {
        next(err);
    }
    ;
}));
//# sourceMappingURL=playlist.route.js.map