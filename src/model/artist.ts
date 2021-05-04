import { generateId } from '../utils/utils';

export default class Artist {
  private _id: string;
  private _name: string;
  private _country: string;


  constructor(name: string, country: string) {
    this._id = generateId();
    this._name = name;
    this._country = country;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get country(): string {
    return this._country;
  }

  set country(value: string) {
    this._country = value;
  }
}
