import { pool } from '../dbConnect.js';
const selectQuery = 'SELECT * from bundesland';
export default async (req, res) => {
    let connection = await pool.getConnection();
    try {
        const queryResult = await connection.execute(selectQuery);
        const result = queryResult[0];
        console.log(result);
        return res.status(200).json({ message: 'Data send', tableValues: result });
    }
    catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ message: 'Fehler beim Abrufen der Daten' });
    }
    finally {
        connection.release();
    }
};
