"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
const listen_1 = __importDefault(require("./listen"));
class User {
    constructor(name) {
        this._id = utils_1.generateId();
        this._name = name;
        this._listened = [];
    }
    get id() { return this._id; }
    get name() { return this._name; }
    get listened() { return this._listened; }
    listen(track) {
        if (this._listened.some(listen => listen.track.id === track.id)) {
            let listen = this._listened.find(elem => elem.track.id === track.id);
            listen.addListen();
        }
        else {
            let listen = new listen_1.default(track);
            this._listened.push(listen);
        }
    }
    getListenByTrack(track) {
        let listen = this._listened.find(l => l.track.id === track.id);
        return listen;
    }
}
exports.default = User;
//# sourceMappingURL=user.js.map