import jwt, { VerifyErrors } from 'jsonwebtoken';
import express from 'express';

const authenticate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const accessToken = req.cookies.jwt;
    console.log(accessToken)
    if(accessToken) {
        // if jwt exists
        jwt.verify(accessToken, 'secret', (err: VerifyErrors | null, decodedToken: any) => {
            if(err) {
                console.log("not logged in!")
                console.log(err.message);
            } else {
                console.log("Tut sich etwas")
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.status(200).json({ name: "Token not existent!" })
    }
}

export default authenticate;