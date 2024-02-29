import express from "express";
import { pool } from "../dbConnect.js";
import LoginUser from "../interfaces/LoginUser.js";
import { RowDataPacket } from "mysql2";
import bcrypt from 'bcrypt';
import { REGEX_EMAIL, REGEX_PASSWORD } from "../regex/regex.js";
import { IResponseSignInData } from "../interfaces/signin/IResponseSignInData.js";
import { createToken } from "../jwt/jwtToken.js";

const selectQuery: string = 'SELECT * FROM person WHERE email = ?';


// disable autocommit and perform transaction
async function performQuery(requestData: LoginUser, res: express.Response){

    const { email, password } = requestData;
    let connection;

    console.log("Ausgabe: " + email.match(REGEX_EMAIL) + " " + password.match(REGEX_PASSWORD))
    
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
                console.log("emal not found")
                return res.status(401).json({message: 'Wrong email address or password'});
            }

            // Email found, select hashed password
            const resultPassword = result[0][0].password;
            const resultPersonId = result[0][0].personid;
            const resultName = result[0][0].name;
            const resultRole = result[0][0].role;

            bcrypt.compare(password, resultPassword).then(result => {
                if(result) {

                    // create Access Token
                    const responseSignInData: IResponseSignInData = {
                        personId: resultPersonId,
                        name: resultName,
                        role: resultRole
                    }
                    // jwt
                    const accessToken = createToken(resultPersonId);
                    // milliseconds
                    res.cookie('jwt', accessToken, { httpOnly: true, maxAge: 60 * 60 * 1000 })
                    res.status(201).send(responseSignInData);
                } else {
                    return res.status(401).json({message: 'Wrong email address or password'});
                }
            })
      }catch (error) {
        // Handle any errors
        return res.status(500).json({message:'Error occured. Please try again.'})
    } finally {
        connection?.release();
    }
    
}

export default async (req: express.Request, res: express.Response) => {
    const requestData: LoginUser = req.body;
    performQuery(requestData, res);

}