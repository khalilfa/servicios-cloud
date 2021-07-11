import express from "express";

import BadParamError from "../exceptions/badParamError";
import EntityNotFoundError from "../exceptions/entityNoyFoundError";
import { addSubscription, existArtist } from "../services/subscription.service";
import { existParams } from "../utils/utils";

export const subscriptionRouter = express.Router();

// Subscribe user
subscriptionRouter.post('/subscribe', async (req, res, next) => {
  try{
    const validParams = ['artistId', 'email'];
    if(!existParams(validParams, req.body)) throw new BadParamError(validParams);

    const artistId = req.body.artistId;
    const email = req.body.email;

    const existArtist = await existArtist(artistId);
    if(!existArtist) throw new EntityNotFoundError('Artist', artistId);

    req.locals.subscriptions = addSubscription(email, artistId, req.locals.subscriptions);

    res.status(200).json({});
    next();
  } catch(err) { next(err) }
});