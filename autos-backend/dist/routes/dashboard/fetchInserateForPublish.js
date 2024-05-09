import { connectToDatabase } from '../../dbConnect1.js';
import { selectMysqlErrorMessages } from '../../helper/messages.js';
const selectQuery = "SELECT inserate.inserate_id, brand.brand, model.model, inserate.price, inserate_info.inserate_date"
    + " from inserate"
    + " JOIN model ON inserate.model_id = model.model_id"
    + " JOIN brand ON brand.brand_id = model.brand_id"
    + " JOIN inserate_info ON inserate.inserate_info_id = inserate_info.inserate_info_id "
    + " JOIN inserate_check ON inserate_check.inserate_id = inserate.inserate_id "
    + " WHERE inserate_check.inserate_public = 0 AND inserate_info.is_active = 1 AND inserate_check.inserate_cancelled = 0";
export default async (req, res) => {
    let connection;
    try {
        connection = await connectToDatabase();
        const queryResult = await connection.execute(selectQuery);
        const result = queryResult[0];
        connection.end();
        return res.status(200).json(result);
    }
    catch (error) {
        console.log("Error:", error);
        connection?.end();
        selectMysqlErrorMessages(error.code, res);
    }
};
