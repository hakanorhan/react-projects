import jwt from 'jsonwebtoken';
import { pool } from '../dbConnect.js';
import { selectTokenInstanceCheck } from '../statements/signupStatements.js';
const checkAuth = async (req, res, next) => {
    const accessToken = req.cookies.jwt;
    let tokenVerified = false;
    let token;
    if (accessToken) {
        jwt.verify(accessToken, 'secret', (err, decodedToken) => {
            if (err) {
                return res.status(403).json({ authenticated: false });
            }
            else {
                tokenVerified = true;
                token = decodedToken;
            }
        });
    }
    else {
        return res.status(403).json({ authenticated: false });
    }
    if (!token || !tokenVerified) {
        return res.status(403).json({ authenticated: false });
    }
    let connection;
    try {
        connection = await pool.getConnection();
        const queryResult = await connection.query(selectTokenInstanceCheck, [token.id, token.name, token.email, token.role]);
        const result = queryResult;
        if (result[0][0].count === 0) {
            return res.status(401).json({ authenticated: false });
        }
        console.log("Token vorhanden!");
        const authResponse = { authenticated: true, role: token.role };
        return res.status(200).json(authResponse);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error occured. Please try again.' });
    }
    finally {
        connection?.release;
    }
};
export default checkAuth;
