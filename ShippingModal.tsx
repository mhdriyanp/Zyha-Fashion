import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Truck, Globe, Clock, ShieldCheck } from 'lucide-react';

interface ShippingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShippingModal: React.FC<ShippingModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto custom-scrollbar">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-charcoal/90 backdrop-blur-sm cursor-pointer"
          />
          
          <div className="flex min-h-full items-center justify-center p-4 md:p-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-bg-secondary border border-border-primary shadow-2xl pointer-events-auto"
            >
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 z-50 p-2 hover:bg-brand-gold hover:text-brand-charcoal transition-colors text-text-primary rounded-full transition-all"
              >
                <X size={20} />
              </button>

              <div className="p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-brand-gold/10 rounded-full text-brand-gold">
                    <Truck size={24} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-serif text-text-primary tracking-tight">SHIPPING <span className="italic opacity-60">POLICY</span></h2>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gold mt-1">Global Delivery & Logistics</p>
                  </div>
                </div>

                <div className="space-y-10">
                  <p className="text-sm text-text-secondary leading-relaxed font-light">
                    At ZYHA, we ensure that every piece of modest elegance reaches you with the utmost care and speed. We partner with premium global carriers to provide reliable and secure delivery services.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-brand-gold">
                        <Clock size={16} />
                        <h4 className="text-[11px] uppercase tracking-widest font-bold">Processing Time</h4>
                      </div>
                      <p className="text-[12px] text-text-secondary leading-relaxed opacity-70">
                        Standard orders are processed within 2-3 business days. Custom or pre-order pieces may require 7-14 business days for crafting.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-brand-gold">
                        <Globe size={16} />
                        <h4 className="text-[11px] uppercase tracking-widest font-bold">Worldwide Delivery</h4>
                      </div>
                      <p className="text-[12px] text-text-secondary leading-relaxed opacity-70">
                        We ship to over 150 countries. International shipping takes approximately 5-10 business days once dispatched.
                      </p>
                    </div>
                  </div>

                  <div className="bg-bg-primary border border-border-primary p-6">
                    <div className="flex items-center gap-3 text-brand-gold mb-4">
                      <ShieldCheck size={18} />
                      <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold">Secure Packaging</h4>
                    </div>
                    <ul className="text-[11px] text-text-secondary space-y-3 font-light leading-relaxed mb-0">
                      <li className="flex gap-3">
                        <span className="text-brand-gold">•</span>
                        <span>Multi-layer moisture-resistant packaging.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-brand-gold">•</span>
                        <span>Fully insured shipments for your peace of mind.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-brand-gold">•</span>
                        <span>Real-time tracking notifications via SMS and Email.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4">
                    <h4 className="text-[11px] uppercase tracking-widest text-brand-gold font-bold mb-4">Standard Shipping Rates</h4>
                    <div className="border border-border-primary divide-y divide-border-primary/30">
                      <div className="flex justify-between p-4 text-[12px]">
                        <span className="opacity-60">Within India</span>
                        <span className="font-bold text-brand-gold">FREE</span>
                      </div>
                      <div className="flex justify-between p-4 text-[12px]">
                        <span className="opacity-60">GCC Countries</span>
                        <span className="font-bold text-brand-gold">$15.00</span>
                      </div>
                      <div className="flex justify-between p-4 text-[12px]">
                        <span className="opacity-60">Rest of the World</span>
                        <span className="font-bold text-brand-gold">$25.00</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={onClose}
                    className="w-full py-4 bg-brand-gold text-brand-charcoal text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-text-primary hover:text-bg-primary transition-all mt-4"
                  >
                    Close Policy
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
