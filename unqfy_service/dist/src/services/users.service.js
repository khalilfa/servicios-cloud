"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListeneds = exports.howManyListens = exports.listenTrack = exports.deleteUser = exports.updateUser = exports.getUser = exports.createUser = exports.setUnqfy = void 0;
let unQfy;
function setUnqfy(unqfy) {
    unQfy = unqfy;
}
exports.setUnqfy = setUnqfy;
function createUser(username) {
    let user = unQfy.addUser(username);
    return user;
}
exports.createUser = createUser;
function getUser(id) {
    let user = unQfy.getUserById(id);
    return user;
}
exports.getUser = getUser;
function updateUser(id, username) {
    let user = unQfy.getUserById(id);
    user._name = username;
    return user;
}
exports.updateUser = updateUser;
function deleteUser(id) {
    unQfy.deleteUser(id);
}
exports.deleteUser = deleteUser;
function listenTrack(userId, trackId) {
    unQfy.listen(userId, trackId);
}
exports.listenTrack = listenTrack;
function howManyListens(userId, trackId) {
    return unQfy.howManyListen(userId, trackId);
}
exports.howManyListens = howManyListens;
function getListeneds(userId) {
    return unQfy.listened(userId);
}
exports.getListeneds = getListeneds;
//# sourceMappingURL=users.service.js.map