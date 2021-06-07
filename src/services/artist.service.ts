import Artist from "../model/artist";
import UNQfy from "../unqfy";

export function getAllArtists(unqfy: UNQfy): Artist[] {
  return unqfy.getArtists();
}

export function getArtistById(unqfy: UNQfy, id: string): Artist {
  return unqfy.getArtistById(id);
}

export function createArtist(unqfy: UNQfy, name: string, country: string) {
  let artist: Artist = unqfy.addArtist({name, country});
  return artist;
}

export function updateArtist(unqfy: UNQfy, id: string, name: string, country: string) {
  let artist: Artist = unqfy.getArtistById(id);

  artist.name = name;
  artist.country = country;

  return artist;
}

export function deleteArtist(unqfy: UNQfy, id: string) {
  unqfy.deleteArtist(id);
}