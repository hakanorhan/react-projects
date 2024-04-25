import express from "express";
import { pool } from "../dbConnect.js";
import LoginUser from "../interfaces/LoginUser.js";
import { RowDataPacket } from "mysql2";
import bcrypt from 'bcrypt';
import { REGEX_EMAIL, REGEX_PASSWORD } from "../regex/regex.js";
import { IResponseSignInData } from "../interfaces/signin/IResponseSignInData.js";
import { createToken } from "../jwt/jwtToken.js";
import { SignInForm } from "../interfaces/IAxiosData.js";
import { CONSOLE_DEV } from "../globalConfig.js";

const selectQuery: string = 'SELECT email FROM account_data WHERE email = ?';

// disable autocommit and perform transaction
async function performQuery(requestData: string, res: express.Response){

    let connection;
    console.log("value: " + requestData);
    
    // Email or password aren't valid
    if(!REGEX_EMAIL.test(requestData)) {
        return res.status(401).json({message: 'Email ist nicht vaide'})
    }

    try {
        connection = await pool.getConnection();
            
            // query Email
            const queryResult = await connection.query(selectQuery, [requestData]);
            const result = queryResult as RowDataPacket[];
            
            // Email not found
            if(result[0].length === 0) {
                return res.status(200).json({message: 'Email ist verfügbar.'});
            } else {
                return res.status(401).json({message: 'Email ist bereits vorhanden.'});    
            }

      }catch (error) {
        // Handle any errors
        return res.status(500).json({message:'Interner Server Fehler. Bitte versuchen Sie es später erneut.'});
    } finally {
        connection?.release();
    }
    
}

export default async (req: express.Request, res: express.Response) => {
    const { value } = req.body;
    performQuery(value, res);

}