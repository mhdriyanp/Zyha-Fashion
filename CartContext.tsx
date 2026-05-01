import React from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = React.createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = React.useState<CartItem[]>(() => {
    const saved = localStorage.getItem('boutique_bag');
    return saved ? JSON.parse(saved) : [];
  });

  React.useEffect(() => {
    localStorage.setItem('boutique_bag', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, size: string) => {
    setItems(prev => {
      const existing = prev.find(item => item.productId === product.id && item.size === size);
      if (existing) {
        return prev.map(item => 
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      const newItem: CartItem = {
        id: `${product.id}-${size}-${Date.now()}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        size,
        quantity: 1,
        image: product.image
      };
      return [...prev, newItem];
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
