import { pool } from '../../dbConnect.js';
const selectQueryBrands = 'SELECT * from brands';
const selectQueryCarTypes = 'SELECT * FROM cartypes';
export default async (req, res) => {
    let connection = await pool.getConnection();
    try {
        const queryResult = await connection.execute(selectQueryBrands);
        const resultBrands = queryResult[0];
        const queryResultCarTypes = await connection.execute(selectQueryCarTypes);
        const resultCarTypes = queryResultCarTypes[0];
        const tableValues = [resultBrands, resultCarTypes];
        return res.status(200).json({ message: 'Data send', tableValues: tableValues });
    }
    catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ message: 'Fehler beim Abrufen der Daten' });
    }
    finally {
        connection.release();
    }
};
