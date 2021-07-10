"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoute = void 0;
const express_1 = __importDefault(require("express"));
const badParamError_1 = __importDefault(require("../exceptions/badParamError"));
const users_service_1 = require("../services/users.service");
exports.usersRoute = express_1.default.Router();
exports.usersRoute.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { unqfy } = req.app.locals;
    users_service_1.setUnqfy(unqfy);
    next();
}));
exports.usersRoute.post('/user', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { username } = req.body;
        if (!username)
            throw new badParamError_1.default(['username']);
        let user = users_service_1.createUser(username);
        res.status(201).json(user);
        next();
    }
    catch (err) {
        next(err);
    }
}));
exports.usersRoute.get('/user/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        let user = users_service_1.getUser(id);
        res.status(201).json(user);
        next();
    }
    catch (err) {
        next(err);
    }
}));
exports.usersRoute.patch('/user/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        let { username } = req.body;
        if (!username)
            throw new badParamError_1.default(['username']);
        let user = users_service_1.updateUser(id, username);
        res.status(200).json(user);
        next();
    }
    catch (err) {
        next(err);
    }
}));
exports.usersRoute.delete('/user/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        users_service_1.deleteUser(id);
        res.status(204).send('Usuario eliminado con exito');
        next();
    }
    catch (err) {
        next(err);
    }
}));
exports.usersRoute.post('/user/:userid/:trackid', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { userid, trackid } = req.params;
        users_service_1.listenTrack(userid, trackid);
        res.status(200);
        next();
    }
    catch (err) {
        next(err);
    }
}));
exports.usersRoute.get('/user/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        let listened = users_service_1.getListeneds(id);
        res.status(201).json(listened);
        next();
    }
    catch (err) {
        next(err);
    }
}));
exports.usersRoute.get('/user/:userid/:trackid', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { userid, trackid } = req.params;
        let listens = users_service_1.howManyListens(userid, trackid);
        res.status(201).json(listens);
        next();
    }
    catch (err) {
        next(err);
    }
}));
//# sourceMappingURL=users.route.js.map