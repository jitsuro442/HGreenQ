import { useApp } from '../context/AppContext';
import { showToast } from '../utils/toast';

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQty, cartTotal, navigate, placeOrder } = useApp();

  const handleCheckout = () => {
    const ok = placeOrder();
    if (ok) {
      setCartOpen(false);
      showToast('Order placed successfully! 🎉', '✅');
      navigate('orders');
    }
  };

  return (
    <>
      <div className={`drawer-overlay${cartOpen ? ' open' : ''}`} onClick={() => setCartOpen(false)} />
      <div className={`cart-drawer${cartOpen ? ' open' : ''}`}>
        <div className="cart-header">
          <span className="cart-title">🛒 Your Cart</span>
          <button className="cart-close" onClick={() => setCartOpen(false)}>✕</button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--green-dark)', marginBottom: 10 }}>Your cart is empty</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginBottom: 24 }}>Browse our plants and add them here.</p>
              <button className="btn-primary" onClick={() => { setCartOpen(false); navigate('shop'); }}>Shop Now →</button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.img} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">₹{(item.price * item.qty).toLocaleString('en-IN')}</div>
                  <div className="cart-qty-row">
                    <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                    <span className="qty-num">{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                    <span className="cart-remove" onClick={() => removeFromCart(item.id)}>Remove</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            {cartTotal < 699 && (
              <div className="free-delivery-note">
                Add ₹{(699 - cartTotal).toLocaleString('en-IN')} more for FREE delivery 🚚
              </div>
            )}
            {cartTotal >= 699 && (
              <div className="free-delivery-note">🎉 You qualify for FREE delivery!</div>
            )}
            <div className="cart-subtotal">
              <span>Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items)</span>
              <span>₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="cart-subtotal">
              <span>Delivery</span>
              <span style={{ color: 'var(--green)', fontWeight: 600 }}>{cartTotal >= 699 ? 'FREE' : '₹49'}</span>
            </div>
            <div className="cart-total">
              <span className="cart-total-label">Total</span>
              <span className="cart-total-amount">₹{(cartTotal + (cartTotal >= 699 ? 0 : 49)).toLocaleString('en-IN')}</span>
            </div>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: 10 }} onClick={handleCheckout}>
              Place Order →
            </button>
            <button className="btn-ghost" style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }} onClick={() => { setCartOpen(false); navigate('cart'); }}>
              View Full Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
