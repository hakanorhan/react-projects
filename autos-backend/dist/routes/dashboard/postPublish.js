import { pool } from "../../dbConnect.js";
const insertIntoBrand = "UPDATE cargrants SET grantedpublic = ? WHERE carid = ?";
export default async (req, res) => {
    const { carId, canPublish } = req.body;
    let connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        await connection.execute(insertIntoBrand, [canPublish, carId]);
        await connection.commit();
        return res.status(200).json({ message: 'Erfolgreich hinzugefügt' });
    }
    catch {
        connection.rollback();
        return res.status(500).json({ message: 'Fehler' });
    }
    finally {
        connection.release();
    }
};
