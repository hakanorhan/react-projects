import jwt from 'jsonwebtoken';
import { pool } from '../dbConnect.js';
import { Roles } from '../enums/Roles.js';
import { ERROR_MESSAGE_401 } from '../enums/Messages.js';
export const selectTokenInstanceCheck = 'SELECT COUNT(u.user_id) as count FROM user u, account_data ad WHERE ad.account_data_id = u.account_data_id AND u.user_id = ? AND email = ? AND account_role = ?';
export const authenticateNext = async (req, res, next) => {
    const accessToken = req.cookies.jwt;
    console.log("Token: " + accessToken);
    authProcess(accessToken, res, next);
};
export const authenticate = async (req, res) => {
    const accessToken = req.cookies.jwt;
    authProcess(accessToken, res);
};
export const authProcess = async (accessToken, res, next) => {
    try {
        const decodedToken = await verifyUserJwt(accessToken);
        let connection;
        try {
            connection = await pool.getConnection();
            const queryResult = await connection.query(selectTokenInstanceCheck, [decodedToken.id, decodedToken.email, decodedToken.role]);
            const result = queryResult;
            let role = getEnumAsRole(decodedToken.role);
            if (result[0][0].count === 0) {
                console.log("user nicht gefunden?");
                const authResponse = { authenticated: false, role: Roles.NULL, errorMessage: ERROR_MESSAGE_401 };
                return res.status(401).json(authResponse);
            }
            else {
                if (next) {
                    console.log("Next");
                    next();
                }
                else {
                    const authResponse = { authenticated: true, role };
                    res.status(200).json(authResponse);
                }
            }
        }
        catch (error) {
            console.log(error);
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
};
export const verifyUserJwt = async (accessToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(accessToken, 'secret', (err, decodedToken) => {
            if (err) {
                console.log("jwt fehler!");
                reject(err);
            }
            else {
                const token = { id: decodedToken.id, role: decodedToken.role, email: decodedToken.email, issuer: "de.cars" };
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
