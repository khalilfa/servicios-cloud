import e from "express";
import { EEXIST } from "node:constants";
import EntityAlreadyExist from "../exceptions/entityAlreadyExist";
import Artist from "../model/artist";
import UNQfy from "../unqfy";

let UNQFY: UNQfy;

export function setUnqfy(unqfy: UNQfy) {
  UNQFY = unqfy;
}

export function searchArtists(name: string): Artist[] {
  let allArtists: Artist[] = UNQFY.getArtists();
  let filteredArtists: Artist[] = name ? allArtists.filter(artist => artist.name.toLowerCase().includes(name.toLowerCase())) : allArtists;

  return filteredArtists;
}

export function getArtistById(id: string): Artist {
  return UNQFY.getArtistById(id);
}

export function createArtist(name: string, country: string) {
  try{
    let artist: Artist = UNQFY.addArtist({name, country});
    return artist;
  } catch(err: Error | any) { 
    throw err;
  }
  
}

export function updateArtist(id: string, name: string, country: string) {
  try{
    let artist: Artist = UNQFY.getArtistById(id);

    artist.name = name;
    artist.country = country;

    return artist;
  } catch(err: Error | any) { 
    throw err;
  }
}

export function deleteArtist(id: string) {
  UNQFY.deleteArtist(id);
}