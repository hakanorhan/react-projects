import express from "express";
import { REGEX_NAMES } from "../../regex/regex.js";
import { pool } from "../../dbConnect.js";

const insertInto: string = "INSERT INTO baureihen(baureihe, cartypeid, von, bis, kw, hubraum, modelid) VALUES(?, ?, ?, ?, ?, ?, ?)";

export default async (req: express.Request, res: express.Response) => {
    const { formDataModel } = req.body;
    const brandid = formDataModel.brandId;
    const model = formDataModel.model;
    const baureihe = formDataModel.baureihe;
    const carTypeId = formDataModel.carTypeId;
    const kW = formDataModel.kW;
    const hubraum = formDataModel.hubraum;
    const from = formDataModel.from;
    const to = formDataModel.to;

    console.log(formDataModel);

    let connection = await pool.getConnection();
    try {
            // query Baureihe
            await connection.execute(insertInto, [baureihe, carTypeId, from, to, kW, hubraum, model]);
            
            return res.status(200).json({ message: 'Erfolgreich hinzugefügt'})
        } catch (err){
            console.log(err);
            connection.rollback();
            return res.status(500).json({ message: `${model} existiert bereits` });
        } finally {
            connection.release();
        }

}