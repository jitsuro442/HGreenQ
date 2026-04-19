import { useState } from 'react';
import { useScrolled } from '../hooks/useScroll';
import { useApp } from '../context/AppContext';
import { NAV_LINKS } from '../data/constants';

const MOBILE_LINKS = [
  { id: 'home',     label: 'Home',        icon: '🏠' },
  { id: 'shop',     label: 'Shop',        icon: '🌿' },
  { id: 'wishlist', label: 'Wishlist',    icon: '❤️' },
  { id: 'orders',   label: 'My Orders',   icon: '📦' },
  { id: 'about',    label: 'About Us',    icon: 'ℹ️' },
  { id: 'contact',  label: 'Contact',     icon: '📞' },
];

export default function Navbar() {
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { page, navigate, cartCount, wishlist, setProfileOpen, setCartOpen, user } = useApp();

  const go = id => { navigate(id); setMobileOpen(false); };

  return (
    <>
      {/* ── TOP ANNOUNCEMENT ── */}
      <div className="announcement-bar">
        <div className="announcement-track">
          {['🌿 Free Shipping on orders ₹699+', '🔥 Up to 60% OFF on all plants', '✅ 7-Day Live Plant Guarantee', '🚚 Pan India Delivery', '🌿 Free Shipping on orders ₹699+', '🔥 Up to 60% OFF on all plants', '✅ 7-Day Live Plant Guarantee', '🚚 Pan India Delivery'].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          {/* Logo */}
          <div className="nav-logo" onClick={() => go('home')}>
            <div className="nav-logo-icon">🌱</div>
            <span className="nav-logo-text">H<span>Green</span>Q</span>
          </div>

          {/* Desktop Links */}
          <ul className="nav-links">
            {NAV_LINKS.map(l => (
              <li key={l.id}>
                <div className={`nav-link${page === l.id ? ' active' : ''}`} onClick={() => go(l.id)}>{l.label}</div>
              </li>
            ))}
          </ul>

          {/* Search */}
          <div className="nav-search">
            <span className="nav-search-icon">🔍</span>
            <input type="text" placeholder="Search plants, herbs..." />
          </div>

          {/* Actions */}
          <div className="nav-actions">
            <button className="nav-icon-btn" onClick={() => go('wishlist')} title="Wishlist">
              ❤️
              {wishlist.length > 0 && <span className="nav-badge">{wishlist.length}</span>}
            </button>
            <button className="nav-icon-btn" onClick={() => setCartOpen(true)} title="Cart">
              🛒
              {cartCount > 0 && <span className="nav-badge">{cartCount > 9 ? '9+' : cartCount}</span>}
            </button>
            <button className="nav-profile-btn" onClick={() => setProfileOpen(true)} title="Profile">
              {user.name.charAt(0)}
            </button>
            {/* Hamburger */}
            <button className={`ham-btn${mobileOpen ? ' open' : ''}`} onClick={() => setMobileOpen(o => !o)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <div className={`mobile-nav-overlay${mobileOpen ? ' open' : ''}`} onClick={() => setMobileOpen(false)} />
      <div className={`mobile-nav${mobileOpen ? ' open' : ''}`}>
        <div className="mobile-nav-header">
          <div className="nav-logo">
            <div className="nav-logo-icon">🌱</div>
            <span className="nav-logo-text">H<span>Green</span>Q</span>
          </div>
          <button className="mobile-nav-close" onClick={() => setMobileOpen(false)}>✕</button>
        </div>

        {/* Profile strip */}
        <div className="mobile-nav-profile">
          <div className="mobile-avatar">{user.name.charAt(0)}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '.95rem' }}>{user.name}</div>
            <div style={{ fontSize: '.78rem', color: 'var(--text-muted)' }}>{user.email}</div>
            <div
              style={{ fontSize: '.75rem', color: 'var(--green)', fontWeight: 600, marginTop: 4, cursor: 'pointer' }}
              onClick={() => { setProfileOpen(true); setMobileOpen(false); }}
            >View Dashboard →</div>
          </div>
        </div>

        <div className="mobile-nav-links">
          {MOBILE_LINKS.map(l => (
            <div
              key={l.id}
              className={`mobile-nav-link${page === l.id ? ' active' : ''}`}
              onClick={() => go(l.id)}
            >
              <span className="icon">{l.icon}</span>
              {l.label}
              {l.id === 'wishlist' && wishlist.length > 0 && (
                <span style={{ marginLeft: 'auto', background: 'var(--red)', color: '#fff', borderRadius: 99, padding: '1px 8px', fontSize: '.68rem', fontWeight: 700 }}>{wishlist.length}</span>
              )}
            </div>
          ))}
        </div>

        <div className="mobile-nav-footer">
          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => { setCartOpen(true); setMobileOpen(false); }}>
            🛒 View Cart {cartCount > 0 && `(${cartCount})`}
          </button>
        </div>
      </div>
    </>
  );
}
