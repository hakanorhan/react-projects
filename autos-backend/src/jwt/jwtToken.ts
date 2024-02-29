import jwt from 'jsonwebtoken';

/**
 * 
 * @param id personid
 */
export const createToken = (id: string) => {
    // 3600s 
    return jwt.sign({ id }, 'secret', { expiresIn: 3_600 })
}