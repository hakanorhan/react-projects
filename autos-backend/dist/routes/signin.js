import { pool } from "../dbConnect.js";
import bcrypt from 'bcrypt';
import { REGEX_EMAIL, REGEX_PASSWORD } from "../regex/regex.js";
const selectQuery = 'SELECT * FROM person WHERE email = ?';
async function performQuery(requestData, res) {
    const { email, password } = requestData;
    let connection;
    console.log("Ausgabe: " + email.match(REGEX_EMAIL) + " " + password.match(REGEX_PASSWORD));
    if (email.match(REGEX_EMAIL) == null || password.match(REGEX_PASSWORD) == null) {
        return res.status(401).json({ message: 'Password or email invalid Server' });
    }
    try {
        connection = await pool.getConnection();
        const queryResult = await connection.query(selectQuery, [email]);
        const result = queryResult;
        if (result[0].length === 0) {
            console.log("emal not found");
            return res.status(401).json({ message: 'Wrong email address or password' });
        }
        const resultPassword = result[0][0].password;
        bcrypt.compare(password, resultPassword).then(result => {
            if (result) {
                return res.status(200).json({ message: 'Hello Hakan' });
            }
            else {
                return res.status(401).json({ message: 'Wrong email address or password' });
            }
        });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error occured. Please try again.' });
    }
    finally {
        console.log("Executed!");
        connection?.release();
    }
}
export default async (req, res) => {
    const requestData = req.body;
    performQuery(requestData, res);
};
