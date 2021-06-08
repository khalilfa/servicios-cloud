import Album from "../model/album";
import UNQfy from "../unqfy";

let UNQFY: UNQfy;

export function setUnqfy(unqfy: UNQfy) {
  UNQFY = unqfy;
}

export function createAlbum(artistId: string, name: string, year: number): Album {
  try {
    let album: Album = UNQFY.addAlbum(artistId, { name, year });
    return album;
  } catch(err: Error | any) {
    throw err;
  }
}

export function getAlbumById(id: string): Album {
  try {
    let album: Album = UNQFY.getAlbumById(id);
    return album;
  } catch(err: Error | any) {
    throw err;
  }
}

export function updateAlbum(id: string, year: number): Album {
  try {
    let album: Album = UNQFY.getAlbumById(id);

    album.year = year;

    return album;
  } catch(err: Error | any) {
    throw err;
  }
}

export function deleteAlbum(id: string): void {
  try {
    UNQFY.deleteAlbum(id);
  } catch(err: Error | any) {
    throw err;
  }
}

export function searchAlbums(name: string | undefined): Album[] {
  try{
    let allAlbums: Album[] = UNQFY.getAlbums();
    let filteredAlbums: Album[] = name ? allAlbums.filter(album => album.name.toLowerCase().includes(name.toLowerCase())) : allAlbums;

    return filteredAlbums;
  } catch(err: Error | any) {
    throw err;
  }
}