"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../../main");
const commandNotFoundError_1 = __importDefault(require("../exceptions/commandNotFoundError"));
const badParamError_1 = __importDefault(require("../exceptions/badParamError"));
const COMMANDS = ['addArtist', 'addAlbum', 'addTrack', 'tracksByGenres', 'tracksByArtist', 'deleteArtist', 'deleteAlbum', 'deleteTrack',
    'addPlaylist', 'search', 'deletePlaylist', 'viewArtist', 'viewAlbum', 'viewTrack', 'viewPlaylist', 'addUser', 'listen', 'listened',
    'howManyListen', 'thisIs', 'populateAlbumsForArtist',
    'howManyListen', 'thisIs', 'lyrics'];
const VALID_PARAMS = {
    addArtist: ['name', 'country'],
    addAlbum: ['artist', 'name', 'year'],
    addTrack: ['name', 'duration', 'genres', 'album'],
    tracksByGenres: ['genres'],
    tracksByArtist: ['artistName'],
    deleteArtist: ['artist'],
    deleteAlbum: ['album'],
    deleteTrack: ['track'],
    deletePlaylist: ['playlist'],
    addPlaylist: ['name', 'genres', 'duration'],
    search: ['name'],
    viewArtist: ['artist'],
    viewAlbum: ['album'],
    viewTrack: ['track'],
    viewPlaylist: ['playlist'],
    addUser: ['name'],
    listen: ['user', 'track'],
    listened: ['user'],
    howManyListen: ['user', 'track'],
    thisIs: ['artist'],
    populateAlbumsForArtist: ['artistName'],
    lyrics: ['track']
};
class ConsoleManager {
    static executeCommand(args) {
        let existFile = ConsoleManager.existFile(args);
        let unqfy = existFile ? main_1.getUNQfy(args[2]) : main_1.getUNQfy();
        let instructionIndex = existFile ? 3 : 2;
        let instruction = args[instructionIndex];
        let properties = ConsoleManager.formatProperties(args.slice(instructionIndex + 1));
        let command = new Command(instruction, properties, unqfy);
        command[command.getCommand()]();
        if (existFile) {
            main_1.saveUNQfy(unqfy, args[2]);
        }
        else {
            main_1.saveUNQfy(unqfy);
        }
    }
    static existFile(args) {
        return args[2].includes('.json');
    }
    static formatProperties(args, properties = {}) {
        if (args.length === 1) {
            throw new badParamError_1.default(args.shift());
        }
        else if (args.length >= 2) {
            let key = args.shift();
            let value = args.shift();
            properties[key] = value;
            ConsoleManager.formatProperties(args, properties);
        }
        return properties;
    }
}
exports.default = ConsoleManager;
class Command {
    constructor(param, properties, unqfy) {
        if (!COMMANDS.includes(param))
            throw new commandNotFoundError_1.default(param);
        if (!this.validParams(param, properties))
            throw new badParamError_1.default(VALID_PARAMS[param]);
        this.command = param;
        this.properties = properties;
        this.unqfy = unqfy;
    }
    getCommand() {
        return this.command;
    }
    lyrics() {
        return __awaiter(this, void 0, void 0, function* () {
            let track = this.properties.track;
            let lyrics = yield this.unqfy.getLyrics(track);
            console.log(`Letra de ${track}: \n ${lyrics}`);
        });
    }
    populateAlbumsForArtist() {
        this.unqfy.populateAlbumsForArtist(this.properties.artistName);
    }
    listen() {
        let userId = this.properties.user;
        let trackId = this.properties.track;
        this.unqfy.listen(userId, trackId);
        console.log(`- El usuario ${userId} escucho el tema ${trackId}`);
    }
    listened() {
        let userId = this.properties.user;
        let listened = this.unqfy.listened(userId);
        console.log('- Temas escuchados por el usuario: ', listened);
    }
    howManyListen() {
        let userId = this.properties.user;
        let trackId = this.properties.track;
        let count = this.unqfy.howManyListen(userId, trackId);
        console.log(`- El usuario ${userId} escucho el tema ${count} veces`);
    }
    thisIs() {
        let artistId = this.properties.artist;
        let playlist = this.unqfy.thisIs(artistId);
        console.log(`- La lista "This is" del artista ${artistId} es: `, playlist);
    }
    addUser() {
        let name = this.properties.name;
        let user = this.unqfy.addUser(name);
        console.log('- Se agrego un nuevo usuario: ', user);
    }
    addArtist() {
        let artist = this.unqfy.addArtist(this.properties);
        console.log('- Se agrego un nuevo artista: ', artist);
    }
    deleteArtist() {
        let artistId = this.properties.artist;
        this.unqfy.deleteArtist(artistId);
        console.log('- Se elimino el artista con id: ', artistId);
    }
    viewArtist() {
        let artistId = this.properties.artist;
        let artist = this.unqfy.getArtistById(artistId);
        console.log('- Los datos del artista son: ', artist);
    }
    addAlbum() {
        let artistName = this.properties.artist;
        let year = parseInt(this.properties.year);
        let albumData = Object.assign(Object.assign({}, this.properties), { year });
        //SD
        let artist = this.unqfy.getArtistByName(artistName);
        //
        let album = this.unqfy.addAlbum(artist.id, albumData);
        console.log('- Se agrego un nuevo album: ', album);
    }
    deleteAlbum() {
        let albumId = this.properties.album;
        this.unqfy.deleteAlbum(albumId);
        console.log('- Se elimino el album con id: ', albumId);
    }
    viewAlbum() {
        let albumId = this.properties.album;
        let album = this.unqfy.getAlbumById(albumId);
        console.log('- Los datos del album son: ', album);
    }
    tracksByGenres() {
        let genres = this.properties.genres.split(',').map((genre) => genre.trim());
        let tracks = this.unqfy.getTracksMatchingGenres(genres);
        console.log('- Tracks by genres: ', tracks);
    }
    tracksByArtist() {
        let artistData = this.properties.artistName;
        let tracks = this.unqfy.getTracksMatchingArtist(artistData);
        console.log('- Tracks by artist: ', tracks);
    }
    addTrack() {
        let albumName = this.properties.album;
        let genres = this.properties.genres.split(',').map((genre) => genre.trim());
        let duration = parseInt(this.properties.duration);
        let trackData = Object.assign(Object.assign({}, this.properties), { genres, duration });
        let album = this.unqfy.getAlbumByName(albumName);
        let track = this.unqfy.addTrack(album.id, trackData);
        console.log('- Se agrego un nuevo track: ', track);
        //*
    }
    deleteTrack() {
        let trackId = this.properties.track;
        this.unqfy.deleteTrack(trackId);
        console.log('- Se elimino el track con id: ', trackId);
    }
    viewTrack() {
        let trackId = this.properties.track;
        let track = this.unqfy.getTrackById(trackId);
        console.log('- Los datos del track son: ', track);
    }
    addPlaylist() {
        let name = this.properties.name;
        let duration = parseInt(this.properties.duration);
        let genres = this.properties.genres.split(',').map((genre) => genre.trim());
        let playlist = this.unqfy.createPlaylist(name, genres, duration);
        console.log('- Se agrego una nueva playlist: ', playlist);
    }
    deletePlaylist() {
        let playlistId = this.properties.playlist;
        this.unqfy.deletePlaylist(playlistId);
        console.log('- Se elimino la playlist con id: ', playlistId);
    }
    viewPlaylist() {
        let playlistId = this.properties.playlist;
        let playlist = this.unqfy.getPlaylistById(playlistId);
        console.log('- Los datos de la playlist son: ', playlist);
    }
    search() {
        let name = this.properties.name;
        let data = this.unqfy.searchByName(name);
        console.log('- Se encontraron los siguientes resultados: ', data);
    }
    validParams(operation, properties) {
        // All parameters are correct
        let valid = Object.keys(properties).reduce((accum, current) => VALID_PARAMS[operation].includes(current) && accum, true);
        // All parameters exist
        let necessary = VALID_PARAMS[operation].reduce((accum, current) => Object.keys(properties).includes(current) && accum, true);
        return valid && necessary;
    }
}
//# sourceMappingURL=consoleManager.js.map