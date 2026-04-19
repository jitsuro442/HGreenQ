import { useApp } from '../context/AppContext';

const statusStyle = {
  Delivered:  { bg: '#dcfce7', color: '#166534' },
  'In Transit': { bg: '#fef3c7', color: '#92400e' },
  Processing: { bg: '#dbeafe', color: '#1e40af' },
};

export default function Orders() {
  const { orders, navigate } = useApp();

  return (
    <div className="page-enter">
      <div className="page-header">
        <div className="page-header-inner">
          <h1 className="page-header-title">📦 My Orders</h1>
          <p className="page-header-sub">{orders.length} order{orders.length !== 1 ? 's' : ''} placed</p>
        </div>
      </div>

      <section className="section">
        <div className="section-inner" style={{ maxWidth: 800 }}>
          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 24px' }}>
              <div style={{ fontSize: '5rem', marginBottom: 20 }}>📦</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--green-dark)', marginBottom: 12 }}>No orders yet</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 28 }}>Your order history will appear here.</p>
              <button className="btn-primary" style={{ padding: '13px 36px' }} onClick={() => navigate('shop')}>Shop Now →</button>
            </div>
          ) : (
            orders.map(order => {
              const st = statusStyle[order.status] || statusStyle.Processing;
              return (
                <div key={order.id} className="order-card">
                  <div className="order-card-header">
                    <div>
                      <div className="order-card-id">{order.id}</div>
                      <div className="order-card-date">Placed on {order.date}</div>
                    </div>
                    <span
                      className="order-mini-status"
                      style={{ background: st.bg, color: st.color, padding: '4px 14px', fontSize: '.75rem' }}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="order-items-list">
                    {order.items.map((item, i) => (
                      <span key={i}>🌿 {item}{i < order.items.length - 1 ? ', ' : ''}</span>
                    ))}
                  </div>

                  {/* Tracking bar */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      {['Order Placed', 'Packed', 'Shipped', 'Delivered'].map((step, i) => {
                        const stepIndex = order.status === 'Processing' ? 0 : order.status === 'In Transit' ? 2 : 3;
                        return (
                          <div key={step} style={{ textAlign: 'center', flex: 1 }}>
                            <div style={{
                              width: 28, height: 28,
                              borderRadius: '50%',
                              background: i <= stepIndex ? 'var(--green)' : 'var(--border)',
                              color: i <= stepIndex ? '#fff' : 'var(--text-light)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: '.7rem', fontWeight: 700,
                              margin: '0 auto 5px',
                              transition: 'var(--transition)',
                            }}>
                              {i <= stepIndex ? '✓' : i + 1}
                            </div>
                            <div style={{ fontSize: '.65rem', color: i <= stepIndex ? 'var(--green)' : 'var(--text-light)', fontWeight: i <= stepIndex ? 700 : 400 }}>
                              {step}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div style={{ height: 3, background: 'var(--border)', borderRadius: 99, position: 'relative', marginTop: 4 }}>
                      <div style={{
                        height: '100%',
                        background: 'var(--green)',
                        borderRadius: 99,
                        width: order.status === 'Processing' ? '10%' : order.status === 'In Transit' ? '65%' : '100%',
                        transition: 'width 1s ease',
                      }} />
                    </div>
                  </div>

                  <div className="order-card-footer">
                    <div className="order-tracking">
                      🚚 {order.tracking}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--green-dark)' }}>
                        ₹{order.total.toLocaleString('en-IN')}
                      </span>
                      {order.status === 'Delivered' && (
                        <button className="btn-ghost" style={{ padding: '7px 16px', fontSize: '.8rem' }} onClick={() => navigate('shop')}>
                          Reorder
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
