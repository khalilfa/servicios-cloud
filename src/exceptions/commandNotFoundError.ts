export default class CommandNotFoundError extends Error {
  constructor(command: string) {
    let message: string = `No existe el comando: ${command}`;
    super(message);
  }
} 