import UNQfy from "../unqfy";
import User from "../model/user";


let unQfy: UNQfy;

export function setUnqfy(unqfy: UNQfy) {
    unQfy = unqfy;
}

export function createUser(username: string): User {
    let user: User = unQfy.addUser(username);
    return user;
}

export function getUser(id: string): User {
    let user = unQfy.getUserById(id);
    return user
}

export function updateUser(id: string, username: string) {
    let user = unQfy.getUserById(id)
    user._name = username

    return user
}

export function deleteUser(id: string) {
    unQfy.deleteUser(id);
}

export function listenTrack(userId: string, trackId: string){
    unQfy.listen(userId, trackId)
}

export function howManyListens(userId: string, trackId: string): number{
    return unQfy.howManyListen(userId, trackId)
}

export function getListeneds(userId: string): string[]{
    return unQfy.listened(userId)
}
