import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import tokenExists from '../helper/tokenExists';
import { AuthResponse } from '../../../autos-backend/src/interfaces/auth/AuthResponse';
import { Roles } from '../../../autos-backend/src/enums/Roles';

const ProtectedRoute = ({ children }) => {
    const [tokenInstance, setTokenInstance] = useState<AuthResponse>();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const checkToken = async() => {
            try {
                const exists = await tokenExists();
                const tokenInstanceTemp: AuthResponse = { authenticated: exists.authenticated, role: exists.role }
                console.log(tokenInstanceTemp)
                setTokenInstance(tokenInstanceTemp);
            } catch(error) {
                const tokenInstanceTemp: AuthResponse = { authenticated: false, role: null }
                setTokenInstance(tokenInstanceTemp);
            } finally {
                setLoading(false)
            }
        }
        checkToken();
    }, [])

    if(loading) {
        return <p>Loading...</p>
    }

    return tokenInstance?.authenticated && tokenInstance.role === Roles.USER ? children : <Navigate to='/signin' />
};

export default ProtectedRoute;