import { useState } from 'react';
import { showToast } from '../utils/toast';
import { DELIVERY_CITIES } from '../data/constants';

const INFO_CARDS = [
  { icon: '📍', bg: '#dcfce7', title: 'Visit Our Nursery', text: 'Gaighata, Thakurnagar Road\nNorth 24 Parganas, WB 743287' },
  { icon: '📞', bg: '#dbeafe', title: 'Call Us',           text: '+91 81013 76949\n+91 79082 49967' },
  { icon: '📧', bg: '#fef3c7', title: 'Email Us',          text: 'hello@hgreenq.in\nsupport@hgreenq.in' },
  { icon: '⏰', bg: '#f3e8ff', title: 'Support Hours',     text: '24/7 Plant Care Helpline\nOrder Support: 9 AM–9 PM' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast('Please fill all required fields', '⚠️');
      return;
    }
    setSent(true);
    showToast('Message sent! We\'ll reply within 24 hours 🌿', '✅');
    setTimeout(() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }, 4000);
  };

  return (
    <div className="page-enter">
      <div className="page-header">
        <div className="page-header-inner">
          <h1 className="page-header-title">📞 Get in Touch</h1>
          <p className="page-header-sub">We'd love to help you find the perfect plant.</p>
        </div>
      </div>

      <section className="section">
        <div className="section-inner">
          <div className="contact-grid">
            {/* Info */}
            <div>
              <div className="section-label" style={{ marginBottom: 14 }}>📍 Contact Info</div>
              <h2 className="section-h2" style={{ marginBottom: 14 }}>We're here<br /><em>for your plants</em></h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 28, fontSize: '.95rem' }}>
                Have a question about plant care, delivery, or want to place a bulk order? Our plant experts are ready to help you.
              </p>

              <div className="contact-info-cards">
                {INFO_CARDS.map(c => (
                  <div key={c.title} className="contact-info-card">
                    <div className="contact-info-icon" style={{ background: c.bg }}>{c.icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '.9rem', marginBottom: 4 }}>{c.title}</div>
                      <div style={{ fontSize: '.82rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                        {c.text.split('\n').map((l, i) => <div key={i}>{l}</div>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Cities */}
              <div style={{ marginTop: 28, background: 'var(--green-pale)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
                <div style={{ fontWeight: 700, fontSize: '.85rem', marginBottom: 12, color: 'var(--green-dark)' }}>🚚 We Deliver To</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {DELIVERY_CITIES.map(city => (
                    <span key={city} style={{ padding: '4px 12px', background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', fontSize: '.75rem', fontWeight: 600 }}>
                      {city}
                    </span>
                  ))}
                  <span style={{ padding: '4px 12px', background: 'var(--green)', color: '#fff', borderRadius: 'var(--radius-full)', fontSize: '.75rem', fontWeight: 600 }}>
                    +500 more
                  </span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="contact-form-box">
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--green-dark)', marginBottom: 24 }}>
                Send us a Message
              </div>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input className="form-input" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input className="form-input" type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input className="form-input" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <select className="form-input" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                      <option value="">Select topic</option>
                      <option>Plant Care Query</option>
                      <option>Order Issue</option>
                      <option>Bulk Order</option>
                      <option>Return / Refund</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea className="form-input" placeholder="Tell us how we can help..." rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem' }}>
                  {sent ? '✓ Message Sent!' : 'Send Message →'}
                </button>
              </form>
              <div style={{ marginTop: 16, fontSize: '.76rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                We respond within 24 hours on working days.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
