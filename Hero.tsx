import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden pt-24 bg-bg-primary transition-colors duration-500">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1544006659-f0b21884cb1d?q=80&w=2000&auto=format&fit=crop" 
          alt="Zyha Fashion Luxury Nightie" 
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-primary z-10 transition-colors duration-500"></div>
      </div>

      {/* Geometric Frame */}
      <div className="absolute inset-12 lg:inset-24 2xl:inset-32 border border-border-primary z-20 flex items-center justify-center pointer-events-none transition-colors duration-500">
        <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 2xl:h-48 bg-brand-gold opacity-30"></div>
      </div>

      <div className="relative z-30 text-center px-6 max-w-5xl">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] lg:text-[11px] uppercase tracking-[0.5em] text-brand-gold mb-8 block font-medium"
        >
          Premium Dubai Imports
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-4xl sm:text-6xl lg:text-9xl 2xl:text-[12rem] font-serif mb-8 lg:mb-12 tracking-[0.1em] leading-[0.85] font-light text-text-primary"
        >
          THE ZYHA <br /> <span className="italic opacity-80">COLLECTION</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xs sm:text-sm lg:text-base 2xl:text-xl text-text-secondary max-w-xl 2xl:max-w-3xl mx-auto mb-10 lg:mb-12 leading-relaxed font-light px-4 sm:px-0"
        >
          Handcrafted in Dubai using fine Mulberry silk and intricate gold thread embroidery. Designed for the woman who seeks elegance in modesty.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a 
            href="#collections" 
            className="w-full sm:w-auto px-12 py-5 bg-brand-gold text-brand-charcoal uppercase text-[10px] tracking-[0.3em] font-bold hover:bg-text-primary hover:text-bg-primary transition-all duration-500"
          >
            Explore Boutique
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-16 left-12 lg:left-24 2xl:left-32 z-30 hidden sm:block">
        <div className="flex items-center gap-6">
          <div className="w-16 2xl:w-24 h-px bg-border-primary"></div>
          <span className="text-[10px] 2xl:text-xs uppercase tracking-[0.4em] opacity-40">Identity • Excellence • Modesty</span>
        </div>
      </div>
    </section>
  );
}
