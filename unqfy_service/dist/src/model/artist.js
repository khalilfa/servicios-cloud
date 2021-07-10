"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
const track_1 = __importDefault(require("./track"));
class Artist {
    constructor(name, country) {
        this._albums = [];
        this._id = utils_1.generateId();
        this._name = name;
        this._country = country;
    }
    get albums() {
        return this._albums;
    }
    set albums(value) {
        this._albums = value;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get country() {
        return this._country;
    }
    set country(value) {
        this._country = value;
    }
    deleteAlbum(albumId) {
        this.albums = this.albums.filter(album => album.id != albumId);
    }
    deleteTrack(trackId) {
        this.albums.map(album => album.deleteTrack(trackId));
    }
    getAlbumById(id) {
        return this._albums.find(album => album.id === id);
    }
    addAlbum(album) {
        this._albums.push(album);
    }
    hasAlbum(name) {
        return this._albums.some(album => album.name.toLowerCase() === name.toLowerCase());
    }
    addTrack(albumId, trackData) {
        let track;
        this.albums.forEach(album => {
            if (album.id === albumId) {
                track = new track_1.default(trackData.name, trackData.duration, trackData.genres);
                album.addTrack(track);
            }
        });
        return track;
    }
    getTrackById(id) {
        let track;
        for (let i = 0; i < this.albums.length; i++) {
            track = this.albums[i].getTrackById(id);
            if (track)
                break;
        }
        return track;
    }
    getTracksMatchingGenres(genres) {
        let tracks = [];
        this.albums.forEach(value => tracks = tracks.concat(value.getTracksMatchingGenres(genres)));
        return tracks;
    }
    getAllTracks() {
        let tracks = this.albums.map(album => album.tracks).flat();
        return tracks;
    }
    search(name) {
        let result = [];
        this.albums.forEach(album => {
            if (album.name.includes(name)) {
                result.push(album);
            }
            result.push(album.search(name));
        });
        return result;
    }
    getTracks() {
        let allTracks = [];
        this.albums.forEach(album => allTracks = allTracks.concat(album.tracks));
        return allTracks;
    }
    searchTracksByGender(genre) {
        let allTracks = [];
        this.albums.forEach(album => allTracks.push(album.getTracksMatchingGenres([genre])));
        return allTracks.reduce((acc, val) => acc.concat(val), []);
    }
    getIndexAlbums() {
        let ret;
        ret = [];
        this.albums.forEach(album => ret.push({ id: album.id, name: album.name, year: album.year, tracks: album.tracks }));
        return ret;
    }
}
exports.default = Artist;
//# sourceMappingURL=artist.js.map