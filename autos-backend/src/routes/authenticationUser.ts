import { Request, Response, NextFunction } from "express";
import { UserInformation } from "../interfaces/auth/UserInformation.js";
import { Roles } from "../enums/Roles.js";
import { AuthResponse } from "../interfaces/auth/AuthResponse.js";

export default function (req: Request, res: Response) {
    console.log("###############")
    
        if(req.isAuthenticated()) {
            const id = (req.user as any).id;
            const role = (req.user as any).role;
            console.log("id: " + id + "rolle: " + role + " is authenticated: " + req.isAuthenticated());
            
        const authResponse: AuthResponse = { role, authenticated: true };
        res.status(201).json(authResponse)
        } else {
        const authResponse: AuthResponse = { role: Roles.NULL, authenticated: false };
        res.status(401).json(authResponse)
        }
}
