import express from 'express';
import { pool } from '../dbConnect.js';
import { RowDataPacket } from 'mysql2';
import { selectMysqlErrorMessages } from '../helper/messages.js';

const selectQueryBrands: string = 'SELECT * from brand';
const selectQueryCartypes: string = 'SELECT * FROM cartype';
const selectQueryTransmissions: string = 'SELECT * FROM transmission';
const selectQueryFuels: string = 'SELECT * FROM fuel';
const selectQueryDoors: string = 'SELECT * FROM door';
const selectQuerySeats: string = 'SELECT * FROM seat';
const selectQueryBundesland: string = 'SELECT * FROM federal_state';
const selectQueryPrices: string = 'SELECT * FROM price';
//const selectQuery: string = 'SELECT brands.brandid, brands.marke, models.modell, models.modelid FROM brands JOIN models ON brands.brandid = models.brandid';

export default async (req: express.Request, res: express.Response) => {
    const isAuthenticated = req.isAuthenticated();

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
             tableValues: { resultBrands, resultCarTypes, resultTransmissions, resultFuels, resultDoors, resultBundesland, resultPrices, isAuthenticated }});
    } catch (error: any) {
        console.log("Error:", error);
        selectMysqlErrorMessages(error.code, res);
    } finally {
        // Stelle sicher, dass die Verbindung geschlossen wird
        connection.release();
    } 
}