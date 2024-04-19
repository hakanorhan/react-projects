import jwt, { VerifyErrors } from 'jsonwebtoken';
import express from 'express';
import { pool } from '../dbConnect.js';
import { RowDataPacket } from 'mysql2';
import { AuthResponse } from '../interfaces/auth/AuthResponse.js';
import { Roles } from '../enums/Roles.js';
import { ERROR_MESSAGE_401 } from '../enums/Messages.js';

export const selectTokenInstanceCheck: string = 
    'SELECT COUNT(account_data_id) as count FROM account_data WHERE account_data_id = ? AND email = ? AND role = ?';

export interface DecodedToken {
    id: string,
    role: string,
    email: string
}

/**
 * JWT verify.
 * Decoded Token: is instance of token exists in database
 * @param req Request
 * @param res Response
 * @param next not used
 * @returns 
 */
export const authenticateNext = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const accessToken = req.cookies.jwt;
    authenticateUser(null, res, accessToken, next);
}

async function authenticateUser(req: express.Request | null, res: express.Response, accessToken: any, next: express.NextFunction) {
    try {
        const decodedToken: DecodedToken = await verifyUserJwt(accessToken);
        
        let connection;
                try {
                    connection = await pool.getConnection();
                    const queryResult = await connection.query(selectTokenInstanceCheck, [decodedToken.id, decodedToken.email, decodedToken.role]);
                    const result = queryResult as RowDataPacket[];
                    
                    let role: Roles = getEnumAsRole(decodedToken.role);

                    // User not found
                    if(result[0][0].count === 0) {
                    const authResponse: AuthResponse = { authenticated: false, role: Roles.NULL, errorMessage: ERROR_MESSAGE_401 };
                    return res.status(401).json( authResponse );
                    } else { 
                    next();
                    }
                    
                    
                } catch(error) {
                    const authResponse: AuthResponse = { authenticated: false, role: Roles.NULL, errorMessage: ERROR_MESSAGE_401 };
                    return res.status(401).json( authResponse );
                } finally {
                    connection?.release();
                }
            } catch(error) {
                const authResponse: AuthResponse = { authenticated: false, role: Roles.NULL, errorMessage: ERROR_MESSAGE_401 };
                return res.status(401).json( authResponse );
            }
}

export const verifyUserJwt =async (accessToken: string) => {
    return new Promise<DecodedToken>((resolve, reject) => {
        jwt.verify(accessToken, 'secret', (err: VerifyErrors | null, decodedToken: any) => {
            if(err) reject(err);
            else {
                const token: DecodedToken = { id: decodedToken.id, role: decodedToken.role, email: decodedToken.email }
                resolve(token)
            };
        })
    })
}

const getEnumAsRole = (role: string) => {
    
    let enumRole: Roles;

    switch(role) {
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
}

export default authenticateNext;