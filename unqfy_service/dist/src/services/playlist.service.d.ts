import Playlist from "../model/playlist";
import Track from "../model/track";
import UNQfy from "../unqfy";
export declare function setUnqfy(unqfy: UNQfy): void;
export declare function createRandomPlaylistByGenre(name: string, genre: string[], maxDuration: number): Playlist;
export declare function createPlaylistByTracks(name: string, tracks: Track[]): Playlist;
export declare function getPlaylistById(playlistID: string): Playlist;
export declare function deletePlaylist(id: string): void;
export declare function searchPlaylists(name: string, durationLT: number, durationGT: number): string[];
