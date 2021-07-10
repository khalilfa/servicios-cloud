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
exports.getLyrics = void 0;
const axios_1 = __importDefault(require("axios"));
const api_keys_json_1 = __importDefault(require("../config/api-keys.json"));
const URI = 'http://api.musixmatch.com/ws/1.1';
function searchTrackByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        let tracks = yield axios_1.default.get(`${URI}/track.search`, {
            params: {
                apikey: api_keys_json_1.default.MUSIXMATCH_API_KEY,
                q_track: name,
                f_has_lyrics: 1
            }
        });
        return tracks.data.message.body.track_list[0].track;
    });
}
function getLyricsById(trackId) {
    return __awaiter(this, void 0, void 0, function* () {
        let lyrics = yield axios_1.default.get(`${URI}/track.lyrics.get`, {
            params: {
                apikey: api_keys_json_1.default.MUSIXMATCH_API_KEY,
                track_id: trackId
            }
        });
        return lyrics.data.message.body.lyrics.lyrics_body;
    });
}
function getLyrics(name) {
    return __awaiter(this, void 0, void 0, function* () {
        let track = yield searchTrackByName(name);
        let lyrics = yield getLyricsById(track.track_id);
        return lyrics;
    });
}
exports.getLyrics = getLyrics;
//# sourceMappingURL=musixMatch.js.map