export default class Track {
    private _id;
    private _name;
    private _duration;
    private _genres;
    private _lyrics;
    constructor(name: string, duration: number, genres: string[]);
    get id(): string;
    set id(value: string);
    get lyrics(): string;
    set lyrics(value: string);
    get name(): string;
    set name(value: string);
    get duration(): number;
    set duration(value: number);
    get genres(): string[];
    set genres(value: string[]);
}
