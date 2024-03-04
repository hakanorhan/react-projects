import jwt from 'jsonwebtoken';
const checkAuth = (req, res, next) => {
    const accessToken = req.cookies.jwt;
    console.log(accessToken + "Acces Token?");
    if (accessToken) {
        jwt.verify(accessToken, 'secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                return res.status(403).json({ authenticated: false });
            }
            else {
                return res.status(200).json({ authenticated: true });
            }
        });
    }
    else {
        return res.status(403).json({ authenticated: false });
    }
};
export default checkAuth;
