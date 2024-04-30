import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import { NextFunction, Request, Response } from 'express';
import session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
import { pool } from '../../dbConnect.js';

const sessionStore: any = new MySQLStore({
    clearExpired: true,
    checkExpirationInterval: 5_000, // 5 sekunden
    expiration: 15_000,
    createDatabaseTable: true // create table if not exists
}, pool);

const sessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
    return session({
        secret: "secret", // TODO: .env
        resave: false,
        saveUninitialized: false,
        store: sessionStore
    })(req, res, next);
};

export default sessionMiddleware;