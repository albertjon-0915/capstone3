import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../userContext';

export default function LogoutUser() {
    const { unsetUser, setUser } = useContext(UserContext);

    useEffect(() => {
        unsetUser();

        setUser({
            id: null,
            isAdmin: null
        });
    }, [unsetUser, setUser]); 

    return (
        <Navigate to='/' />
    );
}