import express from 'express';
import { connectToDatabase } from '../../dbConnect1.js';
import { RowDataPacket } from 'mysql2';
import { selectMysqlErrorMessages } from '../../helper/messages.js';

const selectQueryModels: string = 'SELECT * from model WHERE brand_id = ?';
//const selectQuery: string = 'SELECT brands.brandid, brands.marke, models.modell, models.modelid FROM brands JOIN models ON brands.brandid = models.brandid';

export default async (req: express.Request, res: express.Response) => {
    const { selectedBrand } = req.body;
    let connection;
    try {
        connection = await connectToDatabase();
        const queryResult = await connection.execute(selectQueryModels, [selectedBrand]);
        const resultModels = queryResult[0] as RowDataPacket[];
        connection.end();
        return res.status(200).json({ message: 'Data send', tableValues: resultModels});
    } catch (error: any) {
        console.log("Error:", error);
        connection?.end();
        selectMysqlErrorMessages(error.code, res);
    }
}