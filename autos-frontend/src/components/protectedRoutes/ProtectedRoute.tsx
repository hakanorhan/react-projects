import { useState, useEffect, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthResponse } from '../../../../autos-backend/src/interfaces/auth/AuthResponse';
import { Roles } from '../../../../autos-backend/src/enums/Roles';
import axios from 'axios';
import { URLs } from '../../../../autos-backend/src/enums/URLs';
import { useDispatch } from 'react-redux';
import { setRole } from '../../redux/features/userlogged';

interface ProtectedRoteProps {
    children: ReactNode,
    role: Roles
}

const ProtectedRoute = ({ children, role } : ProtectedRoteProps) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [useRole, setUseRole] = useState<string>(Roles.USER);
    const dispatch = useDispatch();

    useEffect(() => {
        const checkToken = async() => {
            try {
                const response = await axios.get<AuthResponse>(URLs.ORIGIN_SERVER + URLs.GET_CHECK_AUTH, { withCredentials: true });
                const authed = response.data.authenticated;
                const authRole = response.data.role;
                setAuthenticated(authed);

                // TODO: admin but jwt user
                if(authRole) {
                    dispatch(setRole(authRole))
                    setUseRole(authRole)
                }

        } catch(error) {

        } finally{
            setLoading(false)
        }
        }
        checkToken();
        
    }, [])

    if(loading) {
        return <p>Loading...</p>
    }
    if(authenticated && role === useRole) {
        return children
    } else {
        return <Navigate to='/signin' />
    }
};

export default ProtectedRoute;