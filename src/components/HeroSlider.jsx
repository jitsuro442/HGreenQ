import { useState, useEffect, useRef, useCallback } from 'react';
import { HERO_SLIDES } from '../data/constants';
import { useApp } from '../context/AppContext';

export default function HeroSlider() {
  const { navigate } = useApp();
  const [cur, setCur] = useState(0);
  const [exit, setExit] = useState(null);
  const timer = useRef();

  const go = useCallback(idx => {
    setExit(cur);
    setCur(idx);
    setTimeout(() => setExit(null), 800);
  }, [cur]);

  useEffect(() => {
    timer.current = setInterval(() => {
      setCur(prev => {
        const next = (prev + 1) % HERO_SLIDES.length;
        setExit(prev);
        setTimeout(() => setExit(null), 800);
        return next;
      });
    }, 5500);
    return () => clearInterval(timer.current);
  }, []);

  const prev = () => { clearInterval(timer.current); go((cur - 1 + HERO_SLIDES.length) % HERO_SLIDES.length); };
  const next = () => { clearInterval(timer.current); go((cur + 1) % HERO_SLIDES.length); };

  return (
    <section className="hero">
      {HERO_SLIDES.map((slide, i) => {
        const cls = ['hero-slide', i === cur ? 'active' : '', i === exit ? 'exit' : ''].filter(Boolean).join(' ');
        return (
          <div key={slide.id} className={cls} style={{ background: slide.bg }}>
            <div className="hero-slide-inner">
              <div>
                <div className="hero-tag" style={{ color: slide.accent }}>{slide.tag}</div>
                <h1 className="hero-h1">{slide.title}</h1>
                <p className="hero-sub">{slide.subtitle}</p>
                <div className="hero-ctas">
                  <button className="btn-primary" onClick={() => navigate('shop')}>{slide.cta} →</button>
                  <button className="btn-outline" onClick={() => navigate('about')}>Learn More</button>
                </div>
              </div>
              <div className="hero-img-wrap">
                <div className="hero-img-ring">
                  <img src={slide.img} alt={slide.title} />
                </div>
              </div>
            </div>
            {slide.offer && (
              <div className="hero-offer-badge">
                <span style={{ fontSize: '1rem', fontWeight: 900 }}>{slide.offer.split(' ')[0]}</span>
                {slide.offer.split(' ').slice(1).join(' ')}
              </div>
            )}
          </div>
        );
      })}
      <button className="hero-arrow prev" onClick={prev}>←</button>
      <button className="hero-arrow next" onClick={next}>→</button>
      <div className="hero-dots">
        {HERO_SLIDES.map((_, i) => (
          <div key={i} className={`hero-dot${cur === i ? ' active' : ''}`} onClick={() => { clearInterval(timer.current); go(i); }} />
        ))}
      </div>
    </section>
  );
}
