import { generateId } from '../utils/utils';

export default class Album {
  private id: string;
  private name: string;
  private artist: string;
  private year: number;

  constructor(artist: string, name: string, year: number) {
    this.id = generateId();
    this.name = name;
    this.artist = artist;
    this.year = year;
  }

  getId() { return this.id }
}