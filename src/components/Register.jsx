import React, { useState } from 'react';

const RegisterPage = ({ onRegister, onGoToLogin }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    password: '',
    confirm: ''
  });

  const handleRegister = (e) => {
    e.preventDefault();
    if (onRegister) onRegister(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-lime-50 font-sans text-slate-800">
      <div className="w-full max-w-lg p-10 bg-white shadow-xl rounded-[2.5rem] border border-lime-100">
        <h2 className="text-2xl font-black text-emerald-900 mb-2">Join Healthy Munchees</h2>
        <p className="text-gray-500 mb-8">Daftarkan bisnis camilan sehat Anda ke ekosistem kami.</p>

        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-xs font-bold text-gray-400 ml-2 mb-1 block uppercase">Nama Bisnis</label>
            <input
              required
              value={formData.businessName}
              className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-lime-400 outline-none transition"
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-bold text-gray-400 ml-2 mb-1 block uppercase">Email Bisnis</label>
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

          <button type="submit" className="md:col-span-2 mt-4 py-4 bg-lime-400 text-emerald-900 font-black rounded-2xl shadow-lg hover:bg-lime-500 transition active:scale-95">
            Daftar Sebagai Vendor
          </button>
        </form>
        <button onClick={onGoToLogin} className="w-full mt-6 text-sm font-bold text-emerald-600 hover:underline">Sudah punya akun? Masuk</button>
      </div>
    </div>
  );
};

export default RegisterPage;
