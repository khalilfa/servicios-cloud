"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUNQfy = exports.getUNQfy = void 0;
const fs_1 = __importDefault(require("fs"));
const unqfy_1 = __importDefault(require("../unqfy"));
function getUNQfy(filename = 'data.json') {
    console.log('Se carga el archivo');
    let unqfy = new unqfy_1.default();
    if (fs_1.default.existsSync(filename)) {
        unqfy = unqfy_1.default.load(filename);
    }
    return unqfy;
}
exports.getUNQfy = getUNQfy;
function saveUNQfy(unqfy, filename = 'data.json') {
    unqfy.save(filename);
}
exports.saveUNQfy = saveUNQfy;
//# sourceMappingURL=connection.js.map