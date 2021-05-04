import { generateId } from '../utils/utils';
import Track from './track';

export default class Playlist {
  private _id: string;
  private _name: string;
  private _tracks: string[];
  private _duration: number;

  constructor(name: string) {
    this._id = generateId();
    this._name = name;
    this._tracks = [];
    this._duration = 0;
  }

  get id() { return this._id }
  get name() { return this._name }
  get tracks() { return this._tracks }
  get duration() { return this._duration }

  set name(value: string) {
    this._name = value;
  }

  addTrack(track: Track): void {
    if(!this._tracks.includes(track.id)) {
      this._tracks.push(track.id);
      this._duration += track.duration;
    }
  }

  deleteTrack(track: Track): void {
    if(this._tracks.includes(track.id)) {
      this._tracks = this._tracks.filter((t: string) => t != track.id);
      this._duration -= track.duration;
    }
  }

  hasTrack(track: Track): boolean {
    return this._tracks.includes(track.id);
  }
}