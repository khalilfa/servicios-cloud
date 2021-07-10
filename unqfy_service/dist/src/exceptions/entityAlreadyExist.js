"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EntityAlreadyExist extends Error {
    constructor(className, entityId) {
        let message = `La entidad ${className} con identificador: ${entityId} ya existe.`;
        super(message);
    }
}
exports.default = EntityAlreadyExist;
//# sourceMappingURL=entityAlreadyExist.js.map