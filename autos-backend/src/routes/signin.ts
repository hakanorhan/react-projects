import express from "express";
import { AuthResponse } from "../interfaces/types.js";

export default async (req: express.Request, res: express.Response) => {
    const id = (req.user as any).id;
    const role = (req.user as any).role;
    const authResponse: AuthResponse = { authenticated: true,  role };
    res.status(201).json( authResponse );
};