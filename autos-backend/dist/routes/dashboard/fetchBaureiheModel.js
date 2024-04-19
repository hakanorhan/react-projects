import { pool } from '../../dbConnect.js';
const selectQueryModels = 'SELECT * from model WHERE brand_id = ?';
export default async (req, res) => {
    const { selectedBrand } = req.body;
    console.log("Brandid: " + selectedBrand);
    let connection = await pool.getConnection();
    try {
        const queryResult = await connection.execute(selectQueryModels, [selectedBrand]);
        const resultModels = queryResult[0];
        console.log(resultModels);
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
