import express from "express";
import { REGEX_NAMES } from "../../regex/regex.js";
import { pool } from "../../dbConnect.js";
import { AxiosDataModel } from "../../interfaces/IAxiosData.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { mysqlErrorMessages } from "../../helper/messages.js";

const insertIntoModels: string = "insert into model(model, brand_id)VALUES(?, ?)";
const selectModel: string = "SELECT model_id as id, model FROM model WHERE brand_id = ?";
const selectBrand: string = "SELECT brand FROM brand WHERE brand_id = ?";

export default async (req: express.Request, res: express.Response) => {
    const axiosData: AxiosDataModel = req.body;
    
    let connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
            // query Brand
            await connection.execute(insertIntoModels, [axiosData.model, axiosData.brandid]);
            
            const queryResult = await connection.query(selectModel, [ axiosData.brandid ]);
            const result = queryResult as RowDataPacket[];

            // Brandnames
            const resultTableCell = result[0];

            // Brand
            const queryResultBrand = await connection.query(selectBrand, [ axiosData.brandid ]);
            const resultBrand = queryResultBrand as RowDataPacket[];
            const brandName = resultBrand[0][0].brand;

            await connection.commit();
                
            return res.status(200).json({ message: 'Erfolgreich hinzugefügt', tableValues: resultTableCell, brand: brandName})
        } catch (error: any){
            connection.rollback();
            mysqlErrorMessages(error.errno, res);
        } finally {
            connection.release();
        }

}