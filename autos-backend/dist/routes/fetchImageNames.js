import { pool } from '../dbConnect.js';
const selectQueryDetail = "SELECT * FROM imagename WHERE inserate_id = ?";
export default async (req, res) => {
    const inseratId = req.params.id;
    console.log(inseratId);
    let connection = await pool.getConnection();
    try {
        const queryResult = await connection.execute(selectQueryDetail, [inseratId]);
        const result = queryResult[0];
        const axiosData = [];
        result.map((value, index) => {
            const obj = { imagename: value.imagename, firstplace: value.firstplace, carId: value.inserat_id };
            axiosData.push(obj);
        });
        return res.status(200).json(axiosData);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Fehler beim Abrufen der Daten' });
    }
    finally {
        connection.release();
    }
};
