import express from "express";
import { pool } from "../dbConnect.js";
import LoginUser from "../interfaces/LoginUser.js";
import { RowDataPacket } from "mysql2";
import bcrypt from 'bcrypt';
import { REGEX_EMAIL, REGEX_PASSWORD } from "../regex/regex.js";

import jwt from 'jsonwebtoken';
import { IResponseSignInData } from "../interfaces/signin/IResponseSignInData.js";

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
            const resultEmail = result[0][0].email;
            const resultPersonId = result[0][0].personid;
            const name = result[0][0].name;

            bcrypt.compare(password, resultPassword).then(result => {
                if(result) {

                    // create Access Token
                    const accesToken = jwt.sign(resultEmail, "secret");
                    const responseSignInData: IResponseSignInData = {
                        personId: resultPersonId,
                        name: name,
                        email: resultEmail,
                        accesToken: accesToken
                    }
                  return res.status(200).send(responseSignInData);
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