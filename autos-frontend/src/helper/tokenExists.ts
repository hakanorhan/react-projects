import axios from "axios";

const tokenExists = async(): Promise<boolean> => {
    try {
        const response = await axios.get('http://localhost:3001/api/checkauth', { withCredentials: true });
        return response.data.authenticated
    } catch(error) {
        return false;
    }
};

export default tokenExists;