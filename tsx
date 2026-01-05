"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Plus, Trash2, Edit, X, Save, Percent, Settings, ChevronRight } from 'lucide-react';

/**
 * SPOTT.SHOP MASTER CORE - 2026 EDITION
 * [X] Full Admin Dashboard
 * [X] Real-time Discount Engine
 * [X] Persistent Local Storage (Saves your data)
 * [X] Apple-Style Premium UI
 */

export default function SpottShopMaster() {
  // --- STATE MANAGEMENT ---
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [category, setCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  // Load data on start
  useEffect(() => {
    const saved = localStorage.getItem('spott_data');
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      // Initial Stock
      const initial = [
        { id: 1, name: "Ultra Baggy Denim", price: 450, disc: 20, isSale: true, cat: "jeans", img: "https://images.unsplash.com/photo-1542272604-787c3835535d" },
        { id: 2, name: "Boxy Heavy Hoodie", price: 600, disc: 0, isSale: false, cat: "hoodies", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7" }
      ];
      setProducts(initial);
    }
  }, []);

  // Sync to Storage
  useEffect(() => {
    if (products.length > 0) localStorage.setItem('spott_data', JSON.stringify(products));
  }, [products]);

  // --- ACTIONS ---
  const updateDiscount = (id: number, newDisc: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, disc: newDisc, isSale: newDisc > 0 } : p));
  };

  const deleteProduct = (id: number) => {
    if(confirm("Permanently delete this article?")) setProducts(products.filter(p => p.id !== id));
  };

  const addProduct = () => {
    const name = prompt("Product Name:");
    const price = prompt("Price (DH):");
    const img = prompt("Image URL (from PostImg):");
    const cat = prompt("Category (jeans, hoodies, jackets, acc):");
    if(name && price && img) {
      setProducts([...products, { id: Date.now(), name, price: parseInt(price), disc: 0, isSale: false, cat: cat || 'all', img }]);
    }
  };

  const toggleAdmin = () => {
    const pass = prompt("ADMIN ACCESS CODE:");
    if(pass === "SPOTTSHOP27_45") setIsAdmin(!isAdmin);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-green-400 selection:text-black">
      
      {/* 1. PREMIUM HEADER */}
      <div className="bg-white text-black py-2 overflow-hidden border-b border-zinc-800">
        <motion.div animate={{ x: [1000, -1000] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="text-[9px] font-black uppercase tracking-[0.5em] whitespace-nowrap">
          SPOTTSHOP: PREMIER STREETWEAR CULTURE — WORLDWIDE SHIPPING — NEW DROP LIVE NOW — ⚡
        </motion.div>
      </div>

      <nav className="flex justify-between items-center px-6 md:px-12 py-8 sticky top-0 bg-black/90 backdrop-blur-xl z-[100] border-b border-zinc-900">
        <h1 className="text-3xl font-black tracking-tighter italic hover:text-zinc-400 transition-colors cursor-pointer" onClick={() => setCategory('all')}>SPOTT.</h1>
        
        <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
          {['jeans', 'hoodies', 'jackets', 'acc'].map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} className={`hover:text-white transition-colors ${category === cat ? 'text-white border-b border-white pb-1' : ''}`}>{cat}</button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button onClick={toggleAdmin} className="text-zinc-800 hover:text-green-500 transition-colors"><Settings size={18}/></button>
          <div className="relative cursor-pointer" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={22} />
            {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-green-500 text-black text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full">{cart.length}</span>}
          </div>
        </div>
      </nav>

      {/* 2. ADMIN DASHBOARD OVERLAY */}
      {isAdmin && (
        <div className="bg-zinc-900/50 border-y border-green-500/30 px-12 py-4 flex justify-between items-center animate-pulse">
          <span className="text-green-500 text-[10px] font-black uppercase tracking-widest">Admin Mode Active: Edit Prices Directly Below</span>
          <button onClick={addProduct} className="bg-green-500 text-black px-4 py-2 text-[10px] font-black uppercase hover:bg-white transition-all">+ Add New Article</button>
        </div>
      )}

      {/* 3. HERO */}
      <header className="relative h-[60vh] flex items-center justify-center border-b border-zinc-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552910309-d53b47444914?q=80&w=2000')] bg-cover bg-center opacity-20 grayscale" />
        <div className="relative z-10 text-center px-4">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">FOR THE <br/><span className="text-zinc-700 italic">CULTURE</span></motion.h2>
          <button className="bg-white text-black px-12 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-green-500 transition-all">Explore Drop</button>
        </div>
      </header>

      {/* 4. PRODUCT ENGINE */}
      <main className="max-w-[1600px] mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.filter(p => category === 'all' || p.cat === category).map(p => {
            const finalPrice = p.isSale ? p.price * (1 - p.disc / 100) : p.price;
            return (
              <motion.div key={p.id} layout className="group relative">
                <div className="aspect-[3/4] bg-zinc-900 overflow-hidden mb-6 border border-zinc-800 relative">
                  {p.isSale && <div className="absolute top-4 left-4 z-10 bg-red-600 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">SALE -{p.disc}%</div>}
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" />
                  
                  {/* Quick Add Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center p-6 text-center">
                    <p className="text-[10px] mb-4 text-zinc-400">SELECT SIZE</p>
                    <div className="flex gap-2 mb-6">
                      {['S', 'M', 'L', 'XL'].map(s => <button key={s} className="w-8 h-8 border border-zinc-700 flex items-center justify-center text-[10px] hover:bg-white hover:text-black transition-all">{s}</button>)}
                    </div>
                    <button onClick={() => setCart([...cart, p])} className="bg-white text-black w-full py-4 text-[10px] font-black uppercase tracking-[0.2em]">Add to Bag</button>
                  </div>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm tracking-tight uppercase mb-1">{p.name}</h3>
                    <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest">{p.cat}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-black tracking-tighter ${p.isSale ? 'text-green-500' : 'text-white'}`}>{Math.round(finalPrice)} DH</p>
                    {p.isSale && <p className="text-[10px] text-zinc-600 line-through tracking-tighter">{p.price} DH</p>}
                  </div>
                </div>

                {/* ADMIN TOOLS DIRECT ON CARD */}
                {isAdmin && (
                  <div className="mt-4 p-4 bg-zinc-900 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Percent size={12} className="text-green-500"/>
                      <input 
                        type="number" 
                        value={p.disc} 
                        onChange={(e) => updateDiscount(p.id, parseInt(e.target.value))}
                        className="bg-black border border-zinc-800 text-[10px] p-1 w-full"
                        placeholder="Discount %"
                      />
                    </div>
                    <button onClick={() => deleteProduct(p.id)} className="w-full text-red-500 text-[9px] font-black uppercase py-1 border border-red-900/30 hover:bg-red-500/10 transition-all">Delete Article</button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </main>

      {/* 5. SHOPPING BAG PANEL */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed right-0 top-0 h-screen w-full md:w-[450px] bg-zinc-950 z-[201] p-10 flex flex-col border-l border-zinc-900">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-2xl font-black tracking-tighter uppercase">Shopping Bag</h2>
                <X className="cursor-pointer hover:rotate-90 transition-transform" onClick={() => setIsCartOpen(false)} />
              </div>

              <div className="flex-1 overflow-y-auto space-y-8">
                {cart.length === 0 && <p className="text-zinc-700 font-bold uppercase tracking-widest text-center mt-20">Your bag is empty.</p>}
                {cart.map((item, idx) => (
                  <div key={idx} className="flex gap-6 items-center">
                    <img src={item.img} className="w-20 h-24 object-cover border border-zinc-800" />
                    <div className="flex-1">
                      <h4 className="font-bold uppercase text-xs tracking-tight">{item.name}</h4>
                      <p className="text-[10px] text-zinc-600">ONE SIZE / BLACK</p>
                      <p className="text-sm font-black mt-2">{item.isSale ? Math.round(item.price * (1-item.disc/100)) : item.price} DH</p>
                    </div>
                    <Trash2 size={16} className="text-zinc-800 hover:text-red-500 cursor-pointer" onClick={() => {
                      const newCart = [...cart];
                      newCart.splice(idx, 1);
                      setCart(newCart);
                    }} />
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-zinc-900">
                <div className="flex justify-between mb-6 font-black tracking-tighter">
                  <span className="uppercase text-zinc-500">Total</span>
                  <span className="text-2xl">{cart.reduce((sum, item) => sum + (item.isSale ? item.price * (1-item.disc/100) : item.price), 0).toFixed(0)} DH</span>
                </div>
                <button className="bg-white text-black w-full py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-green-500 transition-all">Secure Checkout</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <footer className="py-20 border-t border-zinc-900 text-center">
        <p className="text-[10px] text-zinc-700 font-black uppercase tracking-[1em]">SpottShop © 2026 / All Rights Reserved</p>
      </footer>
    </div>
  );
    }
              
