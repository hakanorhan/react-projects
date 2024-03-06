import jwt, { VerifyErrors } from 'jsonwebtoken';
import express from 'express';
import { pool } from '../dbConnect.js';
import { selectTokenInstanceCheck } from '../statements/signupStatements.js';
import { RowDataPacket } from 'mysql2';
import { AuthResponse } from '../interfaces/auth/AuthResponse.js';

/**
 * JWT verify.
 * Decoded Token: is instance of token exists in database
 * @param req Request
 * @param res Response
 * @param next not used
 * @returns 
 */
const checkAuth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const accessToken = req.cookies.jwt;
    let tokenVerified: boolean = false;
    let token: any;

    if(accessToken) {

        // if jwt exists
        jwt.verify(accessToken, 'secret', (err: VerifyErrors | null, decodedToken: any) => {
            if(err) {
                return res.status(403).json({ authenticated: false });
            } else {
                tokenVerified = true;
                token = decodedToken;
            }
        });
    } else {
        return res.status(403).json({ authenticated: false })
    }

    if(!token || !tokenVerified ) { return res.status(403).json({ authenticated: false }) }
    
    let connection;
            try {
                connection = await pool.getConnection();
                const queryResult = await connection.query(selectTokenInstanceCheck, [token.id, token.name, token.email, token.role]);
                const result = queryResult as RowDataPacket[];
                // Email not found
                if(result[0][0].count === 0) {
                return res.status(401).json({ authenticated: false });
                } 
                const authResponse: AuthResponse = { authenticated: true, role: token.role };
                return res.status(200).json(  authResponse  );
            } catch(error) {
                return res.status(500).json({message:'Error occured. Please try again.'});
            } finally {
                connection?.release;
            }
}

export default checkAuth;

/*
// compare data from database
            let connection;
            try {
                connection = await pool.getConnection();
                const queryResult = await connection.query(selectTokenInstanceCheck, [decodedToken.id, decodedToken.name, decodedToken.email, decodedToken.role]);
                const result = queryResult as RowDataPacket[];
                // Email not found
                if(result[0][0].count === 0) {
                return res.status(401).json({ authenticated: false });
                } 
            } catch(error) {
                return res.status(500).json({message:'Error occured. Please try again.'});
            } finally {
                connection?.release;
            }

            if(err) {
                console.log(err.message);
                return res.status(403).json({ authenticated: false });
            } else {
                return res.status(200).json({ authenticated: true });
            }

*/