import Artist from './model/artist';
import Track from './model/track';
import Album from './model/album';
import fs from 'fs';
import EntityNotFoundError from './exceptions/entityNotFountError';
import Playlist from './model/playlist';
import User from './model/user';
import Listen from './model/listen';
import { Console } from 'node:console';

const picklify = require('picklify'); // para cargar/guarfar unqfy

export default class UNQfy {
  private artists: Artist[];
  private playlists: Playlist[];
  private users: User[];

  constructor() {
    this.artists = [];
    this.playlists = [];
    this.users = [];
  }

  addUser(name: string) {
    let user: User = new User(name);

    this.users.push(user);

    return user;
  }

  listen(userId: string, trackId: string) {
    let user: User = this.getUserById(userId);
    let track: Track = this.getTrackById(trackId);

    user.listen(track);
  }

  listened(userId: string): string[] {
    let user: User = this.getUserById(userId);
    let trackIds: string[] = user.listened.map(listen => listen.track.id);
    let tracks: string[] = trackIds.map(trackId => this.getTrackById(trackId).name);

    return tracks;
  }

  howManyListen(userId: string, trackId: string): number {
    let user: User = this.getUserById(userId);
    let track: Track = this.getTrackById(trackId);

    let listen: Listen | undefined = user.getListenByTrack(track);

    if(!listen) return 0;

    return listen.count;
  }

  thisIs(artistId: string): Playlist{
    let artist: Artist = this.getArtistById(artistId);
    let tracks: Track[] = artist.getAllTracks();

    let tracksByCount: {track: Track, count: number}[] = tracks.map(track => ({ track, count: this.users.reduce((acc, usr) => acc + this.howManyListen(usr.id, track.id), 0) }) );
    let top3: {track: Track, count: number}[] = tracksByCount.sort((a, b) => a.count - b.count).slice(0, 3);

    let playlist: Playlist = new Playlist(`This is ${artist.name}`);
    top3.forEach(elem => playlist.addTrack(elem.track));

    return playlist;
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
    return track
  }

  deleteArtist(artistId: string): void {
    this.artists = this.artists.filter(artist => artist.id != artistId);
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
      this.artists[i].getAlbumById(id)
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

  getUserById(id: string) {
    let user: User | undefined = this.users.find(value => value.id === id);

    if(!user) throw new EntityNotFoundError("User", id);

    return user;
  }

  getTracksMatchingGenres(genres: string[]): Track[] {
   let tracks : Track[] = [];
   this.artists.forEach(value => tracks = tracks.concat(value.getTracksMatchingGenres(genres)))
   return tracks
  }

  getTracksMatchingArtist(artistData: {name: string}): Track[] {
   let artist: Artist | undefined = this.artists.find(artist => artist.name === artistData.name);
     if(!artist){
       throw new EntityNotFoundError("Artist", artistData.name);
     }
   return artist.getTracks();
  }

  searchByName(name: string) : any {

    let matchArtist : Artist[] = [] ;
    let matchAlbums: Album[] = [];
    let matchTracks : Track[] = [];
    let matchPlaylist : Playlist[] = [];

    matchArtist = this.artists.filter(artist => artist.name.includes(name));
    this.artists.forEach(artist => matchAlbums = matchAlbums.concat(artist.albums.filter(album => album.name.includes(name))));
    this.artists.forEach(artist => artist.albums.forEach(album => matchTracks = matchTracks.concat(album.tracks.filter(track => track.name.includes(name)) )));
    matchPlaylist = this.playlists.filter(playlist => playlist.name.includes(name));
    

    let result = {
      artists:matchArtist ,
      albums: matchAlbums,
      tracks: matchTracks,
      playlists: matchPlaylist,
	};
  
      return result ;
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


  createPlaylist(name: string, genre: string[], maxDuration: number): Playlist {
    let playlist: Playlist = new Playlist(name);
    let tracks : Track[] = this.getTracksMatchingGenres(genre);
    
    if (tracks.length === 0) throw new Error('debe existir al menos un track del genero: ' + genre);
    
    while(tracks.length > 0){
      tracks = tracks.filter(track  => track.duration <= (maxDuration - playlist.duration) ) ;
      playlist.addTrack(tracks.pop()!);
    }
     return playlist;
   }



   private getRandomArbitrary(min : number, max : number) : number {
    return Math.random() * (max - min) + min;
  }

  save(filename: string) {
    const serializedData = picklify.picklify(this);
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }

  static load(filename: string) {
    const serializedData = fs.readFileSync(filename, {encoding: 'utf-8'});
    const classes = [UNQfy, Artist, Album, Track, Playlist, User, Listen];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
}

module.exports = UNQfy;
