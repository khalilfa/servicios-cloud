import Playlist from "../model/playlist";
import Track from "../model/track";
import UNQfy from "../unqfy";

let UNQFY: UNQfy;

export function setUnqfy(unqfy: UNQfy) {
  UNQFY = unqfy;
}

export function createRandomPlaylistByGenre(name: string, genre: string[], maxDuration: number): Playlist {
    return UNQFY.createPlaylist(name,genre,maxDuration);
}

export function createPlaylistByTracks(name: string, tracks: Track[]): Playlist {
    let pl : Playlist = new Playlist(name);
    tracks.forEach(track => pl.addTrack(track));
    return pl ;
}

export function getPlaylistById(playlistID : string){
    return UNQFY.getPlaylistById(playlistID);
}

export function deletePlaylist(id : string) {
    return UNQFY.deletePlaylist(id);
}

export function searchPlaylists(name : string,durationLT : number ,durationGT: number){
    let playlistsName : string[]= [] ;
    UNQFY.getPlaylists().forEach(pl => {
        if (pl.name === name || pl.duration >= durationLT || pl.duration <= durationGT  ) {
            playlistsName.push(pl.name);
        }
    });
    return playlistsName;
}