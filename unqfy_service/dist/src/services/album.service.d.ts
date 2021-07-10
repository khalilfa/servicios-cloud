import Album from "../model/album";
import UNQfy from "../unqfy";
export declare function setUnqfy(unqfy: UNQfy): void;
export declare function createAlbum(artistId: string, name: string, year: number): Album;
export declare function getAlbumById(id: string): Album;
export declare function updateAlbum(id: string, year: number): Album;
export declare function deleteAlbum(id: string): void;
export declare function searchAlbums(name: string | undefined): Album[];
