import { pool } from '../../dbConnect.js';
import { selectMysqlErrorMessages } from '../../helper/messages.js';
const selectQuery = 'SELECT * from brand';
export default async (req, res) => {
    let connection = await pool.getConnection();
    try {
        const queryResult = await connection.execute(selectQuery);
        const result = queryResult[0];
        return res.status(200).json({ message: 'Data send', tableValues: result });
    }
    catch (error) {
        console.log("Error:", error);
        selectMysqlErrorMessages(error.code, res);
    }
    finally {
        connection.release();
    }
};
