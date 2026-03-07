import React, { useState } from 'react';

// Ikon Leaf (SVG)
const IconLeaf = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a7 7 0 0 1-10 10Z" /><path d="M11 20c-2.33-3.67-3.67-4.33-11-5 4.33-.67 4.67-2 7-11" /></svg>
);

const LoginPage = ({ onLogin, onGoToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika login sederhana untuk demo
    if (onLogin) onLogin({ name: 'Mitra Healthy Munchees', email });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-lime-500 to-emerald-600 font-sans">
      <div className="w-full max-w-md p-10 bg-white shadow-2xl rounded-[2.5rem] border-b-8 border-lime-200">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-lime-100 rounded-3xl mb-4 text-lime-600 rotate-12 shadow-inner">
            <IconLeaf />
          </div>
          <h1 className="text-3xl font-black text-emerald-900 tracking-tight">Healthy Munchees</h1>
          <p className="text-emerald-600 font-medium mt-1">Nyemil Sehat dan Halal, Cukup di Satu Aplikasi</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-bold text-emerald-800 ml-2 mb-1 block uppercase">Email Vendor</label>
            <input
              type="email"
              placeholder="halo@healthymunchees.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-2xl bg-lime-50 border-2 border-transparent focus:border-lime-400 outline-none transition"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-emerald-800 ml-2 mb-1 block uppercase">Kata Sandi</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-2xl bg-lime-50 border-2 border-transparent focus:border-lime-400 outline-none transition"
            />
          </div>
          <button type="submit" className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-xl hover:bg-emerald-700 hover:-translate-y-1 transition-all active:scale-95">
            Masuk Sekarang
          </button>
        </form>

        <div className="mt-8 p-4 bg-lime-50 rounded-2xl border-2 border-dashed border-lime-300">
          <p className="text-[11px] text-emerald-800 leading-relaxed text-center italic">
            <strong></strong> "Mencari yang halal adalah kewajiban bagi setiap muslim. Pastikan transaksi hari ini jujur dan transparan."
          </p>
        </div>

        <button onClick={onGoToRegister} className="w-full mt-6 text-sm font-bold text-emerald-600 hover:text-lime-600 transition">Daftar Vendor Baru</button>
      </div>
    </div>
  );
};

export default LoginPage;
