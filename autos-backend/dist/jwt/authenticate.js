import jwt from 'jsonwebtoken';
import { pool } from '../dbConnect.js';
import { selectTokenInstanceCheck } from '../statements/signupStatements.js';
const authenticate = async (req, res, next) => {
    const accessToken = req.cookies.jwt;
    console.log("#### Authenticate ###");
    authenticateUser(null, res, accessToken, next);
};
export async function authenticateUser(req, res, accessToken, next) {
    try {
        const decodedToken = await verifyUserJwt(accessToken);
        console.log("Prepare connection database");
        let connection;
        try {
            connection = await pool.getConnection();
            const queryResult = await connection.query(selectTokenInstanceCheck, [decodedToken.id, decodedToken.name, decodedToken.email, decodedToken.role]);
            const result = queryResult;
            console.log("Connection: database");
            if (result[0][0].count === 0) {
                console.log("User not found: Zeile 48");
                return res.status(401).json({ authenticated: false });
            }
            const authResponse = { authenticated: true, role: decodedToken.role };
            if (next) {
                next();
            }
            else {
                console.log("Normalerweise muss das hier ausgeführt werden! " + decodedToken.role);
                return res.status(200).json(authResponse);
            }
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
    }
    catch (error) {
        return res.status(403).json({ authenticated: false });
    }
}
export const verifyUserJwt = async (accessToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(accessToken, 'secret', (err, decodedToken) => {
            if (err)
                reject(err);
            else {
                const token = { id: decodedToken.id, email: decodedToken.email, role: decodedToken.role, name: decodedToken.name };
                resolve(token);
            }
            ;
        });
    });
};
export default authenticate;
