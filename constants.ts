import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Royal Silk Abaya Nightie',
    price: 249,
    description: 'A luxurious ensemble featuring intricate Dubai craftsmanship. This collection includes a stunning midnight black abaya with golden damask patterns and a romantic sage green piece with vintage rose motifs, both finished with delicate white lace trim.',
    features: ['100% Pure Silk', 'Intricate Damask & Floral Prints', 'Delicate White Lace Trim', 'Dubai Imported Heritage'],
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594235225110-388272847c5d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594235225381-645063870634?q=80&w=1200&auto=format&fit=crop'
    ],
    category: 'Premium',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: { 'S': 5, 'M': 2, 'L': 0, 'XL': 8 },
    reviews: [
      { id: 'r1', userName: 'Aisha R.', rating: 5, comment: 'Simply stunning! The silk quality is unmatched. Worth every penny.', date: '2024-03-15' },
      { id: 'r2', userName: 'Fatima Z.', rating: 4, comment: 'Very elegant and modest. Fits perfectly.', date: '2024-03-10' }
    ]
  },
  {
    id: '2',
    name: 'Midnight Velvet Elegance',
    price: 189,
    description: 'A masterpiece of comfort and style. The Midnight Velvet series features deep emerald tones with intricate lace borders.',
    features: ['Premium Velvet', 'Lace Trim', 'Warm and Comfortable', 'Modest Fit'],
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594235225110-388272847c5d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop'
    ],
    category: 'Elegant',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: { 'S': 12, 'M': 15, 'L': 4, 'XL': 3 },
    reviews: [
      { id: 'r3', userName: 'Mariam K.', rating: 5, comment: 'The velvet is so soft. Excellent for cooler nights.', date: '2024-02-28' }
    ]
  },
  {
    id: '3',
    name: 'Desert Rose Chiffon Flow',
    price: 159,
    description: 'Lightweight and ethereal, our chiffon nightie is perfect for warm nights. Designed for the modern modest woman.',
    features: ['Premium Chiffon', 'Lined for Modesty', 'Flowy Silhouette', 'Pastel Tones'],
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544006659-f0b21884cb1d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594235225110-388272847c5d?q=80&w=1200&auto=format&fit=crop'
    ],
    category: 'Modest',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: { 'S': 0, 'M': 10, 'L': 2, 'XL': 0 },
    reviews: []
  },
  {
    id: '4',
    name: 'Dubai Gold Embroidered Kaftan',
    price: 299,
    description: 'Our most premium piece. Hand-embroidered by artisans in Dubai, this kaftan nightie is the pinnacle of Zyha Fashion.',
    features: ['Handmade Embroidery', 'Silk Mix Fabric', 'Oversized Modest Fit', 'Statement Piece'],
    image: 'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200&auto=format&fit=crop'
    ],
    category: 'Premium',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: { 'S': 3, 'M': 0, 'L': 1, 'XL': 5 },
    reviews: [
      { id: 'r4', userName: 'Sarah L.', rating: 5, comment: 'Absolutely breathtaking. Received so many compliments.', date: '2024-03-20' }
    ]
  },
  {
    id: '5',
    name: 'Classic White Cloud Nightie',
    price: 129,
    description: 'Clean, simple, and elegant. Our white cloud series is made from high-grade cotton for maximum breathability.',
    features: ['High-Grade Cotton', 'Simple Silhouette', 'Pure White', 'Easy Care'],
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544006659-f0b21884cb1d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop'
    ],
    category: 'Elegant',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: { 'S': 20, 'M': 18, 'L': 12, 'XL': 15 },
    reviews: []
  },
  {
    id: '6',
    name: 'Sultan Lace Premium Gown',
    price: 219,
    description: 'Our Sultan Lace collection defines regal elegance. Featuring heavy lace paneling on the collar and sleeves, this gown offers a structured yet fluid silhouette. The collection includes both traditional damask and vintage floral motifs, each complemented by exquisite white lace craftsmanship.',
    features: ['Heavy Lace Paneling', 'Intricate Traditional Prints', 'Opaque Silk-Mix Lining', 'Regal Structured Fit'],
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594235412407-8308abc26a72?q=80&w=1200&auto=format&fit=crop'
    ],
    category: 'Premium',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: { 'S': 4, 'M': 4, 'L': 4, 'XL': 4 },
    reviews: []
  }
];

export const WHATSAPP_NUMBER = '918921094605';
