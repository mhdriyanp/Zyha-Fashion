import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { ShippingModal } from './components/ShippingModal';
import { ExchangesModal } from './components/ExchangesModal';
import { PrivacyModal } from './components/PrivacyModal';
import { Product } from './types';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Instagram, Youtube, Phone, Mail, MapPin, ChevronUp } from 'lucide-react';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = React.useState(false);
  const [isShippingOpen, setIsShippingOpen] = React.useState(false);
  const [isExchangesOpen, setIsExchangesOpen] = React.useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = React.useState(false);
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ThemeProvider>
      <CartProvider>
        <div className="min-h-screen bg-bg-primary text-text-primary transition-colors duration-500">
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-brand-gold z-[60] origin-left"
            style={{ scaleX }}
          />

          <Header />
          
          <main>
            <Hero />
            
            <ProductGrid onProductSelect={setSelectedProduct} />


          </main>

          <footer className="bg-bg-secondary pt-20 lg:pt-32 pb-12 lg:pb-16 px-6 lg:px-12 2xl:px-24 border-t border-border-primary overflow-hidden">
            <div className="max-w-[1800px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20 lg:mb-32">
              <div className="lg:col-span-1">
                <div className="mb-6 lg:mb-8 text-center sm:text-left">
                  <h2 className="text-3xl font-serif tracking-[0.3em] text-brand-gold -mb-1">ZYHA</h2>
                  <p className="text-[8px] uppercase tracking-[0.4em] opacity-40 font-bold">Style Your Soul.</p>
                </div>
                <p className="text-sm opacity-40 mb-8 lg:mb-10 max-w-xs mx-auto sm:mx-0 leading-relaxed font-light italic text-center sm:text-left">
                  "Bringing the geometric balance of Dubai's finest modest nightwear to your boutique experience."
                </p>
                <div className="flex justify-center sm:justify-start gap-6 opacity-60">
                  <a href="https://www.instagram.com/zyha_fashion?igsh=d2tmN3N6djdnOGx1" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold cursor-pointer transition-colors">
                    <Instagram size={18} />
                  </a>
                  <a href="https://youtube.com/@zyha_fashion?si=12Po6XAIlUcKLE_D" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold cursor-pointer transition-colors">
                    <Youtube size={18} />
                  </a>
                </div>
              </div>

              <div className="text-center sm:text-left">
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-6 lg:mb-10 text-brand-gold">Concierge</h4>
                <div className="flex flex-col gap-4 lg:gap-5 text-[11px] uppercase tracking-[0.2em] font-light opacity-60">
                  <a href="tel:+918921094605" className="flex items-center justify-center sm:justify-start gap-4 hover:text-brand-gold transition-colors">
                    <Phone size={14} className="opacity-40" />
                    <span>+91 8921094605</span>
                  </a>
                  <a href="mailto:fashionzyha@gmail.com" className="flex items-center justify-center sm:justify-start gap-4 hover:text-brand-gold transition-colors">
                    <Mail size={14} className="opacity-40" />
                    <span>fashionzyha@gmail.com</span>
                  </a>
                  <div className="flex items-center justify-center sm:justify-start gap-4">
                    <MapPin size={14} className="opacity-40" />
                    <span>India, Kerala</span>
                  </div>
                </div>
              </div>

              <div className="text-center sm:text-left">
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-6 lg:mb-10 text-brand-gold">Support</h4>
                <div className="flex flex-col gap-4 lg:gap-5 text-[11px] uppercase tracking-[0.2em] font-light opacity-60">
                  <button 
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="hover:text-brand-gold transition-colors text-center sm:text-left"
                  >
                    SIZE GUIDE
                  </button>
                  <button 
                    onClick={() => setIsShippingOpen(true)}
                    className="hover:text-brand-gold transition-colors text-center sm:text-left"
                  >
                    SHIPPING
                  </button>
                  <button 
                    onClick={() => setIsExchangesOpen(true)}
                    className="hover:text-brand-gold transition-colors text-center sm:text-left"
                  >
                    EXCHANGES
                  </button>
                  <button 
                    onClick={() => setIsPrivacyOpen(true)}
                    className="hover:text-brand-gold transition-colors text-center sm:text-left"
                  >
                    PRIVACY
                  </button>
                </div>
              </div>
            </div>

            <div className="max-w-[1800px] mx-auto pt-12 lg:pt-16 border-t border-border-primary flex flex-col md:flex-row justify-between items-center gap-8 text-[8px] lg:text-[9px] 2xl:text-[10px] uppercase tracking-[0.3em] lg:tracking-[0.5em] opacity-40 text-center sm:text-left">
              <p>© 2026 ZYHA FASHION BOUTIQUE.</p>
              <div className="flex gap-8 lg:gap-12">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-whatsapp"></div>
                  <span>Support Online</span>
                </div>
                <span>Global Standard Shipping</span>
              </div>
            </div>
          </footer>

          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-10 right-10 z-[40] w-12 h-12 bg-text-primary text-bg-primary flex items-center justify-center hover:bg-brand-gold transition-colors shadow-2xl"
              >
                <ChevronUp size={20} />
              </motion.button>
            )}
          </AnimatePresence>

          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
          />

          <SizeGuideModal 
            isOpen={isSizeGuideOpen} 
            onClose={() => setIsSizeGuideOpen(false)} 
          />

          <ShippingModal 
            isOpen={isShippingOpen} 
            onClose={() => setIsShippingOpen(false)} 
          />

          <ExchangesModal 
            isOpen={isExchangesOpen} 
            onClose={() => setIsExchangesOpen(false)} 
          />

          <PrivacyModal 
            isOpen={isPrivacyOpen} 
            onClose={() => setIsPrivacyOpen(false)} 
          />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}
