import express, { Request, Response } from "express";
import Artist from "../model/artist";
import { getAllArtists, getArtistById, createArtist, updateArtist, deleteArtist, setUnqfy } from '../services/artist.service';

export const artistRouter = express.Router();

artistRouter.use(async (req, res, next) => {
  let { unqfy } = req.app.locals;
  setUnqfy(unqfy);

  next();
})

// Get all artists
artistRouter.get("/artists", async (req: Request, res: Response, next) => {
  try {
    let artists: Artist[] = getAllArtists();
    res.status(200).json(artists);
  } catch (e) {
    res.status(500).send(e.message);
  }

  next();
});

// Get specific artist
artistRouter.get("/artists/:id", async (req: Request, res: Response, next) => {
  try {
    let { id } = req.params;

    let artist: Artist = getArtistById(id);

    res.status(200).json(artist);
  } catch (e) {
    res.status(500).send(e.message);
  }

  next();
});

// Create artist
artistRouter.post("/artists", async (req: Request, res: Response, next) => {
  try {
    let { name, country } = req.body;
    
    let artist: Artist = createArtist(name, country);

    res.status(200).json(artist);
  } catch (e) {
    res.status(500).send(e.message);
  }

  next();
});

// Update artist
artistRouter.patch("/artists/:id", async (req: Request, res: Response, next) => {
  try {
    let { id } = req.params;
    let { name, country } = req.body;

    let artist: Artist = updateArtist(id, name, country);

    res.status(200).json(artist);
  } catch (e) {
    res.status(500).send(e.message);
  }

  next();
});

// Delete artist
artistRouter.delete("/artists/:id", async (req: Request, res: Response, next) => {
  try {
    let { id } = req.params;

    deleteArtist(id);

    res.status(200).send('El artista se elimino con exito');
  } catch (e) {
    res.status(500).send(e.message);
  }

  next();
});