const utils = require('../utils/utils');

class Artist {
  private id: string;
  private name: string;
  private country: string;
  private albums: Album[];
  private tracks: Track[]; 

  constructor(name: string, country: string) {
    this.id = utils.generateId();
    this.name = name;
    this.country = country;
    this.albums = [];
    this.tracks = [];
  }

  get getId() { return this.id; }

}

module.exports = Artist;