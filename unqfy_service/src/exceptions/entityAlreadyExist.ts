export default class EntityAlreadyExist extends Error {
  constructor(className: string, entityId: string) {
    let message: string = `La entidad ${className} con identificador: ${entityId} ya existe.`;
    super(message);
  }
} 