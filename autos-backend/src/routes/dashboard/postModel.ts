import express from "express";
import { REGEX_NAMES } from "../../regex/regex.js";
import { pool } from "../../dbConnect.js";
import { AxiosDataModel } from "../../interfaces/IAxiosData.js";

const insertIntoModels: string = "insert into models(model, brandid)VALUES(?, ?)";

export default async (req: express.Request, res: express.Response) => {
    const axiosData: AxiosDataModel = req.body;
    
    let connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
            // query Brand
            await connection.execute(insertIntoModels, [axiosData.model, axiosData.brandid]);
            
            await connection.commit();
                
            return res.status(200).json({ message: 'Erfolgreich hinzugefügt'})
        } catch {
            connection.rollback();
            return res.status(500).json({ message: `${axiosData.model} existiert bereits` });
        } finally {
            connection.release();
        }

}