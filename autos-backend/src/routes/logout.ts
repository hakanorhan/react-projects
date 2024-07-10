import { Request, Response} from "express";

export default (req: Request, res: Response) => {

    if(req.isAuthenticated()) 
    req.logOut((error) => {
        if (error) {
            return res.status(500).json({ message: "Logout fehlgeschlagen" });
        }
        
        // Session beenden
        req.session.destroy((error) => {
            if (error) {
                return res.status(500).json({ message: "Logout fehlgeschlagen" });
            }

            console.log("Cookie zerstört");
            res.clearCookie("connect.sid");
            return res.status(200).json({ message: "Logout erfolgreich" });
        });
    });
    else return res.status(401).json({ message: "Sie sind nicht authentifiziert worden" })
};