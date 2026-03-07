import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Tambahkan ini

// Ikon Leaf Asli milik Healthy Munchees
const IconLeaf = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a7 7 0 0 1-10 10Z" />
    <path d="M11 20c-2.33-3.67-3.67-4.33-11-5 4.33-.67 4.67-2 7-11" />
  </svg>
);

const POSInput = ({ user, onLogout }) => {
  const navigate = useNavigate(); // 2. Tambahkan ini di dalam komponen
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showReport, setShowReport] = useState(false);

  const categories = ['All', 'Sweet', 'Savory', 'Others'];

  const products = [
    { id: 1, name: 'Sweet Potato', price: 18000, icon: '🍠', category: 'Sweet', color: 'bg-purple-100' },
    { id: 2, name: 'Choco Oat Cookies', price: 22000, icon: '🍪', category: 'Sweet', color: 'bg-green-100' },
    { id: 3, name: 'Honey Corn Bites', price: 15000, icon: '🌽', category: 'Sweet', color: 'bg-yellow-100' },
    { id: 4, name: 'Apple Cinnamon Chip', price: 20000, icon: '🍎', category: 'Sweet', color: 'bg-red-100' },
    { id: 5, name: 'Cereal Almond Bar', price: 12000, icon: '🍫', category: 'Sweet', color: 'bg-blue-100' },
    { id: 6, name: 'Roasted Almonds 250 gr', price: 35000, icon: '🥜', category: 'Savory', color: 'bg-orange-100' },
    { id: 7, name: 'Roasted Cashew 250 gr', price: 42000, icon: '🌰', category: 'Savory', color: 'bg-yellow-200' },
    { id: 8, name: 'Seaweed Roll', price: 12000, icon: '🍙', category: 'Savory', color: 'bg-emerald-100' },
    { id: 9, name: 'Veggie Chips Mix', price: 25000, icon: '🥦', category: 'Savory', color: 'bg-green-200' },
    { id: 10, name: 'Berry Smoothie', price: 30000, icon: '🥤', category: 'Others', color: 'bg-pink-100' },
    { id: 11, name: 'Greek Yogurt Cup', price: 28000, icon: '🍦', category: 'Others', color: 'bg-slate-100' },
    { id: 12, name: 'Infused Water', price: 10000, icon: '🍋', category: 'Others', color: 'bg-cyan-100' },
  ];

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => setCart(cart.filter(item => item.id !== id));

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const zakat = subtotal * 0.025;
  const total = subtotal + zakat;

  // 3. Tambahkan fungsi untuk pindah halaman
  const handleCheckout = () => {
    if (cart.length === 0) return alert("Keranjang masih kosong!");

    // Kirim data belanjaan ke halaman CheckoutSuccess
    navigate('/checkout-success', {
      state: { total, zakat, subtotal, items: cart }
    });

    setCart([]); // Kosongkan keranjang
  };

  return (
    <div className="flex h-screen bg-[#F9FFF7] font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-[#F2FAE9] border-r border-green-100 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10 text-[#065F46]">
          <div className="bg-white p-2 rounded-xl shadow-sm border border-green-50">
            <IconLeaf />
          </div>
          <h1 className="font-bold text-xl tracking-tight">Healthy Munchees</h1>
        </div>

        <nav className="flex-1 space-y-3">
          <button
            onClick={() => setShowReport(false)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${!showReport ? 'bg-[#059669] text-white shadow-md' : 'text-[#065F46] hover:bg-white/50'}`}
          >
            Kasir Utama
          </button>
          <button
            onClick={() => setShowReport(true)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${showReport ? 'bg-[#059669] text-white shadow-md' : 'text-[#065F46] hover:bg-white/50'}`}
          >
            Laporan Zakat
          </button>
        </nav>

        <div className="mt-auto">
          <p className="text-[10px] text-[#059669] font-bold uppercase mb-1">Vendor: {user?.email || 'MITRA AMANAH'}</p>
          <button onClick={onLogout} className="text-red-500 font-bold text-xs hover:underline">Keluar Sistem</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {!showReport ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-[#064E3B]">Menu Camilan</h2>
              <div className="bg-white border border-[#D1FAE5] px-4 py-1.5 rounded-full text-[10px] font-bold text-[#059669] flex items-center gap-2 shadow-sm">
                <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></span> AUDIT SYARIAH
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${activeCategory === cat ? 'bg-[#065F46] text-white shadow-md' : 'bg-white text-[#065F46] border border-green-100 hover:bg-[#F2FAE9]'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="bg-white p-5 rounded-[32px] border border-green-50 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group text-center"
                >
                  <div className={`w-full h-32 ${product.color} rounded-2xl flex items-center justify-center text-5xl mb-4 group-hover:scale-105 transition-transform`}>
                    {product.icon}
                  </div>
                  <h3 className="font-bold text-[#1F2937] text-md">{product.name}</h3>
                  <p className="text-[#059669] font-black mt-1">Rp {product.price.toLocaleString()}</p>
                  <div className="mt-2 text-[9px] text-gray-400 font-bold uppercase tracking-widest">{product.category}</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-[#064E3B] mb-8 italic text-center">Laporan Amanah Zakat</h2>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-8 rounded-[32px] shadow-sm border border-green-100">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1 tracking-widest">Zakat Hari Ini</p>
                <p className="text-4xl font-black text-[#059669]">Rp {zakat.toLocaleString()}</p>
              </div>
              <div className="bg-white p-8 rounded-[32px] shadow-sm border border-green-100">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1 tracking-widest">Status Penyaluran</p>
                <p className="text-xl font-bold text-blue-600">Siap Disalurkan</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cart Panel */}
      <div className="w-96 bg-white p-8 flex flex-col shadow-2xl border-l border-green-50">
        <h2 className="text-2xl font-bold text-[#064E3B] mb-8">Keranjang</h2>
        <div className="flex-1 overflow-y-auto space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex items-center gap-4 bg-[#F9FFF7] p-4 rounded-2xl border border-green-50">
              <div className="text-2xl">{item.icon}</div>
              <div className="flex-1">
                <h4 className="font-bold text-[13px] text-gray-800">{item.name}</h4>
                <p className="text-xs font-bold text-[#059669]">{item.qty}x Rp {item.price.toLocaleString()}</p>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-200 hover:text-red-500">🗑️</button>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-dashed border-gray-100 space-y-4">
          <div className="flex justify-between text-gray-500 font-bold text-sm">
            <span>Subtotal</span>
            <span>Rp {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-[#B45309] font-bold bg-[#FFFBEB] px-4 py-2.5 rounded-xl border border-[#FEF3C7] text-[11px]">
            <span>PEMBERSIHAN ZAKAT (2.5%)</span>
            <span>Rp {zakat.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-2xl font-bold text-[#064E3B] pt-2">
            <span>Total</span>
            <span>Rp {total.toLocaleString()}</span>
          </div>

          {/* 4. Update onClick tombol di bawah ini */}
          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full bg-[#A3E635] hover:bg-[#bef264] text-[#064E3B] font-bold py-5 rounded-[20px] mt-4 transition-all shadow-md active:scale-95 disabled:opacity-30"
          >
            Selesaikan Amanah
          </button>
        </div>
      </div>
    </div>
  );
};

export default POSInput;