import { pool } from '../../dbConnect.js';
const selectQuery = "SELECT cars.carid, brands.brand, models.model, cars.price, advertiseinfo.advertiseddate"
    + " from cars"
    + " JOIN models ON cars.modelid = models.modelid"
    + " JOIN brands ON brands.brandid = models.brandid"
    + " JOIN advertiseinfo ON cars.advertiseinfoid = advertiseinfo.advertiseinfoid"
    + " WHERE advertiseinfo.isactive = 0";
export default async (req, res) => {
    let connection = await pool.getConnection();
    try {
        const queryResult = await connection.execute(selectQuery);
        const result = queryResult[0];
        console.log(result);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ message: 'Fehler beim Abrufen der Daten' });
    }
    finally {
        connection.release();
    }
};
