import express, { NextFunction } from "express";
import { pool } from "../dbConnect.js";
import LoginUser from "../interfaces/LoginUser.js";
import { RowDataPacket } from "mysql2";
import bcrypt from 'bcrypt';
import { REGEX_EMAIL, REGEX_PASSWORD } from "../regex/regex.js";
import { IResponseSignInData } from "../interfaces/signin/IResponseSignInData.js";
import { createToken } from "../jwt/jwtToken.js";
import { SignInForm } from "../interfaces/IAxiosData.js";
import { AuthResponse } from "../interfaces/auth/AuthResponse.js";
import { ERROR_MESSAGE_401 } from "../enums/Messages.js";
import { Roles } from "../enums/Roles.js";
import { selectMysqlErrorMessages } from "../helper/messages.js";
import passport from "./middleware/passport.middleware.js";;

const selectQuery: string = 'SELECT * FROM account_data WHERE email = ?';
const selectUser: string = 'SELECT user_id from user WHERE account_data_id = ?';

// disable autocommit and perform transaction
async function performQuery(requestData: SignInForm, res: express.Response){

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
                    // jwt
                    const accessToken = createToken(resultId, resultEmail, accountRole);
                    // milliseconds
                    res.cookie('jwt', accessToken, { httpOnly: true, maxAge: 60 * 60 * 1000 })
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

 async (req: express.Request, res: express.Response, next: NextFunction) => {
    const requestData: SignInForm = req.body;

    passport.authenticate("local", (err: any, user: any, info: any) => {
        if(!user) {
            return res.status(401).json({ message: "Email or password not matched" })
        }

        req.login(user, error => {
            if(error) throw error;
            res.status(201).json({
                user,

            })
        })
    })

    //performQuery(requestData, res);
}


export default (req: express.Request, res: express.Response, next: NextFunction) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: "Email or password not matched" });
        }
        req.login(user, (error) => {
            if (error) {
                return next(error);
            }
            return res.status(201).json({ user });
        });
    })(req, res, next);
};