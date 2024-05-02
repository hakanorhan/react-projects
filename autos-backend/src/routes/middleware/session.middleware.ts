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

sessionStore.setMaxListeners(5);

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
        res.status(401).json({ message: "Not austhenticated!" });
    }
}

export default sessionMiddleware;