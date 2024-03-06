import axios from "axios";
import { AuthResponse } from '../../../autos-backend/src/interfaces/auth/AuthResponse';
const tokenExists = async(): Promise<AuthResponse> => {
    try {
        const response = await axios.get<AuthResponse>('http://localhost:3001/api/checkauth', { withCredentials: true });
        return response.data
    } catch(error) {
        const response: AuthResponse = { authenticated: false, role: null };
        return response;
    }
};

export default tokenExists;