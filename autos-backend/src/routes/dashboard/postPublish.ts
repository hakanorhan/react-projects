import express from "express";
import { pool } from "../../dbConnect.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { AxiosDataPublish } from "../../interfaces/IAxiosData.js";
const UPDATE: string = "update inserate_check set inserate_public = ? WHERE inserate_id = ?";
const UPDATE_CANCELLED: string =" UPDATE inserate_check set inserate_public = 0, inserate_cancelled = 1 WHERE inserate_id = ?";

export default async (req: express.Request, res: express.Response) => {
    const axiosData: AxiosDataPublish = req.body;

    let connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
            // query Brand
            if(axiosData.canPublish)
                await connection.execute(UPDATE, [axiosData.canPublish, axiosData.inserateId]);
            else {
                console.log(axiosData.canPublish)
                await connection.execute(UPDATE_CANCELLED, [axiosData.inserateId]);
            }
            await connection.commit();
                
            return res.status(200).json({ message: 'Erfolgreich hinzugefügt' })
        } catch (error){
            console.log(error)
            connection.rollback();
            return res.status(500).json({ message: 'Fehler' });
        } finally {
            connection.release();
        }

}