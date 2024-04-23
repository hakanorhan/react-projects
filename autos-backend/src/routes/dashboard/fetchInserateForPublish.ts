import express from 'express';
import { pool } from '../../dbConnect.js';
import { RowDataPacket } from 'mysql2';

const selectQuery: string = "SELECT inserate.inserate_id, brand.brand, model.model, inserate.price, inserate_info.inserate_date" 
    + " from inserate"
    + " JOIN model ON inserate.model_id = model.model_id"
    + " JOIN brand ON brand.brand_id = model.brand_id"
    + " JOIN inserate_info ON inserate.inserate_info_id = inserate_info.inserate_info_id "
    + " JOIN inserate_check ON inserate_check.inserate_id = inserate.inserate_id "
    + " WHERE inserate_check.inserate_public = 0 AND inserate_info.is_active = 1"; 

export default async (req: express.Request, res: express.Response) => {
    let connection = await pool.getConnection();
    try {
        const queryResult = await connection.execute(selectQuery);
        const result = queryResult[0] as RowDataPacket[];
        
        return res.status(200).json( result );
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ message: 'Fehler beim Abrufen der Daten' });
    } finally {
        connection.release();
    } 
}