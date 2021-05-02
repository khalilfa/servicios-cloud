import { generateId } from '../utils/utils';

export default class Album {
  private _id: string;
  private _name: string;
  private _artist: string;
  private _year: number;

  constructor(artist: string, name: string, year: number) {
    this._id = generateId();
    this._name = name;
    this._artist = artist;
    this._year = year;
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

  get artist(): string {
    return this._artist;
  }

  set artist(value: string) {
    this._artist = value;
  }

  get year(): number {
    return this._year;
  }

  set year(value: number) {
    this._year = value;
  }
}
