import express from 'express';
import { connectToDatabase } from '../dbConnect1.js';
import { RowDataPacket } from 'mysql2';
import { AxiosDataImagesNames } from '../interfaces/IAxiosData.js';
import { selectMysqlErrorMessages } from '../helper/messages.js';

const selectQueryDetail: string = "SELECT * FROM imagename WHERE inserate_id = ?";

export default async (req: express.Request, res: express.Response) => {
    const inseratId = req.params.id;
    
    let connection;
    try {
        connection = await connectToDatabase();
        const queryResult = await connection.execute(selectQueryDetail, [inseratId]);
        const result = queryResult[0] as RowDataPacket[];
        
        const axiosData: AxiosDataImagesNames[] = [];

        axiosData.push( { imagename: result[0].imagename, firstplace: result[0].firstplace, carId: result[0].inserat_id });
        connection.end();  
        return res.status(200).json( axiosData );
    } catch (error: any) {
        connection?.end();
        selectMysqlErrorMessages(error.code, res);
    } 
}