import jwt, { VerifyErrors } from 'jsonwebtoken';
import express from 'express';
import { pool } from '../dbConnect.js';
import { selectTokenInstanceCheck } from '../statements/signupStatements.js';
import { RowDataPacket } from 'mysql2';
import { AuthResponse } from '../interfaces/auth/AuthResponse.js';
import { authenticateUser } from './authenticate.js';

/**
 * JWT verify.
 * Decoded Token: is instance of token exists in database
 * @param req Request
 * @param res Response
 * @param next not used
 * @returns 
 */
const checkAuth = async (req: express.Request, res: express.Response) => {
    const accessToken = req.cookies.jwt;
    console.log('### checkauth ###')
    authenticateUser(null, res, accessToken);
}

export default checkAuth;