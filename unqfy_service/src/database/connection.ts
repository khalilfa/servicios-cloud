import fs from 'fs';
import UNQfy from '../unqfy';

export function getUNQfy(filename = 'data.json') {
  console.log('Se carga el archivo');
  let unqfy = new UNQfy();
  if (fs.existsSync(filename)) {
    unqfy = UNQfy.load(filename);
  }
  return unqfy;
}

export function saveUNQfy(unqfy: any, filename = 'data.json') {
  unqfy.save(filename);
}
