import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import EntityAlreadyExist from '../exceptions/entityAlreadyExist';

export const generateId: (() => string) = () => uuidv4();

export const maganeError = (err: Error, req: Request, res: Response, next: Function) => {
  if(err instanceof EntityAlreadyExist)
    res.status(409).json({ status: 409, errorCode: "RESOURCE_ALREADY_EXISTS" });
  
  res.end();
}