import { generateId } from '../utils/utils';
import Artist from "./artist";
import Track from "./track";

export default class Album {
  private _id: string;
  private _name: string;
  private _tracks: Track[] = [];
  private _year: number;

  constructor(name: string, year: number) {
    this._id = generateId();
    this._name = name;
    this._year = year;
  }

  get tracks(): Track[] {
    return this._tracks;
  }

  set tracks(value: Track[]) {
    this._tracks = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }


  get year(): number {
    return this._year;
  }

  set year(value: number) {
    this._year = value;
  }

  deleteTrack(trackId: string) {
    this.tracks = this.tracks.filter(track => track.id != trackId);
  }

  addTrack(track: Track) {
    this._tracks.push(track)
  }

  getTrackById(id: string) {
    return this._tracks.find(value => value.id == id);
  }

  getTracksMatchingGenres(genres: string[]) {
    return this._tracks.filter(track => track.genres.some(genre => genres.includes(genre)))
  }
}
