import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [page, setPage]           = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart]           = useState([]);
  const [wishlist, setWishlist]   = useState([]);
  const [orders, setOrders]       = useState([
    { id:'ORD-2041', date:'12 Apr 2026', status:'Delivered',  items:['Alphonso Mango Grafted Plant','Tulsi Holy Basil (Pack of 2)'], total:1048, tracking:'Delivered on 14 Apr' },
    { id:'ORD-2039', date:'08 Apr 2026', status:'In Transit', items:['Fiddle Leaf Fig'],                                              total:699,  tracking:'Out for delivery' },
  ]);
  const [user, setUser]           = useState({ name:'Surojit Halder', email:'surojit@gmail.com', phone:'+91 98765 43210', city:'Kolkata', joined:'Jan 2025' });
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartOpen, setCartOpen]   = useState(false);

  const navigate = useCallback((p, product = null) => {
    if (product) setSelectedProduct(product);
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const addToCart = useCallback((product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, qty }];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) return;
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }, []);

  const toggleWishlist = useCallback((product) => {
    setWishlist(prev => {
      const has = prev.find(i => i.id === product.id);
      return has ? prev.filter(i => i.id !== product.id) : [...prev, product];
    });
  }, []);

  const isWishlisted = useCallback((id) => wishlist.some(i => i.id === id), [wishlist]);

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const placeOrder = useCallback(() => {
    if (cart.length === 0) return false;
    const newOrder = {
      id: 'ORD-' + (2042 + orders.length),
      date: new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }),
      status: 'Processing',
      items: cart.map(i => i.name),
      total: cartTotal,
      tracking: 'Order confirmed',
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    return true;
  }, [cart, cartTotal, orders.length]);

  return (
    <AppContext.Provider value={{
      page, navigate,
      selectedProduct,
      cart, addToCart, removeFromCart, updateQty, cartTotal, cartCount,
      wishlist, toggleWishlist, isWishlisted,
      orders, placeOrder,
      user, setUser,
      profileOpen, setProfileOpen,
      cartOpen, setCartOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
