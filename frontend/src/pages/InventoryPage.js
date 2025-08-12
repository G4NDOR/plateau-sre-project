import React, { useEffect, useState } from 'react';
import '../styles/InventoryPage.css';


// Helper component for the status badge
const StatusBadge = ({ status }) => {
    // Generates a CSS-friendly class name from the status, e.g., "In Stock" -> "status-in-stock"
    const statusClass = `status-${status.toLowerCase().replace(' ', '-')}`;
    return <span className={`status-badge ${statusClass}`}>{status}</span>;
};


function InventoryPage() {
    const [inventoryData, setInventoryData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/inventory/');
                const data = await response.json();
                setInventoryData(data);
            } catch (error) {
                console.error("Failed to fetch inventory:", error);
            }
        };
        fetchInventory();
    }, []);

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
