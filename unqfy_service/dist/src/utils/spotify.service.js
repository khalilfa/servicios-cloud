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
const axios_1 = __importDefault(require("axios"));
const spotifyCreds = require('../config/spotifyCreds.json');
class SpotifyService {
    static getArstistId(artistName) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield axios_1.default.get('https://api.spotify.com/v1/search', {
                params: { type: 'artist', q: artistName, limit: 1 },
                headers: {
                    'Authorization': 'Bearer ' + spotifyCreds.access_token
                }
            });
            return { id: res.data.artists.items[0].id, genres: res.data.artists.items[0].genres };
        });
    }
    static getArtistAlbums(artistId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield axios_1.default.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
                params: { limit: 5 },
                headers: {
                    'Authorization': 'Bearer ' + spotifyCreds.access_token
                }
            });
            let albumList = [];
            res.data.items.forEach((item) => albumList.push({
                name: item.name,
                albumId: item.id,
                year: item.release_date
            }));
            return albumList;
        });
    }
    static getTracksFromAlbums(albumsIds) {
        return __awaiter(this, void 0, void 0, function* () {
            let spotifyTracks = [];
            for (const value of albumsIds) {
                spotifyTracks.push({
                    albumId: value.albumId,
                    tracks: (yield this.getTracksFromAlbum(value.albumId))
                        .map((value) => ({ name: value.name, duration: value.duration_ms }))
                });
            }
            return spotifyTracks;
        });
    }
    static getTracksFromAlbum(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield axios_1.default.get(`https://api.spotify.com/v1/albums/${id}/tracks`, {
                params: { limit: 5 },
                headers: {
                    'Authorization': 'Bearer ' + spotifyCreds.access_token
                }
            });
            return res.data.items;
        });
    }
}
exports.default = SpotifyService;
module.exports = SpotifyService;
//# sourceMappingURL=spotify.service.js.map