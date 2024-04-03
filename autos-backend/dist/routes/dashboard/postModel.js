import { pool } from "../../dbConnect.js";
const insertIntoModels = "insert into models(model, brandid)VALUES(?, ?)";
export default async (req, res) => {
    const axiosData = req.body;
    let connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        await connection.execute(insertIntoModels, [axiosData.model, axiosData.brandid]);
        await connection.commit();
        return res.status(200).json({ message: 'Erfolgreich hinzugefügt' });
    }
    catch {
        connection.rollback();
        return res.status(500).json({ message: `${axiosData.model} existiert bereits` });
    }
    finally {
        connection.release();
    }
};
