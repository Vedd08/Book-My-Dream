import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock, Globe, Plane, Star, ChevronLeft, ChevronRight, Compass, Sparkles } from 'lucide-react';

export interface EditorialDestination {
  slug: string;
  image: string;
  country: string;
  title: string;
  description: string;
  price: number;
  region?: 'Domestic' | 'International';
}

interface DestinationEditorialProps {
  destinations: EditorialDestination[];
}

/* -- Cursor Spotlight Effect ----------------------------------- */
const useMousePosition = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    el.addEventListener('mousemove', handler);
    return () => el.removeEventListener('mousemove', handler);
  }, []);
  return { ref, pos };
};

/* -- Animated Number Counter ----------------------------------- */
const CountUp: React.FC<{ end: string; duration?: number }> = ({ end, duration = 1200 }) => {
  const [display, setDisplay] = useState('0');
  const hasRun = useRef(false);
  const elRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasRun.current) {
        hasRun.current = true;
        const match = end.match(/^(\d+)(.*)$/);
        if (!match) { setDisplay(end); return; }
        const target = parseInt(match[1]);
        const suffix = match[2];
        const startTime = performance.now();
        const step = (now: number) => {
          const t = Math.min((now - startTime) / duration, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.floor(ease * target) + suffix);
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);
  return <span ref={elRef}>{display}</span>;
};

/* -- Single Hero Destination Panel ---------------------------- */
const HeroPanel: React.FC<{
  item: EditorialDestination;
  isActive: boolean;
  index: number;
}> = ({ item, isActive }) => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const panelRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);
  const parallaxX = (mousePos.x - 0.5) * 20;
  const parallaxY = (mousePos.y - 0.5) * 12;
  return (
    <div
      ref={panelRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'absolute', inset: 0,
        opacity: isActive ? 1 : 0,
        transition: 'opacity 0.85s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: isActive ? 'auto' : 'none',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', inset: '-5%',
        backgroundImage: `url(${item.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: `translate(${parallaxX}px, ${parallaxY}px) scale(1.1)`,
        transition: 'transform 0.1s linear',
        willChange: 'transform',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(10,10,20,0.75) 0%, rgba(10,10,20,0.3) 50%, rgba(10,10,20,0.55) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(5,5,15,0.95) 0%, rgba(5,5,15,0.1) 50%, transparent 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: item.region === 'International'
          ? 'radial-gradient(ellipse at 20% 80%, rgba(24,106,118,0.25) 0%, transparent 60%)'
          : 'radial-gradient(ellipse at 80% 20%, rgba(212,175,55,0.2) 0%, transparent 60%)',
        mixBlendMode: 'screen',
      }} />
    </div>
  );
};

/* -- Thumbnail Card -------------------------------------------- */
const ThumbCard: React.FC<{
  item: EditorialDestination;
  isActive: boolean;
  onClick: () => void;
  index: number;
}> = ({ item, isActive, onClick, index }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: '0 0 auto', width: 120, height: 80,
        position: 'relative', borderRadius: 12, overflow: 'hidden',
        border: isActive ? '2px solid rgba(212,175,55,0.9)' : '2px solid rgba(0,0,0,0.1)',
        cursor: 'pointer', background: 'none', padding: 0,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isActive ? 'scale(1.05)' : hovered ? 'scale(1.03)' : 'scale(1)',
        boxShadow: isActive ? '0 0 0 4px rgba(212,175,55,0.2), 0 8px 24px rgba(0,0,0,0.4)' : hovered ? '0 4px 16px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <img src={item.image} alt={item.title} style={{
        width: '100%', height: '100%', objectFit: 'cover',
        transition: 'transform 0.5s ease',
        transform: hovered || isActive ? 'scale(1.1)' : 'scale(1)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: isActive ? 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' : 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)',
        transition: 'background 0.4s ease',
      }} />
      <div style={{
        position: 'absolute', bottom: 6, left: 8, right: 8,
        color: '#ffffff', fontSize: '0.6rem', fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.08em',
        textShadow: '0 1px 4px rgba(0,0,0,0.6)', lineHeight: 1.2,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>
        {item.country}
      </div>
      {isActive && (
        <div style={{
          position: 'absolute', top: 6, right: 6,
          width: 6, height: 6, borderRadius: '50%',
          background: '#D4AF37', boxShadow: '0 0 6px rgba(212,175,55,0.8)',
          animation: 'pulse-dot 2s ease-in-out infinite',
        }} />
      )}
      <div style={{
        position: 'absolute', top: 6, left: 8,
        fontSize: '0.55rem', fontWeight: 800,
        color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em',
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>
    </button>
  );
};

/* -- Destination List Item ------------------------------------- */
const DestListItem: React.FC<{
  item: EditorialDestination;
  index: number;
  isActive: boolean;
  onClick: () => void;
}> = ({ item, index, isActive, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '1rem',
        padding: '0.875rem 1.5rem',
        background: isActive ? 'rgba(212,175,55,0.08)' : hovered ? 'rgba(0,0,0,0.03)' : 'transparent',
        border: 'none',
        borderLeft: isActive ? '3px solid #D4AF37' : '3px solid transparent',
        cursor: 'pointer', width: '100%', textAlign: 'left',
        transition: 'all 0.25s ease',
      }}
    >
      <div style={{
        flexShrink: 0, width: 52, height: 52, borderRadius: 10, overflow: 'hidden',
        border: isActive ? '2px solid rgba(212,175,55,0.6)' : '2px solid rgba(0,0,0,0.06)',
        transition: 'border-color 0.3s', position: 'relative',
      }}>
        <img src={item.image} alt={item.title} style={{
          width: '100%', height: '100%', objectFit: 'cover',
          transform: hovered || isActive ? 'scale(1.12)' : 'scale(1)',
          transition: 'transform 0.4s ease',
        }} />
        {isActive && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(212,175,55,0.15)' }} />
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: '0.2rem' }}>
          <span style={{ fontSize: '0.55rem', fontWeight: 800, color: isActive ? '#D4AF37' : 'rgba(0,0,0,0.3)', letterSpacing: '0.08em', transition: 'color 0.3s' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span style={{ fontSize: '0.55rem', color: 'rgba(0,0,0,0.2)', margin: '0 2px' }}>�</span>
          <span style={{ fontSize: '0.6rem', color: isActive ? 'rgba(212,175,55,0.7)' : 'rgba(0,0,0,0.25)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, transition: 'color 0.3s' }}>
            {item.region ?? 'Tour'}
          </span>
        </div>
        <p style={{ fontSize: '0.82rem', fontWeight: 700, color: isActive ? '#111827' : 'rgba(0,0,0,0.6)', margin: '0 0 0.2rem', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', transition: 'color 0.3s' }}>
          {item.title}
        </p>
        <p style={{ fontSize: '0.68rem', color: isActive ? '#D4AF37' : 'rgba(0,0,0,0.3)', margin: 0, fontWeight: 600, transition: 'color 0.3s' }}>
          from Rs.{item.price.toLocaleString()}
        </p>
      </div>
      <div style={{
        flexShrink: 0, width: 28, height: 28, borderRadius: '50%',
        border: `1px solid ${isActive ? 'rgba(212,175,55,0.5)' : 'rgba(0,0,0,0.1)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: isActive ? '#D4AF37' : 'rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        transform: (isActive || hovered) ? 'translateX(2px)' : 'translateX(0)',
      }}>
        <ArrowRight size={12} />
      </div>
    </button>
  );
};

