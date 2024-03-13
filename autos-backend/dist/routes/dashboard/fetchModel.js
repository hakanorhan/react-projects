import { pool } from '../../dbConnect.js';
const selectQueryModels = 'SELECT * from models WHERE brandid = ?';
export default async (req, res) => {
    const brandid = req.body;
    console.log("Brandid: " + brandid);
    let connection = await pool.getConnection();
    try {
        const queryResult = await connection.execute(selectQueryModels, [brandid]);
        const resultModels = queryResult[0];
        return res.status(200).json({ message: 'Data send', tableValues: resultModels });
    }
    catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ message: 'Fehler beim Abrufen der Daten' });
    }
    finally {
        connection.release();
    }
};
