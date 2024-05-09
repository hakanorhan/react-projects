import { connectToDatabase } from '../dbConnect1.js';
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
        result.map((value, index) => {
            const obj = { imagename: value.imagename, firstplace: value.firstplace, carId: value.inserat_id };
            axiosData.push(obj);
        });
        connection.end();
        return res.status(200).json(axiosData);
    }
    catch (error) {
        console.log(error);
        connection?.end();
        selectMysqlErrorMessages(error.code, res);
    }
};
