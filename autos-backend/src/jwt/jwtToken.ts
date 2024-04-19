import jwt from 'jsonwebtoken';

/**
 * 
 * @param id account_data_id
 */
export const createToken = (id: string, email: string, role: string) => {
    // 3600s 
    const expiresIn: number = 3_600;
    return jwt.sign({ id: id, email: email, role: role, issuer: 'de.cars', expiresIn: expiresIn }, 'secret', { expiresIn: expiresIn })
}