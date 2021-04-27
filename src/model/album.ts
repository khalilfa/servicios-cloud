import { generateId } from '../utils/utils';
import Track from './track';

export default class Album {
  private id: string;
  private name: string;
  private artist: string;
  private year: number;
  private tracks: Track[];

  constructor(artist: string, name: string, year: number) {
    this.id = generateId();
    this.name = name;
    this.artist = artist;
    this.year = year;
    this.tracks = []; 
  }

  getId() { return this.id }
}