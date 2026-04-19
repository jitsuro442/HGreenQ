import { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../data/constants';

export default function Shop() {
  const [activeCat, setActiveCat]   = useState('all');
  const [search, setSearch]         = useState('');
  const [sort, setSort]             = useState('popular');
  const [priceMax, setPriceMax]     = useState(3000);
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(p => {
      const q = search.toLowerCase();
      return (
        (activeCat === 'all' || p.category === activeCat) &&
        (!q || p.name.toLowerCase().includes(q) || p.category.includes(q)) &&
        p.price <= priceMax
      );
    });
    if (sort === 'popular')  list = [...list].sort((a, b) => b.reviews - a.reviews);
    if (sort === 'rating')   list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === 'price-lo') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-hi') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'discount') list = [...list].sort((a, b) => (b.mrp - b.price) / b.mrp - (a.mrp - a.price) / a.mrp);
    return list;
  }, [activeCat, search, sort, priceMax]);

  const hasActiveFilters = activeCat !== 'all' || priceMax < 3000;

  const resetFilters = () => { setActiveCat('all'); setPriceMax(3000); setSearch(''); };

  /* ── Shared filter panel ── */
  const FilterPanel = ({ onClose }) => (
    <>
      <div style={{ fontWeight: 700, marginBottom: 16, fontSize: '.85rem', textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)' }}>
        Filters
      </div>

      {/* Category */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontWeight: 700, fontSize: '.85rem', marginBottom: 12 }}>Category</div>
        {CATEGORIES.map(cat => (
          <div
            key={cat.id}
            onClick={() => { setActiveCat(cat.id); onClose && onClose(); }}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '9px 10px', borderRadius: 'var(--radius-sm)',
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
          type="range" min={100} max={3000} step={50}
          value={priceMax}
          onChange={e => setPriceMax(+e.target.value)}
          style={{ width: '100%', accentColor: 'var(--green)' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.72rem', color: 'var(--text-muted)', marginTop: 4 }}>
          <span>₹100</span><span>₹3000</span>
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={resetFilters}
        style={{
          marginTop: 20, width: '100%', padding: '9px',
          borderRadius: 'var(--radius-full)',
          border: '1.5px solid var(--border)',
          background: 'transparent', color: 'var(--text-muted)',
          fontSize: '.82rem', fontWeight: 600, cursor: 'pointer',
        }}
      >
        Reset Filters
      </button>
    </>
  );

  return (
    <div className="page-enter">
      <style>{`
        .shop-sidebar   { display: block; }
        .shop-filter-btn{ display: none !important; }
        @media (max-width: 768px) {
          .shop-sidebar    { display: none; }
          .shop-filter-btn { display: flex !important; }
        }
      `}</style>

      {/* ── Mobile Filter Overlay ── */}
      {filterOpen && (
        <div
          onClick={() => setFilterOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1998 }}
        />
      )}

      {/* ── Mobile Filter Drawer (slides up from bottom) ── */}
      <div style={{
        position: 'fixed',
        bottom: 393, left: 0, right: 0,
        background: 'var(--surface)',
        borderRadius: '24px 24px 0 0',
        zIndex: 1999,
        padding: '0 20px 36px',
        transform: filterOpen ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform .35s cubic-bezier(.4,0,.2,1)',
        maxHeight: '88vh',
        overflowY: 'auto',
        boxShadow: '0 -8px 40px rgba(0,0,0,0.18)',
      }}>
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '14px 0 6px' }}>
          <div style={{ width: 40, height: 4, borderRadius: 99, background: 'var(--border)' }} />
        </div>
        {/* Drawer header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--green-dark)' }}>Filter Plants</span>
          <button
            onClick={() => setFilterOpen(false)}
            style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--surface2)', border: 'none', cursor: 'pointer', fontSize: '1rem', color: 'var(--text-muted)' }}
          >✕</button>
        </div>
        <FilterPanel onClose={() => setFilterOpen(false)} />
        {/* Apply button */}
        <button
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center', marginTop: 18, padding: '13px', fontSize: '1rem' }}
          onClick={() => setFilterOpen(false)}
        >
          Show {filtered.length} Plant{filtered.length !== 1 ? 's' : ''}
        </button>
      </div>

      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-inner">
          <h1 className="page-header-title">🌿 Our Plant Collection</h1>
          <p className="page-header-sub">Fresh from the nursery — {PRODUCTS.length} varieties available</p>
        </div>
      </div>

      <section className="section">
        <div className="section-inner">
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>

            {/* ── Desktop Sidebar ── */}
            <div className="shop-sidebar" style={{ width: 220, flexShrink: 0 }}>
              <div style={{ background: 'var(--surface)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
                <FilterPanel />
              </div>
            </div>

            {/* ── Main Content ── */}
            <div style={{ flex: 1, minWidth: 0 }}>

              {/* Search + Sort row */}
              <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>

                {/* Mobile filter button */}
                <button
                  className="shop-filter-btn"
                  onClick={() => setFilterOpen(true)}
                  style={{
                    alignItems: 'center', gap: 6,
                    padding: '10px 16px',
                    borderRadius: 'var(--radius-full)',
                    border: `2px solid ${hasActiveFilters ? 'var(--green)' : 'var(--border)'}`,
                    background: hasActiveFilters ? 'var(--green)' : 'var(--surface)',
                    color: hasActiveFilters ? '#fff' : 'var(--text-muted)',
                    fontWeight: 700, fontSize: '.84rem', cursor: 'pointer',
                    flexShrink: 0,
                    transition: 'var(--transition)',
                  }}
                >
                  ⚙️ Filters {hasActiveFilters && <span style={{ marginLeft: 2, background: 'rgba(255,255,255,0.35)', borderRadius: 99, padding: '0 5px', fontSize: '.7rem' }}>ON</span>}
                </button>

                {/* Search */}
                <div style={{ flex: 1, position: 'relative', minWidth: 0 }}>
                  <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)', pointerEvents: 'none' }}>🔍</span>
                  <input
                    className="form-input"
                    style={{ paddingLeft: 38, borderRadius: 'var(--radius-full)', width: '100%' }}
                    placeholder="Search plants..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>

                {/* Sort */}
                <select
                  className="form-input"
                  style={{ width: 'auto', cursor: 'pointer', flexShrink: 0 }}
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Top Rated</option>
                  <option value="price-lo">Price: Low → High</option>
                  <option value="price-hi">Price: High → Low</option>
                  <option value="discount">Best Discount</option>
                </select>

                <span style={{ alignSelf: 'center', fontSize: '.82rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  {filtered.length} plants
                </span>
              </div>

              {/* Active filter chips */}
              {hasActiveFilters && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                  {activeCat !== 'all' && (
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      padding: '4px 12px', borderRadius: 'var(--radius-full)',
                      background: 'var(--green-pale)', color: 'var(--green)',
                      fontSize: '.75rem', fontWeight: 700,
                    }}>
                      {CATEGORIES.find(c => c.id === activeCat)?.emoji} {CATEGORIES.find(c => c.id === activeCat)?.label}
                      <span style={{ cursor: 'pointer', marginLeft: 4, fontWeight: 900 }} onClick={() => setActiveCat('all')}>✕</span>
                    </span>
                  )}
                  {priceMax < 3000 && (
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      padding: '4px 12px', borderRadius: 'var(--radius-full)',
                      background: 'var(--green-pale)', color: 'var(--green)',
                      fontSize: '.75rem', fontWeight: 700,
                    }}>
                      Max ₹{priceMax}
                      <span style={{ cursor: 'pointer', marginLeft: 4, fontWeight: 900 }} onClick={() => setPriceMax(3000)}>✕</span>
                    </span>
                  )}
                  <span
                    onClick={resetFilters}
                    style={{ fontSize: '.75rem', color: 'var(--red)', fontWeight: 600, cursor: 'pointer', alignSelf: 'center', marginLeft: 4 }}
                  >
                    Clear all
                  </span>
                </div>
              )}

              {/* Grid */}
              {filtered.length === 0 ? (
                <div className="no-results">
                  <div className="no-results-icon">🌵</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--green-dark)', marginBottom: 8 }}>No plants found</div>
                  <p style={{ marginBottom: 20 }}>Try a different search or filter.</p>
                  <button className="btn-outline" onClick={resetFilters}>Clear Filters</button>
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