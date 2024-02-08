import bcrypt from 'bcrypt';
import passport from "passport";
import * as LocalStrategy from "passport-local";
import { pool } from "../dbConnect.js";
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
passport.use(new LocalStrategy.Strategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const connection = await pool.getConnection();
        const selectQuery = 'SELECT * FROM person WHERE email = ?';
        const queryResult = await connection.query(selectQuery, [email]);
        const result = queryResult;
        if (result[0].length === 0) {
            return;
        }
        const resultPassword = result[0][0].password;
        const emailFound = result[0][0].email;
        bcrypt.compare(password, resultPassword).then(result => {
            if (result) {
                done(null, emailFound);
                console.log('found');
            }
            else {
                done(null, false);
                console.log('not found');
            }
        });
        return;
    }
    catch (error) {
        done(error);
    }
}));
