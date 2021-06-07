import express from "express";
import cors from "cors";
import { artistRouter } from './routes/artist.route';
import morgan from 'morgan';
import { getUNQfy, saveUNQfy } from './database/connection';

// App Variables
const PORT: number = 3000;
const app = express();

// App Configuration
app.use(cors());
app.use(express.json());

// -- Log http requests
app.use(morgan('combined'));

// -- Load Unqfy data
const Unqfy = getUNQfy();
app.locals.unqfy = Unqfy;

// -- Routes
app.use('/api', artistRouter);

// -- Save Unqfy data
app.use(function (req, res, next) {
  saveUNQfy(app.locals.unqfy);
  next();
});

// Server Activation
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
