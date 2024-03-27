import { pool } from '../dbConnect.js';
const selectQueryDetail = "SELECT c.carid, b.brand, m.model, c.price, ct.cartype, c.km, c.year, c.month, t.transmissionname, ai.advertiseddate, c.ps, c.previousowner, c.hubraum, c.aunew, d.doors, c.hunew, c.accident"
    + " FROM cars c "
    + " JOIN models m ON c.modelid = m.modelid"
    + " JOIN brands b ON b.brandid = m.brandid"
    + " JOIN cartypes ct ON c.cartypeid = ct.cartypeid"
    + " JOIN transmissions t ON t.transmissionid = c.transmissionid"
    + " JOIN advertiseinfo ai ON c.advertiseinfoid = ai.advertiseinfoid"
    + " JOIN fuels f ON f.fuelid = c.fuelid"
    + " JOIN doors d ON d.doorid = c.doorid"
    + " WHERE c.carid = ?";
export default async (req, res) => {
    const carId = req.params.id;
    console.log("param: " + carId);
    let connection = await pool.getConnection();
    try {
        const queryResult = await connection.execute(selectQueryDetail, [carId]);
        const result = queryResult[0];
        const { carid, brand, model, price, cartype, km, year, month, transmissionname, advertiseddate, ps, previousowner, hubraum, aunew, hunew, doors, accident } = result[0];
        const axiosData = {
            carId: carid, model, brand, price, cartype, km, year, month, transmission: transmissionname, advertiseddate, ps, previousOwner: previousowner, hubraum, auNew: aunew,
            huNew: hunew, doors, accident
        };
        return res.status(200).json(axiosData);
    }
    catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ message: 'Fehler beim Abrufen der Daten' });
    }
    finally {
        connection.release();
    }
};
