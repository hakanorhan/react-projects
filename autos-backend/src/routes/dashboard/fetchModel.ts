import express from 'express';
import { pool } from '../../dbConnect.js';
import { RowDataPacket } from 'mysql2';
import { selectMysqlErrorMessages } from '../../helper/messages.js';

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
    } catch (error: any) {
        console.log("Error:", error);
        selectMysqlErrorMessages(error.code, res);
    } finally {
        // Stelle sicher, dass die Verbindung geschlossen wird
        connection.release();
    } 
}