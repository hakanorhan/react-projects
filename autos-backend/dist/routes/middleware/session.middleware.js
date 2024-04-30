import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const session = __require("express-session");
const MySQLStore = require('express-mysql-session')(session);
import { pool } from '../../dbConnect.js';
const sessionStore = new MySQLStore({
    clearExpired: true,
    checkExpirationInterval: 900000,
    expiration: 86400000,
    createDatabaseTable: true
}, pool);
const sessionMiddleware = (req, res, next) => {
    return session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        store: sessionStore
    })(req, res, next);
};
export default sessionMiddleware;
