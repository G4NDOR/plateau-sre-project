// frontend/src/hooks/useAuth.js

import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 > Date.now()) {
                    setUser(decoded);
                    setIsAuthenticated(true);
                } else {
                    localStorage.removeItem('accessToken');
                }
            } catch (error) {
                console.error("Invalid token:", error);
                localStorage.removeItem('accessToken');
            }
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('accessToken');
        setUser(null);
        setIsAuthenticated(false);
        window.location.href = '/login';
    };

    return { user, isAuthenticated, logout };
};
