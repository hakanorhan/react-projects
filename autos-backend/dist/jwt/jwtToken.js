import jwt from 'jsonwebtoken';
export const createToken = (id, name, email, role) => {
    const expiresIn = 3600;
    return jwt.sign({ id: id, name: name, email: email, role: role, expiresIn: expiresIn }, 'secret', { expiresIn: expiresIn });
};
