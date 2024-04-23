import { pool } from "../../dbConnect.js";
const UPDATE = "update inserate_check set inserate_public = 1 WHERE inserate_id = ?";
export default async (req, res) => {
    const axiosData = req.body;
    let connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        await connection.execute(UPDATE, [axiosData.canPublish, axiosData.inserateId]);
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
