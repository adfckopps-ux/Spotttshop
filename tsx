<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SPOTT.SHOP | Streetwear Culture</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://unpkg.com/framer-motion@10.16.4/dist/framer-motion.js"></script>
    <style>
        body { font-family: 'Inter', sans-serif; background: #000; color: #fff; overflow-x: hidden; }
        .glass { background: rgba(10, 10, 10, 0.8); backdrop-filter: blur(12px); }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #333; }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState, useEffect } = React;
        const { motion, AnimatePresence } = FramerMotion;

        const App = () => {
            const [isAdmin, setIsAdmin] = useState(false);
            const [cart, setCart] = useState([]);
            const [category, setCategory] = useState('all');
            const [isCartOpen, setIsCartOpen] = useState(false);
            const [products, setProducts] = useState([
                { id: 1, name: "RAW BLACK BAGGY", price: 450, disc: 20, isSale: true, cat: "jeans", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000" },
                { id: 2, name: "BOXY HEAVY HOODIE", price: 600, disc: 0, isSale: false, cat: "hoodies", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000" },
                { id: 3, name: "VINTAGE WASH CARGO", price: 500, disc: 10, isSale: true, cat: "jeans", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000" }
            ]);

            // Save/Load Logic
            useEffect(() => {
                const saved = localStorage.getItem('spott_store');
                if (saved) setProducts(JSON.parse(saved));
            }, []);

            useEffect(() => {
                localStorage.setItem('spott_store', JSON.stringify(products));
            }, [products]);

            const toggleAdmin = () => {
                const code = prompt("ADMIN ACCESS CODE:");
                if(code === "SPOTTSHOP27_45") setIsAdmin(!isAdmin);
            };

            const addProduct = () => {
                const n = prompt("Name:");
                const p = prompt("Price (DH):");
                const i = prompt("Image URL:");
                const c = prompt("Category (jeans/hoodies/jackets/acc):");
                if(n && p && i) setProducts([...products, { id: Date.now(), name: n, price: parseInt(p), disc: 0, isSale: false, cat: c || 'all', img: i }]);
            };

            return (
                <div className="min-h-screen">
                    {/* TICKER */}
                    <div className="bg-white text-black py-2 font-black text-[9px] uppercase tracking-[0.5em] overflow-hidden whitespace-nowrap border-b border-zinc-800">
                        <div className="animate-marquee inline-block px-4">
                            FREE SHIPPING ON ALL ORDERS OVER 500 DH — NEW SEASON DROP LIVE — SPOTT.SHOP OFFICIAL
                        </div>
                    </div>

                    {/* NAV */}
                    <nav className="sticky top-0 z-[100] glass border-b border-zinc-900 px-6 md:px-12 py-8 flex justify-between items-center">
                        <h1 className="text-3xl font-black italic tracking-tighter cursor-pointer hover:text-zinc-400" onClick={() => setCategory('all')}>SPOTT.</h1>
                        <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                            {['jeans', 'hoodies', 'jackets', 'acc'].map(c => (
                                <button key={c} onClick={() => setCategory(c)} className={`hover:text-white ${category === c ? 'text-white' : ''}`}>{c}</button>
                            ))}
                        </div>
                        <div className="flex items-center gap-6">
                            <button onClick={toggleAdmin} className="text-zinc-800 hover:text-green-500">⚙️</button>
                            <button onClick={() => setIsCartOpen(true)} className="relative">
                                🛒 {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-green-500 text-black text-[8px] px-1 rounded-full">{cart.length}</span>}
                            </button>
                        </div>
                    </nav>

                    {isAdmin && (
                        <div className="bg-zinc-900 border-y border-green-500/30 px-12 py-4 flex justify-between items-center">
                            <span className="text-green-500 text-[10px] font-black uppercase tracking-widest animate-pulse">ADMIN: EDIT MODE ACTIVE</span>
                            <button onClick={addProduct} className="bg-green-500 text-black px-4 py-2 text-[10px] font-black uppercase">+ ADD ARTICLE</button>
                        </div>
                    )}

                    {/* HERO */}
                    <header className="relative h-[50vh] flex items-center justify-center border-b border-zinc-900 overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552910309-d53b47444914?q=80&w=2000')] bg-cover bg-center opacity-30 grayscale" />
                        <div className="relative text-center">
                            <h2 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] mb-6">STREET <br/><span className="text-zinc-700 italic">LUXE</span></h2>
                            <button className="bg-white text-black px-12 py-4 text-[10px] font-black uppercase tracking-widest">Shop Collection</button>
                        </div>
                    </header>

                    {/* GRID */}
                    <main className="max-w-[1600px] mx-auto px-6 md:px-12 py-24">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                            {products.filter(p => category === 'all' || p.cat === category).map(p => {
                                const finalPrice = p.isSale ? p.price * (1 - p.disc / 100) : p.price;
                                return (
                                    <motion.div key={p.id} className="group relative">
                                        <div className="aspect-[3/4] bg-zinc-900 overflow-hidden mb-6 border border-zinc-800 relative">
                                            {p.isSale && <div className="absolute top-4 left-4 z-10 bg-red-600 px-3 py-1 text-[9px] font-black">-{p.disc}%</div>}
                                            <img src={p.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center p-6">
                                                <button onClick={() => setCart([...cart, p])} className="bg-white text-black w-full py-4 text-[10px] font-black uppercase">Add to Bag</button>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-sm tracking-tight uppercase">{p.name}</h3>
                                                <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest">{p.cat}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className={`text-lg font-black tracking-tighter ${p.isSale ? 'text-green-500' : ''}`}>{Math.round(finalPrice)} DH</p>
                                                {p.isSale && <p className="text-[10px] text-zinc-600 line-through">{p.price} DH</p>}
                                            </div>
                                        </div>
                                        {isAdmin && (
                                            <div className="mt-4 p-4 bg-zinc-900 border border-green-500/20">
                                                <label className="text-[9px] text-zinc-500 uppercase">Discount %</label>
                                                <input type="number" value={p.disc} onChange={(e) => {
                                                    const val = parseInt(e.target.value);
                                                    setProducts(products.map(x => x.id === p.id ? {...x, disc: val, isSale: val > 0} : x));
                                                }} className="bg-black w-full text-xs p-1 mt-1 border border-zinc-800" />
                                                <button onClick={() => setProducts(products.filter(x => x.id !== p.id))} className="text-red-500 text-[8px] mt-2 block uppercase font-bold">Delete Article</button>
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </main>

                    {/* CART PANEL */}
                    <AnimatePresence>
                        {isCartOpen && (
                            <>
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]" />
                                <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed right-0 top-0 h-screen w-[400px] max-w-full bg-zinc-950 z-[201] p-10 flex flex-col border-l border-zinc-900">
                                    <h2 className="text-2xl font-black uppercase tracking-tighter mb-12">Bag</h2>
                                    <div className="flex-1 overflow-y-auto space-y-6">
                                        {cart.map((item, idx) => (
                                            <div key={idx} className="flex gap-4 items-center">
                                                <img src={item.img} className="w-16 h-20 object-cover border border-zinc-800" />
                                                <div className="flex-1">
                                                    <h4 className="font-bold uppercase text-xs tracking-tight">{item.name}</h4>
                                                    <p className="text-sm font-black mt-1">{item.isSale ? Math.round(item.price * (1-item.disc/100)) : item.price} DH</p>
                                                </div>
                                                <button onClick={() => { const n = [...cart]; n.splice(idx, 1); setCart(n); }} className="text-zinc-600 text-xs">✕</button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-8 border-t border-zinc-900 mt-8">
                                        <button className="bg-white text-black w-full py-5 text-[10px] font-black uppercase tracking-[0.3em]">Checkout via WhatsApp</button>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>
      
