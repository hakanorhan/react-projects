import express from "express";
import { pool } from "../../dbConnect.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
const insertIntoBrand: string = "INSERT INTO brands (brand) VALUES (?)";
const selectBrandQuery: string = "SELECT * FROM brands";

export default async (req: express.Request, res: express.Response) => {
    const { value } = req.body;
    console.log(value + " writeBrand.ts")

    let connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
            // query Brand
            const [resultBrand]: [ResultSetHeader, any] = await connection.execute(insertIntoBrand, [value]);
            const insertId = resultBrand.insertId;
            console.log(insertId + ": InsertId")


            const queryResult = await connection.query(selectBrandQuery);
            const result = queryResult as RowDataPacket[];


            // Brandnames
            const resultTableCell = result[0];

            console.log(resultTableCell);

            await connection.commit();
                
            return res.status(200).json({ message: 'Erfolgreich hinzugefügt', tableValues: resultTableCell, insertId: insertId })
        } catch {
            connection.rollback();
            return res.status(500).json({ message: `${value} existiert bereits` });
        } finally {
            connection.release();
        }

}