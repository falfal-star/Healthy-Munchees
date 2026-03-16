import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Login from './components/Login';
import RegisterPage from './components/Register';
import POSInput from './components/POSInput';
import CheckoutSuccess from './components/CheckoutSuccess';
import ShippingInfo from './components/ShippingInfo';
import Payment from './components/Payment';
import './index.css';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Cek sesi saat ini
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user || null);
            setLoading(false);
        });

        // Dengarkan perubahan status auth
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-[#F9FFF7] font-sans font-bold text-emerald-800">Memuat sesi...</div>;
    }

    return (
        <Router>
            <Routes>
                {/* Halaman Login */}
                <Route
                    path="/login"
                    element={!user ? <Login /> : <Navigate to="/" />}
                />

                {/* Halaman Register */}
                <Route
                    path="/register"
                    element={!user ? <RegisterPage onGoToLogin={() => { }} /> : <Navigate to="/" />}
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

                {/* Halaman Data Pengiriman */}
                <Route
                    path="/shipping"
                    element={user ? <ShippingInfo user={user} /> : <Navigate to="/login" />}
                />

                {/* Halaman Pilih Pembayaran */}
                <Route
                    path="/payment"
                    element={user ? <Payment /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
}

export default App;