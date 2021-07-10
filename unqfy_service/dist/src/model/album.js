"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
class Album {
    constructor(name, year, customId = "") {
        this._tracks = [];
        this._id = (customId) ? customId : utils_1.generateId();
        this._name = name;
        this._year = year;
    }
    get tracks() {
        return this._tracks;
    }
    set tracks(value) {
        this._tracks = value;
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
    get year() {
        return this._year;
    }
    set year(value) {
        this._year = value;
    }
    deleteTrack(trackId) {
        this.tracks = this.tracks.filter(track => track.id != trackId);
    }
    addTrack(track) {
        this._tracks.push(track);
    }
    getTrackById(id) {
        return this._tracks.find(value => value.id == id);
    }
    getTracksMatchingGenres(genres) {
        return this._tracks.filter(track => track.genres.some(genre => genres.includes(genre)));
    }
    search(name) {
        return this.tracks.filter(track => track.name.includes(name));
    }
}
exports.default = Album;
//# sourceMappingURL=album.js.map