import express from "express";
import { pool } from "../dbConnect.js";
import ISignUpUser from "../interfaces/ISignUpUser.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import SignUpUser from "../interfaces/ISignUpUser.js";

import { genSaltSync, hashSync } from 'bcrypt';
import { Roles } from "../enums/Roles.js";
import { REGEX_EMAIL, REGEX_PASSWORD } from "../regex/Regex.js";

const insertPerson: string =
        `INSERT INTO ${Roles.person} (name, familyname, email, password, role) VALUES (?, ?, ?, ?, ?);`;

const insertUser: string = 
        `INSERT INTO ${Roles.user} (userid, iscardealer) VALUES(?, ?)`;

// disable autocommit and perform transaction
async function performQuery(requestData: ISignUpUser, res: express.Response){
    const {name, familyname, email, password, password2, isCarDealer} = requestData;
    
    if(!email.match(REGEX_EMAIL)) {
        return console.log("Email not matches");
    }

    if(!password.match(REGEX_PASSWORD)) {
        return console.log("Password not matches")
    }

    const connection = await pool.getConnection();
    try {
        console.log("is cardealer " + isCarDealer)
        // start transaction
        await connection.beginTransaction();

        // Exists email
        const selectQuery = 'SELECT email FROM person WHERE email = ?';
        const queryResult = await connection.query(selectQuery, [email]);
        const result = queryResult as RowDataPacket[];
        
        if(result[0].length === 1) {
            console.log(result[0]);
            return;
        }

        // passwort not matches, process password matches is used in frontend for better user experience
        if(password !== password2) {
            return;
        }
        //console.log(result[0][0].email);
        
        // hash password
        const salt = genSaltSync(10);
        const hash = hashSync(password, salt);


        // insert into user
        const [resultPerson]: [ResultSetHeader, any] = await connection.execute(
            insertPerson,
            [name, familyname, email, hash, Roles.user]);
        
        const userId: number = resultPerson.insertId;
        
        const [resultUser]: [ResultSetHeader, any] = await connection.execute(
            insertUser,
            [userId, isCarDealer]);
        
        await connection.commit();

    } catch(err) {
        // rollback
        await connection.rollback();
        console.log("Rollback!!");
        throw err;
    } finally {
        // release connection
        connection.release();
    }
}

export default async (req: express.Request, res: express.Response) => {
    const requestData: SignUpUser = req.body;
    performQuery(requestData, res);
}