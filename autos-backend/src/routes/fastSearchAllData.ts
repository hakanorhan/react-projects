import express from "express";
import { pool } from "../dbConnect.js";
import { RowDataPacket } from "mysql2";
import { ICarInformationRequest } from "../interfaces/search/IRequestSearch.js";

// Select all cars and count
const selectQuery: string = 'SELECT COUNT(carid) as count FROM cars';

// disable autocommit and perform transaction
async function performQueryGet(res: express.Response){
    let connection;

    try {
        connection = await pool.getConnection();
            
            // query all cars
            const queryResult = await connection.query(selectQuery);
            const result = queryResult as RowDataPacket[];
                const count = result[0][0].count;
                return res.status(200).json( count );
            
      }catch (error) {
        // Handle any errors
        return res.status(500).json({message:'Error occured.'})
    } finally {
        connection?.release();
    }
    
}

export default async (req: express.Request, res: express.Response) => {
    
    switch(req.method) {
        case 'GET' :
            performQueryGet(res);
            break;
        case 'POST':
            const requestData: ICarInformationRequest = req.body;
            break;
            default:
                res.status(500).json({ message: "Error occured" })
    }
}