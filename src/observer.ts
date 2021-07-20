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

  change(action: string, object: string) {
    this.subscribers.forEach(sub => sub.update(action, object));
  }
}

abstract class Observer {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  abstract update(action: string, object: string) : void;
}

export class NewsletterObserver extends Observer {
  constructor(id: string) {
    super(id);
  }

  update(action: string, object: string) {
    if(action === 'addAlbum') {
      this.notify(object);
    }
  }
  
  notify(object: string) {
    console.log('Se agrego un album');
  }
}

export class LogginObserver extends Observer {
  constructor(id: string) {
    super(id);
  }

  update(action: string, object: string) {
    switch (action) {
      case 'addArtist':
        
        break;
      case 'addAlbum':
      
        break;
      case 'addTrack':
    
        break;
      case 'deleteArtist':
  
        break;
      case 'deleteAlbum':
  
        break;
      case 'deleteTrack':
  
      break;
      default:
        break;
    }
  }

  
}