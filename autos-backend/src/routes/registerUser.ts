import express from "express";
import RegisterUserRequest from '../interfaces/RegisterUserRequest.js'
import { pool } from "../dbConnect.js";
import { Roles } from "../enums/Roles.js";
import { ResultSetHeader } from "mysql2";
import Address from "../interfaces/Address.js";

const insertAddress: string =
    'INSERT INTO address (streetnr, zipcode, city, blandid) VALUES (?, ?, ?, ?)';

/** Insert user. */
const insertPerson: string =
  `INSERT INTO ${Roles.person} (name, familyname, email, password, telnr, birth, isactive, addressid) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

const insertUser : string = `INSERT INTO ${Roles.user} (userid, iscardealer) VALUES (?, ?)`;

// disable autocommit and perform transaction
async function performTransaction(requestData: RegisterUserRequest) {
    const connection = await pool.getConnection();

    const address: Address = requestData.personinfo.address;
    const personinfo = requestData.personinfo;
    
    try {
        // start transaction
        await connection.beginTransaction();

        // if password1 password2 matches
        
        const [result]: [ResultSetHeader, any] = await connection.execute(
            insertAddress,
            [address.streetnr, address.zipcode, address.city, address.blandid]
        );

        const addressId: number = result.insertId; 
            
        await connection.execute(
            insertPerson,
            [personinfo.name, personinfo.familyname, personinfo.email, personinfo.password1,
                personinfo.telnr, personinfo.birth, personinfo.isactive, addressId]);
        
        const userId: number = result.insertId;
        
        await connection.execute(
            insertUser,
            [userId, requestData.isCardealer]
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
    const requestData: RegisterUserRequest = req.body;
    performTransaction(requestData);

    console.log( "--------------- Ausgabe: ");
}