import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import POSInput from './components/POSInput';
import CheckoutSuccess from './components/CheckoutSuccess';
import './index.css';

function App() {
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <Router>
            <Routes>
                {/* Halaman Login */}
                <Route
                    path="/login"
                    element={!user ? <OnLogin onLogin={handleLogin} /> : <Navigate to="/" />}
                />

                {/* Halaman Utama (Kasir) */}
                <Route
                    path="/"
                    element={user ? <POSInput user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
                />

                {/* Halaman Penyelesaian Pembayaran (Baru) */}
                <Route
                    path="/checkout-success"
                    element={user ? <CheckoutSuccess /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
}

// Komponen Pembungkus untuk Login (Sesuaikan dengan nama file Login kamu)
const OnLogin = ({ onLogin }) => {
    return <Login onLogin={onLogin} />;
};

export default App;