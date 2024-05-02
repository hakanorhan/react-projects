import { Request, Response, NextFunction } from "express";
import { UserInformation } from "../interfaces/auth/UserInformation.js";
import { Roles } from "../enums/Roles.js";
import { AuthResponse } from "../interfaces/auth/AuthResponse.js";

export default function (req: Request, res: Response) {
    if (req.session.isAuth) {
        const authResponse: AuthResponse = { role: Roles.USER, authenticated: true };
        res.status(201).json(authResponse)
    }
    else {
        const authResponse: AuthResponse = { role: Roles.NULL, authenticated: false };
        res.status(401).json(authResponse)
    }
}
