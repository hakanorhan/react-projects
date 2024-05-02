import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { pool } from "../../dbConnect.js";
import { RowDataPacket } from "mysql2";
import { Roles } from "../../enums/Roles.js";
import bcrypt from 'bcrypt';

export interface User {
    id: number,
    email: string,
    password: string,
    role: Roles
}

const findOne = async (email: string): Promise<User | null> => {
    let connection;
    try {
        connection = await pool.getConnection();
        const queryResult = await connection.query("SELECT * FROM account_data ad, user u WHERE ad.email = ? AND ad.account_data_id = u.account_data_id", [email]);
        const result = queryResult as RowDataPacket[];
        const resultUserId = result[0][0].user_id;
        const resultPassword = result[0][0].password_secret;
        const resultEmail = result[0][0].email;
        const accountRole = result[0][0].account_role;

        const user: User = { id: resultUserId, email: resultEmail, password: resultPassword, role: accountRole === Roles.ADMIN ? Roles.ADMIN : Roles.USER }

        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const findById = async (id:number): Promise<User | null> => {
    let connection;
    try {
        connection = await pool.getConnection();
        const queryResult = await connection.query("SELECT * FROM account_data ad, user u WHERE u.user_id = ? AND ad.account_data_id = u.account_data_id", [id]);
        const result = queryResult as RowDataPacket[];
        const resultUserId = result[0][0].user_id;
        const resultPassword = result[0][0].password_secret;
        const resultEmail = result[0][0].email;
        const accountRole = result[0][0].account_role;

        const user: User = { id: resultUserId, email: resultEmail, password: resultPassword, role: accountRole === Roles.ADMIN ? Roles.ADMIN : Roles.USER }

        return user;
    } catch (error) {
        console.log(error)
        return null;
    }
}

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
},
    async (email, password, done) => {
        const user = await findOne(email);
        // if user with email exist
        if (user) {
            bcrypt.compare(password, user.password).then(result => {
                if (result) done(null, user);
                else done(null, false);
            })
        } else {
            done(null, false, { message: "Falsche email!" });
        }
    }
));

passport.serializeUser((user: any, done) => {
    console.log("serialize User");
    const serializedUser = {
        id: user.id,
        role: user.role
    }
    done(null, serializedUser);
});

passport.deserializeUser(async (user: any, done: any) => {
    
    const serializedUserObject = {
        id: user.id,
        role: user.role
    }
    
    try {
    const serializedUser: User | null = await findById( serializedUserObject.id );
    done(null, serializedUser);
    } catch(error) {
        done(error, null);
    }
});

export default passport;