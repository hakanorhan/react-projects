import express from "express";
import RegisterUserRequest from '../interfaces/RegisterUserRequest.js'
import { pool } from "../dbConnect.js";
import { Roles } from "../enums/Roles.js";
/**
 * Insert admin.
 */
const insertUser: string =
  `INSERT INTO ${Roles.user} (name, familyname, email, password, telnr, birth) VALUES (?, ?, ?, ?, ?, ?);`;

// disable autocommit and perform transaction
async function performTransaction(requestData: RegisterUserRequest) {
    const connection = await pool.getConnection();

    try {
        // start transaction
        await connection.beginTransaction();

        // if password1 password2 matches
        await connection.execute(
            insertUser,
            [requestData.name, requestData.familyname, requestData.email, requestData.password1,
             requestData.telnr, requestData.birth]);

        await connection.commit();

        console.log("Transaction successfully committed");

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
    const requestData: RegisterUserRequest = req.body;
    performTransaction(requestData);

    console.log( "--------------- Ausgabe: " + requestData.name + " " +
         requestData.familyname + " " + requestData.email);
}