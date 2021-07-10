import Track from './track';
export default class Listen {
    private _id;
    private _track;
    private _count;
    constructor(track: Track);
    get id(): string;
    get track(): Track;
    get count(): number;
    addListen(): void;
}
