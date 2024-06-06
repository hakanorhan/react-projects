import { useEffect, ReactNode } from 'react';
import { AuthResponse } from '../../interfaces/types';
import { Roles } from '../../enums/Roles';
import axios from 'axios';
import { URLs } from '../../enums/URLs';
import { useDispatch, useSelector } from 'react-redux';
import { setRole, setUserLoggedIn } from '../../redux/features/userlogged';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

interface ProtectedRoteProps {
    children: ReactNode,
    role: Roles
}

const ProtectedRoute = ({ children, role }: ProtectedRoteProps) => {
    const userLoggedStatus = useSelector((state: RootState) => state.userLoggedIn);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get<AuthResponse>(URLs.ORIGIN_SERVER + URLs.AUTHENTICATION_USER, { withCredentials: true });
                const authResponse: AuthResponse = response.data;
                const logged = authResponse.authenticated;
                dispatch(setUserLoggedIn(logged));
                const authRole = authResponse.role;
                dispatch(setRole(authRole));
                if (role !== authRole )
                    return navigate(URLs.ACCESS_DENIED);
            } catch (error: any) {
                const authResponse: AuthResponse = error.response.data;
                const logged = authResponse.authenticated;
                dispatch(setUserLoggedIn(logged));
                const authRole = authResponse.role;
                dispatch(setRole(authRole));
                navigate(URLs.ACCESS_DENIED);
            }
        }
        checkAuth();

    }, [])

    if(userLoggedStatus.userLoggedIn && role === userLoggedStatus.role) {
        return children
    } 
};

export default ProtectedRoute;