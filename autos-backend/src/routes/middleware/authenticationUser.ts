import { Request, Response, NextFunction } from "express";
import { Roles } from "../../constants/values.js"
import { AuthResponse } from "../../interfaces/types.js";

export default function (req: Request, res: Response) {
    
        if(req.isAuthenticated()) {
            const id = (req.user as any).id;
            const role = (req.user as any).role;
            
        const authResponse: AuthResponse = { role, authenticated: true };
        res.status(201).json(authResponse)
        } else {
        const authResponse: AuthResponse = { role: Roles.NULL, authenticated: false };
        res.status(401).json(authResponse)
        }
}
