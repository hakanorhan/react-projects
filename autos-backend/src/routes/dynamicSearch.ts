import express from "express";
import { pool } from "../dbConnect.js";
import { RowDataPacket } from "mysql2";
import { AxiosSearch } from "../interfaces/IAxiosData.js";

// Select all cars and count
const selectQueryBrand: string = 'SELECT COUNT(cars.carid) FROM cars, brands, models where cars.modelid = models.modelid and models.brandid = brands.brandid and brands.brand = BMW';

// disable autocommit and perform transaction
async function performQueryGet(data: AxiosSearch, res: express.Response){
    let connection;

    try {
        connection = await pool.getConnection();
            
            // query all cars
            const queryResult = await connection.query(selectQueryBrand);
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

            const data: AxiosSearch = req.body;

            performQueryGet(data, res);
    
}