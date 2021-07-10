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
exports.albumRouter = void 0;
const express_1 = __importDefault(require("express"));
const badParamError_1 = __importDefault(require("../exceptions/badParamError"));
const album_service_1 = require("../services/album.service");
exports.albumRouter = express_1.default.Router();
exports.albumRouter.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { unqfy } = req.app.locals;
    album_service_1.setUnqfy(unqfy);
    next();
}));
// Create album
exports.albumRouter.post('/albums', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("entro en el post");
    try {
        console.log('post albums');
        let { artistId, name, year } = req.body;
        if (!artistId || !name || !year || !(typeof year == 'number'))
            throw new badParamError_1.default(['artistId', 'name', 'year']);
        let album = album_service_1.createAlbum(artistId, name, year);
        res.status(201).json({
            id: album.id,
            name: album.name,
            year: album.year,
            tracks: album.tracks,
        });
        next();
    }
    catch (err) {
        next(err);
    }
    ;
}));
// Get specific album
exports.albumRouter.get('/albums/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        let album = album_service_1.getAlbumById(id);
        res.status(200).json({
            id: album.id,
            name: album.name,
            year: album.year,
            tracks: album.tracks,
        });
        next();
    }
    catch (err) {
        next(err);
    }
    ;
}));
// Update album
exports.albumRouter.patch('/albums/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        let { year } = req.body;
        if (!year || !(typeof year == 'number'))
            throw new badParamError_1.default(['year']);
        let album = album_service_1.updateAlbum(id, year);
        res.status(200).json({
            id: album.id,
            name: album.name,
            year: album.year,
            tracks: album.tracks,
        });
        next();
    }
    catch (err) {
        next(err);
    }
    ;
}));
// Delete album
exports.albumRouter.delete('/albums/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        album_service_1.deleteAlbum(id);
        res.status(204).send('Album eliminado con exito');
        next();
    }
    catch (err) {
        next(err);
    }
    ;
}));
// Search albums
exports.albumRouter.get('/albums', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let name = req.query.name;
        let albums = album_service_1.searchAlbums(name);
        let response = [];
        albums.forEach(album => response.push({
            id: album.id,
            name: album.name,
            year: album.year,
            tracks: album.tracks,
        }));
        res.status(200).json(response);
        next();
    }
    catch (err) {
        next(err);
    }
    ;
}));
//# sourceMappingURL=album.route.js.map