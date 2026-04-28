'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MagnifyingGlass as Search, 
  Tote as ShoppingBag, 
  User, 
  Faders as Settings2, 
  CaretDown as ChevronDown, 
  Heart, 
  Leaf,
  X
} from '@phosphor-icons/react';

const products = [
  {
    id: 1,
    name: 'Tropical Breeze Set',
    subtitle: 'Lush & vibrant',
    price: 180,
    category: 'Potted Elegance',
    size: 'L',
    tags: ['Indoor', 'Air-Purifying'],
    description: 'Bring the vibrant life of the tropics right into your living room with this lush set. Designed with both aesthetics and air purification in mind, it provides a dense, lively green presence that instantly refreshes any space.',
    image: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=600&q=80',
    liked: false,
    featured: false,
  },
  {
    id: 2,
    name: 'Cozy Corner Plant',
    subtitle: 'Rich green texture',
    price: 240,
    category: 'Statement Plants',
    size: 'XL',
    tags: ['Minimalist', 'Luxury', 'Indoor'],
    description: 'A striking statement piece featuring rich, textured foliage. This plant is perfect for anchoring a cozy corner in your home or office, offering a blend of natural majesty and minimalist elegance.',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80',
    liked: true,
    featured: true, // The rotated one
  },
  {
    id: 3,
    name: 'Fresh Vibe Pot',
    subtitle: 'Glossy foliage charm',
    price: 120,
    category: 'Compact Decor',
    size: 'S',
    tags: ['Mini', 'Office', 'Modern'],
    description: 'Compact and effortlessly stylish, this pot brings a fresh, lively charm to smaller spaces like desks, bookshelves, or kitchen counters. Its glossy leaves catch the light beautifully.',
    image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=600&q=80',
    liked: false,
    featured: false,
  },
  {
    id: 4,
    name: 'Serene Space Set',
    subtitle: 'Calming deep green',
    price: 120,
    category: 'Potted Elegance',
    size: 'M',
    tags: ['Indoor', 'Modern'],
    description: 'Experience deep tranquility with this serene set. Characterized by its calming, dark green hues, it promotes a peaceful atmosphere and matches beautifully with modern, pared-back decor.',
    image: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=600&q=80',
    liked: false,
    featured: false,
  },
  {
    id: 5,
    name: 'Golden Hour Leaf',
    subtitle: 'Warm leaf tones',
    price: 80,
    category: 'Compact Decor',
    size: 'M',
    tags: ['Office', 'Minimalist'],
    description: 'A delightful medium-sized plant known for its warm, slightly golden-toned leaves. It thrives in gentle sunlight, making it an excellent companion for a sunny window sill or a bright office space.',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80',
    liked: false,
    featured: false,
  },
  {
    id: 6,
    name: 'Minimalist Luxe Pot',
    subtitle: 'Clean modern lines',
    price: 180,
    category: 'Potted Elegance',
    size: 'L',
    tags: ['Luxury', 'Modern', 'Minimalist'],
    description: 'Combining clean, modern architectural lines with lush natural growth, the Minimalist Luxe Pot is the epitome of sophisticated indoor gardening. Perfect for those who appreciate high-end design.',
    image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=600&q=80',
    liked: true,
    featured: false,
  },
];

