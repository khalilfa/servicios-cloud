import { getUNQfy, saveUNQfy } from '../../main';
import CommandNotFoundError from '../exceptions/commandNotFoundError';
import BadParamError from '../exceptions/badParamError';
import Album from '../model/album';
import Artist from '../model/artist';
import UNQfy from '../unqfy';
import Track from '../model/track';
import Playlist from '../model/playlist';
import User from '../model/user';
import Listen from '../model/listen';


const COMMANDS: string[] = ['addArtist', 'addAlbum', 'addTrack', 'tracksByGenres', 'tracksByArtist', 'deleteArtist', 'deleteAlbum', 'deleteTrack',
  'addPlaylist', 'search', 'deletePlaylist', 'viewArtist', 'viewAlbum', 'viewTrack', 'viewPlaylist', 'addUser', 'listen', 'listened',
  'howManyListen', 'thisIs'];
const VALID_PARAMS: any = {
  addArtist: ['name', 'country'],
  addAlbum: ['artist', 'name', 'year'],
  addTrack: ['name', 'duration', 'genres', 'album'],
  tracksByGenres: ['genres'],
  tracksByArtist: ['artistName'],
  deleteArtist: ['artist'],
  deleteAlbum: ['album'],
  deleteTrack: ['track'],
  deletePlaylist: ['playlist'],
  addPlaylist: ['name', 'genres', 'duration'],
  search: ['name'],
  viewArtist: ['artist'],
  viewAlbum: ['album'],
  viewTrack: ['track'],
  viewPlaylist: ['playlist'],
  addUser: ['name'],
  listen: ['user', 'track'],
  listened: ['user'],
  howManyListen: ['user', 'track'],
  thisIs: ['artist'],
}

export default class ConsoleManager {
  static executeCommand(args: string[]) {
    let existFile = ConsoleManager.existFile(args);
    let unqfy: UNQfy = existFile ? getUNQfy(args[2]) : getUNQfy();
    let instructionIndex = existFile ? 3 : 2;
    let instruction: string = args[instructionIndex];
    let properties: any = ConsoleManager.formatProperties(args.slice(instructionIndex + 1));
    let command: Record<string, any> = new Command(instruction, properties, unqfy);
    
    command[command.getCommand()]();

    if(existFile) {
      saveUNQfy(unqfy, args[2]);
    } else {
      saveUNQfy(unqfy);
    }
  }

  static existFile(args: string[]): boolean {
    return args[2].includes('.json');
  }

  static formatProperties(args: string[], properties: any = {}): any {
    if(args.length === 1) {
      throw new BadParamError(<string> args.shift());

    } else if(args.length >= 2) {
      let key: string = <string> args.shift();
      let value: string = <string> args.shift();
      properties[key] = value;
      ConsoleManager.formatProperties(args, properties);
    }

    return properties;
  }
}

class Command {
  private command: string;
  private properties: any;
  private unqfy: UNQfy;

  constructor(param: string, properties: any, unqfy: UNQfy) {
    if(!COMMANDS.includes(param)) throw new CommandNotFoundError(param);
    if(!this.validParams(param, properties)) throw new BadParamError(VALID_PARAMS[param]);
    
    this.command = param;
    this.properties = properties;
    this.unqfy = unqfy;
  }

  getCommand(): string {
    return this.command;
  }

  listen() {
    let userId: string = this.properties.user;
    let trackId: string = this.properties.track;

    this.unqfy.listen(userId, trackId);

    console.log(`- El usuario ${userId} escucho el tema ${trackId}`);
  }

  listened() {
    let userId: string = this.properties.user;
    
    let listened: string[] = this.unqfy.listened(userId);

    console.log('- Temas escuchados por el usuario: ', listened);
  }

  howManyListen() {
    let userId: string = this.properties.user;
    let trackId: string = this.properties.track;

    let count: number = this.unqfy.howManyListen(userId, trackId);

    console.log(`- El usuario ${userId} escucho el tema ${count} veces`);
  }

  thisIs() {
    let artistId: string = this.properties.artist;

    let playlist: Playlist = this.unqfy.thisIs(artistId);

    console.log(`- La lista "This is" del artista ${artistId} es: `, playlist);
  }

