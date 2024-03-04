import jwt, { VerifyErrors } from 'jsonwebtoken';
import express from 'express';

const checkAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const accessToken = req.cookies.jwt;
    console.log(accessToken + "Acces Token?")
    if(accessToken) {
        // if jwt exists
        jwt.verify(accessToken, 'secret', (err: VerifyErrors | null, decodedToken: any) => {
            if(err) {
                console.log(err.message);
                return res.status(403).json({ authenticated: false });
            } else {
                return res.status(200).json({ authenticated: true });
            }
        });
    } else {
        return res.status(403).json({ authenticated: false })
    }
}

export default checkAuth;