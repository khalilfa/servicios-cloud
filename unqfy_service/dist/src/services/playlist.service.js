"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchPlaylists = exports.deletePlaylist = exports.getPlaylistById = exports.createPlaylistByTracks = exports.createRandomPlaylistByGenre = exports.setUnqfy = void 0;
const playlist_1 = __importDefault(require("../model/playlist"));
let UNQFY;
function setUnqfy(unqfy) {
    UNQFY = unqfy;
}
exports.setUnqfy = setUnqfy;
function createRandomPlaylistByGenre(name, genre, maxDuration) {
    return UNQFY.createPlaylist(name, genre, maxDuration);
}
exports.createRandomPlaylistByGenre = createRandomPlaylistByGenre;
function createPlaylistByTracks(name, tracks) {
    let pl = new playlist_1.default(name);
    tracks.forEach(track => pl.addTrack(track));
    return pl;
}
exports.createPlaylistByTracks = createPlaylistByTracks;
function getPlaylistById(playlistID) {
    return UNQFY.getPlaylistById(playlistID);
}
exports.getPlaylistById = getPlaylistById;
function deletePlaylist(id) {
    return UNQFY.deletePlaylist(id);
}
exports.deletePlaylist = deletePlaylist;
function searchPlaylists(name, durationLT, durationGT) {
    let playlistsName = [];
    UNQFY.getPlaylists().forEach(pl => {
        if (pl.name === name || pl.duration >= durationLT || pl.duration <= durationGT) {
            playlistsName.push(pl.name);
        }
    });
    return playlistsName;
}
exports.searchPlaylists = searchPlaylists;
//# sourceMappingURL=playlist.service.js.map