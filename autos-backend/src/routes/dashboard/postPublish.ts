import express from "express";
import { pool } from "../../dbConnect.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
const insertIntoBrand: string = "UPDATE cargrants SET grantedpublic = ? WHERE carid = ?";

export default async (req: express.Request, res: express.Response) => {
    const { carId, canPublish } = req.body;

    let connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
            // query Brand
            await connection.execute(insertIntoBrand, [canPublish, carId]);
            
            await connection.commit();
                
            return res.status(200).json({ message: 'Erfolgreich hinzugefügt' })
        } catch {
            connection.rollback();
            return res.status(500).json({ message: 'Fehler' });
        } finally {
            connection.release();
        }

}