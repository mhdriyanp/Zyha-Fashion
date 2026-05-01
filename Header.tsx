import React from 'react';
import { Menu, X, Phone, Sun, Moon, Instagram, Mail, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const [prevScrollPos, setPrevScrollPos] = React.useState(0);
  const [activeSection, setActiveSection] = React.useState('hero');
  const { theme, toggleTheme } = useTheme();

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Scrolled state for background
      setScrolled(currentScrollPos > 50);

      // Hide/Show on scroll
      if (currentScrollPos > 500) {
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      } else {
        setVisible(true);
      }
      setPrevScrollPos(currentScrollPos);

      // Active section detection
      const sections = ['collections', 'about', 'reviews'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Collections', href: '#collections', id: 'collections' },
    { name: 'Our Story', href: '#about', id: 'about' }
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-700 ease-in-out ${
        scrolled ? 'bg-bg-primary/95 shadow-2xl backdrop-blur-xl' : 'bg-transparent'
      } ${visible ? 'translate-y-0' : '-translate-y-full'} border-b border-border-primary`}
    >
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 2xl:px-24 h-24 lg:h-28 flex items-center justify-between">
        <div className="flex items-center gap-8 flex-1">
          <button 
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-3 p-2 -ml-2 text-text-primary hover:text-brand-gold transition-all"
          >
            <div className="relative w-5 h-5 flex flex-col justify-center gap-1.5">
              <span className="w-5 h-[1px] bg-current transition-all group-hover:w-3"></span>
              <span className="w-5 h-[1px] bg-current"></span>
              <span className="w-3 h-[1px] bg-current transition-all group-hover:w-5"></span>
            </div>
            <span className="hidden lg:block text-[9px] uppercase tracking-[0.3em] font-medium">Menu</span>
          </button>
          
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className={`text-[9px] uppercase tracking-[0.3em] font-medium transition-all relative py-2 ${
                  activeSection === link.id ? 'text-brand-gold opacity-100' : 'opacity-40 hover:opacity-100'
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.div 
                    layoutId="header-active"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-gold"
                  />
                )}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-3xl lg:text-4xl font-serif tracking-[0.5em] font-light text-brand-gold leading-none pb-1">
            ZYHA
          </h1>
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-4 bg-brand-gold/30"></span>
            <span className="text-[7px] lg:text-[8px] uppercase tracking-[0.4em] font-bold text-text-primary/40 whitespace-nowrap">Style Your Soul</span>
            <span className="h-[1px] w-4 bg-brand-gold/30"></span>
          </div>
        </div>

        <div className="flex items-center gap-4 lg:gap-8 flex-1 justify-end">
          <button 
            onClick={toggleTheme}
            className="p-2 text-text-primary hover:text-brand-gold transition-all hover:scale-110"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} strokeWidth={1.2} /> : <Moon size={18} strokeWidth={1.2} />}
          </button>
          
          <a href="#reviews" className="hidden lg:block text-[9px] uppercase tracking-[0.3em] font-medium opacity-40 hover:opacity-100 hover:text-brand-gold transition-all">
            Testimonials
          </a>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-bg-primary"
          >
            {/* Background texture/overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--color-brand-gold)_0%,_transparent_100%)] opacity-10"></div>
            
            <div className="relative h-full flex flex-col lg:flex-row">
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-8 right-8 lg:top-12 lg:right-12 p-4 text-brand-gold hover:rotate-90 transition-transform duration-500 z-50"
              >
                <X size={32} strokeWidth={1} />
              </button>

              <div className="flex-1 flex flex-col justify-center px-10 lg:px-32 py-20">
                <nav className="flex flex-col gap-6 lg:gap-8">
                  {['Collections', 'Premium Nighties', 'Our Story', 'Client Testimonials'].map((link, i) => (
                    <motion.div
                      key={link}
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * i, type: 'spring', damping: 20 }}
                    >
                      <a 
                        href={`#${link.toLowerCase().replace(' ', '-')}`}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center gap-6 text-4xl lg:text-7xl font-serif tracking-tight text-text-primary hover:text-brand-gold transition-colors duration-500"
                      >
                        <span className="text-xs lg:text-sm font-sans tracking-[0.5em] text-brand-gold opacity-40">0{i + 1}</span>
                        <span className="relative">
                          {link}
                          <span className="absolute left-0 -bottom-2 w-0 h-[1px] bg-brand-gold transition-all duration-700 group-hover:w-full"></span>
                        </span>
                        <ArrowRight size={24} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-brand-gold" />
                      </a>
                    </motion.div>
                  ))}
                </nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
