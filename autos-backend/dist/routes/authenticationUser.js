import { Roles } from "../enums/Roles.js";
export default function (req, res) {
    console.log("###############");
    if (req.isAuthenticated()) {
        const id = req.user.id;
        const role = req.user.role;
        console.log("id: " + id + "rolle: " + role + " is authenticated: " + req.isAuthenticated());
        const authResponse = { role, authenticated: true };
        res.status(201).json(authResponse);
    }
    else {
        const authResponse = { role: Roles.NULL, authenticated: false };
        res.status(401).json(authResponse);
    }
}