  addUser(): void {
    let name: string = this.properties.name;

    let user: User = this.unqfy.addUser(name);

    console.log('- Se agrego un nuevo usuario: ', user);
  }

  addArtist(): void {
    let artist: Artist = this.unqfy.addArtist(this.properties);
    console.log('- Se agrego un nuevo artista: ', artist);
  }

  deleteArtist(): void {
    let artistId: string = this.properties.artist;

    this.unqfy.deleteArtist(artistId);

    console.log('- Se elimino el artista con id: ', artistId);
  }

  viewArtist(): void {
    let artistId: string = this.properties.artist;

    let artist: Artist = this.unqfy.getArtistById(artistId);

    console.log('- Los datos del artista son: ', artist);
  }

  addAlbum(): void {
    let artistName: string = this.properties.artist;

    let year: number = parseInt(this.properties.year);
    let albumData: { name: string, year: number } = {...this.properties, year};
    //SD
    let artist = this.unqfy.getArtistByName(artistName);
    //
    let album: Album = this.unqfy.addAlbum(artist.id, albumData);
    console.log('- Se agrego un nuevo album: ', album);
  }

  deleteAlbum(): void {
    let albumId: string = this.properties.album;
    
    this.unqfy.deleteAlbum(albumId);

    console.log('- Se elimino el album con id: ', albumId);
  }

  viewAlbum(): void {
    let albumId: string = this.properties.album;

    let album: Album = this.unqfy.getAlbumById(albumId);

    console.log('- Los datos del album son: ', album);
  }

  tracksByGenres(): void {
    let genres: string[] = this.properties.genres.split(',').map((genre: string) => genre.trim());
    let tracks: Track[] = this.unqfy.getTracksMatchingGenres(genres);

    console.log('- Tracks by genres: ', tracks);
  }

  tracksByArtist(): void {
    let artistData: { name: string } = this.properties.artistName;
    let tracks: Track[] = this.unqfy.getTracksMatchingArtist(artistData)

    console.log('- Tracks by artist: ', tracks);
  }

  addTrack() {
    let albumName: string = this.properties.album;

    let genres: string[] = this.properties.genres.split(',').map((genre: string) => genre.trim());
    let duration: number = parseInt(this.properties.duration);
    let trackData: { name: string; duration: number; genres: string[]; } = {...this.properties, genres, duration};
 
    let album = this.unqfy.getAlbumByName(albumName);
 
    let track : Track = this.unqfy.addTrack(album.id, trackData);
    console.log('- Se agrego un nuevo track: ',track);
    //*
  }

  deleteTrack() {
    let trackId: string = this.properties.track;

    this.unqfy.deleteTrack(trackId);

    console.log('- Se elimino el track con id: ', trackId);
  }

  viewTrack(): void {
    let trackId: string = this.properties.track;

    let track: Track = this.unqfy.getTrackById(trackId);

    console.log('- Los datos del track son: ', track);
  }

  addPlaylist() {
    let name: string = this.properties.name;
    let duration: number = parseInt(this.properties.duration);
    let genres: string[] = this.properties.genres.split(',').map((genre: string) => genre.trim());
    let playlist: Playlist = this.unqfy.createPlaylist(name, genres, duration);
    console.log('- Se agrego una nueva playlist: ', playlist);
  }

  deletePlaylist() {
    let playlistId: string = this.properties.playlist;

    this.unqfy.deletePlaylist(playlistId);

    console.log('- Se elimino la playlist con id: ', playlistId);
  }

  viewPlaylist(): void {
    let playlistId: string = this.properties.playlist;

    let playlist: Playlist = this.unqfy.getPlaylistById(playlistId);

    console.log('- Los datos de la playlist son: ', playlist);
  }

  search() {
    let name: string = this.properties.name;

    let data: any = this.unqfy.searchByName(name);

    console.log('- Se encontraron los siguientes resultados: ', data);
  }

  validParams(operation: string, properties: object): boolean {
    // All parameters are correct
    let valid: boolean = Object.keys(properties).reduce((accum: boolean, current: string) => VALID_PARAMS[operation].includes(current) && accum, true);

    // All parameters exist
    let necessary: boolean = VALID_PARAMS[operation].reduce((accum: boolean, current: string) => Object.keys(properties).includes(current) && accum, true);

    return valid && necessary;
  }
}
