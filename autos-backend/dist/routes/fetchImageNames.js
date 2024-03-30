import { pool } from '../dbConnect.js';
const selectQueryDetail = "SELECT * FROM images WHERE carid = ?";
export default async (req, res) => {
    const carId = req.params.id;
    let connection = await pool.getConnection();
    try {
        const queryResult = await connection.execute(selectQueryDetail, [carId]);
        const result = queryResult[0];
        const axiosData = [];
        result.map((value, index) => {
            const obj = { imagename: value.imagename, firstplace: value.firstplace, carId: value.carid };
            axiosData.push(obj);
        });
        return res.status(200).json(axiosData);
    }
    catch (error) {
        return res.status(500).json({ message: 'Fehler beim Abrufen der Daten' });
    }
    finally {
        connection.release();
    }
};
