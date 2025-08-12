import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/DashboardPage.css';

function DashboardPage() {
    // State to hold all dashboard data, initialized to null
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch data from your new Django API endpoint
                const response = await fetch('http://127.0.0.1:8000/api/dashboard/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setDashboardData(data);
            } catch (error) {
                setError('Failed to fetch dashboard data. Please try again later.');
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []); // The empty dependency array ensures this effect runs only once

    if (loading) {
        return <div className="loading-message">Loading dashboard...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    // If data is null after loading (e.g., empty response), show a message
    if (!dashboardData) {
        return <div className="loading-message">No dashboard data available.</div>;
    }

    // Render the dashboard using the fetched data from state
    return (
        <div className="dashboard-page">
            <header className="dashboard-header">
                <h1>Welcome Back, Abderrahmane!</h1>
                <p>Here's a snapshot of your restaurant's performance today.</p>
            </header>

            {/* KPI Cards */}
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

            {/* Main Dashboard Grid */}
            <div className="dashboard-main-grid">
                {/* Sales Chart */}
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

                {/* Recent Orders List */}
                <div className="dashboard-widget list-widget">
                    <h3>Recent Orders</h3>
                    <ul>
                        {dashboardData.recentOrders.map(order => (
                            <li key={order.id}>
                                <span>{order.id} - {order.customer}</span>
                                <span className="order-total">${parseFloat(order.total).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Low Stock Items List */}
                <div className="dashboard-widget list-widget">
                    <h3>Low Stock Items</h3>
                    <ul>
                        {dashboardData.lowStockItems.map(item => (
                            <li key={item.name}>
                                <span>{item.name}</span>
                                <span className="low-stock-value">{item.stock} {item.unit}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
