import { Roles } from "../enums/Roles.js";
export default function (req, res) {
    if (req.session.isAuth) {
        const authResponse = { role: Roles.USER, authenticated: true };
        res.status(201).json(authResponse);
    }
    else {
        const authResponse = { role: Roles.NULL, authenticated: false };
        res.status(401).json(authResponse);
    }
}
