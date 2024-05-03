import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import { NextFunction, Request, Response } from 'express';
import session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
import { pool } from '../../dbConnect.js';

const sessionStore: any = new MySQLStore({
    clearExpired: true,
    checkExpirationInterval: 447_000_000, 
    expiration: 150_000_000,
    
    createDatabaseTable: true // create table if not exists
}, pool);


/*
const sessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
     session({
        secret: "secret", // TODO: .env
        resave: false,
        saveUninitialized: false,
        store: sessionStore
    })(req, res, next);;

};
*/
const sessionMiddleware = session({
    secret: "secret", // TODO: .env
        resave: false,
        saveUninitialized: false,
        store: sessionStore
});

export const sessionAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.session.isAuth)
    if(req.session.isAuth) {
        
        next();
    } else {
        res.status(401).json({ message: "Nicht authentifiziert!" });
    }
}

export function addConnectListener() {
    if (!sessionStore.listenerCount('connect')) {
        sessionStore.on('connect', () => {
        });
    }
}

export function addDisconnectListener() {
    if (!sessionStore.listenerCount('disconnect')) {
        sessionStore.on('disconnect', () => {
        });
    }
}

export default sessionMiddleware;