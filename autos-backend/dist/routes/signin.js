import { pool } from "../dbConnect.js";
import bcrypt from 'bcrypt';
import { REGEX_EMAIL, REGEX_PASSWORD } from "../regex/regex.js";
import { createToken } from "../jwt/jwtToken.js";
const selectQuery = 'SELECT * FROM person WHERE email = ?';
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
            return res.status(401).json({ message: 'Wrong email address or password' });
        }
        const resultPassword = result[0][0].password;
        const resultPersonId = result[0][0].personid;
        const resultEmail = result[0][0].email;
        const resultName = result[0][0].name;
        const resultRole = result[0][0].role;
        bcrypt.compare(password, resultPassword).then(result => {
            if (result) {
                const responseSignInData = {
                    personId: resultPersonId,
                    name: resultName,
                    role: resultRole
                };
                const accessToken = createToken(resultPersonId, resultName, resultEmail, resultRole);
                res.cookie('jwt', accessToken, { httpOnly: true, maxAge: 60 * 60 * 1000 });
                res.status(201).send(responseSignInData);
            }
            else {
                return res.status(401).json({ message: 'Unauthorized' });
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
