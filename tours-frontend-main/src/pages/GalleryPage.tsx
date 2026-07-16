import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Compass, X, Image as ImageIcon, ExternalLink, Grid } from 'lucide-react'
import { API_URL } from '../config'

type GallerySlide = {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  cardSubtitle: string
  cardTitle: string
}

type GalleryImage = {
  id: string
  src: string
  title: string
  category: string
}

import img1 from '../assets/image1.jpg'
import img2 from '../assets/image2.jpg'
import img3 from '../assets/image3.jpg'
import img4 from '../assets/image4.jpg'
import img5 from '../assets/image5.jpg'

const fallbackSlides: GallerySlide[] = [
  {
    id: '1',
    title: 'Bali',
    subtitle: 'TROPICAL PARADISE',
    description: 'Discover the pristine beaches and cultural heritage of Bali. A perfect getaway for nature lovers.',
    image: img1,
    cardSubtitle: 'INDONESIA',
    cardTitle: 'Bali Experience'
  },
  {
    id: '2',
    title: 'Switzerland',
    subtitle: 'ALPINE WONDER',
    description: 'Experience the majestic Swiss Alps in all their glory. Snow-capped peaks await you.',
    image: img4,
    cardSubtitle: 'EUROPE',
    cardTitle: 'Swiss Alps'
  },
  {
    id: '3',
    title: 'Dubai',
    subtitle: 'MODERN LUXURY',
    description: 'Explore the futuristic skyline, luxury shopping, and golden deserts of Dubai.',
    image: img3,
    cardSubtitle: 'UAE',
    cardTitle: 'Dubai City'
  }
];

const fallbackImages: GalleryImage[] = [
  { id: 'g1', src: img1, title: 'Bali Coast', category: 'Bali' },
  { id: 'g2', src: img2, title: 'Tropical Resort', category: 'Bali' },
  { id: 'g3', src: img3, title: 'Dubai Downtown', category: 'Dubai' },
  { id: 'g4', src: img4, title: 'Swiss Alps', category: 'Switzerland' },
  { id: 'g5', src: img5, title: 'Mountain Lake', category: 'Switzerland' },
];

