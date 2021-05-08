import { generateId } from '../utils/utils';
import Album from "./album";
import validate = WebAssembly.validate;
import Track from "./track";

export default class Artist {
  private _id: string;
  private _name: string;
  private _country: string;
  private _albums: Album[] = [];


  constructor(name: string, country: string) {
    this._id = generateId();
    this._name = name;
    this._country = country;
  }

  get albums(): Album[] {
    return this._albums;
  }

  set albums(value: Album[]) {
    this._albums = value;
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

  get country(): string {
    return this._country;
  }

  set country(value: string) {
    this._country = value;
  }

  deleteAlbum(albumId: string) {
    this.albums.filter(album => album.id != albumId);
  }

  deleteTrack(trackId: string) {
    this.albums.map(album => album.deleteTrack(trackId))
  }

  getAlgumById(id: string): Album | undefined {
    return this._albums.find(album => album.id === id);
  }

  addAlbum(album: Album) {
    this._albums.push(album)
  }

  addTrack(albumId: string, trackData: { name: string; duration: number; genres: string[] }): Track | undefined {
    let track: Track  | undefined;
    this.albums.forEach(album => {
      if(album.id === albumId){
        track = new Track(trackData.name, trackData.duration, trackData.genres)
        album.addTrack(track)
      }
    })
    return track
  }

  getTrackById(id: string): Track | undefined {
    let track: Track | undefined;
    for (let i = 0; i < this.albums.length; i++) {
      track = this.albums[i].getTrackById(id)
      if(track) break
    }
    return track
  }

}
