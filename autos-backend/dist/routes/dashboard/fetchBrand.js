import { connectToDatabase } from '../../dbConnect1.js';
import { selectMysqlErrorMessages } from '../../helper/messages.js';
const selectQuery = 'SELECT * from brand';
export default async (req, res) => {
    let connection;
    try {
        connection = await connectToDatabase();
        const queryResult = await connection.execute(selectQuery);
        const result = queryResult[0];
        connection.end();
        return res.status(200).json({ message: 'Data send', tableValues: result });
    }
    catch (error) {
        console.log("Error:", error);
        selectMysqlErrorMessages(error.code, res);
        connection?.end();
    }
};
