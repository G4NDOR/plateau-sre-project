// frontend/src/pages/NotFoundPage.js

import React from 'react';

const ActionButton = ({ href, children }) => (
    <a href={href} style={{
        display: 'inline-block',
        padding: '12px 24px',
        margin: '10px',
        border: '1px solid #007bff',
        borderRadius: '5px',
        textDecoration: 'none',
        backgroundColor: '#007bff',
        color: 'white',
        fontWeight: 'bold',
    }}>
        {children}
    </a>
);

function NotFoundPage() {
    return (
        <div style={{ textAlign: 'center', marginTop: '100px', padding: '20px' }}>
            <h1 style={{ fontSize: '6em', margin: '0', color: '#6c757d' }}>404</h1>
            <h2 style={{ fontSize: '2em', margin: '0' }}>Page Not Found</h2>
            <p style={{ fontSize: '1.2em', color: '#6c757d', marginTop: '10px' }}>
                Oops! The page you are looking for does not exist.
            </p>
            <div style={{ marginTop: '30px' }}>
                <ActionButton href="/menu">Go to Menu</ActionButton>
            </div>
        </div>
    );
}

export default NotFoundPage;
