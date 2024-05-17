import express from "express";
import { connectToDatabase } from "../dbConnect1.js";
import { ResultSetHeader } from "mysql2";

interface InsertTransactionResult {
    insertId: number | null,
    success: boolean,
    message: string
}

export async function insertTransaction(insertQuery: string, values: any[], res: express.Response) {

    const resultFromTransaction: InsertTransactionResult = { insertId: null, success: false, message: '' };

    let connection;
    try {
        connection = await connectToDatabase()
        await connection.beginTransaction();
            // query Brand
            const [resultBrand]: [ResultSetHeader, any] = await connection.execute(insertQuery, values);
            const insertId = resultBrand.insertId;
            console.log(insertId + ": InsertId")

            /*
            const queryResult = await connection.query(selectLastInsert);
            const result = queryResult as RowDataPacket[];
            // Brandnames
            const resultTableCell = result[0];
            */
            await connection.commit();
            
            resultFromTransaction.success = true;
            resultFromTransaction.insertId = insertId;
            resultFromTransaction.message = "Erfolgreich hinzugefügt.";
            connection.end();
            return res.status(200).json(resultFromTransaction);
        } catch(error: any) {
            let status = 0;
            if(error && error.code) {
                switch(error.code) {
                    case 'ER_DUP_ENTRY':
                        resultFromTransaction.message = 'Eintrag bereits vorhanden'
                        status = 409;
                        break;
                    case 'ER_NO_REFERENCED_ROW':
                        resultFromTransaction.message = 'Bad Request'
                        status = 400;
                        break;
                    default:
                        resultFromTransaction.message = 'Fehler aufgetreten'
                        status = 500;
                }
            }
            connection?.rollback();
            connection?.end();
            return res.status(status).json(resultFromTransaction);
        } 
}

export const insertImageName = async (imageName: string, carId: number) => {

    const insertInto: string = "INSERT INTO imagename(imagename, inserate_id) VALUES(?, ?)"

    let connection;
    try {
            connection = await connectToDatabase();
            // query Baureihe
            await connection.execute(insertInto, [imageName, carId]);
            connection.end();
            return true;
        } catch (err){
            connection?.end();
            //console.log(err);
            return false;
        }
}

export const deleteImages = async (inserateId: number) => {
    const deleteQuery: string = "DELETE FROM imagename WHERE inserate_id = ?";
    let connection;
    try {
        connection = await connectToDatabase();
        await connection.execute(deleteQuery, [ inserateId ]);
        connection.end();
    } catch(error) {
        console.log(error);
        connection?.end();
    } 
}