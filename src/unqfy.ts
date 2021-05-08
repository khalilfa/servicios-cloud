import Artist from './model/artist';
import Track from './model/track';
import Album from './model/album';
import fs from 'fs';
import EntityNotFoundError from './exceptions/entityNotFountError';
import Playlist from './model/playlist';

const picklify = require('picklify'); // para cargar/guarfar unqfy

export default class UNQfy {
  private artists: Artist[];
  private playlists: Playlist[];

  constructor() {
    this.artists = [];
    this.playlists = [];
  }

  addArtist(artistData: {name: string, country: string}): Artist {
    let { name, country } = artistData;
    let artist: Artist = new Artist(name, country);

    this.artists.push(artist);
    return artist;
  }

  addAlbum(artistId: string, albumData: {name: string, year: number}): Album {
    let album: Album  | undefined;
    this.artists.forEach(artist => {
      if(artist.id === artistId){
        album = new Album(albumData.name, albumData.year)
        artist.addAlbum(album)
      }
    })
    if (!album) throw new EntityNotFoundError("Artist", artistId);
    return album
  }

  addTrack(albumId: string, trackData: {name: string, duration: number, genres: string[]}) {
    let track: Track  | undefined;
    for (let i = 0; i < this.artists.length; i++) {
      track = this.artists[i].addTrack(albumId, trackData)
      if(track) break
    }
    if (!track) throw new EntityNotFoundError("Album", albumId);
  }

  deleteArtist(artistId: string): void {
    this.artists.filter(artist => artist.id != artistId);
  }

  deleteAlbum(albumId: string): void {
    this.artists.forEach(artist => artist.deleteAlbum(albumId))
  }

  deleteTrack(trackIds: string): void {
    this.artists.forEach(artist => artist.deleteTrack(trackIds))
  }

  deletePlaylist(playlistId: string): void {
    this.playlists = this.playlists.filter(playlist => playlist.id !== playlistId);
  }

  getArtistById(id: string): Artist {
    let artist: Artist | undefined = this.artists.find(value => value.id === id);

    if(!artist) throw new EntityNotFoundError("Album", id);

    return artist;
  }

  getAlbumById(id: string): Album {
    let album: Album | undefined;
    for (let i = 0; i < this.artists.length; i++) {
      this.artists[i].getAlgumById(id)
      if (album) break
    }

    if(!album) throw new EntityNotFoundError("Album", id);

    return album;
  }

  getTrackById(id: string): Track {
    let track: Track | undefined;
    for (let i = 0; i < this.artists.length; i++) {
      track = this.artists[i].getTrackById(id)
      if(track) break
    }

    if(!track) throw new EntityNotFoundError("Track", id);

    return track
  }

  getPlaylistById(id: string) {
    let playlist: Playlist | undefined = this.playlists.find(value => value.id === id);

    if(!playlist) throw new EntityNotFoundError("Playlist", id);

    return playlist;
  }

  // getTracksMatchingGenres(genres: string[]): Track[] {
  //  return this.tracks.filter(track => track.genres.some(genre => genres.includes(genre)))
  // }

  // getTracksMatchingArtist(artistData: {name: string}): Track[] {
  //   let artistName: string = artistData.name;
  //   let artistId: string = this.getArtistByName(artistName).id;
  //   let albumIds: string[] = this.getAlbumsByArtist(artistId).map(album => album.id);
  //
  //  let tracks: Track[] = this.tracks.filter(track => albumIds.includes(track.album));
  //
  //   return tracks;
  // }

  searchByName(name: string) {
    // let data: object = {
    //   artists: this.artists.filter(artist => artist.name.includes(name)),
    //   albums: this.albums.filter(album => album.name.includes(name)),
    //   tracks: this.tracks.filter(track => track.name.includes(name)),
    //   playlists: this.playlists.filter(playlist => playlist.name.includes(name)),
    // }
    //
    // return data;
  }

  private getArtistByName(artistName: string): Artist {
    let artist: Artist | undefined = this.artists.find(artist => artist.name.toLowerCase() === artistName.toLowerCase());

    if(!artist) throw new EntityNotFoundError("Artist", artistName);

    return artist;
  }

  private getAlbumsByArtist(artistId: string): Album[] {
    let artist: Artist | undefined = this.artists.find(value => value.id == artistId)
    if(!artist) throw new EntityNotFoundError("Artist", artistId);

    return artist.albums

  }

  // createPlaylist(name: string, genresToInclude: string[], maxDuration: number): Playlist {
  //   let tracks: Track[] = this.getTracksMatchingGenres(genresToInclude);
  //   let playlist: Playlist = new Playlist(name);
  //
  //   for(let i = 0; i < tracks.length; i++) {
  //     if((playlist.duration + tracks[i].duration) <= maxDuration){
  //       playlist.addTrack(tracks[i]);
  //     }
  //   }
  //
  //   this.playlists.push(playlist);
  //
  //   return playlist;
  // }

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
