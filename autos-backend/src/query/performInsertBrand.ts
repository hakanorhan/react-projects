import { pool } from "../dbConnect.js";
import { REGEX_NAMES } from "../regex/regex.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import express from "express";

// disable autocommit and perform transaction
export default async function performInsert(requestData: string, res: express.Response, insertQuery: string, selectQuery: string){

    const insertValue  = requestData;
    
    // Email or password aren't valid
    if(!REGEX_NAMES.test(insertValue)) {
        return res.status(401).json({message: 'Bitte Marke korrigieren'})
    }

    let connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
            // query Brand
            const [resultBrand]: [ResultSetHeader, any] = await connection.execute(insertQuery, [insertValue]);
            const insertId = resultBrand.insertId;
            console.log(insertId + ": InsertId")
            /*
            const [resultPerson]: [ResultSetHeader, any] = await connection.execute(
            SignupStatements.insertPerson,
            [name, familyname, email, hash, Roles.USER]);
        
        const userId: number = resultPerson.insertId;
            */

            const queryResult = await connection.query(selectQuery);
            const result = queryResult as RowDataPacket[];


            // Brandnames
            const resultTableCell = result[0];

            console.log(resultTableCell);

            await connection.commit();
                
            return res.status(200).json({ message: 'Erfolgreich hinzugefügt', tableValues: resultTableCell, insertId: insertId })
        } catch {
            connection.rollback();
            return res.status(500).json({ message: `${insertValue} existiert bereits` });
        } finally {
            connection.release();
        }
};