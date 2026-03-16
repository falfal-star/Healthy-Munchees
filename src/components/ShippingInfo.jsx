import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ShippingInfo = ({ user }) => {
    const location = useLocation();
    const navigate = useNavigate();

    // Data dari Kasir
    const { total, zakat, subtotal, items } = location.state || { total: 0, zakat: 0, subtotal: 0, items: [] };

    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        email: user?.email || '',
        address: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = (e) => {
        e.preventDefault();
        // Lanjut ke pembayaran dengan membawa semua data
        navigate('/payment', {
            state: { total, zakat, subtotal, items, shippingData: formData }
        });
    };

    return (
        <div className="min-h-screen bg-[#F9FFF7] font-sans p-8 flex justify-center">
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Kolom Kiri: Form Data Pengiriman */}
                <div className="bg-white p-8 rounded-[32px] shadow-sm border border-green-50">
                    <h2 className="text-2xl font-bold text-[#064E3B] mb-6">Data Pengiriman Produk</h2>
                    
                    <form onSubmit={handleNext} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap</label>
                            <input 
                                type="text" 
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-green-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#059669] bg-[#F9FFF7]" 
                                placeholder="Masukkan nama Anda"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Jenis Kelamin</label>
                                <select 
                                    name="gender" 
                                    required
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full border border-green-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#059669] bg-[#F9FFF7]"
                                >
                                    <option value="">Pilih...</option>
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border border-green-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#059669] bg-[#F9FFF7]" 
                                    placeholder="email@contoh.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Alamat Pengiriman</label>
                            <textarea 
                                name="address"
                                required
                                value={formData.address}
                                onChange={handleChange}
                                rows="3"
                                className="w-full border border-green-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#059669] bg-[#F9FFF7]" 
                                placeholder="Masukkan alamat lengkap pengiriman"
                            ></textarea>
                        </div>
                        
                        <div className="pt-4 flex gap-3">
                            <button 
                                type="button" 
                                onClick={() => navigate(-1)}
                                className="w-1/3 py-3 rounded-xl font-bold text-[#059669] bg-green-50 hover:bg-green-100 transition-all"
                            >
                                Kembali
                            </button>
                            <button 
                                type="submit" 
                                className="w-2/3 py-3 rounded-xl font-bold text-white bg-[#059669] hover:bg-[#047857] transition-all shadow-md"
                            >
                                Lanjut Pilih Pembayaran
                            </button>
                        </div>
                    </form>
                </div>

                {/* Kolom Kanan: Rekap Belanja (Ditarik Otomatis) */}
                <div className="bg-[#F2FAE9] p-8 rounded-[32px] border border-green-100 flex flex-col">
                    <h3 className="text-xl font-bold text-[#064E3B] mb-6">Ringkasan Pesanan</h3>
                    
                    <div className="flex-1 overflow-y-auto space-y-4 mb-6">
                        {items.map(item => (
                            <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="text-2xl">{item.icon}</div>
                                    <div>
                                        <h4 className="font-bold text-sm text-gray-800">{item.name}</h4>
                                        <p className="text-xs text-gray-500">{item.qty} item</p>
                                    </div>
                                </div>
                                <span className="font-bold text-[#059669]">Rp {(item.price * item.qty).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm space-y-3">
                        <div className="flex justify-between text-sm font-bold text-gray-500">
                            <span>Subtotal</span>
                            <span>Rp {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold text-orange-600">
                            <span>Pembersihan Zakat (2.5%)</span>
                            <span>Rp {zakat.toLocaleString()}</span>
                        </div>
                        <div className="pt-3 mt-3 border-t border-dashed border-gray-200 flex justify-between text-xl font-black text-[#064E3B]">
                            <span>Total Bayar</span>
                            <span>Rp {total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ShippingInfo;
