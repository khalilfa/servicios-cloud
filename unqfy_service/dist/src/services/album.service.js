"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchAlbums = exports.deleteAlbum = exports.updateAlbum = exports.getAlbumById = exports.createAlbum = exports.setUnqfy = void 0;
let UNQFY;
function setUnqfy(unqfy) {
    UNQFY = unqfy;
}
exports.setUnqfy = setUnqfy;
function createAlbum(artistId, name, year) {
    let album = UNQFY.addAlbum(artistId, { name, year });
    return album;
}
exports.createAlbum = createAlbum;
function getAlbumById(id) {
    let album = UNQFY.getAlbumById(id);
    return album;
}
exports.getAlbumById = getAlbumById;
function updateAlbum(id, year) {
    let album = UNQFY.getAlbumById(id);
    album.year = year;
    return album;
}
exports.updateAlbum = updateAlbum;
function deleteAlbum(id) {
    UNQFY.deleteAlbum(id);
}
exports.deleteAlbum = deleteAlbum;
function searchAlbums(name) {
    let allAlbums = UNQFY.getAlbums();
    let filteredAlbums = name ? allAlbums.filter(album => album.name.toLowerCase().includes(name.toLowerCase())) : allAlbums;
    return filteredAlbums;
}
exports.searchAlbums = searchAlbums;
//# sourceMappingURL=album.service.js.map