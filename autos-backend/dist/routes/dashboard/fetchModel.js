import { connectToDatabase } from '../../dbConnect.js';
import { selectMysqlErrorMessages } from '../../helper/messages.js';
const selectQueryModels = 'SELECT * from model WHERE brand_id = ?';
export default async (req, res) => {
    const { selectedBrand } = req.body;
    let connection;
    try {
        connection = await connectToDatabase();
        const queryResult = await connection.execute(selectQueryModels, [selectedBrand]);
        const resultModels = queryResult[0];
        console.log(resultModels);
        connection.end();
        return res.status(200).json({ message: 'Data send', tableValues: resultModels });
    }
    catch (error) {
        console.log("Error:", error);
        connection?.end();
        selectMysqlErrorMessages(error.code, res);
    }
};
