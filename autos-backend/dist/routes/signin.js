import { pool } from "../dbConnect.js";
import bcrypt from 'bcrypt';
import { REGEX_EMAIL, REGEX_PASSWORD } from "../regex/regex.js";
import jwt from 'jsonwebtoken';
const selectQuery = 'SELECT * FROM person WHERE email = ?';
async function performQuery(requestData, res) {
    const { email, password } = requestData;
    let connection;
    console.log("Ausgabe: " + email.match(REGEX_EMAIL) + " " + password.match(REGEX_PASSWORD));
    if (!REGEX_EMAIL.test(email) && !REGEX_PASSWORD.test(password)) {
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
        const resultEmail = result[0][0].email;
        const resultPersonId = result[0][0].personid;
        const name = result[0][0].name;
        bcrypt.compare(password, resultPassword).then(result => {
            if (result) {
                const accesToken = jwt.sign(resultEmail, "secret");
                const responseSignInData = {
                    personId: resultPersonId,
                    name: name,
                    email: resultEmail,
                    accesToken: accesToken
                };
                return res.status(200).send(responseSignInData);
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
        connection?.release();
    }
}
export default async (req, res) => {
    const requestData = req.body;
    performQuery(requestData, res);
};
