import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageCircle, Search, X } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, WHATSAPP_NUMBER } from '../constants';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  key?: string | number;
}

function ProductCard({ product, onClick }: ProductCardProps) {
    const averageRating = product.reviews.length > 0 
      ? product.reviews.reduce((acc, rev) => acc + rev.rating, 0) / product.reviews.length 
      : 0;

  return (
    <motion.div 
      layoutId={`product-${product.id}`}
      onClick={() => onClick(product)}
      className="group cursor-pointer relative overflow-hidden bg-bg-secondary border border-border-primary transition-colors duration-500"
    >
      <div className="relative aspect-[3/4] overflow-hidden transition-all duration-700">
        <motion.img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
          <button className="px-6 py-3 bg-brand-gold text-brand-charcoal text-[10px] uppercase tracking-[0.3em] font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-text-primary hover:text-bg-primary shadow-xl">
            Quick View
          </button>
        </div>
        <div className="absolute top-0 right-0 p-4 flex flex-col items-end gap-2">
          <span className="px-3 py-1 bg-brand-gold text-brand-charcoal text-[9px] uppercase tracking-[0.2em] font-bold shadow-lg">
            {product.category}
          </span>
          {averageRating > 0 && (
            <div className="px-2 py-1 bg-bg-primary/80 backdrop-blur-sm border border-border-primary flex items-center gap-1.5 shadow-md">
              <Star size={10} className="fill-brand-gold text-brand-gold" />
              <span className="text-[10px] font-serif text-brand-gold">{averageRating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-serif text-lg tracking-wide group-hover:text-brand-gold transition-colors">{product.name}</h3>
          <p className="font-serif text-brand-gold text-lg">₹{product.price}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} className={i < 4 ? "fill-brand-gold text-brand-gold" : "opacity-10 text-text-primary"} />
            ))}
          </div>
          <span className="text-[9px] opacity-30 uppercase tracking-[0.2em]">View Details</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductGrid({ onProductSelect }: { onProductSelect: (product: Product) => void }) {
  const [filter, setFilter] = React.useState<string>('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortBy, setSortBy] = React.useState<'default' | 'price-low' | 'price-high'>('default');
  
  const categories = ['All', 'Premium', 'Elegant', 'Modest'];

  const filteredProducts = React.useMemo(() => {
    let result = filter === 'All' 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.category === filter);

    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [filter, searchQuery, sortBy]);

  return (
    <section id="collections" className="py-20 lg:py-32 px-6 lg:px-12 2xl:px-24 max-w-[1800px] mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-24 gap-8 lg:gap-12">
        <div className="relative">
          <div className="absolute -left-6 lg:-left-12 top-0 w-px h-full bg-brand-gold opacity-30 hidden sm:block"></div>
          <span className="text-[9px] lg:text-[10px] 2xl:text-xs uppercase tracking-[0.5em] text-brand-gold mb-3 lg:mb-4 block">Selection</span>
          <h2 className="text-4xl lg:text-7xl 2xl:text-8xl font-serif tracking-tight leading-tight text-text-primary">The <br /> <span className="italic opacity-60 text-text-secondary">Boutique</span></h2>
        </div>
        
        <div className="flex flex-col gap-6 lg:gap-8 w-full lg:w-auto">
          <div className="flex flex-wrap gap-4 sm:gap-6 lg:gap-12 items-center border-b border-border-primary pb-4 lg:pb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[10px] uppercase tracking-[0.3em] transition-all relative ${
                  filter === cat 
                    ? "text-brand-gold" 
                    : "opacity-30 hover:opacity-100 text-text-primary"
                }`}
              >
                {cat}
                {filter === cat && (
                  <motion.div 
                    layoutId="filter-underline"
                    className="absolute -bottom-6 left-0 w-full h-0.5 bg-brand-gold" 
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="flex flex-1 w-full sm:min-w-[400px] group">
              <div className="relative flex-1">
                <input 
                  type="text" 
                  placeholder="SEARCH COLLECTION..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-full bg-bg-secondary border border-border-primary p-4 pl-12 text-[10px] tracking-[0.2em] text-text-primary outline-none focus:border-brand-gold/50 transition-all placeholder:opacity-20"
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 group-focus-within:text-brand-gold transition-all" size={16} />
                <AnimatePresence>
                  {searchQuery && (
                    <motion.button 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-primary opacity-40 hover:opacity-100 p-1 transition-opacity"
                    >
                      <X size={14} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
              <button className="hidden sm:flex bg-brand-gold text-brand-charcoal px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-text-primary hover:text-bg-primary transition-all items-center border border-brand-gold whitespace-nowrap">
                Search
              </button>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-auto">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full bg-bg-secondary border border-border-primary p-4 text-[10px] tracking-[0.2em] text-text-secondary outline-none focus:border-brand-gold/50 transition-all appearance-none pr-10 min-w-[160px]"
                >
                  <option value="default">SORT BY: RELEVANCE</option>
                  <option value="price-low">PRICE: LOW TO HIGH</option>
                  <option value="price-high">PRICE: HIGH TO LOW</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {searchQuery && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[9px] uppercase tracking-[0.3em] text-brand-gold/60"
            >
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} for "{searchQuery}"
            </motion.p>
          )}
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {filteredProducts.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 lg:gap-12"
          >
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={onProductSelect}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-24 text-center border border-border-primary bg-bg-secondary"
          >
            <p className="text-[10px] uppercase tracking-[0.5em] opacity-30 italic">No pieces found matching your selection</p>
            <button 
              onClick={() => {setFilter('All'); setSearchQuery('');}}
              className="mt-6 text-[9px] uppercase tracking-widest text-brand-gold underline underline-offset-4"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
