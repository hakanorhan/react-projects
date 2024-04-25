import { pool } from '../../dbConnect.js';
import { selectMysqlErrorMessages } from '../../helper/messages.js';
const selectQueryModels = 'SELECT * from model WHERE brand_id = ?';
export default async (req, res) => {
    const { selectedBrand } = req.body;
    console.log(selectedBrand + " Brand ID");
    let connection = await pool.getConnection();
    try {
        const queryResult = await connection.execute(selectQueryModels, [selectedBrand]);
        const resultModels = queryResult[0];
        return res.status(200).json({ message: 'Data send', tableValues: resultModels });
    }
    catch (error) {
        console.log("Error:", error);
        selectMysqlErrorMessages(error.code, res);
    }
    finally {
        connection.release();
    }
};
