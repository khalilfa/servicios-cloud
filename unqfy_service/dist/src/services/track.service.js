"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrackName = exports.getLyricsByTrack = exports.setUnqfy = void 0;
let UNQFY;
function setUnqfy(unqfy) {
    UNQFY = unqfy;
}
exports.setUnqfy = setUnqfy;
function getLyricsByTrack(trackID) {
    return UNQFY.getLyrics(trackID);
}
exports.getLyricsByTrack = getLyricsByTrack;
function getTrackName(trackID) {
    return UNQFY.getTrackById(trackID).name;
}
exports.getTrackName = getTrackName;
//# sourceMappingURL=track.service.js.map