'use client';

'use client';

import React, { useState, useMemo } from 'react';
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

const ALL_CATEGORIES = ['All', 'Potted Elegance', 'Hanging Greenery', 'Outdoor Charm', 'Compact Decor', 'Statement Plants'];
const SIZES = ['S', 'M', 'L', 'XL'];
const ALL_TAGS = ['Modern', 'Minimalist', 'Air-Purifying', 'Mini', 'Indoor', 'Luxury', 'Office', 'Exotic'];

const allProducts = [
  {
    id: 1,
    name: 'Tropical Breeze Set',
    subtitle: 'Lush & vibrant',
    price: 180,
    category: 'Potted Elegance',
    size: 'L',
    tags: ['Indoor', 'Air-Purifying'],
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
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80',
    liked: true,
    featured: true,
  },
  {
    id: 3,
    name: 'Fresh Vibe Pot',
    subtitle: 'Glossy foliage charm',
    price: 120,
    category: 'Compact Decor',
    size: 'S',
    tags: ['Mini', 'Office', 'Modern'],
    image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=600&q=80',
    liked: false,
    featured: false,
  },
  {
    id: 4,
    name: 'Serene Space Set',
    subtitle: 'Calming deep green',
    price: 150,
    category: 'Potted Elegance',
    size: 'M',
    tags: ['Indoor', 'Modern'],
    image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80',
    liked: false,
    featured: false,
  },
  {
    id: 6,
    name: 'Minimalist Luxe Pot',
    subtitle: 'Clean modern lines',
    price: 210,
    category: 'Potted Elegance',
    size: 'L',
    tags: ['Luxury', 'Modern', 'Minimalist'],
    image: 'https://images.unsplash.com/photo-1456015509951-e12456ee7fcc?auto=format&fit=crop&w=600&q=80',
    liked: true,
    featured: false,
  },
  {
    id: 7,
    name: 'Hanging Cascade',
    subtitle: 'Elegant drooping leaves',
    price: 95,
    category: 'Hanging Greenery',
    size: 'M',
    tags: ['Indoor', 'Air-Purifying'],
    image: 'https://images.unsplash.com/photo-1416879598553-3375806e2ea8?auto=format&fit=crop&w=600&q=80',
    liked: false,
    featured: false,
  },
  {
    id: 8,
    name: 'Desert Mirage',
    subtitle: 'Hardy and structural',
    price: 135,
    category: 'Outdoor Charm',
    size: 'M',
    tags: ['Exotic', 'Modern'],
    image: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=600&q=80',
    liked: false,
    featured: false,
  },
  {
    id: 9,
    name: 'Emerald Giant',
    subtitle: 'Broad leaf beauty',
    price: 320,
    category: 'Statement Plants',
    size: 'XL',
    tags: ['Luxury', 'Air-Purifying'],
    image: 'https://images.unsplash.com/photo-1487798452839-c748a707a6b2?auto=format&fit=crop&w=600&q=80',
    liked: true,
    featured: false,
  },
  {
    id: 10,
    name: 'Tiny Spikes',
    subtitle: 'Prickly but cute',
    price: 45,
    category: 'Compact Decor',
    size: 'S',
    tags: ['Mini', 'Exotic'],
    image: 'https://images.unsplash.com/photo-1505063812239-01bbd337de0f?auto=format&fit=crop&w=600&q=80',
    liked: false,
    featured: false,
  },
  {
    id: 11,
    name: 'Balcony Fern',
    subtitle: 'Loves the shade',
    price: 75,
    category: 'Outdoor Charm',
    size: 'M',
    tags: ['Minimalist'],
    image: 'https://images.unsplash.com/photo-1545241047-608261118f58?auto=format&fit=crop&w=600&q=80',
    liked: false,
    featured: false,
  },
  {
    id: 12,
    name: 'Office Companion',
    subtitle: 'Low maintenance hero',
    price: 60,
    category: 'Compact Decor',
    size: 'S',
    tags: ['Office', 'Indoor'],
    image: 'https://images.unsplash.com/photo-1536069221282-d877868cad6b?auto=format&fit=crop&w=600&q=80',
    liked: false,
    featured: false,
  }
];

