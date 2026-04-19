import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/constants';
import ProductCard from '../components/ProductCard';
import { showToast } from '../utils/toast';

function Stars({ rating, reviews }) {
  return (
    <div className="product-stars" style={{ gap: 3 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? '#f6ad55' : '#ddd', fontSize: '1rem' }}>★</span>
      ))}
      <span style={{ fontSize: '.82rem', color: 'var(--text-muted)', marginLeft: 6 }}>{rating} ({reviews} reviews)</span>
    </div>
  );
}

export default function ProductDetail() {
  const { selectedProduct, addToCart, toggleWishlist, isWishlisted, setCartOpen, navigate } = useApp();
  const product = selectedProduct;
  const [qty, setQty] = useState(1);
  const [addedMsg, setAddedMsg] = useState(false);

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 24px' }}>
        <div style={{ fontSize: '4rem', marginBottom: 16 }}>🌱</div>
        <p>No product selected.</p>
        <button className="btn-primary" style={{ marginTop: 20 }} onClick={() => navigate('shop')}>Browse Plants</button>
      </div>
    );
  }

  const disc = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const liked = isWishlisted(product.id);
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAddedMsg(true);
    showToast(`${product.name.slice(0, 25)}... added to cart 🛒`, '🌿');
    setTimeout(() => setAddedMsg(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    setCartOpen(true);
  };

  return (
    <div className="page-enter">
      <div className="product-detail-wrap">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span onClick={() => navigate('home')}>Home</span>
          <span className="breadcrumb-sep">›</span>
          <span onClick={() => navigate('shop')}>Shop</span>
          <span className="breadcrumb-sep">›</span>
          <span style={{ color: 'var(--text)', cursor: 'default' }}>{product.name}</span>
        </div>

        <div className="product-detail-grid">
          {/* Image */}
          <div>
            <img src={product.img} alt={product.name} className="product-detail-img-main" />
          </div>

          {/* Info */}
          <div>
            {product.tag && (
              <span className="product-detail-tag" style={{
                background: product.tag === 'Bestseller' ? '#dcfce7' : '#fee2e2',
                color: product.tag === 'Bestseller' ? '#166534' : '#991b1b',
              }}>
                {product.tag}
              </span>
            )}
            <h1 className="product-detail-name">{product.name}</h1>
            <Stars rating={product.rating} reviews={product.reviews} />

            <div className="product-detail-prices">
              <span className="detail-price">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="detail-mrp">₹{product.mrp.toLocaleString('en-IN')}</span>
              <span className="detail-off">{disc}% OFF</span>
            </div>

            <p className="product-detail-desc">{product.desc}</p>

            {/* Meta Chips */}
            <div className="product-detail-meta">
              {[
                { icon: '🚚', label: 'Delivery', val: product.delivery },
                { icon: '📦', label: 'In Stock', val: `${product.stock} units` },
                { icon: '✅', label: 'Guarantee', val: '7-Day Live' },
                { icon: '🌿', label: 'Category', val: product.category },
              ].map(m => (
                <div key={m.label} className="meta-chip">
                  <span className="meta-chip-icon">{m.icon}</span>
                  <div>
                    <div className="meta-chip-label">{m.label}</div>
                    <div className="meta-chip-val">{m.val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quantity */}
            <div className="qty-selector">
              <label>Quantity:</label>
              <div className="qty-control">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))}>+</button>
              </div>
              <span style={{ fontSize: '.8rem', color: 'var(--text-muted)' }}>{product.stock} available</span>
            </div>

            {/* Actions */}
            <div className="detail-actions">
              <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '14px 24px' }} onClick={handleAddToCart}>
                {addedMsg ? '✓ Added to Cart' : '🛒 Add to Cart'}
              </button>
              <button className="btn-outline" style={{ flex: 1, justifyContent: 'center', padding: '14px 24px' }} onClick={handleBuyNow}>
                Buy Now →
              </button>
              <button
                onClick={() => { toggleWishlist(product); showToast(liked ? 'Removed from wishlist' : 'Added to wishlist ❤️', '❤️'); }}
                style={{
                  width: 50, height: 50,
                  borderRadius: 'var(--radius-md)',
                  border: '2px solid var(--border)',
                  background: liked ? '#fee2e2' : 'var(--surface)',
                  fontSize: '1.3rem',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'var(--transition)',
                  flexShrink: 0,
                }}
              >
                {liked ? '❤️' : '🤍'}
              </button>
            </div>

            {/* Delivery info */}
            <div style={{ marginTop: 24, background: 'var(--green-pale)', borderRadius: 'var(--radius-md)', padding: 16, fontSize: '.84rem', color: 'var(--text-muted)', lineHeight: 2 }}>
              <div>✅ <strong>7-day live plant guarantee</strong> — full refund if plant doesn't survive</div>
              <div>🚚 <strong>Free delivery</strong> on orders above ₹699</div>
              <div>📦 <strong>Expert packaging</strong> — safely packed with moisture control</div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div style={{ marginTop: 72 }}>
            <div className="section-header-row">
              <div>
                <div className="section-label">🌿 Related</div>
                <h2 className="section-h2">You might also <em>like</em></h2>
              </div>
            </div>
            <div className="product-grid">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} style={{ animationDelay: `${i * 60}ms` }} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
