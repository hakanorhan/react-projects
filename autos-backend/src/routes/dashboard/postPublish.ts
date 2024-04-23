import express from "express";
import { pool } from "../../dbConnect.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { AxiosDataPublish } from "../../interfaces/IAxiosData.js";
const UPDATE: string = "update inserate_check set inserate_public = 1 WHERE inserate_id = ?";

export default async (req: express.Request, res: express.Response) => {
    const axiosData: AxiosDataPublish = req.body;

    let connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
            // query Brand
            await connection.execute(UPDATE, [axiosData.canPublish, axiosData.inserateId]);
            //await connection.execute(insertIntoCarGrants, [axiosData.carId]);
            
            await connection.commit();
                
            return res.status(200).json({ message: 'Erfolgreich hinzugefügt' })
        } catch {
            connection.rollback();
            return res.status(500).json({ message: 'Fehler' });
        } finally {
            connection.release();
        }

}