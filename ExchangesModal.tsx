import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RefreshCw, AlertCircle, CheckCircle2, History } from 'lucide-react';

interface ExchangesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExchangesModal: React.FC<ExchangesModalProps> = ({ isOpen, onClose }) => {
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
                    <RefreshCw size={24} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-serif text-text-primary tracking-tight">EXCHANGES <span className="italic opacity-60">& RETURNS</span></h2>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gold mt-1">Our Commitment to Your Satisfaction</p>
                  </div>
                </div>

                <div className="space-y-10">
                  <p className="text-sm text-text-secondary leading-relaxed font-light">
                    We want you to be completely enamored with your ZYHA purchase. If the fit or style isn't perfect, our exchange process is designed to be as seamless as our silhouettes.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-brand-gold">
                        <History size={16} />
                        <h4 className="text-[11px] uppercase tracking-widest font-bold">Exchange Window</h4>
                      </div>
                      <p className="text-[12px] text-text-secondary leading-relaxed opacity-70">
                        Exchanges must be initiated within 7 days of receiving your order. Items must be in their original, unworn condition with all tags attached.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-brand-gold">
                        <AlertCircle size={16} />
                        <h4 className="text-[11px] uppercase tracking-widest font-bold">Non-Exchangeable</h4>
                      </div>
                      <p className="text-[12px] text-text-secondary leading-relaxed opacity-70">
                        Custom-made pieces, altered items, and products purchased during seasonal clearance are final sale and cannot be exchanged.
                      </p>
                    </div>
                  </div>

                  <div className="bg-bg-primary border border-border-primary p-6">
                    <div className="flex items-center gap-3 text-brand-gold mb-6">
                      <CheckCircle2 size={18} />
                      <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold">Steps to Exchange</h4>
                    </div>
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <span className="text-brand-gold font-serif italic text-lg">01</span>
                        <p className="text-[11px] text-text-secondary leading-relaxed font-light">
                          Contact our concierge via WhatsApp or Email with your Order ID and the preferred size/style.
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <span className="text-brand-gold font-serif italic text-lg">02</span>
                        <p className="text-[11px] text-text-secondary leading-relaxed font-light">
                          Once approved, securely pack the item. We will arrange a reverse pickup for most locations within India.
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <span className="text-brand-gold font-serif italic text-lg">03</span>
                        <p className="text-[11px] text-text-secondary leading-relaxed font-light">
                          Upon quality inspection, your exchange piece will be dispatched within 48 hours.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="p-4 border-l-2 border-brand-gold bg-brand-gold/5">
                      <p className="text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-2">Note on Refunds</p>
                      <p className="text-[11px] text-text-secondary leading-relaxed opacity-80">
                        We offer exchanges or store credit only. Monetary refunds are issued only in the rare case of a manufacturing defect that cannot be replaced.
                      </p>
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
