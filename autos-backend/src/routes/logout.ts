import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    console.log("Logout!");

    req.logOut((error) => {
        if (error) {
            console.log("Fehler beim Ausloggen: " + error);
            return res.status(500).json({ message: "Logout fehlgeschlagen" });
        }
        
        // Zerstörung der Sitzung und des Cookies
        req.session.destroy((error) => {
            if (error) {
                console.log("Fehler beim Zerstören der Sitzung: " + error);
                return res.status(500).json({ message: "Logout fehlgeschlagen" });
            }

            console.log("Cookie zerstört");
            res.clearCookie("connect.sid");
            return res.status(302).json({ message: "Logout erfolgreich" });
        });
    });
};