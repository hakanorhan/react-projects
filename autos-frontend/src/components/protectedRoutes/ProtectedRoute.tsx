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
import { UserInformation } from '../../../../autos-backend/src/interfaces/auth/UserInformation';

interface ProtectedRoteProps {
    children: ReactNode,
    role: Roles
}

const ProtectedRoute = ({ children, role } : ProtectedRoteProps) => {
    const [loading, setLoading] = useState(true);
    const userLoggedStatus = useSelector((state: RootState) => state.userLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        const checkAuth = async() => {
            try {
                const response = await axios.get<UserInformation>(URLs.ORIGIN_SERVER + URLs.AUTHENTICATION_USER, { withCredentials: true });
                const authResponse: AuthResponse = response.data;
                const logged = authResponse.authenticated;
                dispatch(setUserLoggedIn(logged));
                const authRole = authResponse.role;
                dispatch(setRole(authRole));
                setLoading(false);

        } catch(error: any) {
            console.log(error);
            const authResponse: AuthResponse = error.response.data;
            const logged = authResponse.authenticated;
                dispatch(setUserLoggedIn(logged));
                const authRole = authResponse.role;
                dispatch(setRole(authRole));
                setLoading(false);

        } 
        }
        checkAuth();
        
    }, [dispatch])
    // TODO: loading
    return loading ? <div style={{ width:'500px', height:'600px', backgroundColor:'yellow' }}>Hallo</div> : userLoggedStatus.userLoggedIn && role === userLoggedStatus.role
        ? children : <Navigate to= { URLs.POST_SIGNIN } />
};

export default ProtectedRoute;