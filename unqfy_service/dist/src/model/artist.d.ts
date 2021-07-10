import Album from "./album";
import Track from "./track";
export default class Artist {
    private _id;
    private _name;
    private _country;
    private _albums;
    constructor(name: string, country: string);
    get albums(): Album[];
    set albums(value: Album[]);
    get id(): string;
    set id(value: string);
    get name(): string;
    set name(value: string);
    get country(): string;
    set country(value: string);
    deleteAlbum(albumId: string): void;
    deleteTrack(trackId: string): void;
    getAlbumById(id: string): Album | undefined;
    addAlbum(album: Album): void;
    hasAlbum(name: string): boolean;
    addTrack(albumId: string, trackData: {
        name: string;
        duration: number;
        genres: string[];
    }): Track | undefined;
    getTrackById(id: string): Track | undefined;
    getTracksMatchingGenres(genres: string[]): Track[];
    getAllTracks(): Track[];
    search(name: string): any[];
    getTracks(): Track[];
    searchTracksByGender(genre: string): Track[];
    getIndexAlbums(): any[];
}
