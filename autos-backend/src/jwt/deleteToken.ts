import express from "express";

import { AuthResponse } from "../interfaces/auth/AuthResponse.js";
import { Roles } from "../enums/Roles.js";

export default async (req: express.Request, res: express.Response) => {
    console.log("hallo!");
    res.cookie('jwt', '', { expires: new Date(0) });
    const authResponse: AuthResponse = { authenticated: false, role: Roles.NULL};
    res.status(200).json( authResponse );

}