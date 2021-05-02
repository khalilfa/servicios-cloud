import Artist from './model/artist';
import Track from './model/track';
import Album from './model/album';
import fs from 'fs';
import EntityNotFoundError from './exceptions/entityNotFountError';

const picklify = require('picklify'); // para cargar/guarfar unqfy

export default class UNQfy {
  private tracks: Track[];
  private albums: Album[];
  private artists: Artist[];

  constructor() {
    this.tracks = [];
    this.albums = [];
    this.artists = [];
  }

  addArtist(artistData: {name: string, country: string}): Artist {
    let { name, country } = artistData;
    let artist: Artist = new Artist(name, country);

    this.artists.push(artist);

    return artist;
  }

  addAlbum(artistId: string, albumData: {name: string, year: number}): Album {
    this.getArtistById(artistId)
    let { name, year } = albumData;
    let album: Album = new Album(artistId, name, year);

    this.albums.push(album);
    
    return album;
  }

  addTrack(albumId: string, trackData: {name: string, duration: number, genres: string[]}): Track {
    this.getAlbumById(albumId)

    let { name, duration, genres } = trackData;
    let track: Track = new Track(albumId, name, duration, genres);

    this.tracks.push(track);

    return track;
  }

  getArtistById(id: string): Artist {
    let artist = this.artists.find(value => value.getId() === id)

    if(!artist){
      throw new EntityNotFoundError("Album", id)
    }
    return artist
  }

  getAlbumById(id: string) {
    let album = this.albums.find(value => value.getId() === id)

    if(!album){
      throw new EntityNotFoundError("Album", id)
    }
    return album
  }

  getTrackById(id: string) {
    let track = this.tracks.find(value => value.getId() === id)

    if(!track){
      throw new EntityNotFoundError("Track", id)
    }
    return track
  }

  getPlaylistById(id: string) {

  }

  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres
  getTracksMatchingGenres(genres: string[]): Track[] {
    return this.tracks.filter(track => track.genres.some(genre => genres.includes(genre)))
  }

  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(artistData: {name: string}): Track[] {
    let tracks: Track[] = this.tracks.filter(track => track);
    return [];
  }


  // name: nombre de la playlist
  // genresToInclude: array de generos
  // maxDuration: duración en segundos
  // retorna: la nueva playlist creada
  createPlaylist(name: string, genresToInclude: string[], maxDuration: number) {
  /*** Crea una playlist y la agrega a unqfy. ***
    El objeto playlist creado debe soportar (al menos):
      * una propiedad name (string)
      * un metodo duration() que retorne la duración de la playlist.
      * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist.
  */

  }

  save(filename: string) {
    const serializedData = picklify.picklify(this);
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }

  static load(filename: string) {
    const serializedData = fs.readFileSync(filename, {encoding: 'utf-8'});
    const classes = [UNQfy, Artist, Album, Track];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
}

module.exports = UNQfy;