export default function Page() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  
  // Filtering logic
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Search
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && !product.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      // Category
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      // Size
      if (selectedSize && product.size !== selectedSize) {
        return false;
      }
      // Tags (must contain all selected tags)
      if (selectedTags.length > 0) {
        const hasAllTags = selectedTags.every(tag => product.tags.includes(tag));
        if (!hasAllTags) return false;
      }
      // Price
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      
      return true;
    });
  }, [searchQuery, selectedCategory, selectedSize, selectedTags, priceRange]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const removeFilter = (type: string, value?: string) => {
    if (type === 'search') setSearchQuery('');
    if (type === 'category') setSelectedCategory('All');
    if (type === 'size') setSelectedSize(null);
    if (type === 'tag' && value) toggleTag(value);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedSize(null);
    setSelectedTags([]);
  };

  const activeFilterCount = (searchQuery ? 1 : 0) + (selectedCategory !== 'All' ? 1 : 0) + (selectedSize ? 1 : 0) + selectedTags.length;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        // Remove delay to make filtering snappier
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring" as const, stiffness: 400, damping: 30 }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 }
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

      <main className="max-w-[1600px] mx-auto w-full px-8 py-8 flex flex-col lg:flex-row gap-12">
        
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-[260px] flex-shrink-0 space-y-10">
          <div className="flex items-center gap-2 text-white font-medium text-lg tracking-tight">
            <Settings2 className="w-5 h-5" weight="bold" />
            Filters
            {activeFilterCount > 0 && (
               <button 
                 onClick={clearAllFilters}
                 className="ml-auto text-[13px] text-zinc-500 hover:text-emerald-400 font-normal transition-colors"
               >
                 Clear all
               </button>
            )}
          </div>

          <div className="relative group">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" weight="bold" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121214] border border-white/5 rounded-xl py-2.5 pl-10 pr-10 text-sm focus:outline-none focus:border-emerald-500/40 focus:bg-[#18181b] transition-all placeholder:text-zinc-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
                <X className="w-3.5 h-3.5" weight="bold" />
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Categories</h3>
            <ul className="space-y-3 text-[15px] text-zinc-400">
              {ALL_CATEGORIES.map(category => (
                <li 
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center justify-between transition-colors cursor-pointer pl-5 tracking-tight relative ${
                    selectedCategory === category ? 'text-emerald-400 font-medium' : 'hover:text-white'
                  }`}
                >
                  {selectedCategory === category && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                  )}
                  {category} 
                  <span className={`text-xs ${selectedCategory === category ? 'text-emerald-500/70 font-normal' : 'text-zinc-600'}`}>
                    {category === 'All' ? allProducts.length : allProducts.filter(p => p.category === category).length}
                  </span>
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
                    <div className="absolute left-[0%] right-[100%] h-full bg-emerald-400 rounded-full"></div>
                    <div className="absolute left-[0%] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.5)] flex items-center justify-center cursor-pointer border border-zinc-200 hover:scale-125 transition-transform"></div>
                    <div className="absolute right-[0%] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.5)] flex items-center justify-center cursor-pointer border border-zinc-200 hover:scale-125 transition-transform"></div>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-[#121214] rounded-xl border border-white/5 flex items-center px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] focus-within:border-emerald-500/40 transition-colors">
                <span className="text-zinc-500 text-sm mr-2">$</span>
                <input 
                  type="number" 
                  value={priceRange[0]} 
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="bg-transparent w-full text-sm focus:outline-none font-mono" 
                />
              </div>
              <span className="text-zinc-600">-</span>
              <div className="flex-1 bg-[#121214] rounded-xl border border-white/5 flex items-center px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] focus-within:border-emerald-500/40 transition-colors">
                <span className="text-zinc-500 text-sm mr-2">$</span>
                <input 
                  type="number" 
                  value={priceRange[1]} 
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="bg-transparent w-full text-sm focus:outline-none font-mono" 
                />
              </div>
            </div>
          </div>

          {/* Size */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Size</h3>
            <div className="flex gap-2">
              {SIZES.map((size) => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm transition-all border ${
                    selectedSize === size 
                    ? 'bg-zinc-800 border-zinc-600 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]' 
                    : 'bg-transparent border-white/5 text-zinc-400 hover:border-white/20 hover:bg-white/5'
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
              {ALL_TAGS.map((tag) => {
                const isActive = selectedTags.includes(tag);
                return (
                  <button 
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-lg text-[13px] transition-all border ${
                      isActive
                      ? 'bg-zinc-800 border-zinc-500 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]' 
                      : 'bg-transparent border-white/5 text-zinc-400 hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

        </aside>

        {/* Main Content */}
        <section className="flex-1 min-w-0 flex flex-col">
          <div className="mb-8">
            <h1 className="font-outfit text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-6 leading-none">
              {selectedCategory === 'All' ? 'Our Collection' : selectedCategory}
              <span className="text-emerald-500/50 text-2xl ml-4 font-mono font-medium">{filteredProducts.length}</span>
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 min-h-[32px]">
                {/* Active Filter Chips */}
                <AnimatePresence>
                  {searchQuery && (
                    <motion.div initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.8}} className="flex items-center gap-2 bg-[#18181b] px-3 py-1.5 rounded-full text-[13px] text-zinc-300 border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                      <span><span className="text-zinc-500">Search: </span>"{searchQuery}"</span>
                      <button onClick={() => removeFilter('search')} className="text-zinc-500 hover:text-white transition-colors"><X className="w-3.5 h-3.5" weight="bold" /></button>
                    </motion.div>
                  )}
                  {selectedCategory !== 'All' && (
                    <motion.div initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.8}} className="flex items-center gap-2 bg-[#18181b] px-3 py-1.5 rounded-full text-[13px] text-zinc-300 border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                      <span><span className="text-zinc-500">Category: </span>{selectedCategory}</span>
                      <button onClick={() => removeFilter('category')} className="text-zinc-500 hover:text-white transition-colors"><X className="w-3.5 h-3.5" weight="bold" /></button>
                    </motion.div>
                  )}
                  {selectedSize && (
                    <motion.div initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.8}} className="flex items-center gap-2 bg-[#18181b] px-3 py-1.5 rounded-full text-[13px] text-zinc-300 border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                      <span><span className="text-zinc-500">Size: </span>{selectedSize}</span>
                      <button onClick={() => removeFilter('size')} className="text-zinc-500 hover:text-white transition-colors"><X className="w-3.5 h-3.5" weight="bold" /></button>
                    </motion.div>
                  )}
                  {selectedTags.map(tag => (
                    <motion.div key={tag} initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.8}} className="flex items-center gap-2 bg-[#18181b] px-3 py-1.5 rounded-full text-[13px] text-zinc-300 border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                      <span>{tag}</span>
                      <button onClick={() => removeFilter('tag', tag)} className="text-zinc-500 hover:text-white transition-colors"><X className="w-3.5 h-3.5" weight="bold" /></button>
                    </motion.div>
                  ))}
                  {activeFilterCount === 0 && (
                    <span className="text-sm text-zinc-600 italic">Showing all {allProducts.length} items</span>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="flex items-center gap-6 text-[13px] text-zinc-400">
                <button className="flex items-center gap-2 hover:text-white transition-colors">
                  Default Sorting <ChevronDown className="w-3 h-3" weight="bold" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1 min-h-[500px] relative">
            {filteredProducts.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-white/5 rounded-[2rem] border border-white/5 backdrop-blur-md">
                <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-zinc-500">
                   <Search className="w-8 h-8" weight="duotone" />
                </div>
                <h3 className="text-xl text-white font-medium mb-2">No plants found</h3>
                <p className="text-zinc-400 max-w-sm mb-6">We couldn't find anything matching your current filters. Try adjusting them or clear all filters.</p>
                <button 
                  onClick={clearAllFilters}
                  className="px-6 py-2 bg-white text-black font-medium rounded-full hover:bg-zinc-200 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
               <motion.div 
                 layout
                 variants={containerVariants}
                 initial="hidden"
                 animate="show"
                 className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-px bg-white/5 rounded-[2rem] overflow-hidden border border-white/5 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
               >
                 <AnimatePresence mode="popLayout">
                   {filteredProducts.map((product) => (
                     <motion.div 
                       layoutId={`product-${product.id}`}
                       variants={itemVariants}
                       initial="hidden"
                       animate="show"
                       exit="exit"
                       key={product.id}
                       onMouseEnter={() => setHoveredId(product.id)}
                       onMouseLeave={() => setHoveredId(null)}
                       className="relative group bg-[#09090b] p-8 transition-all duration-500 ease-out flex flex-col hover:bg-[#121214]"
                     >
                       {/* Background glow effect for featured */}
                       {product.featured && (
                         <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/10 to-transparent pointer-events-none"></div>
                       )}

                       <button className="absolute top-6 right-6 z-20 text-zinc-600 hover:text-emerald-400 transition-colors hover:scale-110 active:scale-95">
                         <Heart className="w-5 h-5 pointer-events-none" weight={product.liked ? "fill" : "regular"} color={product.liked ? "#10b981" : "currentColor"} />
                       </button>

                       {/* Image Container */}
                       <div className="w-full flex-grow flex items-center justify-center relative mb-8 h-[240px]">
                          <div className="relative w-[180px] h-[220px]">
                             <Image 
                               src={product.image}
                               alt={product.name}
                               fill
                               className="object-cover rounded-2xl drop-shadow-2xl transition-transform duration-700 select-none pointer-events-none group-hover:scale-[1.15] group-hover:-translate-y-4"
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
                 </AnimatePresence>
               </motion.div>
            )}
          </div>
        </section>
      </main>
      </div>
    </div>
  );
}

