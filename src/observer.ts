import axios from "axios";

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
        this.log("info", "Added artist" + object)
        break;
      case 'addAlbum':
        this.log("info", "Added album" + object)
        break;
      case 'addTrack':
        this.log("info", "Added track" + object)
        break;
      case 'deleteArtist':
        this.log("info", "Deleted artist" + object)
        break;
      case 'deleteAlbum':
        this.log("info", "Deleted album" + object)
        break;
      case 'deleteTrack':
        this.log("info", "Deleted track" + object)
      break;
      default:
        break;
    }
  }

  log(level: string, message: string) {
    const res = axios.post('http://logger:5002/api/log', {
      level,
      message
    });
  }
  
}
