import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const RegisterPage = ({ onRegister }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    password: '',
    confirm: ''
  });

  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    if (formData.password !== formData.confirm) {
      return setErrorMsg("Password dan Konfirmasi Password tidak cocok.");
    }
    
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.customerName,
        }
      }
    });

    setLoading(false);
    if (error) {
       setErrorMsg(error.message);
    } else {
       alert("Registrasi berhasil! Silakan login.");
       navigate('/login');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-lime-50 font-sans text-slate-800">
      <div className="w-full max-w-lg p-10 bg-white shadow-xl rounded-[2.5rem] border border-lime-100">
        <h2 className="text-2xl font-black text-emerald-900 mb-2">Belanja di Healthy Munchees</h2>
        <p className="text-gray-500 mb-4">Daftarkan akun Anda!</p>

        {errorMsg && (
          <div className="mb-4 bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-xs font-bold text-gray-400 ml-2 mb-1 block uppercase">Nama</label>
            <input
              required
              value={formData.customerName}
              className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-lime-400 outline-none transition"
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-bold text-gray-400 ml-2 mb-1 block uppercase">Email</label>
            <input
              type="email" required
              value={formData.email}
              className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-lime-400 outline-none transition"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 ml-2 mb-1 block uppercase">Password</label>
            <input
              type="password" required
              value={formData.password}
              className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-lime-400 outline-none transition"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 ml-2 mb-1 block uppercase">Konfirmasi</label>
            <input
              type="password" required
              value={formData.confirm}
              className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-lime-400 outline-none transition"
              onChange={(e) => setFormData({ ...formData, confirm: e.target.value })}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="md:col-span-2 mt-4 py-4 bg-lime-400 text-emerald-900 font-black rounded-2xl shadow-lg hover:bg-lime-500 transition active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Mendaftar...' : 'Daftarkan Akun'}
          </button>
        </form>
        <button onClick={() => navigate('/login')} className="w-full mt-6 text-sm font-bold text-emerald-600 hover:underline">Sudah punya akun? Masuk</button>
      </div>
    </div>
  );
};

export default RegisterPage;
