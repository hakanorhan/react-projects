import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const session = __require("express-session");
const MySQLStore = require('express-mysql-session')(session);
import { connectToDatabase } from '../../dbConnect1.js';
const sessionStore = new MySQLStore({
    clearExpired: true,
    checkExpirationInterval: 447000000,
    expiration: 150000000,
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
export function addConnectListener() {
    if (!sessionStore.listenerCount('connect')) {
        console.log("Add connection listener!");
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
