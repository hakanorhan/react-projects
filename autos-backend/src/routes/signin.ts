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
import passport from "./middleware/passport.middleware.js";

const selectQuery: string = 'SELECT * FROM account_data WHERE email = ?';
const selectUser: string = 'SELECT user_id from user WHERE account_data_id = ?';


export default async (req: express.Request, res: express.Response) => {
    const id = (req.user as any).id;
    const role = (req.user as any).role;
    console.log("id: " + id + "rolle: " + role);
    const authResponse: AuthResponse = { authenticated: true,  role };
    res.status(201).json( authResponse );
};


/*
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

            const authResponse: AuthResponse = {
                authenticated: true,
                role: accountRole
            }

            bcrypt.compare(password, resultPassword).then(result => {
                if(result) {
       
                    if(resultId) {
                        console.log("signin: " + "Signin success");
                        console.log("Rolle: " + authResponse.role + " Logged status: " + authResponse.authenticated);
                        req.session.isAuth = true;

                    res.status(201).json(authResponse);
                    } else {
                        authResponse.authenticated = false;
                        authResponse.role = Roles.NULL; 
                        console.log("signin: " + "Signin error");
                        return res.status(401).json({message: 'Bitte überprüfen Sie die Eingaben.'})
                    }; 
                } else {
                    authResponse.authenticated = false;
                    authResponse.role = Roles.NULL;
                    console.log("signin: " + "Signin error");
                    return res.status(401).json({message: 'Bitte überprüfen Sie die Eingaben.'});
                }
            })
      }catch (error: any) {
        // Handle any errors
        selectMysqlErrorMessages(error.code, res);
    } finally {
        connection?.release();
    }

} */