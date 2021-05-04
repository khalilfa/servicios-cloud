import Artist from './model/artist';
import Track from './model/track';
import Album from './model/album';
import fs from 'fs';
import EntityNotFoundError from './exceptions/entityNotFountError';
import Playlist from './model/playlist';

const picklify = require('picklify'); // para cargar/guarfar unqfy

export default class UNQfy {
  private tracks: Track[];
  private albums: Album[];
  private artists: Artist[];
  private playlists: Playlist[];

  constructor() {
    this.tracks = [];
    this.albums = [];
    this.artists = [];
    this.playlists = [];
  }

  addArtist(artistData: {name: string, country: string}): Artist {
    let { name, country } = artistData;
    let artist: Artist = new Artist(name, country);

    this.artists.push(artist);

    return artist;
  }

  deleteArtist(artistId: string): void {
    let albumIds: string[] = this.albums.filter(album => album.artist === artistId).map(album => album.id);

    this.artists = this.artists.filter(artist => artist.id !== artistId);

    this.deleteAlbum(albumIds);
  }

  deleteAlbum(albumIds: string[]): void {
    let trackIds = this.tracks.filter(track => albumIds.includes(track.album)).map(track => track.id);
    
    this.albums = this.albums.filter(album => !albumIds.includes(album.id));

    this.deleteTrack(trackIds);
  }

  deleteTrack(trackIds: string[]): void {
    this.tracks = this.tracks.filter(track => !trackIds.includes(track.id));

    this.playlists.map(playlist => this.tracks.map(track => playlist.deleteTrack(track)));
  }

  deletePlaylist(playlistId: string): void {
    this.playlists = this.playlists.filter(playlist => playlist.id !== playlistId);
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
    let artist: Artist | undefined = this.artists.find(value => value.id === id);

    if(!artist) throw new EntityNotFoundError("Album", id);

    return artist;
  }

  getAlbumById(id: string) {
    let album: Album | undefined = this.albums.find(value => value.id === id);

    if(!album) throw new EntityNotFoundError("Album", id);

    return album;
  }

  getTrackById(id: string) {
    let track: Track | undefined = this.tracks.find(value => value.id === id);

    if(!track) throw new EntityNotFoundError("Track", id);

    return track
  }

  getPlaylistById(id: string) {
    let playlist: Playlist | undefined = this.playlists.find(value => value.id === id);

    if(!playlist) throw new EntityNotFoundError("Playlist", id);

    return playlist;
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

  searchByName(name: string) {
    let data: object = {
      artists: this.artists.filter(artist => artist.name.includes(name)),
      albums: this.albums.filter(album => album.name.includes(name)),
      tracks: this.tracks.filter(track => track.name.includes(name)),
      playlists: this.playlists.filter(playlist => playlist.name.includes(name)),
    }

    return data;
  }

  private getArtistByName(artistName: string): Artist {
    let artist: Artist | undefined = this.artists.find(artist => artist.name.toLowerCase() === artistName.toLowerCase());

    if(!artist) throw new EntityNotFoundError("Artist", artistName);

    return artist;
  }

  private getAlbumsByArtist(artistId: string): Album[] {
    return this.albums.filter(album => album.artist === artistId);
  }

  createPlaylist(name: string, genresToInclude: string[], maxDuration: number): Playlist {
    let tracks: Track[] = this.getTracksMatchingGenres(genresToInclude);
    let playlist: Playlist = new Playlist(name);

    for(let i = 0; i < tracks.length; i++) {
      if((playlist.duration + tracks[i].duration) <= maxDuration){
        playlist.addTrack(tracks[i]);
      }
    }

    this.playlists.push(playlist);

    return playlist;
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
