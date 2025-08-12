import React from 'react';
// Import NavLink instead of Link
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

// Import your page components
import DashboardPage from './pages/DashboardPage';
import InventoryPage from './pages/InventoryPage';
import MenuPage from './pages/MenuPage';
import SchedulePage from './pages/SchedulePage';
import TrainingPage from './pages/TrainingPage';

function App() {
  return (
    <Router>
      {/* The entire app is wrapped in a div for easier styling if needed */}
      <div className="App">
        {/* The navigation bar */}
        <nav className="main-nav">
          <div className="nav-logo">
            <NavLink to="/">Plateau</NavLink>
          </div>
          <div className="nav-links">
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/menu">Menu</NavLink>
            <NavLink to="/inventory">Inventory</NavLink>
            <NavLink to="/schedule">Schedule</NavLink>
            <NavLink to="/training">Training</NavLink>
          </div>
        </nav>

        {/* The main content area where pages will be rendered */}
        <main className="content">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/menu" element={<MenuPage />} />
            {/* Add placeholder routes for the new links */}
            <Route path="/inventory" element={<InventoryPage/>} />
            <Route path="/schedule" element={<SchedulePage />} /> {/* <-- Add the new route */}
            <Route path="/training" element={<TrainingPage />} />
            {/* The default route now directs to the Menu Page */}
            <Route path="/" element={<MenuPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
