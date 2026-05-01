export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  image: string;
  images?: string[];
  category: 'Premium' | 'Elegant' | 'Modest';
  reviews: Review[];
  sizes: string[];
  stock: Record<string, number>;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}
