"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArtist = exports.updateArtist = exports.createArtist = exports.getArtistById = exports.searchArtists = exports.setUnqfy = void 0;
let UNQFY;
function setUnqfy(unqfy) {
    UNQFY = unqfy;
}
exports.setUnqfy = setUnqfy;
function searchArtists(name) {
    let allArtists = UNQFY.getArtists();
    let filteredArtists = name ? allArtists.filter(artist => artist.name.toLowerCase().includes(name.toLowerCase())) : allArtists;
    return filteredArtists;
}
exports.searchArtists = searchArtists;
function getArtistById(id) {
    return UNQFY.getArtistById(id);
}
exports.getArtistById = getArtistById;
function createArtist(name, country) {
    let artist = UNQFY.addArtist({ name, country });
    return artist;
}
exports.createArtist = createArtist;
function updateArtist(id, name, country) {
    let artist = UNQFY.getArtistById(id);
    artist.name = name;
    artist.country = country;
    return artist;
}
exports.updateArtist = updateArtist;
function deleteArtist(id) {
    UNQFY.deleteArtist(id);
}
exports.deleteArtist = deleteArtist;
//# sourceMappingURL=artist.service.js.map