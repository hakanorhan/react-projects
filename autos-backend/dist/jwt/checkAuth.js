import { authenticateUser } from './authenticate.js';
const checkAuth = async (req, res) => {
    const accessToken = req.cookies.jwt;
    console.log('### checkauth ###');
    authenticateUser(null, res, accessToken);
};
export default checkAuth;
