import Track from "./track";
export default class Album {
    private _id;
    private _name;
    private _tracks;
    private _year;
    constructor(name: string, year: number, customId?: string);
    get tracks(): Track[];
    set tracks(value: Track[]);
    get id(): string;
    set id(value: string);
    get name(): string;
    set name(value: string);
    get year(): number;
    set year(value: number);
    deleteTrack(trackId: string): void;
    addTrack(track: Track): void;
    getTrackById(id: string): Track | undefined;
    getTracksMatchingGenres(genres: string[]): Track[];
    search(name: string): any[];
}
