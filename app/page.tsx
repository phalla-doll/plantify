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
    // Using a clear shape plant image, applying styling to make it somewhat fit
    image: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=600&q=80',
    liked: false,
    featured: false,
  },
  {
    id: 2,
    name: 'Cozy Corner Plant',
    subtitle: 'Rich green texture',
    price: 240,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80',
    liked: true,
    featured: true, // The rotated one
  },
  {
    id: 3,
    name: 'Fresh Vibe Pot',
    subtitle: 'Glossy foliage charm',
    price: 120,
    image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=600&q=80',
    liked: false,
    featured: false,
  },
  {
    id: 4,
    name: 'Serene Space Set',
    subtitle: 'Calming deep green',
    price: 120,
    image: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=600&q=80',
    liked: false,
    featured: false,
  },
  {
    id: 5,
    name: 'Golden Hour Leaf',
    subtitle: 'Warm leaf tones',
    price: 80,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80',
    liked: false,
    featured: false,
  },
  {
    id: 6,
    name: 'Minimalist Luxe Pot',
    subtitle: 'Clean modern lines',
    price: 180,
    image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=600&q=80',
    liked: true,
    featured: false,
  },
];

export default function Page() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

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
              placeholder="Search..." 
              className="w-full bg-[#121214] border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/40 focus:bg-[#18181b] transition-all placeholder:text-zinc-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
            />
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Categories</h3>
            <ul className="space-y-3 text-[15px] text-zinc-400">
              <li className="flex items-center justify-between text-emerald-400 font-medium relative pl-5 tracking-tight">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                Potted Elegance <span className="text-xs text-emerald-500/70 font-normal">78</span>
              </li>
              <li className="flex items-center justify-between hover:text-white transition-colors cursor-pointer pl-4">
                Hanging Greenery <span className="text-xs text-gray-500">59</span>
              </li>
              <li className="flex items-center justify-between hover:text-white transition-colors cursor-pointer pl-4">
                Outdoor Charm <span className="text-xs text-zinc-500">64</span>
              </li>
              <li className="flex items-center justify-between hover:text-white transition-colors cursor-pointer pl-4 tracking-tight">
                Compact Decor <span className="text-xs text-zinc-500">127</span>
              </li>
              <li className="flex items-center justify-between hover:text-white transition-colors cursor-pointer pl-4 tracking-tight">
                Statement Plants <span className="text-xs text-zinc-500">36</span>
              </li>
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
                <input type="text" value="50" readOnly className="bg-transparent w-full text-sm focus:outline-none font-mono" />
              </div>
              <span className="text-zinc-600">-</span>
              <div className="flex-1 bg-[#121214] rounded-xl border border-white/5 flex items-center px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                <span className="text-zinc-500 text-sm mr-2">$</span>
                <input type="text" value="250" readOnly className="bg-transparent w-full text-sm focus:outline-none font-mono" />
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
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm transition-all border ${
                    size === 'M' ? 'bg-zinc-800 border-zinc-600 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]' : 'bg-transparent border-white/5 text-zinc-400 hover:border-white/20 hover:bg-white/5'
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
                  className={`px-4 py-2 rounded-lg text-[13px] transition-all border ${
                    ['Air-Purifying', 'Luxury'].includes(tag) 
                    ? 'bg-zinc-800 border-zinc-700 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]' 
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
            <h1 className="font-outfit text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-6 leading-none">Potted Elegance</h1>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {/* Active Filter Chips */}
                {[
                  { label: "Price range", value: "$50 - 250" },
                  { label: "Size", value: "Medium" },
                  { label: "Tag", value: "Luxury", hideLabel: true },
                  { label: "Tag", value: "Air-Purifying", hideLabel: true },
                ].map((filter, i) => (
                  <div key={i} className="flex items-center gap-2 bg-[#18181b] px-3 py-1.5 rounded-full text-[13px] text-zinc-300 border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                    <span>{filter.hideLabel ? '' : <span className="text-zinc-500">{filter.label}: </span>}{filter.value}</span>
                    <button className="text-zinc-500 hover:text-white transition-colors"><X className="w-3.5 h-3.5" weight="bold" /></button>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center gap-6 text-[13px] text-zinc-400">
                <button className="flex items-center gap-2 hover:text-white transition-colors">
                  Default Sorting <ChevronDown className="w-3 h-3" weight="bold" />
                </button>
                <div className="w-[1px] h-4 bg-white/10"></div>
                <button className="flex items-center gap-2 hover:text-white transition-colors">
                  Categories <ChevronDown className="w-3 h-3" weight="bold" />
                </button>
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
            {products.map((product) => (
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
    </div>
  );
}
