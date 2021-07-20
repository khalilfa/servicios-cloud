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
import {usersRoute} from "./routes/users.route";
import RelatedEntityNotFound from "./exceptions/relatedEntityNotFound";
import { LogginObserver, NewsletterObserver } from "./observer";


// App Variables
const PORT = 5000;
const app = express();

const Unqfy = getUNQfy();

// App Configuration
app.use(cors());

app.use(express.json());

// -- Log http requests
app.use(morgan('combined'));

// -- Observer
const newsletterObserver = new NewsletterObserver('newsletter');
const loggerObserver = new LogginObserver('logger');

Unqfy.subscribe(loggerObserver);
Unqfy.subscribe(newsletterObserver);

// -- Load Unqfy data
app.locals.unqfy = Unqfy;

app.use((req, res, next) => {
  res.status(888);
  next();
})

// -- Routes
app.use('/api', artistRouter);
app.use('/api', playlistRoute);
app.use('/api', trackRouter);
app.use('/api', albumRouter);
app.use('/api', usersRoute);


// console.log(listEndpoints(app));
// -- Invalid URL error
app.all('*', (req, res, next) => {
  if(res.statusCode === 888) res.status(404).json({ status: 404, errorCode: "RESOURCE_NOT_FOUND" }).end();
})



// -- Error handler
app.use((err: Error, req: Request, res: Response, next: Function) => {
  if(err instanceof EntityAlreadyExist) {
    res.status(409).json({ status: 409, errorCode: "RESOURCE_ALREADY_EXISTS" });
  } else if(err instanceof EntityNotFoundError) {
    res.status(404).json({ status: 404, errorCode: "RESOURCE_NOT_FOUND" });
  } else if(err instanceof BadParamError || err instanceof SyntaxError) {
    res.status(400).json({ status: 400, errorCode: "BAD_REQUEST" });
  } else if(err instanceof RelatedEntityNotFound) {
    res.status(404).json({ status: 404, errorCode: 'RELATED_RESOURCE_NOT_FOUND' });
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
