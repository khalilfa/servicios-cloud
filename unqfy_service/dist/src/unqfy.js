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
const artist_1 = __importDefault(require("./model/artist"));
const track_1 = __importDefault(require("./model/track"));
const album_1 = __importDefault(require("./model/album"));
const fs_1 = __importDefault(require("fs"));
const entityNotFountError_1 = __importDefault(require("./exceptions/entityNotFountError"));
const playlist_1 = __importDefault(require("./model/playlist"));
const user_1 = __importDefault(require("./model/user"));
const listen_1 = __importDefault(require("./model/listen"));
const spotify_service_1 = __importDefault(require("./utils/spotify.service"));
const musixMatch_1 = require("./utils/musixMatch");
const entityAlreadyExist_1 = __importDefault(require("./exceptions/entityAlreadyExist"));
const picklify = require('picklify'); // para cargar/guarfar unqfy
class UNQfy {
    constructor() {
        this.artists = [];
        this.playlists = [];
        this.users = [];
    }
    getArtists() {
        return this.artists;
    }
    getPlaylists() {
        return this.playlists;
    }
    getAlbums() {
        let albums = this.artists.map(artist => artist.albums).flat();
        return albums;
    }
    addUser(name) {
        let user = new user_1.default(name);
        if (this.users.some(user => user.name.toLowerCase() === name.toLowerCase()))
            throw new entityAlreadyExist_1.default('User', name);
        this.users.push(user);
        return user;
    }
    getLyrics(trackName) {
        return __awaiter(this, void 0, void 0, function* () {
            let tracks = this.artists.reduce((tracks, artist) => {
                let track = artist.getAllTracks().find(track => track.name.toLocaleLowerCase() === trackName.toLocaleLowerCase());
                if (track) {
                    tracks = [...tracks, track];
                }
                return tracks;
            }, []);
            if (tracks.length === 0)
                throw new entityNotFountError_1.default("Track", trackName);
            let track = tracks[0];
            if (track.lyrics === '') {
                track.lyrics = yield musixMatch_1.getLyrics(trackName);
            }
            return track.lyrics;
        });
    }
    listen(userId, trackId) {
        let user = this.getUserById(userId);
        let track = this.getTrackById(trackId);
        user.listen(track);
    }
    listened(userId) {
        let user = this.getUserById(userId);
        let trackIds = user.listened.map(listen => listen.track.id);
        let tracks = trackIds.map(trackId => this.getTrackById(trackId).name);
        return tracks;
    }
    howManyListen(userId, trackId) {
        let user = this.getUserById(userId);
        let track = this.getTrackById(trackId);
        let listen = user.getListenByTrack(track);
        if (!listen)
            return 0;
        return listen.count;
    }
    thisIs(artistId) {
        let artist = this.getArtistById(artistId);
        let tracks = artist.getAllTracks();
        let tracksByCount = tracks.map(track => ({ track, count: this.users.reduce((acc, usr) => acc + this.howManyListen(usr.id, track.id), 0) }));
        let top3 = tracksByCount.sort((a, b) => a.count - b.count).slice(0, 3);
        let playlist = new playlist_1.default(`This is ${artist.name}`);
        top3.forEach(elem => playlist.addTrack(elem.track));
        return playlist;
    }
    addArtist(artistData) {
        let { name, country } = artistData;
        if (this.artists.some(artist => artist.name.toLowerCase() === name.toLowerCase()))
            throw new entityAlreadyExist_1.default('Artist', name);
        let artist = new artist_1.default(name, country);
        this.artists.push(artist);
        return artist;
    }
    addAlbum(artistId, albumData) {
        let album;
        this.artists.forEach(artist => {
            if (artist.id === artistId) {
                if (artist.hasAlbum(albumData.name))
                    throw new entityAlreadyExist_1.default('Album', albumData.name);
                album = new album_1.default(albumData.name, albumData.year);
                artist.addAlbum(album);
            }
        });
        if (!album)
            throw new entityNotFountError_1.default("Artist", artistId);
        return album;
    }
    addTrack(albumId, trackData) {
        let track;
        for (let i = 0; i < this.artists.length; i++) {
            track = this.artists[i].addTrack(albumId, trackData);
            if (track)
                break;
        }
        if (!track)
            throw new entityNotFountError_1.default("Album", albumId);
        return track;
    }
    deleteArtist(artistId) {
        if (!this.artists.some(artist => artist.id === artistId))
            throw new entityNotFountError_1.default("Artist", artistId);
        this.artists = this.artists.filter(artist => artist.id != artistId);
    }
    deleteAlbum(albumId) {
        if (!this.artists.some(artist => artist.getAlbumById(albumId) !== undefined))
            throw new entityNotFountError_1.default("Album", albumId);
        this.artists.forEach(artist => artist.deleteAlbum(albumId));
    }
    deleteTrack(trackIds) {
        this.artists.forEach(artist => artist.deleteTrack(trackIds));
    }
    deletePlaylist(playlistId) {
        this.playlists = this.playlists.filter(playlist => playlist.id !== playlistId);
    }
    getArtistById(id) {
        let artist = this.artists.find(value => value.id === id);
        if (!artist)
            throw new entityNotFountError_1.default("Artist", id);
        return artist;
    }
    getAlbumById(id) {
        let album = this.artists.reduce((albums, artist) => {
            let album = artist.getAlbumById(id);
            if (album)
                albums = [...albums, album];
            return albums;
        }, [])[0];
        if (!album) {
            console.log('ERROR ');
            throw new entityNotFountError_1.default("Album", id);
        }
        return album;
    }
    getTrackById(id) {
        let track;
        for (let i = 0; i < this.artists.length; i++) {
            track = this.artists[i].getTrackById(id);
            if (track)
                break;
        }
        if (!track)
            throw new entityNotFountError_1.default("Track", id);
        return track;
    }
    getPlaylistById(id) {
        let playlist = this.playlists.find(value => value.id === id);
        if (!playlist)
            throw new entityNotFountError_1.default("Playlist", id);
        return playlist;
    }
    getUserById(id) {
        let user = this.users.find(value => value.id === id);
        if (!user)
            throw new entityNotFountError_1.default("User", id);
        return user;
    }
    getTracksMatchingGenres(genres) {
        let tracks = [];
        this.artists.forEach(value => tracks = tracks.concat(value.getTracksMatchingGenres(genres)));
        return tracks;
    }
    getTracksMatchingArtist(artistData) {
        let artist = this.artists.find(artist => artist.name === artistData.name);
        if (!artist) {
            throw new entityNotFountError_1.default("Artist", artistData.name);
        }
        return artist.getTracks();
    }
    searchByName(name) {
        let matchArtist = [];
        let matchAlbums = [];
        let matchTracks = [];
        let matchPlaylist = [];
        matchArtist = this.artists.filter(artist => artist.name.includes(name));
        this.artists.forEach(artist => matchAlbums = matchAlbums.concat(artist.albums.filter(album => album.name.includes(name))));
        this.artists.forEach(artist => artist.albums.forEach(album => matchTracks = matchTracks.concat(album.tracks.filter(track => track.name.includes(name)))));
        matchPlaylist = this.playlists.filter(playlist => playlist.name.includes(name));
        let result = {
            artists: matchArtist,
            albums: matchAlbums,
            tracks: matchTracks,
            playlists: matchPlaylist,
        };
        return result;
    }
    getArtistByName(artistName) {
        let artist = this.artists.find(artist => artist.name.toLowerCase() === artistName.toLowerCase());
        if (!artist)
            throw new entityNotFountError_1.default("Artist", artistName);
        return artist;
    }
    getAlbumByName(albumName) {
        let album;
        this.artists.forEach(artist => album = artist.albums.find(album => album.name.toLowerCase() === albumName.toLowerCase()));
        if (!album)
            throw new entityNotFountError_1.default("Album", albumName);
        return album;
    }
    createPlaylist(name, genre, maxDuration) {
        let playlist = new playlist_1.default(name);
        let tracks = this.getTracksMatchingGenres(genre);
        for (let i = 0; i < tracks.length; i++) {
            if ((playlist.duration + tracks[i].duration) <= maxDuration) {
                playlist.addTrack(tracks[i]);
            }
        }
        this.playlists = this.playlists.concat(playlist);
        return playlist;
    }
    save(filename) {
        const serializedData = picklify.picklify(this);
        fs_1.default.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
    }
    static load(filename) {
        const serializedData = fs_1.default.readFileSync(filename, { encoding: 'utf-8' });
        const classes = [UNQfy, artist_1.default, album_1.default, track_1.default, playlist_1.default, user_1.default, listen_1.default];
        return picklify.unpicklify(JSON.parse(serializedData), classes);
    }
    deleteUser(id) {
        if (!this.users.some(user => user.id === id))
            throw new entityNotFountError_1.default("User", id);
        this.users = this.users.filter(artist => artist.id != id);
    }
    populateAlbumsForArtist(artistName) {
        return __awaiter(this, void 0, void 0, function* () {
            const spotifyArtist = yield spotify_service_1.default.getArstistId(artistName);
            const spotifyAlbums = yield spotify_service_1.default.getArtistAlbums(spotifyArtist.id);
            const spotifyTracks = yield spotify_service_1.default.getTracksFromAlbums(spotifyAlbums);
            const artist = this.addArtist({ name: artistName, country: "unkown" });
            let albums = [];
            spotifyAlbums.forEach((value) => albums.push(this.addAlbum(artist.id, {
                name: value.name,
                year: parseInt(value.year.substring(0, 4))
            })));
            spotifyTracks.forEach((value) => this.addTracksToAlbum(value.albumId, value.tracks, spotifyArtist.genres));
            //console.log(this.getTracksMatchingGenres(["rock"]))
        });
    }
    addTracksToAlbum(albumId, tracks, genres) {
        tracks.forEach(value => this.addTrack(albumId, { name: value.name, duration: value.duration, genres: genres }));
    }
}
exports.default = UNQfy;
module.exports = UNQfy;
//# sourceMappingURL=unqfy.js.map