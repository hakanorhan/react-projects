import { connectToDatabase } from '../dbConnect.js';
import { selectMysqlErrorMessages } from '../helper/messages.js';
const selectQuery = 'SELECT * from federal_state';
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
        connection?.end();
        selectMysqlErrorMessages(error.code, res);
    }
};
