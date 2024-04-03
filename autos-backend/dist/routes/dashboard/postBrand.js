import { pool } from "../../dbConnect.js";
const insertIntoBrand = "INSERT INTO brands (brand) VALUES (?)";
const selectBrandQuery = "SELECT * FROM brands";
export default async (req, res) => {
    const { value } = req.body;
    let connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const [resultBrand] = await connection.execute(insertIntoBrand, [value]);
        const insertId = resultBrand.insertId;
        console.log(insertId + ": InsertId");
        const queryResult = await connection.query(selectBrandQuery);
        const result = queryResult;
        const resultTableCell = result[0];
        console.log(resultTableCell);
        await connection.commit();
        return res.status(200).json({ message: 'Erfolgreich hinzugefügt', tableValues: resultTableCell, insertId: insertId });
    }
    catch {
        connection.rollback();
        return res.status(500).json({ message: `${value} existiert bereits` });
    }
    finally {
        connection.release();
    }
};
