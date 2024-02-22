import jwt from 'jsonwebtoken';

/**
 * 
 * @param id personid
 */
export const createToken = (id: string) => {
    return jwt.sign({ id }, 'secret', { expiresIn: 600_000 })
}