import { useApp } from '../context/AppContext';

export default function ProfileDrawer() {
  const { profileOpen, setProfileOpen, user, orders, wishlist, cart, navigate, setCartOpen } = useApp();

  const go = page => { setProfileOpen(false); navigate(page); };

  return (
    <>
      <div className={`drawer-overlay${profileOpen ? ' open' : ''}`} onClick={() => setProfileOpen(false)} />
      <div className={`profile-drawer${profileOpen ? ' open' : ''}`}>
        {/* Header */}
        <div style={{ padding: '16px 22px', display: 'flex', justifyContent: 'flex-end', borderBottom: '1px solid var(--border)' }}>
          <button className="cart-close" onClick={() => setProfileOpen(false)}>✕</button>
        </div>

        {/* Profile Hero */}
        <div className="profile-hero">
          <div className="profile-avatar-lg">{user.name.charAt(0)}</div>
          <div className="profile-name">{user.name}</div>
          <div className="profile-email">{user.email}</div>
          <div className="profile-stats">
            <div className="profile-stat">
              <div className="profile-stat-num">{orders.length}</div>
              <div className="profile-stat-label">Orders</div>
            </div>
            <div className="profile-stat">
              <div className="profile-stat-num">{wishlist.length}</div>
              <div className="profile-stat-label">Wishlist</div>
            </div>
            <div className="profile-stat">
              <div className="profile-stat-num">{cart.length}</div>
              <div className="profile-stat-label">In Cart</div>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="profile-section">
          <div className="profile-section-title">My Account</div>
          {[
            { icon: '📦', label: 'My Orders', action: () => go('orders') },
            { icon: '❤️', label: 'Wishlist', action: () => go('wishlist') },
            { icon: '🛒', label: 'View Cart', action: () => { setProfileOpen(false); setCartOpen(true); } },
            { icon: '📍', label: 'Saved Addresses', action: () => {} },
            { icon: '🎁', label: 'Coupons & Offers', action: () => {} },
          ].map(item => (
            <div key={item.label} className="profile-menu-item" onClick={item.action}>
              <span className="profile-menu-icon">{item.icon}</span>
              <span>{item.label}</span>
              <span style={{ marginLeft: 'auto', color: 'var(--text-light)', fontSize: '.8rem' }}>›</span>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="profile-section">
          <div className="profile-section-title">Recent Orders</div>
          {orders.slice(0, 2).map(order => (
            <div key={order.id} className="order-mini-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span className="order-mini-id">{order.id}</span>
                <span className={`order-mini-status ${order.status === 'Delivered' ? 'status-delivered' : order.status === 'In Transit' ? 'status-transit' : 'status-processing'}`}>
                  {order.status}
                </span>
              </div>
              <div style={{ fontSize: '.78rem', color: 'var(--text-muted)', marginBottom: 4 }}>{order.items.slice(0, 2).join(', ')}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.78rem' }}>
                <span style={{ color: 'var(--text-light)' }}>{order.date}</span>
                <span style={{ fontWeight: 700, color: 'var(--green-dark)' }}>₹{order.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          ))}
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <span style={{ fontSize: '.82rem', color: 'var(--green)', fontWeight: 600, cursor: 'pointer' }} onClick={() => go('orders')}>View All Orders →</span>
          </div>
        </div>

        {/* User Info */}
        <div className="profile-section">
          <div className="profile-section-title">Contact Info</div>
          <div style={{ fontSize: '.84rem', color: 'var(--text-muted)', lineHeight: 2 }}>
            <div>📞 {user.phone}</div>
            <div>📍 {user.city}</div>
            <div>🗓️ Member since {user.joined}</div>
          </div>
        </div>

        <div style={{ padding: '16px 22px' }}>
          <button className="btn-ghost" style={{ width: '100%', textAlign: 'center', color: 'var(--red)', borderColor: '#fecaca' }}>
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}
