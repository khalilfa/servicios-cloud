"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EntityNotFoundError extends Error {
    constructor(className, entityId) {
        let message = `No existe ${className} con identificador: ${entityId}`;
        super(message);
    }
}
exports.default = EntityNotFoundError;
//# sourceMappingURL=entityNotFountError.js.map