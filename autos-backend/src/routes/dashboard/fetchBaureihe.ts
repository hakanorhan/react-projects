import express from 'express';
import { pool } from '../../dbConnect.js';
import { RowDataPacket } from 'mysql2';

const selectQueryBrands: string = 'SELECT * from brands';
const selectQueryCarTypes: string = 'SELECT * FROM cartypes';
//const selectQuery: string = 'SELECT brands.brandid, brands.marke, models.modell, models.modelid FROM brands JOIN models ON brands.brandid = models.brandid';

export default async (req: express.Request, res: express.Response) => {
    let connection = await pool.getConnection();
    try {
        const queryResult = await connection.execute(selectQueryBrands);
        const resultBrands = queryResult[0] as RowDataPacket[];

        const queryResultCarTypes = await connection.execute(selectQueryCarTypes);
        const resultCarTypes = queryResultCarTypes[0] as RowDataPacket[];

        const tableValues = [resultBrands, resultCarTypes]
        return res.status(200).json({ message: 'Data send', tableValues: tableValues});
    } catch (error) {
        console.log("Error:", error);
        // Verwende res.status() und res.json(), um den Fehler zurückzugeben
        return res.status(500).json({ message: 'Fehler beim Abrufen der Daten' });
    } finally {
        // Stelle sicher, dass die Verbindung geschlossen wird
        connection.release();
    } 
}