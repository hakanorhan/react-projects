import express from "express";
import RegisterAdminRequest from '../interfaces/RegisterAdminRequest.js'
import { pool } from "../dbConnect.js";
import { Roles } from "../enums/Roles.js";
import { ResultSetHeader } from "mysql2";

const insertAddress: string =
    'INSERT INTO address (streetnr, zipcode, city, blandid) VALUES (?, ?, ?, ?)';

    /** insert admin. */
const insertPerson: string =
  `INSERT INTO ${Roles.person} (name, familyname, email, password, telnr, birth, isactive, addressid) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

const insertAdmin: string = 
    `INSERT INTO ${Roles.admin} (adminid) VALUES(?)`;

const insertWhoCreateDelete: string = `INSERT INTO whocreatedeletedemployee (personid, createdfrom)
    VALUES (?, ?)`; 

// disable autocommit and perform transaction
async function performTransaction(requestData: RegisterAdminRequest) {
    const connection = await pool.getConnection();

    const person = requestData.personinfo;
    const address = requestData.personinfo.address;
    const whoCreateDelete = requestData.whoCreateDelete;
    
    try {
        // start transaction
        await connection.beginTransaction();

        // if password1 password2 matches
        const [resultAddress]: [ResultSetHeader, any] = await connection.execute(
            insertAddress,
            [address.streetnr, address.zipcode, address.city, address.blandid]);

        const addressId = resultAddress.insertId;

        // if password1 password2 matches
        const [resultAdmin]: [ResultSetHeader, any] = await connection.execute(
            insertPerson,
            [person.name, person.familyname, person.email, person.password1, person.telnr,
                person.birth, person.isactive, addressId]);


        const newAdminId = resultAdmin.insertId;
        await connection.execute(
            insertAdmin,
            [newAdminId]
        );
        
        await connection.execute(
            insertWhoCreateDelete,
            [newAdminId, whoCreateDelete.createdFrom]
        );

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