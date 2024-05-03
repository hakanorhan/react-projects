export default (req, res) => {
    if (req.isAuthenticated())
        req.logOut((error) => {
            if (error) {
                console.log("Fehler beim Ausloggen: " + error);
                return res.status(500).json({ message: "Logout fehlgeschlagen" });
            }
            req.session.destroy((error) => {
                if (error) {
                    console.log("Fehler beim Zerstören der Sitzung: " + error);
                    return res.status(500).json({ message: "Logout fehlgeschlagen" });
                }
                console.log("Cookie zerstört");
                res.clearCookie("connect.sid");
                return res.status(200).json({ message: "Logout erfolgreich" });
            });
        });
    else
        return res.status(401).json({ message: "" });
};
