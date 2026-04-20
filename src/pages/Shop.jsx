import { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../data/constants';

export default function Shop() {
  const [activeCat, setActiveCat] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('popular');
  const [priceMax, setPriceMax] = useState(3000);
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
    if (sort === 'popular') list = [...list].sort((a, b) => b.reviews - a.reviews);
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === 'price-lo') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-hi') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'discount') list = [...list].sort((a, b) => (b.mrp - b.price) / b.mrp - (a.mrp - a.price) / a.mrp);
    return list;
  }, [activeCat, search, sort, priceMax]);

  const hasFilters = activeCat !== 'all' || priceMax < 3000;

  const resetFilters = () => {
    setActiveCat('all');
    setPriceMax(3000);
    setSearch('');
  };

  /* ─────────────────────────────────────────
     FILTER CONTENT — used in both sidebar
     and mobile drawer
  ───────────────────────────────────────── */
  const FilterContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* Category */}
      <div>
        <div style={{
          fontSize: '.7rem', fontWeight: 700, letterSpacing: 1.5,
          textTransform: 'uppercase', color: 'var(--text-light)',
          marginBottom: 12,
        }}>
          Category
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {CATEGORIES.map(cat => {
            const isActive = activeCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '.88rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--green)' : 'var(--text-muted)',
                  background: isActive ? 'var(--green-pale)' : 'transparent',
                  textAlign: 'left',
                  transition: 'var(--transition)',
                  width: '100%',
                  top: '0px',
                }}
              >
                <span style={{ fontSize: '1rem', width: 22, textAlign: 'center' }}>{cat.emoji}</span>
                <span style={{ flex: 1 }}>{cat.label}</span>
                {isActive && (
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: 'var(--green)', flexShrink: 0,
                  }} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--border)' }} />

      {/* Price Range */}
      <div>
        <div style={{
          fontSize: '.7rem', fontWeight: 700, letterSpacing: 1.5,
          textTransform: 'uppercase', color: 'var(--text-light)',
          marginBottom: 14,
        }}>
          Price Range
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: 12,
        }}>
          <span style={{
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--green-pale)',
            color: 'var(--green)',
            fontSize: '.8rem', fontWeight: 700,
          }}>₹100</span>
          <span style={{ fontSize: '.75rem', color: 'var(--text-muted)' }}>to</span>
          <span style={{
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--green)',
            color: '#fff',
            fontSize: '.8rem', fontWeight: 700,
          }}>₹{priceMax}</span>
        </div>
        <input
          type="range" min={100} max={3000} step={50}
          value={priceMax}
          onChange={e => setPriceMax(+e.target.value)}
          style={{ width: '100%', accentColor: 'var(--green)', cursor: 'pointer' }}
        />
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontSize: '.7rem', color: 'var(--text-light)', marginTop: 6,
        }}>
          <span>Budget</span><span>Premium</span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--border)' }} />

      {/* Reset */}
      {hasFilters && (
        <button
          onClick={resetFilters}
          style={{
            width: '100%', padding: '10px',
            borderRadius: 'var(--radius-full)',
            border: '1.5px solid #fecaca',
            background: '#fff5f5',
            color: 'var(--red)',
            fontSize: '.84rem', fontWeight: 700,
            cursor: 'pointer',
            transition: 'var(--transition)',
          }}
        >
          ✕ Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="page-enter">

      {/* ─── STYLES ─── */}
      <style>{`
        .shop-layout { display: flex; gap: 28px; align-items: flex-start; }

        /* Desktop sidebar */
        .shop-sidebar {
          width: 230px;
          flex-shrink: 0;
          position: sticky;
          top: 88px;
        }

        /* Mobile: hide sidebar, show filter btn */
        .shop-mob-filterbar { display: none; }
        @media (max-width: 800px) {
          .shop-layout    { display: block; }
          .shop-sidebar   { display: none; }
          .shop-mob-filterbar { display: flex; }
        }

        /* Mobile filter bottom sheet */
        .shop-filter-sheet {
          position: fixed;
         top: -461; left: 0; right: 0;
          background: var(--surface);
          border-radius: 24px 24px 0 0;
          z-index: 1999;
          padding: 0 20px 40px;
          max-height: 88vh;
          overflow-y: auto;
          box-shadow: 0 -12px 60px rgba(0,0,0,0.2);
          transition: transform .38s cubic-bezier(.4,0,.2,1);
          transform: translateY(100%);
        }
        .shop-filter-sheet.open {
          transform: translateY(0);
        }
        .shop-filter-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.45);
          z-index: 1998;
          opacity: 0; pointer-events: none;
          transition: opacity .35s ease;
        }
        .shop-filter-overlay.open {
          opacity: 1; pointer-events: auto;
        }
      `}</style>

      {/* ─── MOBILE OVERLAY ─── */}
      <div
        className={`shop-filter-overlay${filterOpen ? ' open' : ''}`}
        onClick={() => setFilterOpen(false)}
      />

      {/* ─── MOBILE FILTER BOTTOM SHEET ─── */}
      <div className={`shop-filter-sheet${filterOpen ? ' open' : ''}`}>
        {/* Handle bar */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0 8px' }}>
          <div style={{ width: 44, height: 4, borderRadius: 99, background: 'var(--border)' }} />
        </div>
        {/* Sheet header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingBottom: 18,
          borderBottom: '1px solid var(--border)',
          marginBottom: 24,
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--green-dark)' }}>
              Filter Plants
            </div>
            <div style={{ fontSize: '.75rem', color: 'var(--text-muted)', marginTop: 2 }}>
              {filtered.length} result{filtered.length !== 1 ? 's' : ''} found
            </div>
          </div>
          <button
            onClick={() => setFilterOpen(false)}
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'var(--surface2)',
              border: '1px solid var(--border)',
              cursor: 'pointer', fontSize: '1rem',
              color: 'var(--text-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >✕</button>
        </div>

        <FilterContent />

        {/* Apply CTA */}
        <button
          className="btn-primary"
          style={{
            width: '100%', justifyContent: 'center',
            marginTop: 24, padding: '14px', fontSize: '1rem',
          }}
          onClick={() => setFilterOpen(false)}
        >
          Show {filtered.length} Plant{filtered.length !== 1 ? 's' : ''} →
        </button>
      </div>

      {/* ─── PAGE HEADER ─── */}
      <div className="page-header">
        <div className="page-header-inner">
          <h1 className="page-header-title">🌿 Our Plant Collection</h1>
          <p className="page-header-sub">
            Fresh from the nursery — {PRODUCTS.length} varieties available
          </p>
        </div>
      </div>

      <section className="section">
        <div className="section-inner">
          <div className="shop-layout">

            {/* ─── DESKTOP SIDEBAR ─── */}
            <aside className="shop-sidebar">
              <div style={{
                background: 'var(--surface)',
                border: '1.5px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '22px 18px',
              }}>
                {/* Sidebar title */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  marginBottom: 22,
                  paddingBottom: 14,
                  borderBottom: '1px solid var(--border)',
                }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--green-dark)' }}>
                    Filters
                  </span>
                  {hasFilters && (
                    <span
                      onClick={resetFilters}
                      style={{ fontSize: '.72rem', color: 'var(--red)', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Clear all
                    </span>
                  )}
                </div>
                <FilterContent />
              </div>
            </aside>

            {/* ─── MAIN CONTENT ─── */}
            <div style={{ flex: 1, minWidth: 0 }}>

              {/* ── MOBILE FILTER BAR ── */}
              <div className="shop-mob-filterbar" style={{
                gap: 10, marginBottom: 16,
                alignItems: 'center', flexWrap: 'wrap',
              }}>
                {/* Filter button */}
                <button
                  onClick={() => setFilterOpen(true)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 7,
                    padding: '10px 18px',
                    borderRadius: 'var(--radius-full)',
                    border: `2px solid ${hasFilters ? 'var(--green)' : 'var(--border)'}`,
                    background: hasFilters ? 'var(--green)' : 'var(--surface)',
                    color: hasFilters ? '#fff' : 'var(--text-muted)',
                    fontWeight: 700, fontSize: '.85rem', cursor: 'pointer',
                    flexShrink: 0,
                    transition: 'var(--transition)',
                  }}
                >
                  <span>⚙️</span>
                  <span>Filters</span>
                  {hasFilters && (
                    <span style={{
                      background: 'rgba(255,255,255,.25)',
                      borderRadius: 99,
                      padding: '1px 7px',
                      fontSize: '.68rem',
                    }}>ON</span>
                  )}
                </button>

                {/* Sort — full width on mobile */}
                <select
                  className="form-input"
                  style={{ flex: 1, cursor: 'pointer', minWidth: 140 }}
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Top Rated</option>
                  <option value="price-lo">Price: Low → High</option>
                  <option value="price-hi">Price: High → Low</option>
                  <option value="discount">Best Discount</option>
                </select>
              </div>

              {/* ── DESKTOP SEARCH + SORT BAR ── */}
              <div style={{
                display: 'flex', gap: 12, marginBottom: 16,
                alignItems: 'center', flexWrap: 'wrap',
              }}
                className="shop-desktop-bar"
              >
                <style>{`
                  @media (max-width: 800px) { .shop-desktop-bar { display: none !important; } }
                `}</style>

                {/* Search */}
                <div style={{ flex: 1, position: 'relative', minWidth: 180 }}>
                  <span style={{
                    position: 'absolute', left: 13, top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-light)', pointerEvents: 'none',
                  }}>🔍</span>
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
                  style={{ width: 'auto', cursor: 'pointer' }}
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Top Rated</option>
                  <option value="price-lo">Price: Low → High</option>
                  <option value="price-hi">Price: High → Low</option>
                  <option value="discount">Best Discount</option>
                </select>

                <span style={{ fontSize: '.82rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                  {filtered.length} plants
                </span>
              </div>

              {/* ── MOBILE SEARCH ── */}
              <div style={{ marginBottom: 14 }} className="shop-mob-search">
                <style>{`
                  .shop-mob-search { display: none; }
                  @media (max-width: 800px) { .shop-mob-search { display: block; } }
                `}</style>
                <div style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute', left: 13, top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-light)', pointerEvents: 'none',
                  }}>🔍</span>
                  <input
                    className="form-input"
                    style={{ paddingLeft: 38, borderRadius: 'var(--radius-full)', width: '100%' }}
                    placeholder="Search plants..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* ── ACTIVE FILTER CHIPS ── */}
              {hasFilters && (
                <div style={{
                  display: 'flex', gap: 8, flexWrap: 'wrap',
                  marginBottom: 16, alignItems: 'center',
                }}>
                  {activeCat !== 'all' && (
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      padding: '5px 13px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--green-pale)',
                      border: '1px solid var(--green-mid)',
                      color: 'var(--green)',
                      fontSize: '.75rem', fontWeight: 700,
                    }}>
                      {CATEGORIES.find(c => c.id === activeCat)?.emoji}{' '}
                      {CATEGORIES.find(c => c.id === activeCat)?.label}
                      <span
                        onClick={() => setActiveCat('all')}
                        style={{ cursor: 'pointer', marginLeft: 3, opacity: .7 }}
                      >✕</span>
                    </span>
                  )}
                  {priceMax < 3000 && (
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      padding: '5px 13px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--green-pale)',
                      border: '1px solid var(--green-mid)',
                      color: 'var(--green)',
                      fontSize: '.75rem', fontWeight: 700,
                    }}>
                      Max ₹{priceMax}
                      <span
                        onClick={() => setPriceMax(3000)}
                        style={{ cursor: 'pointer', marginLeft: 3, opacity: .7 }}
                      >✕</span>
                    </span>
                  )}
                  <span
                    onClick={resetFilters}
                    style={{
                      fontSize: '.73rem', color: 'var(--red)',
                      fontWeight: 700, cursor: 'pointer',
                    }}
                  >
                    Clear all
                  </span>
                </div>
              )}

              {/* ── RESULTS COUNT (mobile) ── */}
              <div style={{ marginBottom: 16 }} className="shop-mob-count">
                <style>{`
                  .shop-mob-count { display: none; }
                  @media (max-width: 800px) { .shop-mob-count { display: block; } }
                `}</style>
                <span style={{ fontSize: '.82rem', color: 'var(--text-muted)' }}>
                  {filtered.length} plant{filtered.length !== 1 ? 's' : ''} found
                </span>
              </div>

              {/* ── PRODUCT GRID ── */}
              {filtered.length === 0 ? (
                <div className="no-results">
                  <div className="no-results-icon">🌵</div>
                  <div style={{
                    fontFamily: 'var(--font-serif)', fontSize: '1.3rem',
                    color: 'var(--green-dark)', marginBottom: 8,
                  }}>
                    No plants found
                  </div>
                  <p style={{ marginBottom: 20 }}>Try a different search or adjust your filters.</p>
                  <button className="btn-outline" onClick={resetFilters}>
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="product-grid">
                  {filtered.map((p, i) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      style={{ animationDelay: `${i * 50}ms` }}
                    />
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