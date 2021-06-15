import express, { Request, Response } from "express";
import BadParamError from "../exceptions/badParamError";
import {createUser, deleteUser, getUser, setUnqfy, updateUser} from "../services/users.service";
import User from "../model/user";

export const usersRoute = express.Router();

usersRoute.use(async (req: Request, res: Response, next: Function) => {
    let { unqfy } = req.app.locals;
    setUnqfy(unqfy);
    next();
});

usersRoute.post('/user', async (req: Request, res: Response, next: Function) => {
    try {
        let { username } = req.body;

        if(!username) throw new BadParamError(['username']);

        let user: User = createUser(username);

        res.status(201).json(user);

        next();
    } catch(err) { next(err) }
});

usersRoute.get('/user/:id', async (req: Request, res: Response, next: Function) => {
    try {
        let { id } = req.params;

        let user: User = getUser(id);

        res.status(201).json(user);

        next();
    } catch(err) { next(err) }
});

usersRoute.patch('/user/:id', async (req: Request, res: Response, next: Function) => {
    try {
        let { id } = req.params;
        let { username } = req.body;

        if(!username) throw new BadParamError(['username']);

        let user: User = updateUser(id, username);

        res.status(200).json(user);

        next();
    } catch(err) { next(err) }
});

usersRoute.delete('/user/:id', async (req: Request, res: Response, next: Function) => {
    try {
        let { id } = req.params;

        deleteUser(id);

        res.status(204).send('Usuario eliminado con exito');

        next();
    } catch(err) { next(err) }
});
