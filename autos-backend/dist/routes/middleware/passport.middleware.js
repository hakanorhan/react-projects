import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { connectToDatabase } from "../../dbConnect.js";
import { Roles } from "../../constants/values.js";
import bcrypt from 'bcrypt';
import * as ValidHelper from '../../helper/validHelper.js';
const findOne = async (email) => {
    let connection;
    if (!ValidHelper.formularEmailValid(email)) {
        return null;
    }
    else {
        try {
            connection = await connectToDatabase();
            const queryResult = await connection.query("SELECT * FROM account_data ad, user u WHERE ad.email = ? AND ad.account_data_id = u.account_data_id", [email]);
            const result = queryResult;
            const resultUserId = result[0][0].user_id;
            const resultPassword = result[0][0].password_secret;
            const resultEmail = result[0][0].email;
            const accountRole = result[0][0].account_role;
            const user = { id: resultUserId, email: resultEmail, password: resultPassword, role: accountRole === Roles.ADMIN ? Roles.ADMIN : Roles.USER };
            connection.end();
            return user;
        }
        catch (error) {
            connection?.end();
            return null;
        }
    }
};
const findById = async (id) => {
    let connection;
    if (!ValidHelper.formularIsNumber(id)) {
        return null;
    }
    else {
        try {
            connection = await connectToDatabase();
            const queryResult = await connection.query("SELECT * FROM account_data ad, user u WHERE u.user_id = ? AND ad.account_data_id = u.account_data_id", [id]);
            const result = queryResult;
            const resultUserId = result[0][0].user_id;
            const resultPassword = result[0][0].password_secret;
            const resultEmail = result[0][0].email;
            const accountRole = result[0][0].account_role;
            const user = { id: resultUserId, email: resultEmail, password: resultPassword, role: accountRole === Roles.ADMIN ? Roles.ADMIN : Roles.USER };
            connection.end();
            return user;
        }
        catch (error) {
            console.log(error);
            connection?.end();
            return null;
        }
    }
};
passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
}, async (email, password, done) => {
    const user = await findOne(email);
    if (user) {
        console.log("User ist registriert");
        bcrypt.compare(password, user.password).then(result => {
            if (result) {
                done(null, user);
            }
            else
                done(null, false);
        });
    }
    else {
        console.log("findOne ->Local-Strategy: user nicht gefunden!");
        done(null, false, { message: "Falsche email!" });
    }
}));
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const serializedUser = await findById(id);
        if (serializedUser)
            done(null, serializedUser);
        else
            done(null, false);
    }
    catch (error) {
        done(error, null);
    }
});
export const authMiddelware = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.status(401).json({ message: "Nicht authentifiziert." });
    }
};
export default passport;
