import Album from './album';
import Track from './track';
import { generateId } from '../utils/utils';

export default class Artist {
  private id: string;
  private name: string;
  private country: string;
  private albums: Album[];
  private tracks: Track[]; 

  constructor(name: string, country: string) {
    this.id = generateId();
    this.name = name;
    this.country = country;
    this.albums = [];
    this.tracks = [];
  }

  get getId() { return this.id; }

}