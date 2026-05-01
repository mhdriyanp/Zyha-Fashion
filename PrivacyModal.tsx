import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Lock, Eye, Database } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
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
                    <Shield size={24} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-serif text-text-primary tracking-tight">PRIVACY <span className="italic opacity-60">POLICY</span></h2>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gold mt-1">Your Trust is Our Priority</p>
                  </div>
                </div>

                <div className="space-y-10">
                  <p className="text-sm text-text-secondary leading-relaxed font-light">
                    At ZYHA FASHION BOUTIQUE, we are committed to protecting the privacy and security of our clients. This policy outlines how we handle your personal information with the same care and attention we give to our garments.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-brand-gold">
                        <Lock size={16} />
                        <h4 className="text-[11px] uppercase tracking-widest font-bold">Data Security</h4>
                      </div>
                      <p className="text-[12px] text-text-secondary leading-relaxed opacity-70">
                        We use industry-standard encryption to protect your personal and payment details. Your data is stored on secure servers and never shared with unauthorized third parties.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-brand-gold">
                        <Eye size={16} />
                        <h4 className="text-[11px] uppercase tracking-widest font-bold">Transparency</h4>
                      </div>
                      <p className="text-[12px] text-text-secondary leading-relaxed opacity-70">
                        We only collect information necessary to process your orders and improve your experience. We will never sell your personal information to marketing firms.
                      </p>
                    </div>
                  </div>

                  <div className="bg-bg-primary border border-border-primary p-6">
                    <div className="flex items-center gap-3 text-brand-gold mb-6">
                      <Database size={18} />
                      <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold">Information We Collect</h4>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-1 h-1 rounded-full bg-brand-gold mt-2 flex-shrink-0" />
                        <p className="text-[11px] text-text-secondary leading-relaxed font-light">
                          <strong className="text-text-primary">Contact Details:</strong> Name, email address, and phone number for order updates and concierge services.
                        </p>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-1 h-1 rounded-full bg-brand-gold mt-2 flex-shrink-0" />
                        <p className="text-[11px] text-text-secondary leading-relaxed font-light">
                          <strong className="text-text-primary">Delivery Address:</strong> Required for secure logistics and worldwide shipping.
                        </p>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-1 h-1 rounded-full bg-brand-gold mt-2 flex-shrink-0" />
                        <p className="text-[11px] text-text-secondary leading-relaxed font-light">
                          <strong className="text-text-primary">Style Preferences:</strong> Optional data to help us provide personalized recommendations.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-[10px] text-text-secondary leading-relaxed opacity-60 italic">
                      By using our services, you consent to the collection and use of information as outlined in this policy. We periodically update our terms to reflect changes in global privacy standards. Current version: May 2026.
                    </p>
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
