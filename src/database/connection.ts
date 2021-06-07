import fs from 'fs';
import UNQfy from '../unqfy';

export function getUNQfy(filename = 'data.json') {
  let unqfy = new UNQfy();
  if (fs.existsSync(filename)) {
    unqfy = UNQfy.load(filename);
  }
  return unqfy;
}

export function saveUNQfy(unqfy: any, filename = 'data.json') {
  unqfy.save(filename);
}
