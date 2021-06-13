import express, { Request, Response } from "express";
import Playlist from "../model/playlist";
import BadParamError from "../exceptions/badParamError";
import { searchPlaylists ,createRandomPlaylistByGenre ,deletePlaylist, createPlaylistByTracks,getPlaylistById, setUnqfy } from '../services/playlist.service';
// import Artist from "../model/artist";
export const playlistRoute = express.Router();

playlistRoute.use(async (req: Request, res: Response, next: Function) => {
    let { unqfy } = req.app.locals;
    setUnqfy(unqfy);
    next();
  });

// Create PLaylist
playlistRoute.post('/playlists', async (req: Request, res: Response, next: Function) => {
    try {
      let body = JSON.parse(req.body);
      let pl : Playlist = createRandomPlaylistByGenre(body.name,body.genre,body.maxDuration);
      let bodyResponse = {
          id : pl.id ,
          name: pl.name ,
          duration: pl.duration,
          tracks: pl.tracks
      };
      res.status(201).json(bodyResponse);
      next();
    } catch(err) { next(err) };
  });
  
// Create PLaylist
playlistRoute.post('/playlists', async (req: Request, res: Response, next: Function) => {
    try {
      let body = JSON.parse(req.body);
      let pl : Playlist = createPlaylistByTracks(body.name,body.tracks);
      let bodyResponse = {
          id : pl.id ,
          name: pl.name ,
          duration: pl.duration,
          tracks: pl.tracks
      };
      res.status(201).json(bodyResponse);
      next();
    } catch(err) { next(err) };
  });

// get Playlist
playlistRoute.get("/playlists/:id", async (req: Request, res: Response, next: Function) => {
    try {
        let pl : Playlist = getPlaylistById(req.params.id)
      res.status(200).json({
        id : pl.id ,
        name: pl.name ,
        duration: pl.duration
    });
      next();
    }catch(err){ 
      next(err) 
    };
  });

  // Delete playlist
playlistRoute.delete('/playlists/:id', async (req: Request, res: Response, next: Function) => {
    try {
      deletePlaylist(req.params.id);
      res.status(204).send('Status Code: 204');
      next();
    } catch(err) { next(err) };
  });

  //buscar Playlist
  playlistRoute.get("/playlists", async (req: Request, res: Response, next: Function) => {
    try {
        let plsName = searchPlaylists(req.params.name,parseInt(req.params.durationLT),parseInt(req.params.durationGT)) ;
        res.status(200).send(JSON.stringify(plsName));
        next();
    }catch(err){ 
      next(err) 
    };
  });

