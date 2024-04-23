import jwt, { VerifyErrors } from 'jsonwebtoken';
import express from 'express';
import { pool } from '../dbConnect.js';
import { RowDataPacket } from 'mysql2';
import { AuthResponse } from '../interfaces/auth/AuthResponse.js';
import { Roles } from '../enums/Roles.js';
import { ERROR_MESSAGE_401 } from '../enums/Messages.js';

export const selectTokenInstanceCheck: string = 
    'SELECT COUNT(u.user_id) as count FROM user u, account_data ad WHERE ad.account_data_id = u.account_data_id AND u.user_id = ? AND email = ? AND account_role = ?';

export interface DecodedToken {
    id: string,
    role: string,
    email: string,
    issuer: string
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
    console.log("Token: " + accessToken)
    authProcess(accessToken, res, next);
}

export const authenticate =async (req: express.Request, res: express.Response) => {
    const accessToken = req.cookies.jwt;
    authProcess(accessToken, res);
}

export const authProcess = async (accessToken: any, res: express.Response, next?: express.NextFunction) => {

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
                        console.log("user nicht gefunden?")
                    const authResponse: AuthResponse = { authenticated: false, role: Roles.NULL, errorMessage: ERROR_MESSAGE_401 };
                    return res.status(401).json( authResponse );
                    } else {
                        // if middleware expected
                        if(next) { 
                            console.log("Next");
                            next();
                        } else {
                            const authResponse: AuthResponse = { authenticated: true, role };
                            res.status(200).json( authResponse );
                        }

                    }
                    
                    
                } catch(error) {
                    console.log(error)
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

export const verifyUserJwt = async (accessToken: any) => {
    return new Promise<DecodedToken>((resolve, reject) => {
        jwt.verify(accessToken, 'secret', (err: VerifyErrors | null, decodedToken: any) => {
            if (err) { 
                console.log("jwt fehler!")
                reject(err); 
            } else {
                const token: DecodedToken = { id: decodedToken.id, role: decodedToken.role, email: decodedToken.email, issuer: "de.cars" }
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