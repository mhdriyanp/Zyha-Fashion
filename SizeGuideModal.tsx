import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const sizeData = [
    { size: 'S', length: '52"', chest: '38"', shoulder: '14.5"' },
    { size: 'M', length: '54"', chest: '40"', shoulder: '15"' },
    { size: 'L', length: '56"', chest: '42"', shoulder: '15.5"' },
    { size: 'XL', length: '58"', chest: '44"', shoulder: '16"' },
    { size: 'XXL', length: '60"', chest: '46"', shoulder: '16.5"' },
  ];

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
                    <Ruler size={24} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-serif text-text-primary tracking-tight">SIZE <span className="italic opacity-60">GUIDE</span></h2>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gold mt-1">Finding Your Perfect ZYHA Fit</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <p className="text-sm text-text-secondary leading-relaxed font-light">
                    Our collections are designed with a focus on elegant drape and modest silhouettes. All measurements are in inches. If you prefer a more tailored fit, we recommend selecting your regular size; for a standard modest look, please refer to the table below.
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-border-primary">
                          <th className="py-4 text-[11px] uppercase tracking-widest text-brand-gold font-bold">Size</th>
                          <th className="py-4 text-[11px] uppercase tracking-widest text-brand-gold font-bold">Length</th>
                          <th className="py-4 text-[11px] uppercase tracking-widest text-brand-gold font-bold">Chest</th>
                          <th className="py-4 text-[11px] uppercase tracking-widest text-brand-gold font-bold">Shoulder</th>
                        </tr>
                      </thead>
                      <tbody className="text-[12px] tracking-widest text-text-primary">
                        {sizeData.map((item, index) => (
                          <tr key={index} className="border-b border-border-primary/30 last:border-0 hover:bg-white/5 transition-colors">
                            <td className="py-5 font-bold text-brand-gold">{item.size}</td>
                            <td className="py-5 opacity-60 font-light">{item.length}</td>
                            <td className="py-5 opacity-60 font-light">{item.chest}</td>
                            <td className="py-5 opacity-60 font-light">{item.shoulder}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-bg-primary border border-border-primary p-6 mt-8">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gold mb-3">Measuring Tips</h4>
                    <ul className="text-[11px] text-text-secondary space-y-3 font-light leading-relaxed">
                      <li className="flex gap-3">
                        <span className="text-brand-gold">•</span>
                        <span><strong className="text-text-primary uppercase tracking-tighter">Length:</strong> Measure from the highest point of the shoulder down to the desired hem line.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-brand-gold">•</span>
                        <span><strong className="text-text-primary uppercase tracking-tighter">Chest:</strong> Measure around the fullest part of your chest, keeping the tape horizontal.</span>
                      </li>
                    </ul>
                  </div>

                  <button 
                    onClick={onClose}
                    className="w-full py-4 bg-brand-gold text-brand-charcoal text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-text-primary hover:text-bg-primary transition-all mt-4"
                  >
                    Close Guide
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
