import session from "express-session";
const sessionMiddleware = (req, res, next) => {
    return session({
        secret: "hakan1234",
        resave: false,
        saveUninitialized: false
    })(req, res, next);
};
export default sessionMiddleware;
