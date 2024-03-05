import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import tokenExists from '../helper/tokenExists';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const checkToken = async() => {
            try {
                const exists = await tokenExists();
                setAuthenticated(exists);
                alert(exists)
            } catch(error) {
                setAuthenticated(false);
            } finally {
                setLoading(false)
            }
        }
        checkToken();
    }, [])

    if(loading) {
        return <p>Loading...</p>
    }

    return isAuthenticated ? children : <Navigate to='/signin' />
};

export default ProtectedRoute;