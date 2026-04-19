import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES, TESTIMONIALS } from '../data/constants';
import { useApp } from '../context/AppContext';
import { useState } from 'react';

export default function Home() {
  const { navigate } = useApp();
  const [activeCat, setActiveCat] = useState('all');

  const filtered = activeCat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCat);

  return (
    <div className="page-enter">
      <HeroSlider />

      {/* Trust Strip */}
      <div className="trust-strip">
        <div className="trust-inner">
          {[
            { icon: '🚚', title: 'Free Delivery', sub: 'On orders ₹699 & above' },
            { icon: '✅', title: '7-Day Live Guarantee', sub: 'Or full refund, no questions' },
            { icon: '🌿', title: 'Expert Packed', sub: 'Secure plant packaging' },
            { icon: '📞', title: '24/7 Support', sub: 'Plant care helpline' },
          ].map(t => (
            <div key={t.title}>
              <div className="trust-icon">{t.icon}</div>
              <div className="trust-title">{t.title}</div>
              <div className="trust-sub">{t.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Shop by Category */}
      <section className="section" style={{ background: 'var(--green-pale)' }}>
        <div className="section-inner">
          <div className="section-header-row">
            <div>
              <div className="section-label">🌿 Categories</div>
              <h2 className="section-h2">Shop by <em>Plant Type</em></h2>
            </div>
            <button className="btn-ghost" onClick={() => navigate('shop')}>View All →</button>
          </div>
          <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
            {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
              <div
                key={cat.id}
                onClick={() => navigate('shop')}
                style={{
                  flexShrink: 0,
                  background: 'var(--surface)',
                  border: '1.5px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px 24px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  minWidth: 130,
                  transition: 'var(--transition)',
                  boxShadow: 'var(--shadow-xs)',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.borderColor = 'var(--green)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-xs)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <div style={{ fontSize: '2.2rem', marginBottom: 10 }}>{cat.emoji}</div>
                <div style={{ fontSize: '.8rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }}>{cat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section">
        <div className="section-inner">
          <div className="section-header-row">
            <div>
              <div className="section-label">⭐ In the Spotlight</div>
              <h2 className="section-h2">Our <em>Best Sellers</em></h2>
            </div>
            <button className="btn-ghost" onClick={() => navigate('shop')}>See All →</button>
          </div>
          {/* Category Pills */}
          <div className="cat-pills" style={{ marginBottom: 32 }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`cat-pill${activeCat === cat.id ? ' active' : ''}`}
                onClick={() => setActiveCat(cat.id)}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>
          <div className="product-grid">
            {filtered.slice(0, 8).map((p, i) => (
              <ProductCard key={p.id} product={p} style={{ animationDelay: `${i * 55}ms` }} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <button className="btn-primary" style={{ padding: '14px 40px' }} onClick={() => navigate('shop')}>
              View All Plants →
            </button>
          </div>
        </div>
      </section>

      {/* Offer Banner */}
      <section style={{ background: 'linear-gradient(135deg, var(--green-dark), var(--green))', padding: '64px 24px', textAlign: 'center', color: '#fff' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', opacity: .75, marginBottom: 12 }}>Limited Time Offer</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem,4vw,2.8rem)', marginBottom: 16 }}>Get 60% Off Your First Order</h2>
          <p style={{ opacity: .8, marginBottom: 28, lineHeight: 1.7 }}>Use code <strong>HGREEN60</strong> at checkout. Valid on orders above ₹499.</p>
          <button className="btn-outline" style={{ background: '#fff', color: 'var(--green)', borderColor: '#fff', padding: '13px 36px', fontSize: '1rem' }} onClick={() => navigate('shop')}>
            Shop & Save →
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ background: 'var(--surface2)' }}>
        <div className="section-inner">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <div className="section-label" style={{ margin: '0 auto 14px' }}>💬 Reviews</div>
            <h2 className="section-h2">What Our <em>Customers</em> Say</h2>
          </div>
          <div className="testimonial-grid">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="testimonial-card">
                <div className="testi-header">
                  <img src={t.avatar} alt={t.name} className="testi-avatar" />
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-city">📍 {t.city}</div>
                    <div style={{ color: '#f6ad55', fontSize: '.8rem' }}>{'★'.repeat(t.rating)}</div>
                  </div>
                </div>
                <p className="testi-text">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
