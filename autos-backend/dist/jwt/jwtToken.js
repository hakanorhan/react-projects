import jwt from 'jsonwebtoken';
export const createToken = (id) => {
    return jwt.sign({ id }, 'secret', { expiresIn: 600000 });
};
