import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const session = __require("express-session");
const MySQLStore = require('express-mysql-session')(session);
import { connectToDatabase } from '../../dbConnect1.js';
const sessionStore = new MySQLStore({
    clearExpired: true,
    checkExpirationInterval: 3000,
    expiration: 12000,
    createDatabaseTable: true
}, connectToDatabase);
const sessionMiddleware = session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore
});
export const sessionAuthMiddleware = (req, res, next) => {
    if (req.session.isAuth) {
        console.log("sessionauth middleware!");
        next();
    }
    else {
        res.status(401).json({ message: "Nicht authentifiziert!" });
    }
};
