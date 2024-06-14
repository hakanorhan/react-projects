import { connectToDatabase } from '../dbConnect.js';
import { selectMysqlErrorMessages } from '../helper/messages.js';
const selectQueryDetail = "SELECT * FROM imagename WHERE inserate_id = ?";
export default async (req, res) => {
    const inseratId = req.params.id;
    let connection;
    try {
        connection = await connectToDatabase();
        const queryResult = await connection.execute(selectQueryDetail, [inseratId]);
        const result = queryResult[0];
        const axiosData = [];
        axiosData.push({ imagename: result[0].imagename, firstplace: result[0].firstplace, carId: result[0].inserat_id });
        connection.end();
        return res.status(200).json(axiosData);
    }
    catch (error) {
        connection?.end();
        selectMysqlErrorMessages(error.code, res);
    }
};
