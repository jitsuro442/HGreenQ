import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { showToast } from '../utils/toast';

export default function Cart() {
  const { cart, removeFromCart, updateQty, cartTotal, placeOrder, navigate } = useApp();
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const delivery = cartTotal >= 699 ? 0 : 49;
  const discount = couponApplied ? Math.round(cartTotal * 0.1) : 0;
  const total = cartTotal + delivery - discount;

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'HGREEN10') {
      setCouponApplied(true);
      showToast('Coupon applied! 10% off 🎉', '✅');
    } else {
      showToast('Invalid coupon code', '❌');
    }
  };

  const handleOrder = () => {
    const ok = placeOrder();
    if (ok) {
      showToast('Order placed successfully! 🎉', '✅');
      navigate('orders');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="page-enter">
        <div className="page-header">
          <div className="page-header-inner">
            <h1 className="page-header-title">🛒 Your Cart</h1>
          </div>
        </div>
        <div style={{ textAlign: 'center', padding: '100px 24px' }}>
          <div style={{ fontSize: '5rem', marginBottom: 20 }}>🛒</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--green-dark)', marginBottom: 12 }}>Your cart is empty</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 28 }}>Browse our plants and add something green to your life.</p>
          <button className="btn-primary" style={{ padding: '13px 36px' }} onClick={() => navigate('shop')}>Shop Now →</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter">
      <div className="page-header">
        <div className="page-header-inner">
          <h1 className="page-header-title">🛒 Your Cart</h1>
          <p className="page-header-sub">{cart.reduce((s, i) => s + i.qty, 0)} items in your cart</p>
        </div>
      </div>

      <div className="cart-page-wrap">
        <div className="cart-page-grid">
          {/* Cart Items */}
          <div>
            {cart.map(item => (
              <div key={item.id} className="cart-page-item">
                <img src={item.img} alt={item.name} className="cart-page-img" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '.95rem', marginBottom: 6, lineHeight: 1.3 }}>{item.name}</div>
                  <div style={{ fontSize: '.78rem', color: 'var(--text-muted)', marginBottom: 12 }}>
                    🚚 Delivery in {item.delivery}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <div className="qty-control">
                      <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                    </div>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--green-dark)' }}>
                      ₹{(item.price * item.qty).toLocaleString('en-IN')}
                    </span>
                    <span style={{ fontSize: '.78rem', color: 'var(--text-light)', textDecoration: 'line-through' }}>
                      ₹{(item.mrp * item.qty).toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => { removeFromCart(item.id); showToast('Item removed', '🗑️'); }}
                      style={{ marginLeft: 'auto', color: 'var(--red)', fontSize: '.82rem', fontWeight: 600, cursor: 'pointer', background: 'none', border: 'none' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <button className="btn-ghost" onClick={() => navigate('shop')} style={{ marginTop: 8 }}>
              ← Continue Shopping
            </button>
          </div>

          {/* Order Summary */}
          <div className="order-summary-box">
            <div className="order-summary-title">Order Summary</div>

            {/* Coupon */}
            <div className="coupon-input">
              <input
                className="form-input"
                placeholder="Coupon code (HGREEN10)"
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
                disabled={couponApplied}
              />
              <button
                className="btn-primary"
                style={{ padding: '10px 16px', fontSize: '.82rem', whiteSpace: 'nowrap' }}
                onClick={applyCoupon}
                disabled={couponApplied}
              >
                {couponApplied ? '✓' : 'Apply'}
              </button>
            </div>
            {couponApplied && (
              <div style={{ fontSize: '.78rem', color: 'var(--green)', fontWeight: 600, marginBottom: 14 }}>
                ✅ HGREEN10 applied — 10% off!
              </div>
            )}

            <div className="order-row"><span>Subtotal</span><span>₹{cartTotal.toLocaleString('en-IN')}</span></div>
            <div className="order-row">
              <span>Delivery</span>
              <span style={{ color: delivery === 0 ? 'var(--green)' : 'inherit', fontWeight: delivery === 0 ? 600 : 400 }}>
                {delivery === 0 ? 'FREE' : `₹${delivery}`}
              </span>
            </div>
            {couponApplied && (
              <div className="order-row" style={{ color: 'var(--green)' }}>
                <span>Coupon Discount</span><span>−₹{discount}</span>
              </div>
            )}
            <div className="order-row total">
              <span>Total</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--green-dark)' }}>
                ₹{total.toLocaleString('en-IN')}
              </span>
            </div>

            {cartTotal < 699 && (
              <div style={{ background: '#fff3cd', borderRadius: 'var(--radius-sm)', padding: '10px 14px', fontSize: '.78rem', color: '#854d0e', marginBottom: 16, fontWeight: 600 }}>
                Add ₹{(699 - cartTotal)} more for FREE delivery 🚚
              </div>
            )}

            <button
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem', marginBottom: 10 }}
              onClick={handleOrder}
            >
              Place Order →
            </button>
            <div style={{ fontSize: '.74rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.6 }}>
              🔒 Secure checkout · ✅ 7-day live guarantee
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
