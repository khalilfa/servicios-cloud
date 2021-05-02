import { generateId } from '../utils/utils';

export default class Track {
  private _id: string;
  private _name: string;
  private _album: string;
  private _duration: number;
  private _genres: string[];

  constructor(album: string, name: string, duration: number, genres: string[]) {
    this._id = generateId();
    this._name = name;
    this._album = album;
    this._duration = duration;
    this._genres = genres;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get album(): string {
    return this._album;
  }

  set album(value: string) {
    this._album = value;
  }

  get duration(): number {
    return this._duration;
  }

  set duration(value: number) {
    this._duration = value;
  }

  get genres(): string[] {
    return this._genres;
  }

  set genres(value: string[]) {
    this._genres = value;
  }
}
