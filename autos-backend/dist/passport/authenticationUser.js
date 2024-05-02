export default function (req, res, next) {
    if (req.isAuthenticated()) {
        const userId = req.user.id;
        const role = req.user.role;
        console.log("id: " + userId + " Rolle: " + role);
        const userInformation = { id: userId, role, authenticated: true };
        res.status(200).json(userInformation);
        next();
    }
    else
        res.status(401).json({ user: null, authenticated: req.isAuthenticated() });
}
