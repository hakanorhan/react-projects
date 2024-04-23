import { useState, useEffect, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthResponse } from '../../../../autos-backend/src/interfaces/auth/AuthResponse';
import { Roles } from '../../../../autos-backend/src/enums/Roles';
import axios from 'axios';
import { URLs } from '../../../../autos-backend/src/enums/URLs';
import { useDispatch, useSelector } from 'react-redux';
import { setRole, setUserLoggedIn } from '../../redux/features/userlogged';
import { notifyError } from '../../helper/toastHelper';
import { RootState } from '../../redux/store';

interface ProtectedRoteProps {
    children: ReactNode,
    role: Roles
}

const ProtectedRoute = ({ children, role } : ProtectedRoteProps) => {
    const [loading, setLoading] = useState(true);
    const userLoggedStatus = useSelector((state: RootState) => state.userLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        const checkToken = async() => {
            try {
                const response = await axios.get<AuthResponse>(URLs.ORIGIN_SERVER + URLs.GET_CHECK_AUTH, { withCredentials: true });
                const authed = response.data.authenticated;
                dispatch(setUserLoggedIn(authed));
                const authRole = response.data.role;
                dispatch(setRole(authRole));

        } catch(error) {
            console.log(error);
        } finally{
            setLoading(false)
        }
        }
        checkToken();
        
    }, [])

    if(loading) {
        return <p>Loading...</p>
    }
    if(userLoggedStatus.userLoggedIn && role === userLoggedStatus.role) {
        
        return children
    } else {
        dispatch(setRole(Roles.NULL));
        dispatch(setUserLoggedIn(false));
        return <Navigate to= { URLs.POST_SIGNIN } />
    }
};

export default ProtectedRoute;