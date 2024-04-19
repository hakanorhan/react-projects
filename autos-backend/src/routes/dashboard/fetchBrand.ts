import express from 'express';
import { pool } from '../../dbConnect.js';
import { RowDataPacket } from 'mysql2';

const selectQuery: string = 'SELECT * from brand';
//const selectQuery: string = 'SELECT brand.brand_id, brand.brand, model.model, model.model_id FROM brand JOIN model ON brand.brand_id = model.brand_id';

export default async (req: express.Request, res: express.Response) => {
    let connection = await pool.getConnection();
    try {
        const queryResult = await connection.execute(selectQuery);
        const result = queryResult[0] as RowDataPacket[];
        return res.status(200).json({ message: 'Data send', tableValues: result});
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ message: 'Fehler beim Abrufen der Daten' });
    } finally {
        connection.release();
    } 
}