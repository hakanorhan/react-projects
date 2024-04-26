import express from 'express';
import { pool } from '../dbConnect.js';
import { RowDataPacket } from 'mysql2';
import { AxiosDataImagesNames, AxiosDetailsearch } from '../interfaces/IAxiosData.js';
import { selectMysqlErrorMessages } from '../helper/messages.js';

const selectQueryDetail: string = "SELECT * FROM imagename WHERE inserate_id = ?";

export default async (req: express.Request, res: express.Response) => {
    const inseratId = req.params.id;
    
    let connection = await pool.getConnection();
    try {
        const queryResult = await connection.execute(selectQueryDetail, [inseratId]);
        const result = queryResult[0] as RowDataPacket[];
        
        const axiosData: AxiosDataImagesNames[] = [];

        result.map((value, index) => {
            const obj:AxiosDataImagesNames = { imagename: value.imagename, firstplace: value.firstplace, carId: value.inserat_id }
            axiosData.push(obj)
        })
        
        return res.status(200).json( axiosData );
    } catch (error: any) {
        console.log(error)
        selectMysqlErrorMessages(error.code, res);
    } finally {
        connection.release();
    } 
}