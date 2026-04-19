import { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../data/constants';

export default function Shop() {
  const [activeCat, setActiveCat] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('popular');
  const [priceMax, setPriceMax] = useState(3000);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(p => {
      const q = search.toLowerCase();
      return (
        (activeCat === 'all' || p.category === activeCat) &&
        (!q || p.name.toLowerCase().includes(q) || p.category.includes(q)) &&
        p.price <= priceMax
      );
    });
    if (sort === 'popular')   list = [...list].sort((a, b) => b.reviews - a.reviews);
    if (sort === 'rating')    list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === 'price-lo')  list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-hi')  list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'discount')  list = [...list].sort((a, b) => (b.mrp - b.price) / b.mrp - (a.mrp - a.price) / a.mrp);
    return list;
  }, [activeCat, search, sort, priceMax]);

  return (
    <div className="page-enter">
      <div className="page-header">
        <div className="page-header-inner">
          <h1 className="page-header-title">🌿 Our Plant Collection</h1>
          <p className="page-header-sub">Fresh from the nursery — {PRODUCTS.length} varieties available</p>
        </div>
      </div>

      <section className="section">
        <div className="section-inner">
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Sidebar Filters */}
            <div style={{ width: 220, flexShrink: 0 }}>
              <div style={{ background: 'var(--surface)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
                <div style={{ fontWeight: 700, marginBottom: 16, fontSize: '.85rem', textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)' }}>Filters</div>

                {/* Category */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontWeight: 700, fontSize: '.85rem', marginBottom: 12 }}>Category</div>
                  {CATEGORIES.map(cat => (
                    <div
                      key={cat.id}
                      onClick={() => setActiveCat(cat.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '8px 10px', borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer', fontSize: '.85rem',
                        fontWeight: activeCat === cat.id ? 700 : 400,
                        color: activeCat === cat.id ? 'var(--green)' : 'var(--text-muted)',
                        background: activeCat === cat.id ? 'var(--green-pale)' : 'transparent',
                        marginBottom: 2,
                        transition: 'var(--transition)',
                      }}
                    >
                      {cat.emoji} {cat.label}
                    </div>
                  ))}
                </div>

                {/* Price Range */}
                <div>
                  <div style={{ fontWeight: 700, fontSize: '.85rem', marginBottom: 10 }}>
                    Max Price: <span style={{ color: 'var(--green)' }}>₹{priceMax}</span>
                  </div>
                  <input
                    type="range"
                    min={100} max={3000} step={50}
                    value={priceMax}
                    onChange={e => setPriceMax(+e.target.value)}
                    style={{ width: '100%', accentColor: 'var(--green)' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.72rem', color: 'var(--text-muted)', marginTop: 4 }}>
                    <span>₹100</span><span>₹3000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Search + Sort Bar */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, position: 'relative', minWidth: 200 }}>
                  <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }}>🔍</span>
                  <input
                    className="form-input"
                    style={{ paddingLeft: 38, borderRadius: 'var(--radius-full)' }}
                    placeholder="Search plants..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                <select
                  className="form-input"
                  style={{ width: 'auto', paddingRight: 32, cursor: 'pointer' }}
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Top Rated</option>
                  <option value="price-lo">Price: Low → High</option>
                  <option value="price-hi">Price: High → Low</option>
                  <option value="discount">Best Discount</option>
                </select>
                <span style={{ alignSelf: 'center', fontSize: '.84rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                  {filtered.length} plants
                </span>
              </div>

              {/* Grid */}
              {filtered.length === 0 ? (
                <div className="no-results">
                  <div className="no-results-icon">🌵</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--green-dark)', marginBottom: 8 }}>No plants found</div>
                  <p>Try a different search or filter.</p>
                </div>
              ) : (
                <div className="product-grid">
                  {filtered.map((p, i) => (
                    <ProductCard key={p.id} product={p} style={{ animationDelay: `${i * 50}ms` }} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
