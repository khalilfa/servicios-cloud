export default class EntityNotFoundError extends Error {
  constructor(className: string, entityId: string) {
    let message: string = `No existe ${className} con identificador: ${entityId}`;
    super(message);
  }
} 