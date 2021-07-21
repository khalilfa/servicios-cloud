import axios from "axios";

import LoggerService, {LogLevel} from "./services/logger.service";

export class Subject {
  private subscribers: Observer[];

  constructor() {
    this.subscribers = [];
  }

  subscribe(subscriber: Observer) {
    this.subscribers.push(subscriber);
  }

  unsuscribe(subscriber: Observer) {
    this.subscribers = this.subscribers.filter(sub => sub.id !== subscriber.id);
  }

  change(action: string, object: any, owner: any) {
    this.subscribers.forEach(sub => sub.update(action, object, owner));
  }
}

abstract class Observer {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  abstract update(action: string, object: object, owner: object) : void;
}

export class NewsletterObserver extends Observer {
  constructor(id: string) {
    super(id);
  }

  update(action: string, object: object, owner: object) {
    if(action === 'addAlbum') {
      this.notify(object, owner);
    }
  }
  
  notify(album: any, artist: any) {
    const artistId = artist.id;
    const artistName = artist.name;
    const albumName = album.name;
    axios.post('http://localhost:6000/api/notify', {
      artistId,
      subject: `Nuevo Album para artista ${artistName}`, 
      message: `Se ha agregado el album ${albumName} al artista ${artistName}`
    });
  }
}

export class LogginObserver extends Observer {
  constructor(id: string) {
    super(id);
  }

  update(action: string, object: object, owner: object) {
    switch (action) {
      case 'addArtist':
        LoggerService.log(LogLevel.INFO, "Added artist" + object)
        break;
      case 'addAlbum':
        LoggerService.log(LogLevel.INFO, "Added album" + object)
        break;
      case 'addTrack':
        LoggerService.log(LogLevel.INFO, "Added track" + object)
        break;
      case 'deleteArtist':
        LoggerService.log(LogLevel.INFO, "Deleted artist" + object)
        break;
      case 'deleteAlbum':
        LoggerService.log(LogLevel.INFO, "Deleted album" + object)
        break;
      case 'deleteTrack':
        LoggerService.log(LogLevel.INFO, "Deleted track" + object)
      break;
      default:
        break;
    }
  }

  
}
