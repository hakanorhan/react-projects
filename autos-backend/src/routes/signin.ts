import express from "express";
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

const selectQuery: string = 'SELECT * FROM account_data WHERE email = ?';

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
                const authResponse: AuthResponse = { authenticated: false, role: null, errorMessage: ERROR_MESSAGE_401 }
                return res.status(401).json( authResponse );
            }

            // Email found, select hashed password
            const resultId = result[0][0].account_data_id;
            const resultPassword = result[0][0].password_secret;
            const resultEmail = result[0][0].email;
            const accountRole = result[0][0].account_role;

            bcrypt.compare(password, resultPassword).then(result => {
                if(result) {

                    const authResponse: AuthResponse = {
                        authenticated: true,
                        role: accountRole
                    }

                    // jwt
                    const accessToken = createToken(resultId, resultEmail, accountRole);
                    // milliseconds
                    res.cookie('jwt', accessToken, { httpOnly: true, maxAge: 60 * 60 * 1000 })
                    res.status(200).json(authResponse);
                } else {
                    return res.status(401).json({message: 'Bitte überprüfen Sie die Eingaben.'});
                }
            })
      }catch (error) {
        // Handle any errors
        return res.status(500).json({message:'Error occured. Please try again.'});
    } finally {
        connection?.release();
    }
    
}

export default async (req: express.Request, res: express.Response) => {
    const requestData: SignInForm = req.body;
    performQuery(requestData, res);

}