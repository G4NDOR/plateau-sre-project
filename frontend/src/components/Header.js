// frontend/src/components/Header.js

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // This is a new hook you will create
import '../styles/Header.css'; // Your existing CSS file

function Header() {
    // This custom hook is the "authentication manager" for the component
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <header className="app-header">
            <div className="logo">
                <Link to="/">Plateau</Link>
            </div>
            <nav className="main-nav">
                {/* --- Always Visible Links --- */}
                <NavLink to="/menu">Menu</NavLink>

                {/* --- Links for Logged-In Owners/Managers --- */}
                {isAuthenticated && (user?.role === 'owner' || user?.role === 'manager') && (
                    <>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                        <NavLink to="/inventory">Inventory</NavLink>
                    </>
                )}

                {/* --- Links for Logged-In Employees --- */}
                {isAuthenticated && user?.role === 'employee' && (
                    <>
                        <NavLink to="/schedule">Schedule</NavLink>
                        <NavLink to="/training">Training</NavLink>
                    </>
                )}
            </nav>
            <div className="auth-actions">
                {isAuthenticated ? (
                    // If the user is logged in, show their name and a logout button
                    <>
                        <span className="welcome-user">Welcome, {user?.username}</span>
                        <button onClick={logout} className="logout-btn">Logout</button>
                    </>
                ) : (
                    // If the user is not logged in, show the login button
                    <NavLink to="/login" className="login-btn">Staff Login</NavLink>
                )}
            </div>
        </header>
    );
}

export default Header;
