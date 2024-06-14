import { REGEX_EMAIL } from "../regex/regex.js";
import { connectToDatabase } from "../dbConnect.js";
const selectQuery = 'SELECT email FROM account_data WHERE email = ?';
async function performQuery(requestData, res) {
    let connection;
    console.log("value: " + requestData);
    if (!REGEX_EMAIL.test(requestData)) {
        return res.status(401).json({ message: 'Email ist nicht korrekt' });
    }
    else {
        try {
            connection = await connectToDatabase();
            const queryResult = await connection.query(selectQuery, [requestData]);
            const result = queryResult;
            if (result[0].length === 0) {
                connection.end();
                return res.status(200).json({ message: 'Email ist verfügbar.' });
            }
            else {
                connection.end();
                return res.status(401).json({ message: 'Email ist bereits vorhanden.' });
            }
        }
        catch (error) {
            connection?.end();
            return res.status(500).json({ message: 'Interner Server Fehler. Bitte versuchen Sie es später erneut.' });
        }
    }
}
export default async (req, res) => {
    const { value } = req.body;
    performQuery(value, res);
};
