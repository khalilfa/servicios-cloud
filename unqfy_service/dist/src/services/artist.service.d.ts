import Artist from "../model/artist";
import UNQfy from "../unqfy";
export declare function setUnqfy(unqfy: UNQfy): void;
export declare function searchArtists(name: string | undefined): Artist[];
export declare function getArtistById(id: string): Artist;
export declare function createArtist(name: string, country: string): Artist;
export declare function updateArtist(id: string, name: string, country: string): Artist;
export declare function deleteArtist(id: string): void;
