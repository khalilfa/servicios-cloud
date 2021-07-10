import express, { Request, Response } from "express";
import BadParamError from "../exceptions/badParamError";
import Album from "../model/album";
import { createAlbum, deleteAlbum, getAlbumById, searchAlbums, setUnqfy, updateAlbum } from "../services/album.service";


export const albumRouter = express.Router();

albumRouter.use(async (req: Request, res: Response, next: Function) => {
  let { unqfy } = req.app.locals;
  setUnqfy(unqfy);

  next();
});

// Create album
albumRouter.post('/albums', async (req: Request, res: Response, next: Function) => {
  try {
    let { artistId, name, year } = req.body;

    if(!artistId || !name || !year || !(typeof year == 'number')) throw new BadParamError(['artistId', 'name', 'year']);

    let album: Album = createAlbum(artistId, name, year);
  
    res.status(201).json({
      id: album.id, 
      name: album.name, 
      year: album.year, 
      tracks: album.tracks ,
    });

    next();
  } catch(err) { next(err) }; 

});

// Get specific album
albumRouter.get('/albums/:id', async (req: Request, res: Response, next: Function) => {
  try {
    let { id } = req.params;

    let album: Album = getAlbumById(id);

    res.status(200).json({
      id: album.id, 
      name: album.name, 
      year: album.year, 
      tracks: album.tracks ,
    });

    next();
  } catch(err) { next(err) };
});

// Update album
albumRouter.patch('/albums/:id', async (req: Request, res: Response, next: Function) => {
  try {
    let { id } = req.params;
    let { year } = req.body;

    if(!year || !(typeof year == 'number')) throw new BadParamError(['year']);

    let album: Album = updateAlbum(id, year);

    res.status(200).json({
      id: album.id, 
      name: album.name, 
      year: album.year, 
      tracks: album.tracks ,
    });

    next();
  } catch(err) { next(err) };
});

// Delete album
albumRouter.delete('/albums/:id', async (req: Request, res: Response, next: Function) => {
  try {
    let { id } = req.params;

    deleteAlbum(id);

    res.status(204).send('Album eliminado con exito');

    next();
  } catch(err) { next(err) };
});

// Search albums
albumRouter.get('/albums', async (req: Request, res: Response, next: Function) => {
  try {
    let name: string | undefined = req.query.name as string;

    let albums: Album[] = searchAlbums(name);
    let response : any[] =  [] ;

    albums.forEach(
      album => response.push({
        id: album.id, 
        name: album.name, 
        year: album.year, 
        tracks: album.tracks ,
      })
    )
    res.status(200).json(response);

    next();
  } catch(err) { next(err) };
});