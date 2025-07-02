import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// The API URL will be your local Django server for now.
const API_URL = 'http://127.0.0.1:8000/api/menu/';

function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(API_URL);
        setMenuItems(response.data);
      } catch (err) {
        setError('Failed to fetch menu. Is the backend server running?');
        console.error(err);
      }
    };

    fetchMenu();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Plateau Restaurant Menu</h1>
      </header>
      <main className="menu-container">
        {error && <p className="error">{error}</p>}
        {menuItems.length > 0 ? (
          menuItems.map(item => (
            <div key={item.id} className="menu-item">
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p className="price">${item.price}</p>
            </div>
          ))
        ) : (
          !error && <p>Loading menu...</p>
        )}
      </main>
    </div>
  );
}

export default App;