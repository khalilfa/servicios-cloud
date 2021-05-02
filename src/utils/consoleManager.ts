import { getUNQfy, saveUNQfy } from '../../main';
import CommandNotFoundError from '../exceptions/commandNotFoundError';
import BadParamError from '../exceptions/badParamError';
import Album from '../model/album';
import Artist from '../model/artist';
import UNQfy from '../unqfy';
import Track from '../model/track';

const COMMANDS: string[] = ['addArtist', 'addAlbum', 'addTrack', 'tracksByGenres', 'tracksByArtist'];
const VALID_PARAMS: any = {
  addArtist: ['name', 'country'],
  addAlbum: ['artist', 'name', 'year'],
  addTrack: ['name', 'duration', 'genres', 'album'],
  tracksByGenres: ['genres'],
  tracksByArtist: ['artistName'],
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

  public getCommand(): string {
    return this.command;
  }

  private addArtist(): void {
    let artist: Artist = this.unqfy.addArtist(this.properties);
    console.log('- Se agrego un nuevo artista: ', artist);
  }

  private addAlbum(): void {
    let artistId: string = this.properties.artist;

    let year: number = parseInt(this.properties.year);
    let albumData: { name: string, year: number } = {...this.properties, year};

    let album: Album = this.unqfy.addAlbum(artistId, albumData);
    console.log('- Se agrego un nuevo album: ', album);
  }

  private tracksByGenres(): void {
    let genres: string[] = this.properties.genres.split(',').map((genre: string) => genre.trim());
    let tracks: Track[] = this.unqfy.getTracksMatchingGenres(genres);

    console.log('- Tracks by genres: ', tracks);
  }

  private tracksByArtist(): void {
    let artistData: { name: string } = this.properties.artistName;
    let tracks: Track[] = this.unqfy.getTracksMatchingArtist(artistData)

    console.log('- Tracks by artist: ', tracks);
  }

  private addTrack() {
    let albumId: string = this.properties.album;

    let genres: string[] = this.properties.genres.split(',').map((genre: string) => genre.trim());
    let duration: number = parseInt(this.properties.duration);
    let trackData: { name: string; duration: number; genres: string[]; } = {...this.properties, genres, duration};

    let track: Track = this.unqfy.addTrack(albumId, trackData);
    console.log('- Se agrego un nuevo track: ', track);
  }

  private validParams(operation: string, properties: object): boolean {
    // All parameters are correct
    let valid: boolean = Object.keys(properties).reduce((accum: boolean, current: string) => VALID_PARAMS[operation].includes(current) && accum, true);

    // All parameters exist
    let necessary: boolean = VALID_PARAMS[operation].reduce((accum: boolean, current: string) => Object.keys(properties).includes(current) && accum, true);

    return valid && necessary;
  }
}
