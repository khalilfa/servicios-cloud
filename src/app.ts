import express, { Request, Response } from "express";
import cors from "cors";
import { artistRouter } from './routes/artist.route';
import morgan from 'morgan';
import { getUNQfy, saveUNQfy } from './database/connection';
import EntityAlreadyExist from "./exceptions/entityAlreadyExist";
import EntityNotFoundError from "./exceptions/entityNotFountError";
import BadParamError from "./exceptions/badParamError";
import { albumRouter } from "./routes/album.route";
import {trackRouter} from "./routes/track.route";
import {playlistRoute} from "./routes/playlist.route";
import { nextTick } from "node:process";
import {usersRoute} from "./routes/users.route";

// App Variables
const PORT = 3000;
const app = express();

const Unqfy = getUNQfy();

// App Configuration
app.use(cors());
app.use(express.json());

// -- Log http requests
app.use(morgan('combined'));

// -- Load Unqfy data
app.locals.unqfy = Unqfy;

// -- Routes
app.use('/api', playlistRoute);
app.use('/api', trackRouter);
app.use('/api', artistRouter);
app.use('/api', albumRouter);
app.use('/api', usersRoute);



// -- Invalid URL error
app.all('*', (req, res, next) => {
  if(!res.statusCode){
    res.status(404).json({ status: 404, errorCode: "RELATED_RESOURCE_NOT_FOUND" }).end();
  } else {
    next();
  }
})

// -- Error handler
app.use((err: Error, req: Request, res: Response, next: Function) => {
  if(err instanceof EntityAlreadyExist) {
    res.status(409).json({ status: 409, errorCode: "RESOURCE_ALREADY_EXISTS" });
  } else if(err instanceof EntityNotFoundError) {
    res.status(404).json({ status: 404, errorCode: "RESOURCE_NOT_FOUND" });
  } else if(err instanceof BadParamError) {
    res.status(400).json({ status: 400, errorCode: "BAD_REQUEST" });
  } else {
    res.status(500).json({ status: 500, errorCode: "INTERNAL_SERVER_ERROR" });
  }
  
  res.end();
})

// -- Save Unqfy data
app.use(function (req, res, next) {
  saveUNQfy(app.locals.unqfy);
  next();
});


// Server Activation
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
