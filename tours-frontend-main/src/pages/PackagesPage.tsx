import { useState, useEffect, useRef } from 'react'
import { API_URL, getImageUrl } from '../config'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, Mail, Phone, ArrowLeft, ArrowRight, Plane, Map, Coffee, Mountain, Users } from 'lucide-react'
import type { Package } from '../data'
import { inr } from '../data'
import PackageCard from '../components/PackageCard'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import switzerlandImg from '../assets/switzerland.jpg'

gsap.registerPlugin(ScrollTrigger)

const CATEGORIES = [
  { id: 'Honeymoon', label: 'Honeymoon', icon: Coffee },
  { id: 'Family',   label: 'Family',    icon: Users },
  { id: 'Luxury',   label: 'Luxury',    icon: Plane },
  { id: 'Adventure',label: 'Adventure', icon: Mountain },
  { id: 'Group',    label: 'Group',     icon: Map },
]

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading,  setLoading]  = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [searchParams] = useSearchParams()
  const q = (searchParams.get('q') || '').trim()

  useEffect(() => {
    fetch(`${API_URL}/api/packages`)
      .then(r => r.json())
      .then(data => { setPackages(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (loading || packages.length === 0) return
    const timer = setTimeout(() => {
      // Hero text stagger animation (no scroll trigger needed since it's at top)
      gsap.fromTo('.hero-text-anim',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.2 }
      )

      // Section text reveal animations on scroll
      gsap.utils.toArray<HTMLElement>('.text-reveal').forEach(el => {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } }
        )
      })

      // General reveal for cards and sections
      gsap.utils.toArray<HTMLElement>('.gsap-reveal').forEach(el => {
        gsap.fromTo(el,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } }
        )
      })
      ScrollTrigger.refresh()
    }, 150)
    return () => clearTimeout(timer)
  }, [loading, packages.length])

  const filteredPackages = q
    ? packages.filter(p => `${p.name} ${p.destination} ${p.country} ${p.region} ${p.type}`
        .toLowerCase().includes(q.toLowerCase()))
    : packages

  // A search/filter narrows straight to results — the generic "Featured
  // Journeys" hero doesn't apply once the user is looking for something specific.
  const featured = q ? [] : filteredPackages.filter(p => p.featured)
  const topFeatured = featured[0]
  const otherFeatured = featured.slice(1, 4)
  const allOther = filteredPackages

  const scrollCarousel = (dir: 'left' | 'right') => {
    if (carouselRef.current) {
      const amount = carouselRef.current.clientWidth * 0.8
      const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth
      
      let newScroll = carouselRef.current.scrollLeft + (dir === 'left' ? -amount : amount)
      
      // Infinite loop effect
      if (newScroll >= maxScroll + 10) {
        newScroll = 0
      } else if (newScroll <= -10) {
        newScroll = maxScroll
      }

      carouselRef.current.scrollTo({ left: newScroll, behavior: 'smooth' })
    }
  }

  // Auto-scroll animation
  useEffect(() => {
    if (loading || allOther.length <= 1) return;
    
    let interval: ReturnType<typeof setInterval>;
    const startAutoScroll = () => {
      interval = setInterval(() => {
        scrollCarousel('right');
      }, 3500);
    };

    startAutoScroll();

    // Pause on hover
    const carouselEl = carouselRef.current;
    if (carouselEl) {
      carouselEl.addEventListener('mouseenter', () => clearInterval(interval));
      carouselEl.addEventListener('mouseleave', startAutoScroll);
    }

    return () => {
      clearInterval(interval);
      if (carouselEl) {
        carouselEl.removeEventListener('mouseenter', () => clearInterval(interval));
        carouselEl.removeEventListener('mouseleave', startAutoScroll);
      }
    };
  }, [loading, allOther.length]);

  return (
    <div className="page-bg" style={{ minHeight: '100vh', paddingBottom: '0' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&display=swap');
        
        .page-bg { background-color: #F4EEDF; color: #16304a; font-family: 'Inter', sans-serif; overflow-x: hidden; }
        .heading-serif { font-family: 'Playfair Display', serif; font-weight: 800; font-style: italic; letter-spacing: -0.02em; }
        
        .wavy-container { max-width: 1200px; margin: 0 auto; padding: 0 clamp(1rem, 5vw, 3rem); }
        .text-navy { color: #186a76; }
        .text-red { color: #8B0000; }
        
        .hero-section { position: relative; width: 100%; height: 75vh; min-height: 550px; }
        .hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.5)); }
        
        .wave-bottom { position: absolute; bottom: -2px; left: 0; width: 100%; height: auto; z-index: 2; pointer-events: none; }
        .wave-top { position: absolute; top: -2px; left: 0; width: 100%; height: auto; z-index: 2; transform: rotate(180deg); pointer-events: none; }
        
        .btn-navy { background: #186a76; color: white; padding: 0.8rem 2rem; border-radius: 99px; text-decoration: none; font-weight: 600; font-size: 0.9rem; transition: transform 0.2s, background 0.2s; }
        .btn-navy:hover { transform: translateY(-2px); background: #124d56; }

        .btn-red { background: #D4AF37; color: white; padding: 0.8rem 2rem; border-radius: 99px; text-decoration: none; font-weight: 600; font-size: 0.9rem; transition: transform 0.2s, background 0.2s; }
        .btn-red:hover { transform: translateY(-2px); background: #b8972e; }

        .red-tag { background: #8B0000; color: white; font-size: 0.7rem; font-weight: 700; padding: 3px 12px; border-radius: 999px; display: inline-block; text-transform: uppercase; letter-spacing: 0.05em; }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .glass-btn {
          position: absolute; 
          top: 50%; 
          transform: translateY(-50%); 
          z-index: 10; 
          width: 50px; 
          height: 50px; 
          border-radius: 50%; 
          background: rgba(24, 106, 118, 0.85); 
          color: white; 
          border: 1px solid rgba(255,255,255,0.2); 
          cursor: pointer; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          box-shadow: 0 8px 32px rgba(0,0,0,0.15); 
          backdrop-filter: blur(8px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-btn:hover {
          background: rgba(24, 106, 118, 1);
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 12px 40px rgba(24, 106, 118, 0.4);
        }
        
        .featured-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem; }
        .top-featured-card { left: -20px; width: 80%; }
        
        @media (max-width: 900px) {
          .featured-grid { grid-template-columns: 1fr; gap: 4rem; }
          .top-featured-card { left: 5%; width: 90%; bottom: -30px; }
        }
      `}</style>

      <section className="hero-section">
        <img src={switzerlandImg} className="hero-img" alt="Landscape" />
        <div className="hero-overlay" />
        
        <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'white', paddingTop: '4rem' }}>
          <h1 className="heading-serif hero-text-anim" style={{ fontSize: 'clamp(4rem, 10vw, 7rem)', margin: 0, textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>Book My Dream</h1>
          <p className="hero-text-anim" style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', fontWeight: 500, marginTop: '0.5rem', marginBottom: '1.5rem', opacity: 0.9 }}>
            From the Himalayas to the backwaters, welcome to your dream journey.
          </p>
          <div className="hero-text-anim" style={{ display: 'flex', gap: '0.75rem' }}>
            {[Search, Mail, Phone].map((Icon, i) => (
              <div key={i} style={{ width: 36, height: 36, borderRadius: '50%', background: '#186a76', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform='scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}>
                <Icon size={16} color="white" />
              </div>
            ))}
          </div>
        </div>

        <svg className="wave-bottom" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,60 C320,120 420,0 720,60 C1020,120 1120,0 1440,60 L1440,120 L0,120 Z" fill="#F4EEDF" />
        </svg>
      </section>

      {!loading && topFeatured && (
        <section className="wavy-container gsap-reveal" style={{ marginTop: '8rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
            <h2 className="heading-serif text-reveal" style={{ fontSize: '3.5rem', color: '#186a76', margin: 0 }}>Featured Journeys</h2>
            <Link to="/contact" className="btn-navy text-reveal">EXPLORE ALL OFFERS</Link>
          </div>

          <div className="featured-grid">
            <div style={{ position: 'relative', marginBottom: '2rem' }}>
              <img src={getImageUrl(topFeatured.image)} alt={topFeatured.name} style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover', borderRadius: '8px' }} />
              <div className="top-featured-card" style={{ position: 'absolute', background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 20px 40px rgba(24, 106, 118, 0.1)' }}>
                <div style={{ color: '#D4AF37', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{topFeatured.discountPrice ? inr(topFeatured.discountPrice) : inr(topFeatured.price)}</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#186a76', margin: '0 0 0.5rem 0' }}>{topFeatured.name}</h3>
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {topFeatured.duration} - {topFeatured.destination}, {topFeatured.country}
                </p>
                <Link to={`/packages/${topFeatured.slug}`} style={{ color: '#186a76', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#186a76', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ArrowRight size={12}/></div>
                  View Details
                </Link>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingTop: '1rem' }}>
              {otherFeatured.map((pkg) => (
                <div key={pkg.slug} style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#D4AF37', fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>{pkg.discountPrice ? inr(pkg.discountPrice) : inr(pkg.price)}</div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#186a76', margin: '0 0 0.25rem 0' }}>{pkg.name}</h3>
                    <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {pkg.duration} - {pkg.destination}, {pkg.country}
                    </p>
                    <Link to={`/packages/${pkg.slug}`} style={{ color: '#186a76', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#186a76', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ArrowRight size={10}/></div>
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {!loading && (allOther.length > 0 || q) && (
        <section className="gsap-reveal" style={{ marginTop: q ? '6rem' : '12rem', paddingBottom: '6rem', position: 'relative', overflow: 'hidden' }}>
           <div className="wavy-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
                <div>
                  <h2 className="heading-serif text-reveal" style={{ fontSize: '3.5rem', color: '#186a76', margin: 0 }}>
                    {q ? `Results for "${q}"` : 'All Packages'}
                  </h2>
                  {q && <p style={{ color: '#666', marginTop: '0.5rem' }}>{allOther.length} package{allOther.length === 1 ? '' : 's'} found</p>}
                </div>
                {q && <Link to="/packages" className="btn-navy" style={{ textDecoration: 'none' }}>Clear Search</Link>}
              </div>

              {allOther.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 0', color: '#666' }}>
                  <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>No packages match "{q}" yet.</p>
                  <Link to="/packages" className="btn-navy" style={{ textDecoration: 'none' }}>View All Packages</Link>
                </div>
              ) : (
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                      gap: '2rem',
                      padding: '1rem 0'
                    }}
                  >
                    {allOther.map(pkg => (
                      <div
                        key={pkg.slug}
                        style={{
                          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                         <PackageCard pkg={pkg} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
           </div>
        </section>
      )}

      {/* 4. LE TERRITOIRE (Banner) */}
      <section className="gsap-reveal" style={{ position: 'relative', width: '100%', padding: '6rem 0', marginTop: '4rem', background: '#186a76' }}>
        {/* Wavy top SVG */}
        <svg className="wave-top" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,60 C320,120 420,0 720,60 C1020,120 1120,0 1440,60 L1440,120 L0,120 Z" fill="#F4EEDF" />
        </svg>

        <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop" alt="Mountains" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
        
        <div className="wavy-container" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div style={{ color: 'white' }}>
            <h2 className="heading-serif text-reveal" style={{ fontSize: '3.5rem', margin: '0 0 1.5rem 0' }}>Custom Itineraries</h2>
            <p className="text-reveal" style={{ fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem', opacity: 0.9 }}>
              Can't find exactly what you're looking for? Let our expert travel planners craft a custom itinerary tailored perfectly to your dreams, anywhere in India and beyond.
            </p>
            <Link to="/contact" className="btn-red text-reveal">PLAN YOUR TRIP</Link>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '400px', aspectRatio: '1/1', background: 'rgba(255,255,255,0.1)', borderRadius: '24px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '12px' }}>
               <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop" alt="Custom Trip Planning" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
