import jwt from 'jsonwebtoken';
import { pool } from '../dbConnect.js';
export const selectTokenInstanceCheck = 'SELECT COUNT(account_data_id) as count FROM account_data WHERE account_data_id = ? AND email = ? AND role = ?';
const authenticate = async (req, res, next) => {
    const accessToken = req.cookies.jwt;
    authenticateUser(null, res, accessToken, next);
};
export async function authenticateUser(req, res, accessToken, next) {
    try {
        const decodedToken = await verifyUserJwt(accessToken);
        let connection;
        try {
            connection = await pool.getConnection();
            const queryResult = await connection.query(selectTokenInstanceCheck, [decodedToken.id, decodedToken.email, decodedToken.role]);
            const result = queryResult;
            console.log("result: " + result);
            if (result[0][0].count === 0) {
                return res.status(401).json({ authenticated: false });
            }
            const authResponse = { authenticated: true, role: decodedToken.role };
            if (next) {
                next();
            }
            else {
                return res.status(200).json(authResponse);
            }
        }
        catch (error) {
            return res.status(500).json({ message: 'Error occured. Please try again.' });
        }
        finally {
            connection?.release();
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
                const token = { id: decodedToken.id, role: decodedToken.role, email: decodedToken.email };
                resolve(token);
            }
            ;
        });
    });
};
export default authenticate;
