import express from 'express';
import { pool } from '../dbConnect.js';
import { RowDataPacket } from 'mysql2';
import { AxiosDataImagesNames, AxiosDetailsearch } from '../interfaces/IAxiosData.js';

const selectQueryDetail: string = "SELECT * FROM images WHERE carid = ?";

export default async (req: express.Request, res: express.Response) => {
    const carId = req.params.id
    let connection = await pool.getConnection();
    try {
        const queryResult = await connection.execute(selectQueryDetail, [carId]);
        const result = queryResult[0] as RowDataPacket[];
        
        const axiosData: AxiosDataImagesNames[] = [];

        result.map((value, index) => {
            const obj:AxiosDataImagesNames = { imagename: value.imagename, firstplace: value.firstplace, carId: value.carid }
            axiosData.push(obj)
        })
        
        return res.status(200).json( axiosData );
    } catch (error) {
        return res.status(500).json({ message: 'Fehler beim Abrufen der Daten' });
    } finally {
        connection.release();
    } 
}