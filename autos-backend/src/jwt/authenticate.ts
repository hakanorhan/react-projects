import jwt, { VerifyErrors } from 'jsonwebtoken';
import express from 'express';
import { pool } from '../dbConnect.js';
import { selectTokenInstanceCheck } from '../statements/signupStatements.js';
import { RowDataPacket } from 'mysql2';
import { AuthResponse } from '../interfaces/auth/AuthResponse.js';

export interface DecodedToken {
    id: string,
    role: string,
    name: string
}

/**
 * JWT verify.
 * Decoded Token: is instance of token exists in database
 * @param req Request
 * @param res Response
 * @param next not used
 * @returns 
 */
const authenticate = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const accessToken = req.cookies.jwt;
    authenticateUser(null, res, accessToken, next);
}

export async function authenticateUser(req: express.Request | null, res: express.Response, accessToken: any, next?: express.NextFunction) {
    try {
        const decodedToken: DecodedToken = await verifyUserJwt(accessToken);
        
        let connection;
                try {
                    connection = await pool.getConnection();
                    const queryResult = await connection.query(selectTokenInstanceCheck, [decodedToken.id, decodedToken.name, decodedToken.role]);
                    const result = queryResult as RowDataPacket[];
                    // User not found
                    if(result[0][0].count === 0) {
                    return res.status(401).json({ authenticated: false });
                    } 
                    const authResponse: AuthResponse = { authenticated: true, role: decodedToken.role };
                    if(next) {
                    next();
                    } else {
                        return res.status(200).json( authResponse );
                    }
                    
                } catch(error) {
                    return res.status(500).json({message:'Error occured. Please try again.'});
                } finally {
                    connection?.release();
                }
            } catch(error) {
                //console.log(error);
                return res.status(403).json({ authenticated: false });
            }
}

export const verifyForInserate =async (accessToken: string) => {
    return new Promise<DecodedToken>((resolve, reject) => {
        jwt.verify(accessToken, 'secret', (err: VerifyErrors | null, decodedToken: any) => {
            if(err) reject(err);
            else {
                const token: DecodedToken = { id: decodedToken.id, role: decodedToken.role, name: decodedToken.name }
                resolve(token)
            };
        })
    })
}

export const verifyUserJwt =async (accessToken: string) => {
    return new Promise<DecodedToken>((resolve, reject) => {
        jwt.verify(accessToken, 'secret', (err: VerifyErrors | null, decodedToken: any) => {
            if(err) reject(err);
            else {
                const token: DecodedToken = { id: decodedToken.id, role: decodedToken.role, name: decodedToken.name }
                resolve(token)
            };
        })
    })
}

export default authenticate;