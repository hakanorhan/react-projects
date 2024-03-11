import axios from "axios";
import { AuthResponse } from '../../../autos-backend/src/interfaces/auth/AuthResponse';
import { URLs } from "../../../autos-backend/src/enums/URLs";
const tokenExists = async(): Promise<AuthResponse> => {
    try {
        const response = await axios.get<AuthResponse>(`${URLs.ORIGIN_SERVER}${URLs.GET_CHECK_AUTH}`, { withCredentials: true });
        return response.data
    } catch(error) {
        const response: AuthResponse = { authenticated: false, role: null };
        return response;
    }
};

export default tokenExists;