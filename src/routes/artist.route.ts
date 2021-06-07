import express, { Request, Response } from "express";
import Artist from "../model/artist";
import { getAllArtists, getArtistById, createArtist, updateArtist, deleteArtist } from '../services/artist.service';

export const artistRouter = express.Router();

// Get all artists
artistRouter.get("/artists", async (req: Request, res: Response, next) => {
  try {
    let { unqfy } = req.app.locals;
    let artists: Artist[] = getAllArtists(unqfy);
    res.status(200).json(artists);
  } catch (e) {
    res.status(500).send(e.message);
  }

  next();
});

// Get specific artist
artistRouter.get("/artists/:id", async (req: Request, res: Response, next) => {
  try {
    let { unqfy } = req.app.locals;
    let { id } = req.params;

    let artist: Artist = getArtistById(unqfy, id);

    res.status(200).json(artist);
  } catch (e) {
    res.status(500).send(e.message);
  }

  next();
});

// Create artist
artistRouter.post("/artists", async (req: Request, res: Response, next) => {
  try {
    let { unqfy } = req.app.locals;
    let { name, country } = req.body;
    
    let artist: Artist = createArtist(unqfy, name, country);

    res.status(200).json(artist);
  } catch (e) {
    res.status(500).send(e.message);
  }

  next();
});

// Update artist
artistRouter.patch("/artists/:id", async (req: Request, res: Response, next) => {
  try {
    let { unqfy } = req.app.locals;
    let { id } = req.params;
    let { name, country } = req.body;

    let artist: Artist = updateArtist(unqfy, id, name, country);

    res.status(200).json(artist);
  } catch (e) {
    res.status(500).send(e.message);
  }

  next();
});

// Delete artist
artistRouter.delete("/artists/:id", async (req: Request, res: Response, next) => {
  try {
    let { unqfy } = req.app.locals;
    let { id } = req.params;

    deleteArtist(unqfy, id);

    res.status(200).send('El artista se elimino con exito');
  } catch (e) {
    res.status(500).send(e.message);
  }

  next();
});