// frontend/src/components/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    const isAuthenticated = !!localStorage.getItem('accessToken');

    // If the user is authenticated, render the child component (the protected page)
    // Otherwise, redirect them to the login page
    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
