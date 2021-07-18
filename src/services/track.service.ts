import Artist from "../model/track";
import UNQfy from "../unqfy";

let UNQFY: UNQfy;

export function setUnqfy(unqfy: UNQfy) {
  UNQFY = unqfy;
}

export function getLyricsByTrack(trackID: string): Promise<string> {
  return UNQFY.getLyrics(trackID);
}

export function getTrackName(trackID : string) : string {
  return UNQFY.getTrackById(trackID).name ;
}

