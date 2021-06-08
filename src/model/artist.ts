import { generateId } from '../utils/utils';
import Album from "./album";
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
    this.albums = this.albums.filter(album => album.id != albumId);
  }

  deleteTrack(trackId: string) {
    this.albums.map(album => album.deleteTrack(trackId))
  }

  getAlbumById(id: string): Album | undefined {
    return this._albums.find(album => album.id === id);
  }

  addAlbum(album: Album) {
    this._albums.push(album)
  }

  hasAlbum(name: string) {
    return this._albums.some(album => album.name.toLowerCase() === name.toLowerCase());
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

  getTracksMatchingGenres(genres: string[]) {
    let tracks : Track[] = [];
    this.albums.forEach(value => tracks = tracks.concat(value.getTracksMatchingGenres(genres)))
    return tracks
  }

  getAllTracks(): Track[] {
    let tracks: Track[] = this.albums.map(album => album.tracks).flat();

    return tracks;
  }

  search(name: string) : any[]{
    let result: any[] = [];
    this.albums.forEach(
      album => {
        if (album.name.includes(name)) {
          result.push(album);
        }
        result.push(album.search(name))
      });

    return result;
  }

  getTracks() : Track[]{
    let allTracks: any[] = [];
    this.albums.forEach(album => allTracks = allTracks.concat(album.tracks));
    return allTracks;
  }

  searchTracksByGender(genre: string) : Track[]{
      let allTracks: any[] = [];
      this.albums.forEach(album => allTracks.push(album.getTracksMatchingGenres([genre]))) ;
      return allTracks.reduce((acc, val) => acc.concat(val), []);
   }

}
