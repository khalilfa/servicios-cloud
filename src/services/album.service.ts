import Album from "../model/album";
import UNQfy from "../unqfy";

let UNQFY: UNQfy;

export function setUnqfy(unqfy: UNQfy) {
  UNQFY = unqfy;
}

export function createAlbum(artistId: string, name: string, year: number): Album {
  let album: Album = UNQFY.addAlbum(artistId, { name, year });
  return album;
}

export function getAlbumById(id: string): Album {
  let album: Album = UNQFY.getAlbumById(id);
  return album;
}

export function updateAlbum(id: string, year: number): Album {
  let album: Album = UNQFY.getAlbumById(id);

  album.year = year;

  return album;
}

export function deleteAlbum(id: string): void {
  UNQFY.deleteAlbum(id);
}

export function searchAlbums(name: string | undefined): Album[] {
  let allAlbums: Album[] = UNQFY.getAlbums();
  let filteredAlbums: Album[] = name ? allAlbums.filter(album => album.name.toLowerCase().includes(name.toLowerCase())) : allAlbums;

  return filteredAlbums;
}