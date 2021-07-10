"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
class Playlist {
    constructor(name) {
        this._id = utils_1.generateId();
        this._name = name;
        this._tracks = [];
        this._duration = 0;
    }
    get id() { return this._id; }
    get name() { return this._name; }
    get tracks() { return this._tracks; }
    get duration() { return this._duration; }
    set name(value) {
        this._name = value;
    }
    addTrack(track) {
        if (!this._tracks.includes(track.id)) {
            this._tracks.push(track.id);
            this._duration += track.duration;
        }
    }
    deleteTrack(track) {
        if (this._tracks.includes(track.id)) {
            this._tracks = this._tracks.filter((t) => t != track.id);
            this._duration -= track.duration;
        }
    }
    hasTrack(track) {
        return this._tracks.includes(track.id);
    }
}
exports.default = Playlist;
//# sourceMappingURL=playlist.js.map