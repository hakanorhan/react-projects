import express from 'express';
import { connectToDatabase } from '../../dbConnect.js';
import { RowDataPacket } from 'mysql2';
import { selectMysqlErrorMessages } from '../../helper/messages.js';

const selectQueryModels: string = 'SELECT * from model WHERE brand_id = ?';

/**
 * Select all models of a brand.
 */
export default async (req: express.Request, res: express.Response) => {
    const { selectedBrand } = req.body;
    let connection;
    try {
        connection = await connectToDatabase();
        const queryResult = await connection.execute(selectQueryModels, [selectedBrand]);
        const resultModels = queryResult[0] as RowDataPacket[];
        console.log(resultModels);
        connection.end();
        return res.status(200).json({ message: 'Data send', tableValues: resultModels });
    } catch (error: any) {
        connection?.end();
        selectMysqlErrorMessages(error.code, res);
    }
}