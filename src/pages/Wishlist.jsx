import ProductCard from '../components/ProductCard';
import { useApp } from '../context/AppContext';

export default function Wishlist() {
  const { wishlist, navigate } = useApp();

  return (
    <div className="page-enter">
      <div className="page-header">
        <div className="page-header-inner">
          <h1 className="page-header-title">❤️ My Wishlist</h1>
          <p className="page-header-sub">{wishlist.length} saved plant{wishlist.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <section className="section">
        <div className="section-inner">
          {wishlist.length === 0 ? (
            <div className="wishlist-empty">
              <div className="wishlist-empty-icon">🤍</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--green-dark)', marginBottom: 12 }}>
                Your wishlist is empty
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 28, maxWidth: 380, margin: '0 auto 28px' }}>
                Tap the heart icon on any plant to save it here for later.
              </p>
              <button className="btn-primary" style={{ padding: '13px 36px' }} onClick={() => navigate('shop')}>
                Browse Plants →
              </button>
            </div>
          ) : (
            <>
              <div className="product-grid">
                {wishlist.map((p, i) => (
                  <ProductCard key={p.id} product={p} style={{ animationDelay: `${i * 60}ms` }} />
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: 36 }}>
                <button className="btn-outline" onClick={() => navigate('shop')}>← Back to Shop</button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
