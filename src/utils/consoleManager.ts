import { getUNQfy, saveUNQfy } from '../../main';
import Artist from '../model/artist';
import UNQfy from '../unqfy';

const commands = ['addArtist'];

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
      console.log(`Se ingreso un parametro sin valor asociado: ${args.shift()}`);
      ConsoleManager.formatProperties(args, properties);
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
    if(!commands.includes(param)) console.error('No existe el comando');
    
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
    
      default:
        break;
    };
  }
}