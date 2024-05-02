import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { pool } from "../../dbConnect.js";
import { Roles } from "../../enums/Roles.js";
import bcrypt from 'bcrypt';
const findOne = async (email) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const queryResult = await connection.query("SELECT * FROM account_data ad, user u WHERE ad.email = ? AND ad.account_data_id = u.account_data_id", [email]);
        const result = queryResult;
        const resultUserId = result[0][0].user_id;
        const resultPassword = result[0][0].password_secret;
        const resultEmail = result[0][0].email;
        const accountRole = result[0][0].account_role;
        const user = { id: resultUserId, email: resultEmail, password: resultPassword, role: accountRole === Roles.ADMIN ? Roles.ADMIN : Roles.USER };
        return user;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
const findById = async (id) => {
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
        bcrypt.compare(password, user.password).then(result => {
            if (result)
                done(null, user);
            else
                done(null, false);
        });
    }
    else {
        done(null, false, { message: "Falsche email!" });
    }
}));
passport.serializeUser((user, done) => {
    console.log("serialize User");
    const serializedUser = {
        id: user.id,
        role: user.role
    };
    done(null, serializedUser);
});
passport.deserializeUser(async (user, done) => {
    const serializedUserObject = {
        id: user.id,
        role: user.role
    };
    try {
        const serializedUser = await findById(serializedUserObject.id);
        done(null, serializedUser);
    }
    catch (error) {
        done(error, null);
    }
});
export default passport;
