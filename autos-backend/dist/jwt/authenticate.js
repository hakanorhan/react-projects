import jwt from 'jsonwebtoken';
const authenticate = (req, res, next) => {
    const accessToken = req.cookies.jwt;
    console.log(accessToken);
    if (accessToken) {
        jwt.verify(accessToken, 'secret', (err, decodedToken) => {
            if (err) {
                console.log("not logged in!");
                console.log(err.message);
            }
            else {
                console.log(decodedToken);
                next();
            }
        });
    }
    else {
        res.status(200).json({ name: "Token not existent!" });
    }
};
export default authenticate;
