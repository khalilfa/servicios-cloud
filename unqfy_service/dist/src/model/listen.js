"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
class Listen {
    constructor(track) {
        this._id = utils_1.generateId();
        this._track = track;
        this._count = 1;
    }
    get id() { return this._id; }
    get track() { return this._track; }
    get count() { return this._count; }
    addListen() {
        this._count += 1;
    }
}
exports.default = Listen;
//# sourceMappingURL=listen.js.map