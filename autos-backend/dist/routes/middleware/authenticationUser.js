import { Roles } from "../../enums/Roles.js";
export default function (req, res) {
    if (req.isAuthenticated()) {
        const id = req.user.id;
        const role = req.user.role;
        const authResponse = { role, authenticated: true };
        res.status(201).json(authResponse);
    }
    else {
        const authResponse = { role: Roles.NULL, authenticated: false };
        res.status(401).json(authResponse);
    }
}
