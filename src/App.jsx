import { useApp } from './context/AppContext';
import { useScrollTop } from './hooks/useScroll';
import { ToastContainer } from './utils/toast';

import Navbar       from './components/Navbar';
import Footer       from './components/Footer';
import CartDrawer   from './components/CartDrawer';
import ProfileDrawer from './components/ProfileDrawer';

import Home          from './pages/Home';
import Shop          from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart          from './pages/Cart';
import Wishlist      from './pages/Wishlist';
import Orders        from './pages/Orders';
import About         from './pages/About';
import Contact       from './pages/Contact';

const PAGE_MAP = {
  home:    Home,
  shop:    Shop,
  product: ProductDetail,
  cart:    Cart,
  wishlist: Wishlist,
  orders:  Orders,
  about:   About,
  contact: Contact,
};

export default function App() {
  const { page } = useApp();
  const scrollTopVisible = useScrollTop();
  const PageComponent = PAGE_MAP[page] ?? Home;

  return (
    <>
      <Navbar />
      <main>
        <PageComponent />
      </main>
      <Footer />
      <CartDrawer />
      <ProfileDrawer />
      <ToastContainer />
      <button
        className={`scroll-top-btn${scrollTopVisible ? ' visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="Back to top"
      >
        ↑
      </button>
    </>
  );
}
