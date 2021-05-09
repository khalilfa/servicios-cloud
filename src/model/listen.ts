import { generateId } from '../utils/utils';
import Track from './track';

export default class Listen {
  private _id: string;
  private _track: Track;
  private _count: number;

  constructor(track: Track) {
    this._id = generateId();
    this._track = track;
    this._count = 1;
  }

  get id() { return this._id }
  get track() { return this._track }
  get count() { return this._count }

  addListen() {
    this._count += 1;
  }
}