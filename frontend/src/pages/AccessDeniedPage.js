// frontend/src/components/AccessDeniedPage.js

import React from 'react';

const ActionButton = ({ href, children, primary = false }) => {
    const style = {
        display: 'inline-block',
        padding: '10px 20px',
        margin: '10px',
        border: '1px solid #007bff',
        borderRadius: '5px',
        textDecoration: 'none',
        backgroundColor: primary ? '#007bff' : 'white',
        color: primary ? 'white' : '#007bff',
        fontWeight: 'bold',
    };
    return <a href={href} style={style}>{children}</a>;
};

function AccessDeniedPage({ error }) {
    let title = "Access Denied";
    let message = "You do not have permission to view this page.";
    let showLogin = true;
    let showMenu = true;

    if (error.includes('You must be logged in')) {
        title = "Authorization Required";
        message = "This page is restricted to authorized personnel. If you are a customer, please visit our menu.";
    } else if (error.includes('Your session has expired')) {
        title = "Session Expired";
        message = "Your login session has expired. Please log in again to continue.";
        showMenu = false; 
    } else if (error.includes('permission')) { // A more generic permission error
        title = "Permission Denied";
        message = "You do not have the required role to access this content. If you are a customer, please visit our menu.";
    }


    return (
        <div style={{ textAlign: 'center', marginTop: '100px', padding: '20px' }}>
            <h1 style={{ color: '#dc3545' }}>{title}</h1>
            <p style={{ fontSize: '1.2em', color: '#6c757d' }}>{message}</p>
            <div style={{ marginTop: '30px' }}>
                {showMenu && <ActionButton href="/menu">View Menu</ActionButton>}
                {showLogin && <ActionButton href="/login" primary>Staff Login</ActionButton>}
            </div>
        </div>
    );
}

export default AccessDeniedPage;
