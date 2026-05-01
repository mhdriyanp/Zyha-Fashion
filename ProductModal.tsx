import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, MessageCircle, Truck, ShieldCheck, RefreshCw, Send, Share2, Check, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product, Review } from '../types';
import { WHATSAPP_NUMBER } from '../constants';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenSizeGuide: () => void;
}

export default function ProductModal({ product, onClose, onOpenSizeGuide }: ProductModalProps) {
  const [reviews, setReviews] = React.useState<Review[]>(product?.reviews || []);
  const [newReview, setNewReview] = React.useState({ name: '', comment: '', rating: 5 });
  const [copied, setCopied] = React.useState(false);
  const [selectedSize, setSelectedSize] = React.useState<string | null>(null);
  const [added, setAdded] = React.useState(false);
  const [reviewSubmitted, setReviewSubmitted] = React.useState(false);
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);
  const [zoomStyle, setZoomStyle] = React.useState<React.CSSProperties>({ display: 'none' });
  const mainImageRef = React.useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  const productImages = product?.images || (product?.image ? [product.image] : []);

  React.useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
      setReviews(product.reviews);
      setSelectedSize(null);
      setAdded(false);
      setActiveImageIndex(0);
      setZoomStyle({ display: 'none' });

      // Auto scroll to reviews if they exist
      if (product.reviews && product.reviews.length > 0) {
        setTimeout(() => {
          reviewsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 500); // Small delay to ensure the modal is fully rendered
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  const reviewsRef = React.useRef<HTMLDivElement>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [showSticky, setShowSticky] = React.useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const progress = target.scrollTop / (target.scrollHeight - target.clientHeight);
    setScrollProgress(progress);
    setShowSticky(target.scrollTop > 300);
  };

  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddToBag = () => {
    if (!product) return;
    if (!selectedSize) {
      return;
    }
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWhatsAppOrder = () => {
    if (!product) return;
    const sizeInfo = selectedSize ? ` (Size: ${selectedSize})` : '';
    const message = `Hello Zyha Fashion! I am interested in ordering the *${product.name}*${sizeInfo} (₹${product.price}). Please provide more details.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleShare = async () => {
    if (!product) return;
    const shareData = {
      title: `Zyha Fashion - ${product.name}`,
      text: `Check out this elegant ${product.category} Dubai nightwear from Zyha Fashion!`,
      url: window.location.origin + `?product=${product.id}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    
    const review: Review = {
      id: Math.random().toString(36).substr(2, 9),
      userName: newReview.name,
      comment: newReview.comment,
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0]
    };
    
    setReviews([review, ...reviews]);
    setNewReview({ name: '', comment: '', rating: 5 });
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainImageRef.current) return;
    
    const { left, top, width, height } = mainImageRef.current.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    
    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${productImages[activeImageIndex]})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '250%'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length 
    : 0;

  if (!product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-charcoal/90 backdrop-blur-sm"
        />
        
        <motion.div
          layoutId={`product-${product.id}`}
          className="relative w-full max-w-6xl 2xl:max-w-7xl bg-bg-secondary overflow-y-auto lg:overflow-hidden lg:flex max-h-[95vh] lg:max-h-[90vh] border border-border-primary custom-scrollbar transition-colors duration-500 rounded-sm"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 lg:top-6 lg:right-6 z-50 p-2 bg-bg-primary/80 backdrop-blur-md hover:bg-brand-gold hover:text-brand-charcoal transition-colors text-text-primary rounded-full lg:rounded-none"
          >
            <X size={18} />
          </button>

          <div className="lg:w-1/2 flex flex-col bg-bg-primary border-r border-border-primary overflow-hidden">
            <div 
              ref={mainImageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative aspect-[3/4] lg:h-[70vh] 2xl:h-[75vh] cursor-zoom-in overflow-hidden group/zoom"
            >
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  src={productImages[activeImageIndex]} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              
              {/* Zoom Overlay */}
              <div 
                className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover/zoom:opacity-100 transition-opacity duration-300 bg-no-repeat"
                style={zoomStyle}
              />

              {/* Navigation Arrows */}
              {productImages.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between px-4 z-40 opacity-0 group-hover/zoom:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
                    }}
                    className="p-3 bg-bg-primary/80 text-brand-gold hover:bg-brand-gold hover:text-brand-charcoal transition-all backdrop-blur-sm rounded-full"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
                    }}
                    className="p-3 bg-bg-primary/80 text-brand-gold hover:bg-brand-gold hover:text-brand-charcoal transition-all backdrop-blur-sm rounded-full"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}

              {/* Image Counter */}
              {productImages.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 px-3 py-1 bg-bg-primary/60 backdrop-blur-md rounded-full text-[10px] tracking-widest text-brand-gold border border-brand-gold/20">
                  {activeImageIndex + 1} / {productImages.length}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {productImages.length > 1 && (
              <div className="p-4 flex gap-3 overflow-x-auto custom-scrollbar border-t border-border-primary">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative w-20 aspect-[3/4] flex-shrink-0 overflow-hidden border transition-all duration-300 ${
                      activeImageIndex === index ? 'border-brand-gold' : 'border-transparent opacity-40 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="lg:w-1/2 p-8 lg:p-16 lg:overflow-y-auto custom-scrollbar relative"
          >
            <motion.div 
              style={{ scaleX: scrollProgress }}
              className="absolute top-0 left-0 right-0 h-0.5 bg-brand-gold z-20 origin-left"
            />
            
            <div className={`sticky top-0 bg-bg-secondary z-10 -mx-8 lg:-mx-16 px-8 lg:px-16 pt-2 pb-8 mb-4 border-b border-border-primary transition-all duration-300 transform ${
              showSticky ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
            }`} id="modal-sticky-header">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-serif text-text-primary">{product.name}</h3>
                  <div className="flex items-center gap-4">
                    <p className="text-[9px] uppercase tracking-widest text-brand-gold">₹{product.price}</p>
                    <div className="w-1 h-1 rounded-full opacity-10 bg-text-primary"></div>
                    <div className="flex items-center gap-2">
                       <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={8} className={i < Math.round(averageRating) ? "fill-brand-gold text-brand-gold" : "opacity-10 text-text-primary"} />
                        ))}
                      </div>
                      <span className="text-[8px] opacity-40 uppercase tracking-widest">({reviews.length})</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <span className="text-[10px] uppercase tracking-[0.5em] text-brand-gold mb-4 block font-medium">
                {product.category}
              </span>
              <h2 className="text-4xl lg:text-6xl font-serif mb-6 leading-tight font-light text-text-primary">{product.name}</h2>
              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-serif text-brand-gold">₹{product.price}</span>
                  <span className="text-[10px] opacity-40 uppercase tracking-[0.2em]">Inc. duties</span>
                </div>
                <div className="h-8 w-px bg-border-primary mx-2"></div>
                <button 
                  onClick={scrollToReviews}
                  className="flex items-center gap-2 hover:opacity-100 transition-opacity opacity-80 group/reviews"
                >
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={i < Math.round(averageRating) ? "fill-brand-gold text-brand-gold" : "opacity-10 text-text-primary group-hover/reviews:opacity-20"} />
                    ))}
                  </div>
                  <span className="text-sm font-serif text-brand-gold underline underline-offset-4 decoration-brand-gold/0 group-hover/reviews:decoration-brand-gold/50 transition-all">
                    {reviews.length > 0 ? averageRating.toFixed(1) : "0.0"}
                  </span>
                  <span className="text-[9px] opacity-30 uppercase tracking-widest group-hover/reviews:opacity-60 text-text-primary">({reviews.length})</span>
                </button>
              </div>
              
              <div className="space-y-6 text-sm opacity-50 leading-relaxed max-w-md font-light text-text-primary">
                <p className="italic">"{product.description}"</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-[11px] uppercase tracking-widest opacity-80">
                      <div className="w-1 h-1 bg-brand-gold opacity-50"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold text-text-primary">Select Size</p>
                <button 
                  onClick={onOpenSizeGuide}
                  className="text-[9px] uppercase tracking-[0.2em] text-brand-gold hover:underline underline-offset-4 font-bold"
                >
                  SIZE GUIDE
                </button>
              </div>
              <div className="flex flex-wrap gap-4">
                {product.sizes.map((size) => {
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border text-[10px] tracking-widest font-bold transition-all flex items-center justify-center relative overflow-hidden ${
                        selectedSize === size 
                          ? "bg-brand-gold border-brand-gold text-brand-charcoal" 
                          : "border-border-primary text-text-primary hover:border-brand-gold/50 shadow-sm"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <button 
                onClick={handleWhatsAppOrder}
                className="flex-1 px-8 py-5 text-[10px] tracking-[0.3em] font-bold uppercase transition-all flex items-center justify-center gap-3 bg-whatsapp/10 border border-whatsapp/30 text-whatsapp hover:bg-whatsapp/20 shadow-md"
              >
                <MessageCircle size={16} />
                Order via WhatsApp
              </button>
              <button 
                onClick={handleShare}
                className="flex-1 px-8 py-5 border border-border-primary text-text-primary text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-text-primary hover:text-bg-primary transition-all flex items-center justify-center gap-3 shadow-md"
              >
                {copied ? <Check size={16} className="text-brand-gold" /> : <Share2 size={16} />}
                {copied ? 'Link Copied' : 'Share'}
              </button>
            </div>

            <div className="text-center mb-16">
              <p className="text-[9px] uppercase tracking-[0.2em] opacity-30">Secure payment & Worldwide shipping</p>
            </div>

            <div className="grid grid-cols-3 gap-8 mb-16 py-12 border-y border-border-primary">
              <div className="text-center group">
                <Truck size={20} className="mx-auto mb-3 text-brand-gold opacity-50 group-hover:opacity-100 transition-opacity" />
                <p className="text-[9px] uppercase tracking-[0.3em] opacity-40 text-text-primary">Express</p>
              </div>
              <div className="text-center group">
                <ShieldCheck size={20} className="mx-auto mb-3 text-brand-gold opacity-50 group-hover:opacity-100 transition-opacity" />
                <p className="text-[9px] uppercase tracking-[0.3em] opacity-40 text-text-primary">Genuine</p>
              </div>
              <div className="text-center group">
                <RefreshCw size={20} className="mx-auto mb-3 text-brand-gold opacity-50 group-hover:opacity-100 transition-opacity" />
                <p className="text-[9px] uppercase tracking-[0.3em] opacity-40 text-text-primary">Returns</p>
              </div>
            </div>

            {/* Reviews Section */}
            <div id="reviews" ref={reviewsRef} className="mb-8 scroll-mt-8">
              <h3 className="text-[11px] uppercase tracking-[0.5em] text-brand-gold mb-10">Client Testimonials</h3>
              
              <form onSubmit={handleAddReview} className="mb-16 p-8 bg-bg-primary border border-border-primary shadow-lg relative">
                <AnimatePresence>
                  {reviewSubmitted && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute inset-0 z-10 bg-bg-primary/95 backdrop-blur-sm flex items-center justify-center border border-brand-gold/30"
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-gold/20">
                          <Check className="text-brand-gold" size={24} />
                        </div>
                        <p className="text-[11px] uppercase tracking-[0.3em] text-brand-gold font-bold">Review submitted successfully!</p>
                        <p className="text-[9px] uppercase tracking-widest opacity-40 mt-2 text-text-primary">Thank you for your feedback</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <p className="text-[10px] uppercase tracking-[0.3em] mb-6 opacity-40 text-text-primary">Post a review</p>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <input 
                    type="text" 
                    placeholder="NAME"
                    className="col-span-2 sm:col-span-1 p-4 text-[10px] tracking-widest bg-bg-secondary border border-border-primary focus:ring-1 focus:ring-brand-gold outline-none text-text-primary transition-all"
                    value={newReview.name}
                    onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                  />
                  <select 
                    className="col-span-2 sm:col-span-1 p-4 text-[10px] tracking-widest bg-bg-secondary border border-border-primary focus:ring-1 focus:ring-brand-gold outline-none text-text-primary opacity-60 transition-all cursor-pointer"
                    value={newReview.rating}
                    onChange={(e) => setNewReview({...newReview, rating: Number(e.target.value)})}
                  >
                    <option value="5">5 STARS</option>
                    <option value="4">4 STARS</option>
                    <option value="3">3 STARS</option>
                  </select>
                </div>
                <textarea 
                  placeholder="MESSAGE"
                  rows={3}
                  className="w-full p-4 text-[10px] tracking-widest bg-bg-secondary border border-border-primary focus:ring-1 focus:ring-brand-gold outline-none mb-6 text-text-primary transition-all"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                ></textarea>
                <button 
                  type="submit"
                  className="w-full py-4 border border-brand-gold text-brand-gold text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-brand-gold hover:text-brand-charcoal transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  Submit Review <Send size={12} />
                </button>
              </form>

              <div className="space-y-12">
                {reviews.length > 0 ? reviews.map((review) => (
                  <div key={review.id} className="border-b border-border-primary pb-12 last:border-0 transition-colors">
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-text-primary">{review.userName}</p>
                      <span className="text-[9px] opacity-30 uppercase tracking-widest text-text-primary">{review.date}</span>
                    </div>
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} className={i < review.rating ? "fill-brand-gold text-brand-gold" : "opacity-10 text-text-primary"} />
                      ))}
                    </div>
                    <p className="text-sm opacity-60 leading-relaxed font-light italic text-text-primary">"{review.comment}"</p>
                  </div>
                )) : (
                  <p className="text-[10px] opacity-30 italic uppercase tracking-[0.2em] text-text-primary text-center py-12">Zero testimonials available</p>
                )}
              </div>
            </div>
            <AnimatePresence>
              {showSticky && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  onClick={() => scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="fixed bottom-10 right-10 lg:absolute lg:bottom-10 lg:right-10 z-30 w-10 h-10 bg-brand-gold text-brand-charcoal flex items-center justify-center hover:bg-text-primary hover:text-bg-primary transition-colors shadow-lg"
                >
                  <ChevronUp size={16} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