export default function GalleryPage() {
  const [slides, setSlides] = useState<GallerySlide[]>([])
  const [allGalleryImages, setAllGalleryImages] = useState<GalleryImage[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  // Filter state for the full grid
  const [activeCategory, setActiveCategory] = useState<string>('All')

  // Lightbox state
  const [activeDestination, setActiveDestination] = useState<string | null>(null)
  const [lightboxImg, setLightboxImg] = useState<GalleryImage | null>(null)
  
  // Fetch data
  useEffect(() => {
    fetch(`${API_URL}/api/gallery-slides`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setSlides(data)
        } else {
          setSlides(fallbackSlides)
        }
      })
      .catch(() => setSlides(fallbackSlides))

    fetch(`${API_URL}/api/gallery`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setAllGalleryImages(data)
        } else {
          setAllGalleryImages(fallbackImages)
        }
      })
      .catch(err => {
        console.error('Failed to load gallery images', err)
        setAllGalleryImages(fallbackImages)
      })
  }, [])

  const changeSlide = (newIndex: number) => {
    if (isTransitioning || newIndex === currentSlide || slides.length === 0) return;
    setIsTransitioning(true);
    setCurrentSlide(newIndex);
    setTimeout(() => setIsTransitioning(false), 1200);
  }

  const nextSlide = () => changeSlide((currentSlide + 1) % slides.length)
  const prevSlide = () => changeSlide((currentSlide - 1 + slides.length) % slides.length)

  // Auto-play carousel
  useEffect(() => {
    if (slides.length <= 1 || activeDestination !== null) return;
    const timer = setInterval(() => { nextSlide() }, 7000)
    return () => clearInterval(timer)
  }, [currentSlide, isTransitioning, slides.length, activeDestination])



  if (slides.length === 0) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#050505', color: '#fff', gap: '1rem' }}>
        <div style={{ width: 48, height: 48, border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#D4AF37', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem' }}>Loading destinations...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  const activeDestinationImages = activeDestination 
    ? allGalleryImages.filter(img => img.category.toLowerCase().includes(activeDestination.toLowerCase()))
    : []

  const categories = ['All', ...new Set(allGalleryImages.map(img => img.category).filter(Boolean))]
  const filteredGridImages = activeCategory === 'All' 
    ? allGalleryImages 
    : allGalleryImages.filter(img => img.category === activeCategory)

  return (
    <main className="premium-gallery" style={{ position: 'relative', width: '100%', minHeight: '100dvh', backgroundColor: '#050505', color: '#fff', fontFamily: 'var(--font-sans)', overflowX: 'hidden' }}>
      
      {/* --- HERO SLIDER SECTION (100vh) --- */}
      <div className="hero-section" style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
        
        {/* 1. Cinematic Background Layer */}
        <div className="bg-slider-container">
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div key={slide.id} className={`bg-slide ${isActive ? 'active' : ''}`}>
                <img src={slide.image} alt={slide.title} className="bg-image" />
                <div className="bg-overlay gradient-left" />
                <div className="bg-overlay gradient-bottom" />
                <div className="bg-overlay noise-texture" />
              </div>
            )
          })}
        </div>

        {/* 2. Main Content Interface */}
        <div className="ui-layer" style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', pointerEvents: 'none' }}>
          
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 clamp(1.25rem, 6vw, 8rem)', paddingTop: '5rem', pointerEvents: 'auto', overflow: 'hidden' }}>
            <div className="content-wrapper" style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="text-section" style={{ maxWidth: 'min(650px, 90vw)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                <div className="reveal-overflow">
                  <div key={`sub-${currentSlide}`} className="reveal-text subtitle-row" style={{ display: 'flex', alignItems: 'center', gap: '1rem', animationDelay: '0.1s' }}>
                    <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--accent)', flexShrink: 0 }} />
                    <span style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--accent)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {slides[currentSlide].subtitle}
                    </span>
                  </div>
                </div>
                
                <div className="reveal-overflow">
                  <h1 key={`title-${currentSlide}`} className="reveal-text giant-title" style={{ animationDelay: '0.2s' }}>
                    {slides[currentSlide].title}
                  </h1>
                </div>
                
                <div className="reveal-overflow">
                  <p key={`desc-${currentSlide}`} className="reveal-text description" style={{ animationDelay: '0.3s' }}>
                    {slides[currentSlide].description}
                  </p>
                </div>
                
                <div className="reveal-overflow">
                  <div key={`btn-${currentSlide}`} className="reveal-text action-row" style={{ animationDelay: '0.4s' }}>
                    <button className="premium-btn primary" onClick={() => setActiveDestination(slides[currentSlide].title)}>
                      <span>EXPLORE DESTINATION</span>
                    </button>
                    <button className="premium-btn secondary icon-only" onClick={() => setActiveDestination(slides[currentSlide].title)}>
                      <Compass size={20} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Bottom Section: Navigation & Cards */}
          <div className="bottom-section" style={{ padding: '0 clamp(1.25rem, 6vw, 8rem) clamp(1.5rem, 4vh, 3rem)', pointerEvents: 'auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexShrink: 0 }}>
            
            <div className="nav-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%', maxWidth: '300px', paddingRight: '2rem', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <span style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 200, lineHeight: 1, fontFamily: 'var(--font-serif)' }}>0{currentSlide + 1}</span>
                <span style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.4)' }}>/ 0{slides.length}</span>
              </div>
              <div className="progress-track" style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.15)', position: 'relative' }}>
                <div className="progress-fill" style={{ position: 'absolute', top: '-0.5px', left: 0, height: '2px', backgroundColor: '#fff', width: `${((currentSlide + 1) / slides.length) * 100}%`, transition: 'width 0.8s cubic-bezier(0.85, 0, 0.15, 1)' }} />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
                <button className="nav-arrow" onClick={prevSlide} disabled={isTransitioning}>
                  <ChevronLeft size={22} strokeWidth={1} />
                </button>
                <button className="nav-arrow" onClick={nextSlide} disabled={isTransitioning}>
                  <ChevronRight size={22} strokeWidth={1} />
                </button>
              </div>
            </div>

            <div className="slider-container" style={{ position: 'relative', overflow: 'visible', flex: 1, minWidth: 0, '--current-slide': currentSlide, '--card-width': 'clamp(140px, 14vw, 220px)' } as React.CSSProperties}>
              <div className="slider-track" style={{ display: 'flex', gap: '1.5rem', transition: 'transform 1.2s cubic-bezier(0.85, 0, 0.15, 1)', transform: 'translateX(calc(-1 * var(--current-slide) * (var(--card-width) + 1.5rem)))' }}>
                {slides.map((slide, index) => {
                  const isActive = index === currentSlide;
                  const isPast = index < currentSlide;
                  return (
                    <div key={slide.id} onClick={() => changeSlide(index)} className={`slide-card ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`} style={{ flexShrink: 0 }}>
                        <div className="card-image-wrapper">
                          <img src={slide.image} alt={slide.title} className="card-image" />
                          <div className="card-overlay" />
                        </div>
                        <div className="card-content">
                          <span className="card-subtitle">{slide.cardSubtitle}</span>
                          <h3 className="card-title">{slide.cardTitle}</h3>
                        </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

      </div> 
      {/* END HERO SECTION */}

      {/* --- COMPLETE GALLERY SECTION (Scrollable Grid) --- */}
      <section className="complete-gallery-section" style={{ padding: '6rem clamp(1.25rem, 6vw, 8rem)', background: '#050505', position: 'relative', zIndex: 5 }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--accent)' }} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--accent)' }}>
              Our Collection
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Complete <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>Gallery</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 600, fontSize: '1.1rem', marginTop: '0.5rem' }}>
            Explore every beautiful moment captured across all our destinations and travel experiences.
          </p>
        </div>

        {categories.length > 1 && (
          <div className="category-filters" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {filteredGridImages.length > 0 ? (
          <div className="masonry-grid">
            {filteredGridImages.map(img => (
              <div key={img.id} className="masonry-item lightbox-trigger" onClick={() => setLightboxImg(img)}>
                <img src={img.src} alt={img.title} loading="lazy" />
                <div className="masonry-overlay">
                  <div className="masonry-info">
                    <span className="masonry-category">{img.category}</span>
                    <h4 className="masonry-title">{img.title || 'Travel Moment'}</h4>
                  </div>
                  <div className="masonry-icon">
                    <Grid size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6rem 1rem', color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px dashed rgba(255,255,255,0.1)' }}>
            <ImageIcon size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
            <p>No photos found in this category.</p>
          </div>
        )}
      </section>

      {/* 3. Destination Lightbox Overlay (from Hero Slider) */}
      <div className={`destination-lightbox ${activeDestination ? 'open' : ''}`}>
        {activeDestination && (
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'clamp(1rem, 3vw, 2rem) clamp(1.25rem, 5vw, 4rem)', borderBottom: '1px solid rgba(255,255,255,0.1)', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ minWidth: 0 }}>
                <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', textTransform: 'uppercase', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {activeDestination} <span style={{ fontWeight: 300, color: 'var(--accent)' }}>Gallery</span>
                </h2>
                <p style={{ margin: '0.4rem 0 0 0', color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
                  {activeDestinationImages.length} photos found
                </p>
              </div>
              <button className="close-lightbox" onClick={() => setActiveDestination(null)} aria-label="Close">
                <X size={28} />
              </button>
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto', padding: 'clamp(1.25rem, 4vw, 3rem) clamp(1.25rem, 5vw, 4rem)' }}>
              {activeDestinationImages.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: 'clamp(1rem, 2vw, 2rem)' }}>
                  {activeDestinationImages.map(img => (
                    <div key={img.id} className="lightbox-img-card" onClick={() => setLightboxImg(img)}>
                      <img src={img.src} alt={img.title} loading="lazy" />
                      <div className="img-info">
                        <h4>{img.title || 'Beautiful View'}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'rgba(255,255,255,0.5)', gap: '1rem', padding: '4rem 1rem', textAlign: 'center' }}>
                  <ImageIcon size={56} style={{ opacity: 0.3 }} />
                  <p style={{ fontSize: '1.15rem', margin: 0 }}>No images yet for this destination.</p>
                  <p style={{ fontSize: '0.88rem', margin: 0, maxWidth: 360 }}>Add photos in the Admin Panel under <strong>Gallery Grid</strong> with category <em>"{activeDestination}"</em>.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Full image viewer (used by both Destination Lightbox & Complete Grid) */}
      {lightboxImg && (
        <div onClick={() => setLightboxImg(null)} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out', padding: '2rem' }}>
          <button onClick={() => setLightboxImg(null)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <X size={22} />
          </button>
          <img src={lightboxImg.src} alt={lightboxImg.title} style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain', borderRadius: 8, boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }} onClick={e => e.stopPropagation()} />
          {lightboxImg.title && (
            <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', background: 'rgba(0,0,0,0.5)', padding: '0.5rem 1.25rem', borderRadius: 6, backdropFilter: 'blur(6px)', whiteSpace: 'nowrap' }}>
              {lightboxImg.title}
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }

        /* --- Background Engine --- */
        .bg-slider-container { position: absolute; inset: 0; width: 100%; height: 100%; }
        .bg-slide { position: absolute; inset: 0; opacity: 0; visibility: hidden; transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), visibility 1.2s; }
        .bg-slide.active { opacity: 1; visibility: visible; z-index: 1; }
        .bg-image { width: 100%; height: 100%; object-fit: cover; transform: scale(1.08); transition: transform 8s cubic-bezier(0.25, 1, 0.5, 1); transform-origin: center center; }
        .bg-slide.active .bg-image { transform: scale(1); }
        .bg-overlay { position: absolute; inset: 0; pointer-events: none; }
        .gradient-left { background: linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 55%, transparent 100%); }
        .gradient-bottom { background: linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0) 55%); }
        .noise-texture { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); opacity: 0.04; mix-blend-mode: overlay; }

        /* --- Typography & Text Reveals --- */
        .reveal-overflow { overflow: hidden; padding-bottom: 4px; }
        @keyframes textReveal { 0% { transform: translateY(110%); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        .reveal-text { animation: textReveal 0.9s cubic-bezier(0.85, 0, 0.15, 1) both; will-change: transform, opacity; }
        .giant-title {
          font-family: var(--font-sans);
          font-size: clamp(3rem, 9vw, 8rem);
          font-weight: 800;
          line-height: 0.92;
          letter-spacing: -0.02em;
          margin: 0;
          text-shadow: 0 10px 30px rgba(0,0,0,0.5);
          background: linear-gradient(to bottom, #ffffff 30%, #9a9a9a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          word-break: break-word;
          overflow-wrap: break-word;
        }
        .description { font-size: clamp(0.88rem, 1.2vw, 1.1rem); line-height: 1.7; color: rgba(255,255,255,0.72); max-width: 480px; margin: 0; font-weight: 300; }
        .action-row { display: flex; gap: 0.875rem; flex-wrap: wrap; }

        /* --- Premium Buttons --- */
        .premium-btn { display: flex; align-items: center; justify-content: center; height: 50px; border-radius: 100px; border: none; font-family: var(--font-sans); font-size: 0.82rem; font-weight: 600; letter-spacing: 0.15em; cursor: pointer; transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1); overflow: hidden; position: relative; pointer-events: auto; }
        .premium-btn.primary { background: #fff; color: #000; padding: 0 2rem; }
        .premium-btn.primary::before { content: ''; position: absolute; inset: 0; background: var(--accent); transform: translateY(100%); transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1); z-index: 1; }
        .premium-btn.primary span { position: relative; z-index: 2; transition: color 0.4s; }
        .premium-btn.primary:hover::before { transform: translateY(0); }
        .premium-btn.primary:hover span { color: #fff; }
        .premium-btn.secondary { width: 50px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.2); color: #fff; backdrop-filter: blur(10px); }
        .premium-btn.secondary:hover { background: #fff; color: #000; transform: rotate(15deg); }

        /* --- Navigation Arrows --- */
        .nav-arrow { width: clamp(38px, 4.5vh, 48px); height: clamp(38px, 4.5vh, 48px); border-radius: 50%; border: 1px solid rgba(255,255,255,0.22); background: transparent; color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1); backdrop-filter: blur(5px); }
        .nav-arrow:hover { background: #fff; color: #000; transform: scale(1.1); }
        .nav-arrow:disabled { opacity: 0.4; pointer-events: none; }

        /* --- Cinematic Card Slider --- */
        .slide-card { width: var(--card-width); height: clamp(200px, 33vh, 360px); border-radius: 10px; position: relative; cursor: pointer; overflow: hidden; transform-origin: bottom center; transition: all 0.8s cubic-bezier(0.85, 0, 0.15, 1); opacity: 0.38; transform: scale(0.85) translateY(18px); box-shadow: 0 8px 24px rgba(0,0,0,0.5); }
        .slide-card.past { opacity: 0 !important; pointer-events: none; }
        .slide-card.active { opacity: 1; transform: scale(1) translateY(0); box-shadow: 0 20px 50px rgba(0,0,0,0.7); }
        .slide-card:hover:not(.active) { opacity: 0.65; transform: scale(0.9) translateY(10px); }
        .card-image-wrapper { position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; }
        .card-image { width: 100%; height: 100%; object-fit: cover; transition: transform 1.2s cubic-bezier(0.25, 1, 0.5, 1); }
        .slide-card.active .card-image { transform: scale(1.05); }
        .card-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%); }
        .card-content { position: absolute; bottom: 0; left: 0; width: 100%; padding: 1.25rem; display: flex; flex-direction: column; transform: translateY(8px); opacity: 0; transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1); transition-delay: 0.2s; box-sizing: border-box; }
        .slide-card.active .card-content { transform: translateY(0); opacity: 1; }
        .card-subtitle { font-size: 0.62rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); margin-bottom: 0.4rem; display: block; }
        .card-title { font-size: clamp(0.95rem, 1.5vw, 1.2rem); font-weight: 700; margin: 0; color: #fff; letter-spacing: 0.04em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

        /* --- Complete Gallery Section Filters & Masonry --- */
        .filter-btn { padding: 0.6rem 1.25rem; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); color: #fff; border-radius: 100px; font-family: var(--font-sans); font-size: 0.85rem; font-weight: 500; cursor: pointer; transition: all 0.3s ease; }
        .filter-btn:hover { background: rgba(255,255,255,0.1); }
        .filter-btn.active { background: #fff; color: #000; font-weight: 600; border-color: #fff; }

        .masonry-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
          grid-auto-flow: dense;
        }
        .masonry-item {
          position: relative; border-radius: 12px; overflow: hidden; cursor: zoom-in;
          background: #111; aspect-ratio: 4/3;
        }
        /* Make some items taller for a nice staggered look based on index */
        .masonry-item:nth-child(3n+1) { aspect-ratio: 3/4; grid-row: span 2; }
        .masonry-item:nth-child(4n) { aspect-ratio: 16/9; grid-column: span 2; }
        
        .masonry-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s cubic-bezier(0.25, 1, 0.5, 1); }
        .masonry-item:hover img { transform: scale(1.05); }
        
        .masonry-overlay {
          position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent 50%);
          opacity: 0; transition: opacity 0.3s ease;
          display: flex; flex-direction: column; justify-content: flex-end; padding: 1.5rem;
        }
        .masonry-item:hover .masonry-overlay { opacity: 1; }
        .masonry-icon { position: absolute; top: 1.5rem; right: 1.5rem; width: 40px; height: 40px; background: rgba(255,255,255,0.1); backdrop-filter: blur(8px); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; transform: translateY(-10px); opacity: 0; transition: all 0.4s ease; }
        .masonry-item:hover .masonry-icon { transform: translateY(0); opacity: 1; }
        .masonry-category { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent); font-weight: 600; margin-bottom: 0.25rem; display: block; transform: translateY(10px); opacity: 0; transition: all 0.4s ease 0.1s; }
        .masonry-title { font-size: 1.25rem; color: #fff; margin: 0; font-weight: 600; transform: translateY(10px); opacity: 0; transition: all 0.4s ease 0.2s; }
        .masonry-item:hover .masonry-category, .masonry-item:hover .masonry-title { transform: translateY(0); opacity: 1; }

        /* --- Destination Lightbox --- */
        .destination-lightbox {
          position: fixed; inset: 0; z-index: 100;
          background: rgba(5,5,5,0.97);
          backdrop-filter: blur(20px);
          opacity: 0; visibility: hidden;
          transition: all 0.5s cubic-bezier(0.85, 0, 0.15, 1);
          transform: translateY(24px);
          overflow: hidden;
        }
        .destination-lightbox.open { opacity: 1; visibility: visible; transform: translateY(0); }
        .close-lightbox { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #fff; cursor: pointer; transition: all 0.3s; border-radius: 50%; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .close-lightbox:hover { transform: rotate(90deg); background: rgba(255,255,255,0.18); }
        
        .lightbox-img-card {
          border-radius: 10px; overflow: hidden; position: relative;
          aspect-ratio: 4/3; background: #111;
          box-shadow: 0 8px 24px rgba(0,0,0,0.5);
          cursor: zoom-in;
          transition: transform 0.3s ease;
        }
        .lightbox-img-card:hover { transform: scale(1.02); }
        .lightbox-img-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1); }
        .lightbox-img-card:hover img { transform: scale(1.06); }
        .img-info {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 1.25rem; background: linear-gradient(to top, rgba(0,0,0,0.88), transparent);
          transform: translateY(10px); opacity: 0;
          transition: all 0.35s ease;
        }
        .lightbox-img-card:hover .img-info { transform: translateY(0); opacity: 1; }
        .img-info h4 { margin: 0; font-size: 1rem; font-weight: 600; color: #fff; }

        /* --- Responsive --- */
        @media (max-width: 1024px) {
          .content-wrapper { flex-direction: column; align-items: flex-start !important; }
          .bottom-section { flex-direction: column; align-items: flex-start !important; gap: 2rem; }
          .nav-container { padding-right: 0 !important; max-width: 100% !important; }
          .slider-container { width: calc(100vw - 2 * clamp(1.25rem, 6vw, 8rem)); }
          .masonry-item:nth-child(4n) { grid-column: auto; }
        }
        @media (max-width: 640px) {
          .giant-title { font-size: clamp(2.5rem, 14vw, 4rem) !important; }
          .action-row { flex-wrap: wrap; }
          .nav-container { gap: 0.875rem !important; }
          .masonry-grid { grid-template-columns: 1fr; }
          .masonry-item:nth-child(3n+1) { aspect-ratio: 4/3; grid-row: auto; }
        }
      `}</style>
    </main>
  )
}
