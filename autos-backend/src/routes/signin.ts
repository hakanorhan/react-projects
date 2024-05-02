import express, { NextFunction } from "express";
import { Roles } from "../enums/Roles.js";
import { REGEX_EMAIL, REGEX_PASSWORD } from "../regex/regex.js";
import { SignInForm } from "../interfaces/IAxiosData.js";
import { pool } from "../dbConnect.js";
import { RowDataPacket } from "mysql2";
import { ERROR_MESSAGE_401 } from "../enums/Messages.js";
import { AuthResponse } from "../interfaces/auth/AuthResponse.js";
import bcrypt from 'bcrypt';
import { selectMysqlErrorMessages } from "../helper/messages.js";

const selectQuery: string = 'SELECT * FROM account_data WHERE email = ?';
const selectUser: string = 'SELECT user_id from user WHERE account_data_id = ?';

/*
export default (req: express.Request, res: express.Response, next: NextFunction) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
        // Fehler beim Authentifizieren
        if (err) {
            return res.status(500).json({ message: "Internal server error" });
        }
        // Benutzer nicht gefunden oder falsches Passwort
        if (!user) {
            return res.status(401).json({ message: "Email or password not matched" });
        }
        // Erfolgreiche Authentifizierung
        req.login(user, (error) => {
            if (error) {
                return res.status(500).json({ message: "Internal server error" });
            }
            // Rollenprüfung und Antwort senden
            const role = user.role === 'admin' ? 'admin' : 'user';
            const userInformation = { id: user.id, authenticated: true, role };
            return res.status(201).json(userInformation);
        });
    })(req, res, next);
};
*/

export default async (req: express.Request, res: express.Response) => {
    const requestData: SignInForm = req.body;

    const { email, password } = requestData;
    let connection;
    
    // Email or password aren't valid
    if(!REGEX_EMAIL.test(email) && !REGEX_PASSWORD.test(password)) {
        return res.status(401).json({message: 'Password or email invalid Server'})
    }

    try {
        connection = await pool.getConnection();
            
            // query Email
            const queryResult = await connection.query(selectQuery, [email]);
            const result = queryResult as RowDataPacket[];
            
            // Email not found
            if(result[0].length === 0) {
                const authResponse: AuthResponse = { authenticated: false, role: Roles.NULL, errorMessage: ERROR_MESSAGE_401 }
                return res.status(401).json( authResponse );
            }

            // Email found, select hashed password
            const accountDataId = result[0][0].account_data_id;
            const resultPassword = result[0][0].password_secret;
            const resultEmail = result[0][0].email;
            const accountRole = result[0][0].account_role;

            const queryUserId = await connection.query(selectUser, [accountDataId]);
            const resultUser = queryUserId as RowDataPacket[];
            const resultId = resultUser[0][0].user_id;


            bcrypt.compare(password, resultPassword).then(result => {
                if(result) {

                    const authResponse: AuthResponse = {
                        authenticated: true,
                        role: accountRole
                    }
                    if(resultId) {
                    
                        req.session.isAuth = true;

                    res.status(200).json(authResponse);
                    } else return res.status(401).json({message: 'Bitte überprüfen Sie die Eingaben.'}); 
                } else {
                    return res.status(401).json({message: 'Bitte überprüfen Sie die Eingaben.'});
                }
            })
      }catch (error: any) {
        // Handle any errors
        selectMysqlErrorMessages(error.code, res);
    } finally {
        connection?.release();
    }

}