import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { showToast } from '../utils/toast';

function Stars({ rating, reviews }) {
  return (
    <div className="product-stars">
      {[1,2,3,4,5].map(i => (
        <span key={i} className="star">{i <= Math.round(rating) ? '★' : '☆'}</span>
      ))}
      <span className="star-count">({reviews})</span>
    </div>
  );
}

export default function ProductCard({ product, style }) {
  const { addToCart, toggleWishlist, isWishlisted, navigate } = useApp();
  const [added, setAdded] = useState(false);
  const liked = isWishlisted(product.id);

  const handleAdd = e => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    showToast(`${product.name.slice(0, 28)}... added to cart`, '🛒');
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWish = e => {
    e.stopPropagation();
    toggleWishlist(product);
    showToast(isWishlisted(product.id) ? 'Removed from wishlist' : 'Added to wishlist ❤️', '❤️');
  };

  const disc = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="product-card" style={style} onClick={() => navigate('product', product)}>
      <div className="product-card-img">
        <img src={product.img} alt={product.name} loading="lazy" />
        {product.tag && (
          <span className="product-badge" style={{
            background: product.tag === 'Bestseller' ? '#dcfce7' : product.tag === 'Rare' ? '#f3e8ff' : product.tag === 'Flash Sale' ? '#fee2e2' : '#fff3cd',
            color: product.tag === 'Bestseller' ? '#166534' : product.tag === 'Rare' ? '#6b21a8' : product.tag === 'Flash Sale' ? '#991b1b' : '#854d0e',
          }}>{product.tag}</span>
        )}
        <button className={`product-wish-btn${liked ? ' active' : ''}`} onClick={handleWish}>
          {liked ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="product-card-body">
        <div className="product-card-cat">{product.category}</div>
        <div className="product-card-name">{product.name}</div>
        <Stars rating={product.rating} reviews={product.reviews} />
        <div className="product-delivery">🚚 Delivery in {product.delivery}</div>
        <div className="product-card-footer">
          <div className="product-price-wrap">
            <div className="product-price">₹{product.price.toLocaleString('en-IN')}</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span className="product-mrp">₹{product.mrp.toLocaleString('en-IN')}</span>
              <span className="product-discount">{disc}% off</span>
            </div>
          </div>
          <button className={`add-btn${added ? ' added' : ''}`} onClick={handleAdd} title="Add to Cart">
            {added ? '✓' : '+'}
          </button>
        </div>
      </div>
    </div>
  );
}
