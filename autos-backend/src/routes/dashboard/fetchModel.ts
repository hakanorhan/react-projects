import express from 'express';
import { pool } from '../../dbConnect.js';
import { RowDataPacket } from 'mysql2';

const selectQueryModels: string = 'SELECT * from model WHERE brand_id = ?';
//const selectQuery: string = 'SELECT brands.brandid, brands.marke, models.modell, models.modelid FROM brands JOIN models ON brands.brandid = models.brandid';

export default async (req: express.Request, res: express.Response) => {
    const { selectedBrand } = req.body;
    console.log(selectedBrand + " Brand ID");
    let connection = await pool.getConnection();
    try {
        const queryResult = await connection.execute(selectQueryModels, [selectedBrand]);
        const resultModels = queryResult[0] as RowDataPacket[];

        return res.status(200).json({ message: 'Data send', tableValues: resultModels});
    } catch (error) {
        console.log("Error:", error);
        // Verwende res.status() und res.json(), um den Fehler zurückzugeben
        return res.status(500).json({ message: 'Fehler beim Abrufen der Daten' });
    } finally {
        // Stelle sicher, dass die Verbindung geschlossen wird
        connection.release();
    } 
}