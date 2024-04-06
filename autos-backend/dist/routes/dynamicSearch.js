import { pool } from "../dbConnect.js";
const selectQuery = 'SELECT COUNT(carid) as count FROM cars';
async function performQueryGet(res) {
    let connection;
    try {
        connection = await pool.getConnection();
        const queryResult = await connection.query(selectQuery);
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
    switch (req.method) {
        case 'GET':
            performQueryGet(res);
            break;
        case 'POST':
            const requestData = req.body;
            break;
        default:
            res.status(500).json({ message: "Error occured" });
    }
};
