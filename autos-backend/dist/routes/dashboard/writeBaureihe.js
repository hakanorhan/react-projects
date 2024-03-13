import { pool } from "../../dbConnect.js";
const insertIntoModels = "insert into models(modell, brandid)VALUES(?, ?)";
export default async (req, res) => {
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
        await connection.beginTransaction();
        await connection.execute(insertIntoModels, [model, brandid]);
        await connection.commit();
        return res.status(200).json({ message: 'Erfolgreich hinzugefügt' });
    }
    catch {
        connection.rollback();
        return res.status(500).json({ message: `${model} existiert bereits` });
    }
    finally {
        connection.release();
    }
};
