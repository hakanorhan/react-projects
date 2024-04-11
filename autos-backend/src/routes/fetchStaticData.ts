import express from 'express';
import { pool } from '../dbConnect.js';
import { RowDataPacket } from 'mysql2';

const selectQueryBrands: string = 'SELECT * from brands';
const selectQueryCartypes: string = 'SELECT * FROM cartypes';
const selectQueryTransmissions: string = 'SELECT * FROM transmissions';
const selectQueryFuels: string = 'SELECT * FROM fuels';
const selectQueryDoors: string = 'SELECT * FROM doors';
const selectQuerySeats: string = 'SELECT * FROM seats';
const selectQueryBundesland: string = 'SELECT * FROM bundesland';
const selectQueryPrices: string = 'SELECT * FROM prices';
//const selectQuery: string = 'SELECT brands.brandid, brands.marke, models.modell, models.modelid FROM brands JOIN models ON brands.brandid = models.brandid';

export default async (req: express.Request, res: express.Response) => {
    let connection = await pool.getConnection();
    try {
        // brands
        const queryResultBrands = await connection.execute(selectQueryBrands);
        const resultBrands = queryResultBrands[0] as RowDataPacket[];
        //const resultBrandsForSelect = resultBrands;

        // cartypes
        const queryResultCarTypes = await connection.execute(selectQueryCartypes);
        const resultCarTypes = queryResultCarTypes[0] as RowDataPacket[];
        
        // transmissions
        const queryResultTransmissions = await connection.execute(selectQueryTransmissions);
        const resultTransmissions = queryResultTransmissions[0] as RowDataPacket[];

        // fuels
        const queryResultFuels = await connection.execute(selectQueryFuels);
        const resultFuels = queryResultFuels[0] as RowDataPacket[];

        // doors
        const queryResultDoors = await connection.execute(selectQueryDoors);
        const resultDoors = queryResultDoors[0] as RowDataPacket[];

        // Bundesland
        const queryResultBundesland = await connection.execute(selectQueryBundesland);
        const resultBundesland = queryResultBundesland[0] as RowDataPacket[];

        // prices
        const queryResultPrices = await connection.execute(selectQueryPrices);
        const resultPrices = queryResultPrices[0] as RowDataPacket[];

        return res.status(200).json({ message: 'Data send',
             tableValues: { resultBrands, resultCarTypes, resultTransmissions, resultFuels, resultDoors, resultBundesland, resultPrices }});
    } catch (error) {
        console.log("Error:", error);
        // Verwende res.status() und res.json(), um den Fehler zurückzugeben
        return res.status(500).json({ message: 'Fehler beim Abrufen der Daten' });
    } finally {
        // Stelle sicher, dass die Verbindung geschlossen wird
        connection.release();
    } 
}