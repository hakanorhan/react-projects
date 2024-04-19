import jwt from 'jsonwebtoken';
import { pool } from '../dbConnect.js';
import { Roles } from '../enums/Roles.js';
import { ERROR_MESSAGE_401 } from '../enums/Messages.js';
export const selectTokenInstanceCheck = 'SELECT COUNT(account_data_id) as count FROM account_data WHERE account_data_id = ? AND email = ? AND role = ?';
export const authenticateNext = async (req, res, next) => {
    const accessToken = req.cookies.jwt;
    authenticateUser(null, res, accessToken, next);
};
async function authenticateUser(req, res, accessToken, next) {
    try {
        const decodedToken = await verifyUserJwt(accessToken);
        let connection;
        try {
            connection = await pool.getConnection();
            const queryResult = await connection.query(selectTokenInstanceCheck, [decodedToken.id, decodedToken.email, decodedToken.role]);
            const result = queryResult;
            let role = getEnumAsRole(decodedToken.role);
            if (result[0][0].count === 0) {
                const authResponse = { authenticated: false, role: Roles.NULL, errorMessage: ERROR_MESSAGE_401 };
                return res.status(401).json(authResponse);
            }
            else {
                next();
            }
        }
        catch (error) {
            const authResponse = { authenticated: false, role: Roles.NULL, errorMessage: ERROR_MESSAGE_401 };
            return res.status(401).json(authResponse);
        }
        finally {
            connection?.release();
        }
    }
    catch (error) {
        const authResponse = { authenticated: false, role: Roles.NULL, errorMessage: ERROR_MESSAGE_401 };
        return res.status(401).json(authResponse);
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
const getEnumAsRole = (role) => {
    let enumRole;
    switch (role) {
        case Roles.ADMIN:
            enumRole = Roles.ADMIN;
            break;
        case Roles.USER:
            enumRole = Roles.USER;
            break;
        default:
            enumRole = Roles.NULL;
            break;
    }
    return enumRole;
};
export default authenticateNext;
