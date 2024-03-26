import { useState, useEffect, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthResponse } from '../../../autos-backend/src/interfaces/auth/AuthResponse';
import { Roles } from '../../../autos-backend/src/enums/Roles';
import axios from 'axios';
import { URLs } from '../../../autos-backend/src/enums/URLs';

interface ProtectedRoteProps {
    children: ReactNode,
    role: Roles
}

const ProtectedRoute = ({ children, role } : ProtectedRoteProps) => {
    const [tokenInstance, setTokenInstance] = useState<AuthResponse>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkToken = async() => {

            await axios.get<AuthResponse>(`${URLs.ORIGIN_SERVER}${URLs.GET_CHECK_AUTH}`, { withCredentials: true })
            .then(response => { 
                const authResponse: AuthResponse = response.data;
                console.log(authResponse.authenticated + " " + authResponse.role + "  Inserieren!")
                setTokenInstance(authResponse);
                setLoading(false);
             })
            .catch(error => {
                const tokenInstanceTemp: AuthResponse = { authenticated: false, role: null }
                setTokenInstance(tokenInstanceTemp);
                setLoading(false)
                // TODO: handle error
                console.log(error);
            })
        }
        checkToken();
        
    }, [])

    if(loading) {
        return <p>Loading...</p>
    }
    if(tokenInstance?.role && tokenInstance?.authenticated && tokenInstance.role === role) {
        return children
    } else {
        return <Navigate to='/signin' />
    }
};

export default ProtectedRoute;