import Track from './track';
export default class Playlist {
    private _id;
    private _name;
    private _tracks;
    private _duration;
    constructor(name: string);
    get id(): string;
    get name(): string;
    get tracks(): string[];
    get duration(): number;
    set name(value: string);
    addTrack(track: Track): void;
    deleteTrack(track: Track): void;
    hasTrack(track: Track): boolean;
}
