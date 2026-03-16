import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Ikon Leaf yang sama dengan POSInput agar branding konsisten
const IconLeaf = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a7 7 0 0 1-10 10Z" />
        <path d="M11 20c-2.33-3.67-3.67-4.33-11-5 4.33-.67 4.67-2 7-11" />
    </svg>
);

const CheckoutSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Menangkap data yang dikirim dari Payment.jsx
    const { total, zakat, subtotal, items, shippingData, paymentMethod } = location.state || { 
        total: 0, 
        zakat: 0, 
        subtotal: 0, 
        items: [],
        shippingData: null,
        paymentMethod: null
    };

    return (
        <div className="min-h-screen bg-[#F9FFF7] font-sans flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl border border-green-50 overflow-hidden">

                {/* Header Struk */}
                <div className="bg-[#F2FAE9] p-8 text-center flex flex-col items-center">
                    <div className="bg-white p-4 rounded-3xl shadow-sm mb-4">
                        <IconLeaf />
                    </div>
                    <h1 className="text-2xl font-bold text-[#064E3B]">Healthy Munchees</h1>
                    <p className="text-[#059669] text-xs font-bold uppercase tracking-widest mt-1">Pembayaran Berhasil</p>
                </div>

                {/* Detail Belanja */}
                <div className="p-8">
                    <div className="space-y-4 mb-8">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mb-2">Item Terbeli:</p>
                        {items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">{item.icon}</span>
                                    <span className="text-sm font-bold text-gray-700">{item.qty}x {item.name}</span>
                                </div>
                                <span className="text-sm font-medium text-gray-500">Rp {(item.price * item.qty).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-dashed border-gray-200 pt-6 space-y-3">
                        <div className="flex justify-between text-sm font-bold text-gray-400">
                            <span>Subtotal</span>
                            <span>Rp {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs font-black text-orange-600 bg-orange-50 px-4 py-2 rounded-xl border border-orange-100">
                            <span>PEMBERSIHAN ZAKAT (2.5%)</span>
                            <span>Rp {zakat.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-2xl font-black text-[#064E3B] pt-2">
                            <span>Total</span>
                            <span>Rp {total.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="mt-10 text-center">
                        <div className="bg-green-50 border border-green-100 rounded-2xl p-4 mb-6 -mt-2">
                            <p className="text-sm font-bold text-[#059669]">
                                ✉️ Email Pembayaran Berhasil Terkirim!
                            </p>
                            <p className="text-xs text-green-700 mt-1">
                                Bukti transaksi telah dikirimkan ke <span className="font-bold">{shippingData?.email || 'email Anda'}</span>.
                            </p>
                        </div>
                        <p className="text-[10px] text-gray-400 font-medium italic mb-6">
                            "Barakallah, semoga camilan ini membawa keberkahan dan kesehatan untukmu."
                        </p>

                        <button
                            onClick={() => navigate('/')}
                            className="w-full bg-[#A3E635] hover:bg-[#bef264] text-[#064E3B] font-bold py-5 rounded-[22px] transition-all shadow-md active:scale-95"
                        >
                            Kembali ke Kasir
                        </button>
                    </div>
                </div>

                {/* Footer Audit */}
                <div className="bg-[#064E3B] py-3 text-center">
                    <p className="text-[9px] text-white font-bold tracking-[0.2em]">SISTEM AMANAH • AUDIT SYARIAH AKTIF</p>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSuccess;