'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Product, Service, Ebook, Vendor } from '@/data/mockData';

export interface CartItem {
  id: string;
  type: 'product' | 'service' | 'ebook';
  item: Product | Service | Ebook;
  quantity: number;
}

interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
  read: boolean;
}

interface AppContextType {
  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  
  // User
  user: {
    id: string;
    name: string;
    email: string;
    isVendor: boolean;
    vendorId?: string;
  } | null;
  setUser: (user: AppContextType['user']) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, isVendor: boolean) => Promise<void>;
  
  // Chat
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  messages: ChatMessage[];
  sendMessage: (text: string, receiverId: string) => void;
  
  // AI Assistant
  aiOpen: boolean;
  setAiOpen: (open: boolean) => void;
  
  // Notifications
  notifications: { id: string; message: string; type: 'success' | 'error' | 'info' }[];
  addNotification: (message: string, type: 'success' | 'error' | 'info') => void;
  removeNotification: (id: string) => void;
  
  // Vendor Dashboard
  vendorProducts: Product[];
  vendorServices: Service[];
  vendorEbooks: Ebook[];
  addVendorProduct: (product: Product) => void;
  addVendorService: (service: Service) => void;
  addVendorEbook: (ebook: Ebook) => void;
  vendorStats: {
    totalSales: number;
    pendingOrders: number;
    totalRevenue: number;
    withdrawalBalance: number;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<AppContextType['user']>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: 'system',
      receiverId: 'user',
      text: 'Bonjour! Bienvenue sur Marketplace. Comment puis-je vous aider aujourd\'hui?',
      timestamp: new Date(),
      read: true,
    },
  ]);
  const [notifications, setNotifications] = useState<{ id: string; message: string; type: 'success' | 'error' | 'info' }[]>([]);
  const [vendorProducts, setVendorProducts] = useState<Product[]>([]);
  const [vendorServices, setVendorServices] = useState<Service[]>([]);
  const [vendorEbooks, setVendorEbooks] = useState<Ebook[]>([]);
  const [vendorStats, setVendorStats] = useState({
    totalSales: 45,
    pendingOrders: 8,
    totalRevenue: 2450000,
    withdrawalBalance: 185000,
  });

  const addToCart = useCallback((item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, item];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(i => 
      i.id === id ? { ...i, quantity } : i
    ));
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartTotal = cart.reduce((total, item) => {
    const price = (item.item as Product).price || (item.item as Service).price || (item.item as Ebook).price;
    return total + (price * item.quantity);
  }, 0);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const login = useCallback(async (email: string, password: string) => {
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({
      id: 'user1',
      name: email.split('@')[0],
      email,
      isVendor: false,
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string, isVendor: boolean) => {
    // Simulate registration
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({
      id: 'user' + Date.now(),
      name,
      email,
      isVendor,
      vendorId: isVendor ? 'v' + Date.now() : undefined,
    });
  }, []);

  const sendMessage = useCallback((text: string, receiverId: string) => {
    const newMessage: ChatMessage = {
      id: 'm' + Date.now(),
      senderId: user?.id || 'guest',
      receiverId,
      text,
      timestamp: new Date(),
      read: false,
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate response after delay
    setTimeout(() => {
      const responses = [
        'Merci pour votre message! Je vous réponds dès que possible.',
        'Bonjour! Comment puis-je vous aider?',
        'Je vais vérifier cela et vous revenir rapidement.',
        'N\'hésitez pas si vous avez d\'autres questions!',
      ];
      const response: ChatMessage = {
        id: 'm' + (Date.now() + 1),
        senderId: receiverId,
        receiverId: user?.id || 'guest',
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        read: false,
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  }, [user]);

  const addNotification = useCallback((message: string, type: 'success' | 'error' | 'info') => {
    const id = 'n' + Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const addVendorProduct = useCallback((product: Product) => {
    setVendorProducts(prev => [...prev, product]);
  }, []);

  const addVendorService = useCallback((service: Service) => {
    setVendorServices(prev => [...prev, service]);
  }, []);

  const addVendorEbook = useCallback((ebook: Ebook) => {
    setVendorEbooks(prev => [...prev, ebook]);
  }, []);

  return (
    <AppContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      user,
      setUser,
      login,
      logout,
      register,
      chatOpen,
      setChatOpen,
      messages,
      sendMessage,
      aiOpen,
      setAiOpen,
      notifications,
      addNotification,
      removeNotification,
      vendorProducts,
      vendorServices,
      vendorEbooks,
      addVendorProduct,
      addVendorService,
      addVendorEbook,
      vendorStats,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}