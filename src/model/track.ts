import { generateId } from '../utils/utils';

export default class Track {
  private id: string;
  private name: string;
  private album: string;
  private duration: number;
  private genres: string[];

  constructor(album: string, name: string, duration: number, genres: string[]) {
    this.id = generateId();
    this.name = name;
    this.album = album;
    this.duration = duration;
    this.genres = genres;
  }

  public getId() { return this.id }
}