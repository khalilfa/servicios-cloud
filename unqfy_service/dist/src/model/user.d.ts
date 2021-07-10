import Listen from './listen';
import Track from './track';
export default class User {
    private _id;
    _name: string;
    private _listened;
    constructor(name: string);
    get id(): string;
    get name(): string;
    get listened(): Listen[];
    listen(track: Track): void;
    getListenByTrack(track: Track): Listen | undefined;
}
