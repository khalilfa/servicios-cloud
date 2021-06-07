import Artist from "../model/artist";
import UNQfy from "../unqfy";

let UNQFY: UNQfy;

export function setUnqfy(unqfy: UNQfy) {
  UNQFY = unqfy;
}

export function getAllArtists(): Artist[] {
  return UNQFY.getArtists();
}

export function getArtistById(id: string): Artist {
  return UNQFY.getArtistById(id);
}

export function createArtist(name: string, country: string) {
  let artist: Artist = UNQFY.addArtist({name, country});
  return artist;
}

export function updateArtist(id: string, name: string, country: string) {
  let artist: Artist = UNQFY.getArtistById(id);

  artist.name = name;
  artist.country = country;

  return artist;
}

export function deleteArtist(id: string) {
  UNQFY.deleteArtist(id);
}