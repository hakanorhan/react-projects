import express from "express";
import { pool } from "../dbConnect.js";
import LoginUser from "../interfaces/LoginUser.js";
import { RowDataPacket } from "mysql2";
import bcrypt from 'bcrypt';
import { REGEX_EMAIL, REGEX_PASSWORD } from "../regex/Regex.js";

const selectQuery: string = 'SELECT * FROM person WHERE email = ?';


// disable autocommit and perform transaction
async function performQuery(requestData: LoginUser, res: express.Response){

    const { email, password } = requestData;
    const connection = await pool.getConnection();
    try {

            if(!email.match(REGEX_EMAIL || !password.match(REGEX_PASSWORD))) {
                return console.log("Email or password not matches")
            }
            
            // query Email
            const queryResult = await connection.query(selectQuery, [email]);
            const result = queryResult as RowDataPacket[];
            
            // Email not found
            if(result[0].length === 0) {
                console.log("Email not found")
                return;
            }

            // Email found, select hashed password
            const resultPassword = result[0][0].password;
    
            bcrypt.compare(password, resultPassword).then(result => {
                if(result) {
                
                  console.log('password matches')
                } else {
                  console.log('password do not matches')
                }
            })
    
    
      }catch (error) {
        // Handle any errors
        console.error('Error fetching user:', error);
    } finally {
        connection.release();
    }
    
}

export default async (req: express.Request, res: express.Response) => {
    const requestData: LoginUser = req.body;
    performQuery(requestData, res);

}