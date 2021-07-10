import Artist from './model/artist';
import Track from './model/track';
import Album from './model/album';
import Playlist from './model/playlist';
import User from './model/user';
export default class UNQfy {
    private artists;
    private playlists;
    private users;
    constructor();
    getArtists(): Artist[];
    getPlaylists(): Playlist[];
    getAlbums(): Album[];
    addUser(name: string): User;
    getLyrics(trackName: string): Promise<string>;
    listen(userId: string, trackId: string): void;
    listened(userId: string): string[];
    howManyListen(userId: string, trackId: string): number;
    thisIs(artistId: string): Playlist;
    addArtist(artistData: {
        name: string;
        country: string;
    }): Artist;
    addAlbum(artistId: string, albumData: {
        name: string;
        year: number;
    }): Album;
    addTrack(albumId: string, trackData: {
        name: string;
        duration: number;
        genres: string[];
    }): Track;
    deleteArtist(artistId: string): void;
    deleteAlbum(albumId: string): void;
    deleteTrack(trackIds: string): void;
    deletePlaylist(playlistId: string): void;
    getArtistById(id: string): Artist;
    getAlbumById(id: string): Album;
    getTrackById(id: string): Track;
    getPlaylistById(id: string): Playlist;
    getUserById(id: string): User;
    getTracksMatchingGenres(genres: string[]): Track[];
    getTracksMatchingArtist(artistData: {
        name: string;
    }): Track[];
    searchByName(name: string): any;
    getArtistByName(artistName: string): Artist;
    getAlbumByName(albumName: string): Album;
    createPlaylist(name: string, genre: string[], maxDuration: number): Playlist;
    save(filename: string): void;
    static load(filename: string): any;
    deleteUser(id: string): void;
    populateAlbumsForArtist(artistName: string): Promise<void>;
    private addTracksToAlbum;
}
