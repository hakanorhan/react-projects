import express from "express";
import { REGEX_NAMES } from "../../regex/regex.js";
import { pool } from "../../dbConnect.js";
import { AxiosDataBaureihe } from "../../interfaces/IAxiosData.js";

const insertInto: string = "INSERT INTO baureihen(baureihe, cartypeid, von, bis, kw, hubraum, modelid) VALUES(?, ?, ?, ?, ?, ?, ?)";

export default async (req: express.Request, res: express.Response) => {
    const axiosData: AxiosDataBaureihe = req.body;
    console.log(axiosData.formBaureihe.baureihe);  
    
    const model = axiosData.formBaureiheSelect.model;
    const baureihe = axiosData.formBaureihe.baureihe;
    const carTypeId = axiosData.formBaureiheSelect.cartype;
    const kW = axiosData.formBaureihe.kw;
    const hubraum = axiosData.formBaureihe.hubraum;
    const from = axiosData.from;
    const to = axiosData.to;

    let connection = await pool.getConnection();
    try {
            // query Baureihe
            await connection.execute(insertInto, [baureihe, carTypeId, from, to, kW, hubraum, model]);
            
            return res.status(200).json({ message: 'Baureihe erfolgreich hinzugefügt'})
        } catch (err){
            console.log(err);
            return res.status(500).json({ message: `${model} existiert bereits` });
        } finally {
            connection.release();
        }
}