import { generateId } from '../utils/utils';

export default class Artist {
  private id: string;
  private name: string;
  private country: string;


  constructor(name: string, country: string) {
    this.id = generateId();
    this.name = name;
    this.country = country;
  }

  public getId() { return this.id; }

  public getName() { return this.name; }

}
