import { useApp } from '../context/AppContext';

const VALUES = [
  { icon: '🌱', title: 'Farm Fresh', text: 'Every plant is grown in our own nursery in West Bengal. No middlemen — direct from soil to your doorstep.' },
  { icon: '✅', title: '7-Day Guarantee', text: 'We stand behind our plants. If yours doesn\'t survive within 7 days, we\'ll send a replacement or full refund.' },
  { icon: '📦', title: 'Expert Packaging', text: 'Our trained team packs each plant with moisture-retaining material, bamboo supports, and breathable wrapping.' },
  { icon: '🚚', title: 'Pan India Delivery', text: 'We deliver to 500+ cities across India. Orders above ₹699 ship completely free.' },
  { icon: '🧑‍🌾', title: 'Expert Advice', text: '24/7 plant care support from our in-house horticulturists. We help your plants thrive, not just survive.' },
  { icon: '♻️', title: 'Eco Packaging', text: 'All packaging is 100% biodegradable. We use recycled materials and plant-based inks wherever possible.' },
];

const TEAM = [
  { name: 'Rajesh Sikdar', role: 'Founder & Head Horticulturist', emoji: '🧑‍🌾', years: '22 yrs experience' },
  { name: 'Priya Mondal',  role: 'Plant Care Expert',             emoji: '👩‍🔬', years: '12 yrs experience' },
  { name: 'Arjun Das',     role: 'Logistics & Operations',        emoji: '👨‍💼', years: '8 yrs experience' },
];

export default function About() {
  const { navigate } = useApp();

  return (
    <div className="page-enter">
      {/* Hero */}
      <div className="about-hero">
        <div className="section-inner">
          <div className="section-label" style={{ margin: '0 auto 16px' }}>🌿 Our Story</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem,5vw,3.5rem)', color: 'var(--green-dark)', marginBottom: 20, lineHeight: 1.15 }}>
            Growing happiness,<br /><em style={{ color: 'var(--green)' }}>one plant at a time</em>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', maxWidth: 580, margin: '0 auto 36px', lineHeight: 1.8 }}>
            HGreenQ was born in 2018 from a tiny nursery in Gaighata, West Bengal. Today we're India's most trusted online plant nursery — delivering over 50,000 plants a year with love and care.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" style={{ padding: '13px 32px' }} onClick={() => navigate('shop')}>Shop Plants →</button>
            <button className="btn-outline" style={{ padding: '13px 32px' }} onClick={() => navigate('contact')}>Contact Us</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="trust-strip">
        <div className="trust-inner">
          {[
            { icon: '🌿', title: '50,000+', sub: 'Plants Delivered' },
            { icon: '⭐', title: '4.8 / 5', sub: 'Average Rating' },
            { icon: '🏙️', title: '500+', sub: 'Cities Served' },
            { icon: '🌱', title: '200+', sub: 'Plant Varieties' },
          ].map(s => (
            <div key={s.title}>
              <div className="trust-icon">{s.icon}</div>
              <div className="trust-title">{s.title}</div>
              <div className="trust-sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <section className="section">
        <div className="section-inner">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label" style={{ margin: '0 auto 14px' }}>💚 What We Stand For</div>
            <h2 className="section-h2">Our <em>core values</em></h2>
          </div>
          <div className="about-cards">
            {VALUES.map(v => (
              <div key={v.title} className="about-card">
                <div className="about-card-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ background: 'var(--green-pale)' }}>
        <div className="section-inner">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label" style={{ margin: '0 auto 14px' }}>👥 The Team</div>
            <h2 className="section-h2">Meet the <em>people</em> behind HGreenQ</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 22 }}>
            {TEAM.map(m => (
              <div key={m.name} style={{
                background: 'var(--surface)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px 24px',
                textAlign: 'center',
                border: '1.5px solid var(--border)',
                boxShadow: 'var(--shadow-xs)',
              }}>
                <div style={{ fontSize: '3.5rem', marginBottom: 14 }}>{m.emoji}</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--green-dark)', marginBottom: 6 }}>{m.name}</div>
                <div style={{ fontSize: '.82rem', color: 'var(--green)', fontWeight: 600, marginBottom: 6 }}>{m.role}</div>
                <div style={{ fontSize: '.75rem', color: 'var(--text-muted)' }}>{m.years}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--green-dark)', padding: '72px 24px', textAlign: 'center', color: '#fff' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem,4vw,2.6rem)', marginBottom: 16 }}>
            Ready to go green?
          </h2>
          <p style={{ opacity: .75, marginBottom: 28, lineHeight: 1.7 }}>
            Start with a single plant and transform your home into a living sanctuary.
          </p>
          <button
            className="btn-outline"
            style={{ background: '#fff', color: 'var(--green-dark)', borderColor: '#fff', padding: '13px 36px', fontSize: '1rem' }}
            onClick={() => navigate('shop')}
          >
            Explore Plants →
          </button>
        </div>
      </section>
    </div>
  );
}
