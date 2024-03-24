import { pool } from "../dbConnect.js";
const selectQueryBrand = 'SELECT COUNT(cars.carid) FROM cars, brands, models where cars.modelid = models.modelid and models.brandid = brands.brandid and brands.brand = BMW';
async function performQueryGet(data, res) {
    let connection;
    try {
        connection = await pool.getConnection();
        const queryResult = await connection.query(selectQueryBrand);
        const result = queryResult;
        const count = result[0][0].count;
        return res.status(200).json(count);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error occured.' });
    }
    finally {
        connection?.release();
    }
}
export default async (req, res) => {
    const data = req.body;
    performQueryGet(data, res);
};
