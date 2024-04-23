import { Roles } from "../enums/Roles.js";
export default async (req, res) => {
    console.log("hallo!");
    res.cookie('jwt', '', { expires: new Date(0) });
    const authResponse = { authenticated: false, role: Roles.NULL };
    res.status(200).json(authResponse);
};
