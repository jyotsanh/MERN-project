import React, { createContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    useEffect(() => {
        // Load token from cookies when the component mounts
        setToken(cookies.token || null);
    }, [cookies.token]);

    const login = (newToken) => {
        setToken(newToken);
        setCookie('token', newToken, { path: '/' });
    };

    const logout = () => {
        setToken(null);
        removeCookie('token', { path: '/' });
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
