import express from "express";
import RegisterAdminRequest from '../interfaces/RegisterAdminRequest.js'
import { pool } from "../dbConnect.js";
import { Roles } from "../enums/Roles.js";
/**
 * Insert admin.
 */
const insertUser: string =
  `INSERT INTO ${Roles.admin} (persnr, name, familyname, email, password, grantpubliccar, grantcreateadmin, grantall, createdbyadminid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;

// disable autocommit and perform transaction
async function performTransaction(requestData: RegisterAdminRequest) {
    const connection = await pool.getConnection();

    const address = requestData.personinfo.address;
    
    try {
        // start transaction
        await connection.beginTransaction();

        // if password1 password2 matches
        await connection.execute(
            insertUser,
            []);

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
    const requestData: RegisterAdminRequest = req.body;
    performTransaction(requestData);

    console.log( "--------------- Ausgabe: ");
}