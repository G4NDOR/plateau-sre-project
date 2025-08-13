// frontend/src/pages/InventoryPage.js

import React, { useEffect, useState } from 'react';
import AccessDeniedPage from './AccessDeniedPage';
import '../styles/InventoryPage.css';

const StatusBadge = ({ status }) => {
    const statusClass = `status-${status.toLowerCase().replace(' ', '-')}`;
    return <span className={`status-badge ${statusClass}`}>{status}</span>;
};

function InventoryPage() {
    const [inventoryData, setInventoryData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchInventory = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                setError('You must be logged in to view inventory.');
                return;
            }

            try {
                const response = await fetch('/api/inventory/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (response.status === 401 || response.status === 403) {
                    throw new Error('You do not have permission to view this page.');
                }
                if (!response.ok) {
                    throw new Error('Failed to fetch inventory data.');
                }
                
                const data = await response.json();
                setInventoryData(data);
            } catch (err) {
                setError(err.message);
                console.error("Failed to fetch inventory:", err);
            }
        };
        fetchInventory();
    }, []);

    if (error) {
        return <AccessDeniedPage error={error} />;
    }

    if (!inventoryData) {
        return <div>Loading inventory...</div>;
    }

    const filteredInventory = inventoryData.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="inventory-page">
            <header className="inventory-header">
                <h1>Inventory Management</h1>
                <div className="header-actions">
                    <input
                        type="text"
                        placeholder="Search items..."
                        className="search-bar"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="add-item-btn">Add New Item</button>
                </div>
            </header>
            <div className="table-container">
                <table className="inventory-table">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Category</th>
                            <th>Stock Quantity</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInventory.map(item => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>{item.stock} {item.unit || ''}</td>
                                <td><StatusBadge status={item.status} /></td>
                                <td><button className="reorder-btn">Re-order</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default InventoryPage;
