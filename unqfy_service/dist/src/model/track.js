"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
class Track {
    constructor(name, duration, genres) {
        this._id = utils_1.generateId();
        this._name = name;
        this._duration = duration;
        this._genres = genres;
        this._lyrics = '';
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get lyrics() {
        return this._lyrics;
    }
    set lyrics(value) {
        this._lyrics = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get duration() {
        return this._duration;
    }
    set duration(value) {
        this._duration = value;
    }
    get genres() {
        return this._genres;
    }
    set genres(value) {
        this._genres = value;
    }
}
exports.default = Track;
//# sourceMappingURL=track.js.map