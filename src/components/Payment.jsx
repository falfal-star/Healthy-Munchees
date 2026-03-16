import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Data dari Form Pengiriman
    const { total, zakat, subtotal, items, shippingData } = location.state || { 
        total: 0, 
        zakat: 0, 
        subtotal: 0, 
        items: [],
        shippingData: null
    };

    const [selectedMethod, setSelectedMethod] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const paymentMethods = [
        { id: 'qris', name: 'QRIS', icon: '📱', desc: 'Bayar instan dengan scan kode QR' },
        { id: 'bank', name: 'Transfer Bank', icon: '🏦', desc: 'BCA, Mandiri, BNI, BRI' },
        { id: 'ewallet', name: 'E-Wallet', icon: '💳', desc: 'GoPay, OVO, Dana, ShopeePay' }
    ];

    const handlePayment = async () => {
        if (!selectedMethod) return alert('Silakan pilih metode pembayaran terlebih dahulu');
        
        setIsProcessing(true);
        
        try {
            // Dapatkan user yang sedang aktif
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            
            if (authError || !user) {
                alert("Sesi Anda telah berakhir, silakan login kembali.");
                setIsProcessing(false);
                navigate('/login');
                return;
            }

            // Simpan ke Supabase
            const { error: dbError } = await supabase
                .from('transactions')
                .insert([
                    {
                        user_id: user.id,
                        user_email: user.email,
                        total_amount: total,
                        items: items
                    }
                ]);

            if (dbError) {
                console.error("Gagal menyimpan transaksi:", dbError);
                alert("Terjadi kesalahan saat menyimpan transaksi. Coba lagi.");
                setIsProcessing(false);
                return;
            }

            // Simulasi sisa proses pembayaran
            setTimeout(() => {
                setIsProcessing(false);
                navigate('/checkout-success', {
                    state: { total, zakat, subtotal, items, shippingData, paymentMethod: selectedMethod }
                });
            }, 1000);

        } catch (err) {
            console.error(err);
            alert("Terjadi kesalahan sistem.");
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F9FFF7] font-sans flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl border border-green-50 overflow-hidden flex flex-col">
                
                <div className="bg-[#064E3B] p-8 text-center text-white">
                    <h2 className="text-xl font-bold mb-2">Pilih Pembayaran</h2>
                    <p className="text-3xl font-black">Rp {total.toLocaleString()}</p>
                    <p className="text-xs text-green-200 mt-2">Termasuk Zakat 2.5% (Rp {zakat.toLocaleString()})</p>
                </div>

                <div className="p-8 flex-1 space-y-4">
                    <p className="text-sm font-bold text-gray-700 mb-2">Pilih metode yang tersedia:</p>
                    
                    {paymentMethods.map(method => (
                        <div 
                            key={method.id}
                            onClick={() => setSelectedMethod(method.id)}
                            className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                                selectedMethod === method.id 
                                ? 'border-[#059669] bg-[#F2FAE9]' 
                                : 'border-gray-100 hover:border-green-200'
                            }`}
                        >
                            <div className="text-3xl">{method.icon}</div>
                            <div>
                                <h3 className="font-bold text-gray-800">{method.name}</h3>
                                <p className="text-xs text-gray-500">{method.desc}</p>
                            </div>
                            
                            <div className={`ml-auto w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                selectedMethod === method.id ? 'border-[#059669]' : 'border-gray-300'
                            }`}>
                                {selectedMethod === method.id && <div className="w-3 h-3 bg-[#059669] rounded-full"></div>}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-8 pt-0 mt-auto flex gap-3">
                    <button 
                        onClick={() => navigate(-1)}
                        disabled={isProcessing}
                        className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 rounded-2xl transition-all"
                    >
                        Batal
                    </button>
                    <button 
                        onClick={handlePayment}
                        disabled={!selectedMethod || isProcessing}
                        className="w-2/3 bg-[#059669] hover:bg-[#047857] text-white font-bold py-4 rounded-2xl transition-all shadow-md disabled:opacity-50 flex justify-center items-center"
                    >
                        {isProcessing ? (
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            'Bayar Sekarang'
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Payment;
