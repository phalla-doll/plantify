import React from 'react';
import Image from 'next/image';
import { 
  Search, 
  ShoppingBag, 
  User, 
  Settings2, 
  ChevronDown, 
  Heart, 
  Leaf,
  X
} from 'lucide-react';

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
    image: 'https://images.unsplash.com/photo-1614594975525-e45190ca6155?auto=format&fit=crop&w=600&q=80',
    liked: true,
    featured: true, // The rotated one
  },
  {
    id: 3,
    name: 'Fresh Vibe Pot',
    subtitle: 'Glossy foliage charm',
    price: 120,
    image: 'https://images.unsplash.com/photo-1456015509951-e12456ee7fcc?auto=format&fit=crop&w=600&q=80',
    liked: false,
    featured: false,
  },
  {
    id: 4,
    name: 'Serene Space Set',
    subtitle: 'Calming deep green',
    price: 120,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80',
    liked: false,
    featured: false,
  },
  {
    id: 5,
    name: 'Golden Hour Leaf',
    subtitle: 'Warm leaf tones',
    price: 80,
    image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=600&q=80',
    liked: false,
    featured: false,
  },
  {
    id: 6,
    name: 'Minimalist Luxe Pot',
    subtitle: 'Clean modern lines',
    price: 180,
    image: 'https://images.unsplash.com/photo-1545241047-608261118f58?auto=format&fit=crop&w=600&q=80',
    liked: true,
    featured: false,
  },
];

