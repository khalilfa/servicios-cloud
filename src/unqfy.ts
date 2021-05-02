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

  deleteArtist(artistId: string): void {
    let albumIds: string[] = this.albums.filter(album => album.artist === artistId).map(album => album.id);

    this.artists = this.artists.filter(artist => artist.id === artistId);

    this.deleteAlbum(albumIds);
  }

  deleteAlbum(albumIds: string[]): void {
    let trackIds = this.tracks.filter(track => albumIds.includes(track.album)).map(track => track.id);
    
    this.albums = this.albums.filter(album => !albumIds.includes(album.id));

    this.deleteTrack(trackIds);
  }

  deleteTrack(trackIds: string[]): void {
    this.tracks = this.tracks.filter(track => !trackIds.includes(track.id));
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
    let artist = this.artists.find(value => value.id === id)

    if(!artist) throw new EntityNotFoundError("Album", id);

    return artist
  }

  getAlbumById(id: string) {
    let album = this.albums.find(value => value.id === id)

    if(!album) throw new EntityNotFoundError("Album", id);

    return album
  }

  getTrackById(id: string) {
    let track = this.tracks.find(value => value.id === id)

    if(!track) throw new EntityNotFoundError("Track", id);

    return track
  }

  getPlaylistById(id: string) {

  }

  getTracksMatchingGenres(genres: string[]): Track[] {
    return this.tracks.filter(track => track.genres.some(genre => genres.includes(genre)))
  }

  getTracksMatchingArtist(artistData: {name: string}): Track[] {
    let artistName: string = artistData.name;
    let artistId: string = this.getArtistByName(artistName).id;
    let albumIds: string[] = this.getAlbumsByArtist(artistId).map(album => album.id);
    
    let tracks: Track[] = this.tracks.filter(track => albumIds.includes(track.album));

    return tracks;
  }

  private getArtistByName(artistName: string): Artist {
    let artist: Artist | undefined = this.artists.find(artist => artist.name.toLowerCase() === artistName.toLowerCase());

    if(!artist) throw new EntityNotFoundError("Artist", artistName);

    return artist;
  }

  private getAlbumsByArtist(artistId: string): Album[] {
    return this.albums.filter(album => album.artist === artistId);
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
