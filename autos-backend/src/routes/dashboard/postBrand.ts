import express from "express";
import { pool } from "../../dbConnect.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { insertMysqlErrorMessages } from "../../helper/messages.js";
const insertIntoBrand: string = "INSERT INTO brand (brand) VALUES (?)";
const selectBrandQuery: string = "SELECT * FROM brand";

export default async (req: express.Request, res: express.Response) => {
    const { value } = req.body;

    let connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
            // query Brand
            const [resultBrand]: [ResultSetHeader, any] = await connection.execute(insertIntoBrand, [value]);
            const insertId = resultBrand.insertId;

            const queryResult = await connection.query(selectBrandQuery);
            const result = queryResult as RowDataPacket[];

            // Brandnames
            const resultTableCell = result[0];

            await connection.commit();
            console.log(resultTableCell)
            return res.status(200).json({ message: 'Erfolgreich hinzugefügt', tableValues: resultTableCell, insertId: insertId })
        } catch (error: any){
            connection.rollback();
            insertMysqlErrorMessages(error.errno, res);
            
        } finally {
            connection.release();
        }

}