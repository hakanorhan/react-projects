import { pool } from "../dbConnect.js";
import bcrypt from 'bcrypt';
import { REGEX_EMAIL, REGEX_PASSWORD } from "../regex/Regex.js";
const selectQuery = 'SELECT * FROM person WHERE email = ?';
async function performQuery(requestData, res) {
    console.log("Hallo");
    const { email, password } = requestData;
    const connection = await pool.getConnection();
    try {
        if (!email.match(REGEX_EMAIL || !password.match(REGEX_PASSWORD))) {
            return console.log("Email or password not matches");
        }
        const queryResult = await connection.query(selectQuery, [email]);
        const result = queryResult;
        if (result[0].length === 0) {
            console.log("Email not found");
            return;
        }
        const resultPassword = result[0][0].password;
        bcrypt.compare(password, resultPassword).then(result => {
            if (result) {
                console.log('password matches');
            }
            else {
                console.log('password do not matches');
            }
        });
    }
    catch (error) {
        console.error('Error fetching user:', error);
    }
    finally {
        connection.release();
    }
}
export default async (req, res) => {
    const requestData = req.body;
    performQuery(requestData, res);
};