export default function Page() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<typeof products[0] | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);

  const filteredProducts = React.useMemo(() => {
    let result = products;
    if (searchQuery) result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));
    if (selectedCategory) result = result.filter(p => p.category === selectedCategory);
    if (selectedSizes.length > 0) result = result.filter(p => selectedSizes.includes(p.size));
    if (selectedTags.length > 0) result = result.filter(p => p.tags.some(tag => selectedTags.includes(tag)));
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    if (sortBy === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [searchQuery, selectedCategory, selectedSizes, selectedTags, sortBy, priceRange]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 }
    }
  };

  return (
    <div className="relative min-h-[100dvh] bg-[#09090b] text-[#F3F4F6] font-sans selection:bg-emerald-500/30 overflow-hidden">
      {/* Background soft ambient glows */}
      <div className="absolute top-0 left-0 w-[50%] h-[50%] bg-emerald-900/10 rounded-full blur-[140px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none transform translate-x-1/4 translate-y-1/4"></div>

      <div className="relative z-10 flex flex-col min-h-[100dvh]">
        {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-white/5 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 text-emerald-400">
          <Leaf className="w-6 h-6" weight="fill" />
          <span className="font-outfit text-xl font-semibold tracking-tight text-white">Plantify</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-zinc-400">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#" className="text-white">Catalog</a>
          <a href="#" className="hover:text-white transition-colors">Instructions</a>
          <a href="#" className="hover:text-white transition-colors">FAQ</a>
          <a href="#" className="hover:text-white transition-colors">About Us</a>
        </nav>

        <div className="flex items-center gap-5 text-zinc-400">
          <button className="hover:text-white transition-colors hover:scale-105 active:scale-95"><ShoppingBag className="w-5 h-5" weight="bold" /></button>
          <button className="hover:text-white transition-colors hover:scale-105 active:scale-95"><User className="w-5 h-5" weight="bold" /></button>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-8 py-8 flex flex-col lg:flex-row gap-12">
        
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-[260px] flex-shrink-0 space-y-10">
          <div className="flex items-center gap-2 text-white font-medium text-lg tracking-tight">
            <Settings2 className="w-5 h-5" weight="bold" />
            Filters
          </div>

          <div className="relative group">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" weight="bold" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121214] border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/40 focus:bg-[#18181b] transition-all placeholder:text-zinc-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
            />
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Categories</h3>
            <ul className="space-y-3 text-[15px] text-zinc-400">
              <li 
                onClick={() => setSelectedCategory(null)}
                className={`flex items-center justify-between cursor-pointer tracking-tight transition-colors ${!selectedCategory ? 'text-emerald-400 font-medium relative pl-5' : 'text-zinc-400 hover:text-white pl-4'}`}
              >
                {!selectedCategory && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>}
                All Categories <span className={`text-xs ${!selectedCategory ? 'text-emerald-500/70 font-normal' : 'text-zinc-500'}`}>{products.length}</span>
              </li>
              {Array.from(new Set(products.map(p => p.category))).map(cat => (
                <li 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center justify-between cursor-pointer tracking-tight transition-colors ${selectedCategory === cat ? 'text-emerald-400 font-medium relative pl-5' : 'text-zinc-400 hover:text-white pl-4'}`}
                >
                  {selectedCategory === cat && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>}
                  {cat} <span className={`text-xs ${selectedCategory === cat ? 'text-emerald-500/70 font-normal' : 'text-zinc-500'}`}>{products.filter(p => p.category === cat).length}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div className="space-y-6">
            <h3 className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Price</h3>
            {/* Visual mock of slider */}
            <div className="px-1 relative h-10 w-full flex items-end justify-center">
                <div className="absolute inset-0 flex items-end justify-between px-2 pb-2 opacity-30">
                    {/* Mock bars for histogram */}
                    <div className="w-1.5 h-3 bg-zinc-600 hover:bg-emerald-400 transition-colors rounded-t-sm"></div>
                    <div className="w-1.5 h-5 bg-zinc-600 rounded-t-sm"></div>
                    <div className="w-1.5 h-4 bg-zinc-600 rounded-t-sm"></div>
                    <div className="w-1.5 h-7 bg-zinc-600 rounded-t-sm"></div>
                    <div className="w-1.5 h-6 bg-zinc-600 rounded-t-sm"></div>
                    <div className="w-1.5 h-8 bg-emerald-400 opacity-100 shadow-[0_0_8px_rgba(16,185,129,0.4)] rounded-t-sm"></div>
                    <div className="w-1.5 h-10 bg-emerald-400 opacity-100 shadow-[0_0_8px_rgba(16,185,129,0.4)] rounded-t-sm"></div>
                    <div className="w-1.5 h-9 bg-emerald-400 opacity-100 shadow-[0_0_8px_rgba(16,185,129,0.4)] rounded-t-sm"></div>
                    <div className="w-1.5 h-6 bg-zinc-600 rounded-t-sm"></div>
                    <div className="w-1.5 h-4 bg-zinc-600 rounded-t-sm"></div>
                </div>
                <div className="w-full h-1 bg-zinc-800 rounded-full relative z-10">
                    <div className="absolute left-[30%] right-[30%] h-full bg-emerald-400 rounded-full"></div>
                    <div className="absolute left-[30%] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.5)] flex items-center justify-center cursor-pointer border border-zinc-200 hover:scale-125 transition-transform"></div>
                    <div className="absolute right-[30%] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.5)] flex items-center justify-center cursor-pointer border border-zinc-200 hover:scale-125 transition-transform"></div>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-[#121214] rounded-xl border border-white/5 flex items-center px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                <span className="text-zinc-500 text-sm mr-2">$</span>
                <input type="number" value={priceRange[0]} onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])} className="bg-transparent w-full text-sm focus:outline-none font-mono" />
              </div>
              <span className="text-zinc-600">-</span>
              <div className="flex-1 bg-[#121214] rounded-xl border border-white/5 flex items-center px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                <span className="text-zinc-500 text-sm mr-2">$</span>
                <input type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} className="bg-transparent w-full text-sm focus:outline-none font-mono" />
              </div>
            </div>
          </div>

          {/* Size */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Size</h3>
            <div className="flex gap-2">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <button 
                  key={size}
                  onClick={() => setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm transition-all border ${
                    selectedSizes.includes(size) ? 'bg-zinc-800 border-emerald-500/50 text-emerald-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]' : 'bg-transparent border-white/5 text-zinc-400 hover:border-white/20 hover:bg-white/5'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {['Modern', 'Minimalist', 'Air-Purifying', 'Mini', 'Indoor', 'Luxury', 'Office', 'Exotic'].map((tag) => (
                <button 
                  key={tag}
                  onClick={() => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
                  className={`px-4 py-2 rounded-lg text-[13px] transition-all border ${
                    selectedTags.includes(tag) 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]' 
                    : 'bg-transparent border-white/5 text-zinc-400 hover:border-white/20 hover:bg-white/5'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* Main Content */}
        <section className="flex-1 min-w-0">
          <div className="mb-8">
            <h1 className="font-outfit text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-6 leading-none">{selectedCategory || 'All Plants'}</h1>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 z-40 relative">
              <div className="flex flex-wrap items-center gap-2">
                {/* Active Filter Chips */}
                {selectedCategory && (
                  <div className="flex items-center gap-2 bg-[#18181b] px-3 py-1.5 rounded-full text-[13px] text-zinc-300 border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                    <span><span className="text-zinc-500">Category: </span>{selectedCategory}</span>
                    <button onClick={() => setSelectedCategory(null)} className="text-zinc-500 hover:text-white transition-colors"><X className="w-3.5 h-3.5" weight="bold" /></button>
                  </div>
                )}
                {selectedSizes.map(size => (
                  <div key={`size-${size}`} className="flex items-center gap-2 bg-[#18181b] px-3 py-1.5 rounded-full text-[13px] text-zinc-300 border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                    <span><span className="text-zinc-500">Size: </span>{size}</span>
                    <button onClick={() => setSelectedSizes(prev => prev.filter(s => s !== size))} className="text-zinc-500 hover:text-white transition-colors"><X className="w-3.5 h-3.5" weight="bold" /></button>
                  </div>
                ))}
                {selectedTags.map(tag => (
                  <div key={`tag-${tag}`} className="flex items-center gap-2 bg-[#18181b] px-3 py-1.5 rounded-full text-[13px] text-zinc-300 border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                    <span>{tag}</span>
                    <button onClick={() => setSelectedTags(prev => prev.filter(t => t !== tag))} className="text-zinc-500 hover:text-white transition-colors"><X className="w-3.5 h-3.5" weight="bold" /></button>
                  </div>
                ))}
                {searchQuery && (
                  <div className="flex items-center gap-2 bg-[#18181b] px-3 py-1.5 rounded-full text-[13px] text-zinc-300 border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                    <span><span className="text-zinc-500">Search: </span>&quot;{searchQuery}&quot;</span>
                    <button onClick={() => setSearchQuery('')} className="text-zinc-500 hover:text-white transition-colors"><X className="w-3.5 h-3.5" weight="bold" /></button>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-6 text-[13px] text-zinc-400">
                <div className="relative group">
                  <button className="flex items-center gap-2 hover:text-white transition-colors py-2">
                    {sortBy === 'default' ? 'Default Sorting' : sortBy === 'price-asc' ? 'Price: Low to High' : 'Price: High to Low'} <ChevronDown className="w-3 h-3" weight="bold" />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[#121214] border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                    <button onClick={() => setSortBy('default')} className="w-full text-left px-4 py-2.5 text-sm text-zinc-400 hover:text-emerald-400 hover:bg-white/5 transition-colors">Default Sorting</button>
                    <button onClick={() => setSortBy('price-asc')} className="w-full text-left px-4 py-2.5 text-sm text-zinc-400 hover:text-emerald-400 hover:bg-white/5 transition-colors">Price: Low to High</button>
                    <button onClick={() => setSortBy('price-desc')} className="w-full text-left px-4 py-2.5 text-sm text-zinc-400 hover:text-emerald-400 hover:bg-white/5 transition-colors">Price: High to Low</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-[2rem] overflow-hidden border border-white/5 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          >
            {filteredProducts.length === 0 ? (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-zinc-500">
                <Leaf className="w-12 h-12 mb-4 opacity-20" weight="duotone" />
                <p className="text-lg font-medium">No products match your filters</p>
                <button 
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedSizes([]);
                    setSelectedTags([]);
                    setSearchQuery('');
                    setPriceRange([0, 300]);
                  }}
                  className="mt-4 text-emerald-400 hover:text-emerald-300 text-sm transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : filteredProducts.map((product) => (
              <motion.div 
                variants={itemVariants}
                key={product.id}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative group bg-[#09090b] p-8 transition-all duration-500 ease-out flex flex-col hover:bg-[#121214]"
              >
                {/* Background glow effect for featured */}
                {product.featured && (
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/10 to-transparent pointer-events-none"></div>
                )}

                <button className="absolute top-6 right-6 z-20 text-zinc-600 hover:text-emerald-400 transition-colors">
                  <Heart className="w-5 h-5" weight={product.liked ? "fill" : "regular"} color={product.liked ? "#10b981" : "currentColor"} />
                </button>

                {/* Image Container */}
                <div className="w-full flex-grow flex items-center justify-center relative mb-8 h-[240px]">
                   <div className="relative w-[180px] h-[220px]">
                      <Image 
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover rounded-2xl drop-shadow-2xl transition-transform duration-700 select-none pointer-events-none group-hover:scale-110 group-hover:-translate-y-4"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                   </div>
                   
                   {/* Quick View Button */}
                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-30">
                     <button 
                       onClick={(e) => {
                         e.preventDefault();
                         setQuickViewProduct(product);
                       }}
                       className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white text-[13px] font-medium px-4 py-2 rounded-full shadow-lg whitespace-nowrap"
                     >
                       Quick View
                     </button>
                   </div>
                </div>

                <div className="relative z-10 flex gap-4 items-end justify-between mt-auto">
                  <div className="min-w-0">
                    <h3 className="text-white font-medium text-[15px] mb-1 truncate">{product.name}</h3>
                    <p className="text-zinc-500 text-[13px] truncate">{product.subtitle}</p>
                  </div>
                  <div className="text-emerald-400 text-base font-mono tracking-wide">
                    ${product.price}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewProduct(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-[#0d0d0f] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10"
            >
              <button 
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors"
              >
                <X className="w-4 h-4" weight="bold" />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-1/2 relative bg-zinc-900/50 min-h-[300px] md:min-h-[500px] flex items-center justify-center p-8">
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent pointer-events-none"></div>
                <div className="relative w-full max-w-[280px] aspect-[4/5]">
                  <Image 
                    src={quickViewProduct.image}
                    alt={quickViewProduct.name}
                    fill
                    className="object-cover rounded-2xl drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* Details Section */}
              <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col">
                <div className="mb-2">
                  <span className="text-emerald-400 text-xs font-semibold tracking-wider uppercase">{quickViewProduct.category}</span>
                </div>
                <h2 className="text-3xl font-outfit font-semibold text-white mb-2">{quickViewProduct.name}</h2>
                <div className="text-2xl font-mono text-emerald-400 mb-6">${quickViewProduct.price}</div>
                
                <p className="text-zinc-400 text-[15px] leading-relaxed mb-8 flex-grow">
                  {quickViewProduct.description}
                </p>

                <div className="space-y-6 mt-auto">
                  <div>
                    <h4 className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-3">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.tags.map(tag => (
                        <span key={tag} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-zinc-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex gap-4">
                    <button className="flex-1 bg-white text-black font-semibold py-3.5 rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
                      <ShoppingBag className="w-5 h-5" weight="bold" />
                      Add to Cart
                    </button>
                    <button className="w-14 shrink-0 flex items-center justify-center border border-white/10 rounded-xl hover:bg-white/5 transition-colors text-white">
                      <Heart className="w-5 h-5" weight={quickViewProduct.liked ? "fill" : "regular"} color={quickViewProduct.liked ? "#10b981" : "currentColor"} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
