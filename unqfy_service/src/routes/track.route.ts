import express, { Request, Response } from "express";
import BadParamError from "../exceptions/badParamError";
import { getLyricsByTrack , getTrackName , setUnqfy } from '../services/track.service';
import Artist from "../model/artist";
export const trackRouter = express.Router();


trackRouter.use(async (req: Request, res: Response, next: Function) => {
  let { unqfy } = req.app.locals;
  setUnqfy(unqfy);
  next();
});

// Search artists
trackRouter.get("/tracks/:id/lyrics", async (req: Request, res: Response, next: Function) => {
  try {
    res.status(200).json({
    Name:getTrackName(req.params.id) , 
    lyrics: await getLyricsByTrack(req.params.id)});
    next();
  }catch(err){ 
    next(err) 
  };
});


