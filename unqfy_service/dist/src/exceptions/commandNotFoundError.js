"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommandNotFoundError extends Error {
    constructor(command) {
        let message = `No existe el comando: ${command}`;
        super(message);
    }
}
exports.default = CommandNotFoundError;
//# sourceMappingURL=commandNotFoundError.js.map