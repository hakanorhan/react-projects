import { pool } from "../dbConnect.js";
import bcrypt from 'bcrypt';
import { REGEX_EMAIL, REGEX_PASSWORD } from "../regex/regex.js";
import { createToken } from "../jwt/jwtToken.js";
import { ERROR_MESSAGE_401 } from "../enums/Messages.js";
const selectQuery = 'SELECT * FROM account_data WHERE email = ?';
async function performQuery(requestData, res) {
    const { email, password } = requestData;
    let connection;
    if (!REGEX_EMAIL.test(email) && !REGEX_PASSWORD.test(password)) {
        return res.status(401).json({ message: 'Password or email invalid Server' });
    }
    try {
        connection = await pool.getConnection();
        const queryResult = await connection.query(selectQuery, [email]);
        const result = queryResult;
        if (result[0].length === 0) {
            const authResponse = { authenticated: false, role: null, errorMessage: ERROR_MESSAGE_401 };
            return res.status(401).json(authResponse);
        }
        const resultId = result[0][0].account_data_id;
        const resultPassword = result[0][0].password_secret;
        const resultEmail = result[0][0].email;
        const accountRole = result[0][0].account_role;
        bcrypt.compare(password, resultPassword).then(result => {
            if (result) {
                const authResponse = {
                    authenticated: true,
                    role: accountRole
                };
                const accessToken = createToken(resultId, resultEmail, accountRole);
                res.cookie('jwt', accessToken, { httpOnly: true, maxAge: 60 * 60 * 1000 });
                res.status(200).json(authResponse);
            }
            else {
                return res.status(401).json({ message: 'Bitte überprüfen Sie die Eingaben.' });
            }
        });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error occured. Please try again.' });
    }
    finally {
        connection?.release();
    }
}
export default async (req, res) => {
    const requestData = req.body;
    performQuery(requestData, res);
};
