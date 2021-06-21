import express, { Request, Response } from "express";
import BadParamError from "../exceptions/badParamError";
import Artist from "../model/artist";
import { searchArtists, getArtistById, createArtist, updateArtist, deleteArtist, setUnqfy } from '../services/artist.service';

export const artistRouter = express.Router();

artistRouter.use(async (req: Request, res: Response, next: Function) => {
  let { unqfy } = req.app.locals;
  setUnqfy(unqfy);

  next();
});

// Search artists
artistRouter.get("/artists", async (req: Request, res: Response, next: Function) => {
  try {
    let name: string | undefined = req.query.name as string;

    let artists: Artist[] = searchArtists(name);
    let response : any[] =  [] ;

    artists.forEach(
      artist => response.push({
        id : artist.id ,
        name: artist.name ,
        albums: artist.getIndexAlbums() ,
        country: artist.country ,
      })
    )
    res.status(200).json(response);
    
    next();
  } catch(err) { next(err) };
});

// Get specific artist
artistRouter.get("/artists/:id", async (req: Request, res: Response, next: Function) => {
  try {
    let { id } = req.params;

    let artist: Artist = getArtistById(id);

    res.status(200).json({
      id : artist.id ,
      name: artist.name ,
      albums: artist.getIndexAlbums() ,
      country: artist.country ,
    });
 
    next();
  } catch(err) { next(err) };
});

// Create artist
artistRouter.post("/artists", async (req: Request, res: Response, next: Function) => {  
  try {
    let { name, country } = req.body;

    if(!name || !country) throw new BadParamError(['name', 'country']);

    let artist: Artist = createArtist(name, country);
    
    res.status(201).json({
      id : artist.id ,
      name: artist.name ,
      albums : artist.albums ,
      country : artist.country ,
    });

    next();
  } catch(err) { next(err) };
  
});

// Update artist
artistRouter.put("/artists/:id", async (req: Request, res: Response, next: Function) => {
  try {
    let { id } = req.params;
    let { name, country } = req.body;

     if(!name || !country) throw new BadParamError(['name', 'country']);

    let artist: Artist = updateArtist(id, name, country);

    res.status(200).json({
      id : artist.id ,
      name: artist.name ,
      albums : artist.albums ,
      country : artist.country ,
    });

    next();
  } catch(err) { next(err) };
});

// Delete artist
artistRouter.delete("/artists/:id", async (req: Request, res: Response, next: Function) => {
  try {
    let { id } = req.params;

    deleteArtist(id);

    res.status(204).send('El artista se elimino con exito');

    next();
  } catch(err) { next(err) };
});