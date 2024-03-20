import jwt from 'jsonwebtoken';
import { pool } from '../dbConnect.js';
import { selectTokenInstanceCheck } from '../statements/signupStatements.js';
const authenticate = async (req, res, next) => {
    const accessToken = req.cookies.jwt;
    let tokenVerified = false;
    let token;
    if (accessToken) {
        console.log("-------- checkAuth -----------");
        jwt.verify(accessToken, 'secret', (err, decodedToken) => {
            if (err) {
                console.log("Error: Zeile 26 " + err);
                return res.status(403).json({ authenticated: false });
            }
            else {
                console.log("Token verified: Zeile 29");
                tokenVerified = true;
                token = decodedToken;
            }
        });
    }
    else {
        console.log("Access Token not verified: Zeile 35");
        return res.status(403).json({ authenticated: false });
    }
    if (!token || !tokenVerified) {
        console.log("Token oder tokenVerified: Zeile 39");
        return res.status(403).json({ authenticated: false });
    }
    console.log("Prepare connection database");
    let connection;
    try {
        connection = await pool.getConnection();
        const queryResult = await connection.query(selectTokenInstanceCheck, [token.id, token.name, token.email, token.role]);
        const result = queryResult;
        console.log("Connection: database");
        if (result[0][0].count === 0) {
            console.log("User not found: Zeile 48");
            return res.status(401).json({ authenticated: false });
        }
        const authResponse = { authenticated: true, role: token.role };
        next();
    }
    catch (error) {
        console.log("Error: Zeile 55 " + error);
        return res.status(500).json({ message: 'Error occured. Please try again.' });
    }
    finally {
        connection?.release();
        console.log("----------------------------------------------------");
        console.log("");
    }
};
export const verifyUser = (accessToken) => {
    let userId = -1;
    jwt.verify(accessToken, 'secret', (err, decodedToken) => {
        userId = decodedToken.id;
        console.log(userId);
    });
    return userId;
};
export default authenticate;
