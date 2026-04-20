import { useApp } from '../context/AppContext';

export default function Footer() {
  const { navigate } = useApp();
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="footer-logo">
              <div className="footer-logo-icon">🌱</div>
              <div className="footer-logo-name">HGreenQ</div>
            </div>
            <p className="footer-brand-desc">
              Premium plant nursery delivering fresh, rare and exotic plants across India.
              Every plant comes with a 7-day live guarantee.
            </p>
            <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <div className="footer-badge">✅ 7-Day Guarantee</div>
              <div className="footer-badge">🚚 Free Delivery ₹699+</div>
            </div>
          </div>

          <div className="footer-col">
            <h5>Quick Links</h5>
            <ul>
              {['Home', 'Shop', 'About', 'Contact'].map(l => (
                <li key={l} onClick={() => navigate(l.toLowerCase())}>{l}</li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h5>Categories</h5>
            <ul>
              {['Fruit Plants', 'Mango Plants', 'Indoor Plants', 'Flower Plants', 'Herbs', 'Rare & Exotic'].map(l => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h5>Support</h5>
            <ul>
              {['Track Order', 'Return Policy', 'Shipping Policy', 'Privacy Policy', 'Terms & Conditions', 'FAQ'].map(l => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <div style={{ marginTop: 20, fontSize: '.82rem' }}>
              <div style={{ marginBottom: 6 }}>📞 +91 81013 76949</div>
              <div style={{ marginBottom: 6 }}>📧 hello@hgreenq.in</div>
              <div>⏰ 24/7 Support</div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 HGreenQ. Made with 🌿 By : <span>Surojit</span> in India.</span>
          <div style={{ display: 'flex', gap: 16 }}>
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }}>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
