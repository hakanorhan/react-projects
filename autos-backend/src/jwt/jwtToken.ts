import jwt from 'jsonwebtoken';

/**
 * 
 * @param id personid
 */
export const createToken = (id: string, name: string, email: string, role: string) => {
    // 3600s 
    const expiresIn: number = 3_600;
    return jwt.sign({ id: id, name: name, email: email, role: role, expiresIn: expiresIn }, 'secret', { expiresIn: expiresIn })
}