export default function Page() {
  return (
    <div className="relative min-h-screen bg-[#111213] text-[#F3F4F6] font-sans selection:bg-green-900/30 overflow-hidden">
      {/* Background soft ambient glows */}
      <div className="absolute top-[20%] left-[-20%] w-[50%] h-[50%] bg-green-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-green-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-white/5">
        <div className="flex items-center gap-2 text-green-400">
          <Leaf className="w-6 h-6 fill-green-500" />
          <span className="font-outfit text-xl font-semibold tracking-tight text-white">Plantify</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#" className="text-white">Catalog</a>
          <a href="#" className="hover:text-white transition-colors">Instructions</a>
          <a href="#" className="hover:text-white transition-colors">FAQ</a>
          <a href="#" className="hover:text-white transition-colors">About Us</a>
        </nav>

        <div className="flex items-center gap-5 text-gray-400">
          <button className="hover:text-white transition-colors"><ShoppingBag className="w-[18px] h-[18px]" strokeWidth={2} /></button>
          <button className="hover:text-white transition-colors"><User className="w-[18px] h-[18px]" strokeWidth={2} /></button>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-8 py-8 flex flex-col lg:flex-row gap-12">
        
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-[260px] flex-shrink-0 space-y-10">
          <div className="flex items-center gap-2 text-white font-medium text-lg">
            <Settings2 className="w-5 h-5" />
            Filters
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-[#18191B] border border-white/5 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-green-500/50 transition-colors placeholder:text-gray-500"
            />
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Categories</h3>
            <ul className="space-y-3 text-[15px] text-gray-400">
              <li className="flex items-center justify-between text-white font-medium relative pl-4">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full"></span>
                Potted Elegance <span className="text-xs text-gray-500 font-normal">78</span>
              </li>
              <li className="flex items-center justify-between hover:text-white transition-colors cursor-pointer pl-4">
                Hanging Greenery <span className="text-xs text-gray-500">59</span>
              </li>
              <li className="flex items-center justify-between hover:text-white transition-colors cursor-pointer pl-4">
                Outdoor Charm <span className="text-xs text-gray-500">64</span>
              </li>
              <li className="flex items-center justify-between hover:text-white transition-colors cursor-pointer pl-4">
                Compact Decor <span className="text-xs text-gray-500">127</span>
              </li>
              <li className="flex items-center justify-between hover:text-white transition-colors cursor-pointer pl-4">
                Statement Plants <span className="text-xs text-gray-500">36</span>
              </li>
            </ul>
          </div>

          {/* Price Range */}
          <div className="space-y-6">
            <h3 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Price</h3>
            {/* Visual mock of slider */}
            <div className="px-1 relative h-10 w-full flex items-end justify-center">
                <div className="absolute inset-0 flex items-end justify-between px-2 pb-2 opacity-20">
                    {/* Mock bars for histogram */}
                    <div className="w-1.5 h-3 bg-white hover:bg-green-400"></div>
                    <div className="w-1.5 h-5 bg-white"></div>
                    <div className="w-1.5 h-4 bg-white"></div>
                    <div className="w-1.5 h-7 bg-white"></div>
                    <div className="w-1.5 h-6 bg-white"></div>
                    <div className="w-1.5 h-8 bg-green-400 opacity-100"></div>
                    <div className="w-1.5 h-10 bg-green-400 opacity-100"></div>
                    <div className="w-1.5 h-9 bg-green-400 opacity-100"></div>
                    <div className="w-1.5 h-6 bg-white"></div>
                    <div className="w-1.5 h-4 bg-white"></div>
                </div>
                <div className="w-full h-1 bg-gray-800 rounded-full relative z-10">
                    <div className="absolute left-[30%] right-[30%] h-full bg-white rounded-full"></div>
                    <div className="absolute left-[30%] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow flex items-center justify-center cursor-pointer border border-gray-300"></div>
                    <div className="absolute right-[30%] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow flex items-center justify-center cursor-pointer border border-gray-300"></div>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-[#18191B] rounded border border-white/5 flex items-center px-3 py-2">
                <span className="text-gray-500 text-sm mr-2">$</span>
                <input type="text" value="50" readOnly className="bg-transparent w-full text-sm focus:outline-none" />
              </div>
              <span className="text-gray-600">-</span>
              <div className="flex-1 bg-[#18191B] rounded border border-white/5 flex items-center px-3 py-2">
                <span className="text-gray-500 text-sm mr-2">$</span>
                <input type="text" value="250" readOnly className="bg-transparent w-full text-sm focus:outline-none" />
              </div>
            </div>
          </div>

          {/* Size */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Size</h3>
            <div className="flex gap-2">
              {['S', 'M', 'L', 'XL'].map((size, i) => (
                <button 
                  key={size}
                  className={`w-10 h-10 rounded flex items-center justify-center text-sm transition-colors border ${
                    size === 'M' ? 'bg-[#2A2B2D] border-white/10 text-white' : 'bg-transparent border-white/5 text-gray-400 hover:border-white/20'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {['Modern', 'Minimalist', 'Air-Purifying', 'Mini', 'Indoor', 'Luxury', 'Office', 'Exotic'].map((tag) => (
                <button 
                  key={tag}
                  className={`px-4 py-2 rounded text-sm transition-colors border ${
                    ['Air-Purifying', 'Luxury'].includes(tag) 
                    ? 'bg-[#2A2B2D] border-white/10 text-white' 
                    : 'bg-transparent border-white/5 text-gray-400 hover:border-white/20'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* Main Content */}
        <section className="flex-1">
          <div className="mb-8">
            <h1 className="font-outfit text-[32px] md:text-[40px] font-semibold text-white mb-6">Potted Elegance</h1>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {/* Active Filter Chips */}
                {[
                  { label: "Price range", value: "$50 - 250" },
                  { label: "Size", value: "Medium" },
                  { label: "Tag", value: "Luxury", hideLabel: true },
                  { label: "Tag", value: "Air-Purifying", hideLabel: true },
                ].map((filter, i) => (
                  <div key={i} className="flex items-center gap-2 bg-[#1C1D1F] px-3 py-1.5 rounded text-[13px] text-gray-300 border border-white/5">
                    <span>{filter.hideLabel ? '' : <span className="text-gray-500">{filter.label}: </span>}{filter.value}</span>
                    <button className="text-gray-500 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center gap-6 text-[13px] text-gray-400">
                <button className="flex items-center gap-2 hover:text-white transition-colors">
                  Default Sorting <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <div className="w-[1px] h-4 bg-white/10"></div>
                <button className="flex items-center gap-2 hover:text-white transition-colors">
                  Categories <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <div 
                key={product.id}
                className={`relative group p-6 pb-8 transition-all duration-300 ease-out flex flex-col 
                  ${product.featured ? 'bg-[#222325] z-10 xl:rotate-[-4deg] xl:scale-[1.05] shadow-2xl shadow-green-900/10 border border-white/10' : 'bg-[#1A1A1C] hover:bg-[#1E1F21] border border-transparent'}
                `}
                style={{ borderRadius: '4px' }}
              >
                {/* Background glow effect for featured */}
                {product.featured && (
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-800/20 to-transparent pointer-events-none rounded"></div>
                )}

                <button className="absolute top-5 right-5 z-20 text-gray-500 hover:text-white transition-colors">
                  <Heart className={`w-5 h-5 ${product.liked ? 'fill-white text-white' : ''}`} />
                </button>

                {/* Image Container with specific styling to emulate the "floating" transparent plant look */}
                <div className="w-full flex-grow flex items-center justify-center relative mb-10 h-[280px]">
                   <div className="relative w-[200px] h-[250px] transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2">
                      <Image 
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover rounded-md drop-shadow-xl"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                   </div>
                </div>

                <div className="relative z-10 flex gap-4 items-end justify-between mt-auto">
                  <div>
                    <h3 className="text-white font-medium text-[15px] mb-1">{product.name}</h3>
                    <p className="text-gray-500 text-sm">{product.subtitle}</p>
                  </div>
                  <div className="text-white text-[15px] font-medium tracking-wide">
                    ${product.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      </div>
    </div>
  );
}
