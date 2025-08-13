// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// --- Page Components ---
import MenuPage from './pages/MenuPage';
import LoginPage from './pages/LoginPage'; // You will need to create this page
import DashboardPage from './pages/DashboardPage';
import InventoryPage from './pages/InventoryPage';
import SchedulePage from './pages/SchedulePage';
import TrainingPage from './pages/TrainingPage';
import NotFoundPage from './pages/NotFoundPage';

// --- Helper Components ---
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute'; // You will need to create this

function App() {
    const handleLoginSuccess = () => {
        // After a successful login, redirect the user to their dashboard
        window.location.href = '/menu';
    };

    return (
        <Router>
            <div className="App">
                {/* The dynamic Header is now a central component */}
                <Header />

                <main className="content">
                    <Routes>
                        {/* --- Public Routes --- */}
                        <Route path="/" element={<MenuPage />} />
                        <Route path="/menu" element={<MenuPage />} />
                        <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />

                        {/* --- Private Routes (Protected) --- */}
                        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
                        <Route path="/inventory" element={<PrivateRoute><InventoryPage /></PrivateRoute>} />
                        <Route path="/schedule" element={<PrivateRoute><SchedulePage /></PrivateRoute>} />
                        <Route path="/training" element={<PrivateRoute><TrainingPage /></PrivateRoute>} />

                        {/* --- Catch-all for Not Found --- */}
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