/* -- Main Component -------------------------------------------- */
const DestinationEditorial: React.FC<DestinationEditorialProps> = ({ destinations }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<'All' | 'International' | 'Domestic'>('All');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { ref: spotlightRef, pos: spotlightPos } = useMousePosition();

  const filteredDestinations = activeFilter === 'All'
    ? destinations
    : destinations.filter(d => d.region === activeFilter);
  const items = filteredDestinations.slice(0, 6);
  const activeItem = items[activeIndex] ?? items[0];

  useEffect(() => { setActiveIndex(0); }, [activeFilter]);

  useEffect(() => {
    if (!isAutoPlaying || items.length <= 1) return;
    autoPlayRef.current = setInterval(() => {
      setActiveIndex(i => (i + 1) % items.length);
    }, 3000);
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [isAutoPlaying, items.length]);

  const goTo = (idx: number) => {
    setActiveIndex(idx);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };
  const goPrev = () => goTo((activeIndex - 1 + items.length) % items.length);
  const goNext = () => goTo((activeIndex + 1) % items.length);

  if (!destinations || destinations.length === 0) return null;

  const filters: Array<'All' | 'International' | 'Domestic'> = ['All', 'International', 'Domestic'];
  const stats = [
    { icon: MapPin, value: '150+', label: 'Destinations' },
    { icon: Clock, value: '8 Days', label: 'Avg. Duration' },
    { icon: Star, value: '98%', label: 'Satisfaction' },
    { icon: Compass, value: '500+', label: 'Itineraries' },
  ];

  return (
    <section style={{
      width: '100%', position: 'relative',
      background: '#f8f9fa', overflow: 'hidden',
      minHeight: '100svh', display: 'flex', flexDirection: 'column',
    }}>
      {/* Grid noise */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)',
        backgroundSize: '80px 80px', pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
        <div className="dest-orb dest-orb-1" />
        <div className="dest-orb dest-orb-2" />
        <div className="dest-orb dest-orb-3" />
      </div>

      {/* -- Header -- */}
      <div style={{
        position: 'relative', zIndex: 10,
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem) 0',
        display: 'flex', flexWrap: 'wrap',
        alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '5px 14px', borderRadius: 999,
              background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)',
              color: '#D4AF37', fontSize: '0.65rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.2em',
            }}>
              <Sparkles size={11} />
              Trending Destinations
            </span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 800, color: '#111827', lineHeight: 1.05, margin: 0, letterSpacing: '-0.03em',
          }}>
            Dream{' '}
            <span style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #f0d060 40%, #C9A86A 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              fontStyle: 'italic',
            }}>Destinations</span>
            <br />
            <span style={{ color: 'rgba(0,0,0,0.55)', fontWeight: 400 }}>Await You</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
          <div style={{
            display: 'flex', gap: 6, padding: 4,
            background: 'rgba(0,0,0,0.04)', borderRadius: 999,
            border: '1px solid rgba(0,0,0,0.08)',
          }}>
            {filters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} style={{
                padding: '7px 18px', borderRadius: 999, border: 'none', cursor: 'pointer',
                fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.06em',
                transition: 'all 0.3s ease',
                background: activeFilter === f ? 'linear-gradient(135deg, #D4AF37, #C9A86A)' : 'transparent',
                color: activeFilter === f ? '#ffffff' : 'rgba(0,0,0,0.5)',
                boxShadow: activeFilter === f ? '0 4px 16px rgba(212,175,55,0.35)' : 'none',
              }}>
                {f}
              </button>
            ))}
          </div>
          <Link to="/packages" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase',
            letterSpacing: '0.12em', color: 'rgba(0,0,0,0.55)',
            textDecoration: 'none', transition: 'color 0.3s', padding: '4px 0',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = '#D4AF37')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(0,0,0,0.55)')}
          >
            View All <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* -- Main Showcase -- */}
      <div style={{
        position: 'relative', zIndex: 5, flex: 1,
        display: 'grid', gridTemplateColumns: '1fr 380px',
        gap: 0, minHeight: 620,
        margin: '2rem clamp(1.5rem, 5vw, 4rem)',
        borderRadius: 24, overflow: 'hidden',
        boxShadow: '0 40px 100px rgba(0,0,0,0.1)',
      }} className="dest-showcase">

        {/* Left: Hero */}
        <div ref={spotlightRef} style={{ position: 'relative', overflow: 'hidden', cursor: 'none' }}>
          {items.map((item, i) => (
            <HeroPanel key={item.slug} item={item} isActive={i === activeIndex} index={i} />
          ))}

          {/* Cursor spotlight */}
          <div style={{
            position: 'absolute', width: 300, height: 300, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)',
            transform: `translate(${spotlightPos.x - 150}px, ${spotlightPos.y - 150}px)`,
            pointerEvents: 'none', zIndex: 20, transition: 'transform 0.05s linear',
          }} />

          {/* Info overlay */}
          {activeItem && (
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: 'clamp(1.5rem, 4vw, 3rem)', zIndex: 10,
            }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '5px 14px', borderRadius: 999,
                background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#ffffff', fontSize: '0.65rem', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem',
              }}>
                <Globe size={11} />
                {activeItem.region ?? 'Destination'}
                <span style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.25)', margin: '0 2px' }} />
                {activeItem.country}
              </div>

              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 800, color: '#ffffff', lineHeight: 1.05,
                letterSpacing: '-0.02em', margin: '0 0 1rem',
                textShadow: '0 4px 24px rgba(0,0,0,0.5)', maxWidth: 600,
              }}>
                {activeItem.title}
              </h3>

              <p style={{
                color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem',
                lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: 480,
              }}>
                {activeItem.description.slice(0, 120)}...
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                {activeItem.price > 0 && (
                  <div>
                    <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 2px' }}>Starting from</p>
                    <p style={{
                      fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 800,
                      background: 'linear-gradient(135deg, #D4AF37, #f0d060)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                      margin: 0, lineHeight: 1,
                    }}>
                      Rs.{activeItem.price.toLocaleString()}
                    </p>
                  </div>
                )}

                <Link to={`/destinations/${activeItem.slug}`} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '0.75rem 1.75rem', borderRadius: 999,
                  background: 'linear-gradient(135deg, #D4AF37 0%, #C9A86A 100%)',
                  color: '#06080f', fontWeight: 700, fontSize: '0.85rem',
                  textDecoration: 'none', letterSpacing: '0.04em',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 32px rgba(212,175,55,0.45)',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(212,175,55,0.6)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(212,175,55,0.45)'; }}
                >
                  Explore Destination <ArrowRight size={16} />
                </Link>

                <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
                  {[{ fn: goPrev, Icon: ChevronLeft }, { fn: goNext, Icon: ChevronRight }].map(({ fn, Icon }, bi) => (
                    <button key={bi} onClick={fn} style={{
                      width: 44, height: 44, borderRadius: '50%',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)',
                      color: '#ffffff', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.3s ease',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.2)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                    >
                      <Icon size={18} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Progress bar */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, zIndex: 20, background: 'rgba(0,0,0,0.1)' }}>
            <div className="dest-progress-bar" key={`pb-${activeIndex}`} style={{
              height: '100%',
              background: 'linear-gradient(90deg, #D4AF37, #f0d060)',
              animationDuration: isAutoPlaying ? '3s' : '0s',
            }} />
          </div>
        </div>

        {/* Right: Side panel */}
        <div style={{
          background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(24px)',
          borderLeft: '1px solid rgba(0,0,0,0.06)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          <div style={{ padding: '1.5rem 1.5rem 1rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.4rem' }}>
              <Plane size={14} style={{ color: '#D4AF37' }} />
              <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D4AF37' }}>
                Select Destination
              </span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'rgba(0,0,0,0.35)', margin: 0 }}>
              {items.length} curated {activeFilter === 'All' ? '' : activeFilter.toLowerCase()} journeys
            </p>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 0', scrollbarWidth: 'thin', scrollbarColor: 'rgba(212,175,55,0.2) transparent' }}>
            {items.map((item, i) => (
              <DestListItem key={item.slug} item={item} index={i} isActive={i === activeIndex} onClick={() => goTo(i)} />
            ))}
          </div>

          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '0.6rem 0.75rem', borderRadius: 10,
                background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.1)',
              }}>
                <Icon size={14} style={{ color: '#D4AF37', flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.85rem', fontWeight: 800, color: '#111827', margin: 0, lineHeight: 1 }}>
                    <CountUp end={value} />
                  </p>
                  <p style={{ fontSize: '0.55rem', color: 'rgba(0,0,0,0.35)', margin: '2px 0 0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* -- Thumbnail strip + dots -- */}
      <div style={{ position: 'relative', zIndex: 10, padding: '0 clamp(1.5rem, 5vw, 4rem) clamp(2rem, 4vw, 3.5rem)' }}>
        <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.25rem', scrollbarWidth: 'none' }}>
          {items.map((item, i) => (
            <ThumbCard key={item.slug} item={item} index={i} isActive={i === activeIndex} onClick={() => goTo(i)} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: '1.25rem' }}>
          {items.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              width: i === activeIndex ? 24 : 6, height: 6,
              borderRadius: 999, border: 'none', cursor: 'pointer',
              background: i === activeIndex ? 'linear-gradient(90deg, #D4AF37, #f0d060)' : 'rgba(0,0,0,0.2)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', padding: 0,
              boxShadow: i === activeIndex ? '0 0 8px rgba(212,175,55,0.6)' : 'none',
            }} />
          ))}
        </div>
      </div>

      <style>{`
        .dest-orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; will-change: transform, opacity; }
        .dest-orb-1 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%); top: -100px; left: -100px; animation: dest-orb-float-1 18s ease-in-out infinite; }
        .dest-orb-2 { width: 600px; height: 600px; background: radial-gradient(circle, rgba(24,106,118,0.07) 0%, transparent 70%); bottom: -150px; right: -150px; animation: dest-orb-float-2 22s ease-in-out infinite; }
        .dest-orb-3 { width: 300px; height: 300px; background: radial-gradient(circle, rgba(139,0,0,0.05) 0%, transparent 70%); top: 50%; left: 50%; transform: translate(-50%,-50%); animation: dest-orb-float-3 15s ease-in-out infinite; }
        @keyframes dest-orb-float-1 { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(80px,60px) scale(1.1); } 66% { transform: translate(20px,120px) scale(0.95); } }
        @keyframes dest-orb-float-2 { 0%,100% { transform: translate(0,0) scale(1); } 40% { transform: translate(-60px,-80px) scale(1.05); } 70% { transform: translate(-120px,-20px) scale(0.9); } }
        @keyframes dest-orb-float-3 { 0%,100% { transform: translate(-50%,-50%) scale(1); opacity: 0.6; } 50% { transform: translate(-50%,-50%) scale(1.3); opacity: 0.3; } }
        .dest-progress-bar { width: 0%; animation: dest-progress-fill linear forwards; }
        @keyframes dest-progress-fill { from { width: 0%; } to { width: 100%; } }
        @keyframes pulse-dot { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.5); } }
        @media (max-width: 900px) {
          .dest-showcase { grid-template-columns: 1fr !important; min-height: 500px !important; }
          .dest-showcase > div:nth-child(2) { display: none !important; }
        }
        @media (max-width: 600px) {
          .dest-showcase { margin: 1rem !important; min-height: 420px !important; }
        }
      `}</style>
    </section>
  );
};

export default DestinationEditorial;
