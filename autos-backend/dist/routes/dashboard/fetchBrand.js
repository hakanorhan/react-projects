import { connectToDatabase } from '../../dbConnect1.js';
import { selectMysqlErrorMessages } from '../../helper/messages.js';
const selectQuery = 'SELECT * from brand';
export default async (req, res) => {
    let connection;
    try {
        connection = await connectToDatabase();
        const queryResult = await connection.execute(selectQuery);
        const result = queryResult[0];
        const brands = result.map((row) => {
            const object = {
                brandId: row.brand_id,
                brand: row.brand
            };
            return object;
        });
        connection.end();
        const axiosDataPacket = { message: '', dataBrands: brands };
        return res.status(200).json(axiosDataPacket);
    }
    catch (error) {
        console.log("Error:", error);
        selectMysqlErrorMessages(error.code, res);
        connection?.end();
    }
};
