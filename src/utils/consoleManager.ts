import { getUNQfy, saveUNQfy } from '../../main';
import CommandNotFoundError from '../exceptions/commandNotFoundError';
import BadParamError from '../exceptions/badParamError';
import Album from '../model/album';
import Artist from '../model/artist';
import UNQfy from '../unqfy';

const COMMANDS: string[] = ['addArtist', 'addAlbum'];
const VALID_PARAMS: any = {
  addArtist: ['name', 'country'],
  addAlbum: ['artist', 'name', 'year'],
}

export default class ConsoleManager {
  static executeCommand(args: string[]) {
    let existFile = ConsoleManager.existFile(args);
    let unqfy: UNQfy = existFile ? getUNQfy(args[2]) : getUNQfy();
    let instructionIndex = existFile ? 3 : 2;
    let instruction: string = args[instructionIndex];
    let properties: any = ConsoleManager.formatProperties(args.slice(instructionIndex + 1));
    let command: Command = new Command(instruction, properties, unqfy);
    
    command.execute();

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

  execute(): void {
    switch (this.command) {
      case 'addArtist':
        let artist: Artist = this.unqfy.addArtist(this.properties);
        console.log('- Se agrego un nuevo artista: ', artist);
        break;
      case 'addAlbum':
        let artistId: string = this.properties.artist;
        let album: Album = this.unqfy.addAlbum(artistId, this.properties);
        console.log('- Se agrego un nuevo album: ', album);
    
      default:
        break;
    };
  }

  validParams(operation: string, properties: object): boolean {
    let valid: boolean = Object.keys(properties).reduce((accum, current) => VALID_PARAMS[operation].includes(current) && accum, true);
    return valid;
  }
}