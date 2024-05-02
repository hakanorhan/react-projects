import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const session = __require("express-session");
const MySQLStore = require('express-mysql-session')(session);
import { pool } from '../../dbConnect.js';
const sessionStore = new MySQLStore({
    clearExpired: true,
    checkExpirationInterval: 447000000,
    expiration: 150000000,
    createDatabaseTable: true
}, pool);
sessionStore.setMaxListeners(5);
const sessionMiddleware = session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore
});
export const sessionAuthMiddleware = (req, res, next) => {
    console.log(req.session.isAuth);
    if (req.session.isAuth) {
        next();
    }
    else {
        res.status(401).json({ message: "Not austhenticated!" });
    }
};
export default sessionMiddleware;
