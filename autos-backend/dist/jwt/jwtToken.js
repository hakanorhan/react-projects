import jwt from 'jsonwebtoken';
export const createToken = (id, email, role) => {
    const expiresIn = 3600;
    return jwt.sign({ id: id, email: email, role: role, issuer: 'de.cars', expiresIn: expiresIn }, 'secret', { expiresIn: expiresIn });
};
