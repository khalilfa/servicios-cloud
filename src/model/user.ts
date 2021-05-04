import { generateId } from '../utils/utils';
import Listen from './listen';
import Track from './track';

export default class User {
  private _id: string;
  private _name: string;
  private _listened: Listen[];

  constructor(name: string) {
    this._id = generateId();
    this._name = name;
    this._listened = [];
  }

  get id() { return this._id }
  get name() { return this._name }
  get listened() { return this._listened }

  listen(track: Track) {
    if(this._listened.some(listen => listen.track === track.id)) {
      let listen: Listen = <Listen> this._listened.find(elem => elem.track === track.id);

      listen.addListen();
    } else {
      let listen: Listen = new Listen(track);
    
      this._listened.push(listen)
    }
  }


}