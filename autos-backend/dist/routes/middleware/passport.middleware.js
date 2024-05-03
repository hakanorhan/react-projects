import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { pool } from "../../dbConnect.js";
import { Roles } from "../../enums/Roles.js";
import bcrypt from 'bcrypt';
const findOne = async (email) => {
    console.log("findOne: " + email);
    let connection;
    try {
        connection = await pool.getConnection();
        const queryResult = await connection.query("SELECT * FROM account_data ad, user u WHERE ad.email = ? AND ad.account_data_id = u.account_data_id", [email]);
        const result = queryResult;
        const resultUserId = result[0][0].user_id;
        console.log("findOne: " + resultUserId);
        const resultPassword = result[0][0].password_secret;
        const resultEmail = result[0][0].email;
        const accountRole = result[0][0].account_role;
        const user = { id: resultUserId, email: resultEmail, password: resultPassword, role: accountRole === Roles.ADMIN ? Roles.ADMIN : Roles.USER };
        connection.release();
        return user;
    }
    catch (error) {
        console.log("findOne: " + "user nicht gefunden!");
        return null;
    }
};
const findById = async (id) => {
    console.log("findbyid: " + id);
    let connection;
    try {
        connection = await pool.getConnection();
        const queryResult = await connection.query("SELECT * FROM account_data ad, user u WHERE u.user_id = ? AND ad.account_data_id = u.account_data_id", [id]);
        const result = queryResult;
        const resultUserId = result[0][0].user_id;
        const resultPassword = result[0][0].password_secret;
        const resultEmail = result[0][0].email;
        const accountRole = result[0][0].account_role;
        const user = { id: resultUserId, email: resultEmail, password: resultPassword, role: accountRole === Roles.ADMIN ? Roles.ADMIN : Roles.USER };
        connection.release();
        return user;
    }
    catch (error) {
        console.log(error);
        return null;
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
    console.log("serialize User");
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const serializedUser = await findById(id);
        done(null, serializedUser);
    }
    catch (error) {
        done(error, null);
    }
});
export default passport;
