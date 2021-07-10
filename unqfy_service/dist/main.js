"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUNQfy = exports.getUNQfy = void 0;
const fs_1 = __importDefault(require("fs"));
const unqfy_1 = __importDefault(require("./src/unqfy"));
const consoleManager_1 = __importDefault(require("./src/utils/consoleManager"));
// Retorna una instancia de UNQfy. Si existe filename, recupera la instancia desde el archivo.
function getUNQfy(filename = 'data.json') {
    console.log('Se cargo la bd');
    let unqfy = new unqfy_1.default();
    if (fs_1.default.existsSync(filename)) {
        unqfy = unqfy_1.default.load(filename);
    }
    return unqfy;
}
exports.getUNQfy = getUNQfy;
function saveUNQfy(unqfy, filename = 'data.json') {
    unqfy.save(filename);
}
exports.saveUNQfy = saveUNQfy;
/*
 En esta funcion deberán interpretar los argumentos pasado por linea de comandos
 e implementar los diferentes comandos.

  Se deberán implementar los comandos:
    - Alta y baja de Artista
    - Alta y Baja de Albums
    - Alta y Baja de tracks

    - Listar todos los Artistas
    - Listar todos los albumes de un artista
    - Listar todos los tracks de un albums

    - Busqueda de canciones intepretadas por un determinado artista
    - Busqueda de canciones por genero

    - Dado un string, imprimmir todas las entidades (artistas, albums, tracks, playlists) que coincidan parcialmente
    con el string pasado.

    - Dada un nombre de playlist, una lista de generos y una duración máxima, crear una playlist que contenga
    tracks que tengan canciones con esos generos y que tenga como duración máxima la pasada por parámetro.

  La implementacion de los comandos deberá ser de la forma:
   1. Obtener argumentos de linea de comando
   2. Obtener instancia de UNQfy (getUNQFy)
   3. Ejecutar el comando correspondiente en Unqfy
   4. Guardar el estado de UNQfy (saveUNQfy)

*/
function main() {
    try {
        consoleManager_1.default.executeCommand(process.argv);
    }
    catch (e) {
        console.error('Error: \n', e);
    }
}
main();
//# sourceMappingURL=main.js.map