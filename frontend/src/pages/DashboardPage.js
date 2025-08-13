// frontend/src/pages/DashboardPage.js

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AccessDeniedPage from './AccessDeniedPage';
import '../styles/DashboardPage.css';

function DashboardPage() {
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDashboardData = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                setError('You must be logged in to view the dashboard.');
                return;
            }

            try {
                const response = await fetch('/api/dashboard/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 401 || response.status === 403) {
                    throw new Error('You do not have permission to view this page.');
                }
                 if (!response.ok) {
                    throw new Error('Failed to fetch dashboard data.');
                }

                const data = await response.json();
                setDashboardData(data);
            } catch (err) {
                setError(err.message);
                console.error("Fetch error:", err);
            }
        };

        fetchDashboardData();
    }, []);

    if (error) {
        return <AccessDeniedPage error={error} />;
    }

    if (!dashboardData) {
        return <div className="loading-message">Loading dashboard...</div>;
    }

    return (
        <div className="dashboard-page">
            <header className="dashboard-header">
                <h1>Welcome Back!</h1>
                <p>Here's a snapshot of your restaurant's performance today.</p>
            </header>
            <div className="kpi-grid">
                <div className="kpi-card">
                    <h2 className="kpi-title">Today's Sales</h2>
                    <p className="kpi-value">${dashboardData.kpiData.dailySales.toLocaleString()}</p>
                </div>
                <div className="kpi-card">
                    <h2 className="kpi-title">Total Orders</h2>
                    <p className="kpi-value">{dashboardData.kpiData.totalOrders}</p>
                </div>
                <div className="kpi-card">
                    <h2 className="kpi-title">New Customers</h2>
                    <p className="kpi-value">{dashboardData.kpiData.newCustomers}</p>
                </div>
            </div>
            <div className="dashboard-widget chart-widget">
                <h3>Weekly Sales Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dashboardData.salesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default DashboardPage;
