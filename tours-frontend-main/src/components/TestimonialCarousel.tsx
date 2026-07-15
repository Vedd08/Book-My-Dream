import { Star, Quote, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { testimonials } from '../data'
import { useRef, useEffect } from 'react'

export default function TestimonialCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
        // If we reached the end, scroll back to 0. Otherwise scroll by one card width (320px + 24px gap = 344px)
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          scrollRef.current.scrollBy({ left: 344, behavior: 'smooth' })
        }
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ marginTop: '1rem' }}>
      <style>{`
        .testimonial-scroll::-webkit-scrollbar { display: none; }
        .testimonial-scroll { -ms-overflow-style: none; scrollbar-width: none; cursor: grab; }
        .testimonial-scroll:active { cursor: grabbing; }
        .testimonial-card-wrapper {
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .testimonial-card-wrapper:hover {
          transform: translateY(-8px);
        }
        .testimonial-card-wrapper:hover .testimonial-avatar {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 10px 25px rgba(255,183,178, 0.4);
          border-color: var(--accent);
        }
        .testimonial-card-wrapper:hover .star-badge {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        }
      `}</style>

      {/* Horizontal Scrollable Row matching HomePage's 'dest-scroll' */}
      <div ref={scrollRef} className="dest-scroll testimonial-scroll" style={{ 
        position: 'relative', 
        zIndex: 1, 
        display: 'flex', 
        gap: '1.5rem', 
        overflowX: 'auto', 
        paddingBottom: '2.5rem', 
        paddingLeft: '1rem',
        paddingRight: '1rem',
        scrollSnapType: 'x mandatory',
        alignItems: 'stretch',
        WebkitOverflowScrolling: 'touch'
      }}>
        {testimonials.map((t, i) => (
          <div key={i} className="testimonial-card-wrapper" style={{ 
            flex: '0 0 340px', 
            scrollSnapAlign: 'center',
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            paddingTop: '15px' // Space for floating badge
          }}>
            {/* The White Speech Bubble Card */}
            <div style={{ 
              background: 'var(--card-bg, #fff)', 
              borderRadius: '24px', 
              padding: '2.5rem 2rem 2rem', 
              boxShadow: '0 12px 35px -10px rgba(168,230,207,0.12)', 
              textAlign: 'center',
              position: 'relative',
              marginBottom: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '100%',
              flex: 1,
              border: '1px solid rgba(168,230,207,0.05)',
              zIndex: 2
            }}>
              {/* Floating Star Badge */}
              <div className="star-badge" style={{ 
                position: 'absolute', 
                top: '-15px', 
                right: '25px', 
                background: '#fff', 
                padding: '6px 14px', 
                borderRadius: '9999px', 
                display: 'flex', 
                gap: '3px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(255,183,178,0.1)'
              }}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} fill="var(--accent)" color="var(--accent)" />
                ))}
              </div>

              <Quote size={60} strokeWidth={1} style={{ position: 'absolute', top: '1rem', left: '1rem', color: 'var(--primary)', opacity: 0.04 }} />
              
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: '#334155', fontStyle: 'italic', lineHeight: 1.7, margin: '0 0 1.5rem 0', position: 'relative', zIndex: 1 }}>
                "{t.review}"
              </p>
              
              <div style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '1.25rem' }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.05em', margin: 0 }}>
                  {t.name}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--accent)', marginTop: '0.35rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {t.trip}
                </p>
              </div>
              
              {/* Speech Bubble Triangle Pointing Down */}
              <div style={{
                position: 'absolute',
                bottom: '-14px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0, 
                height: 0, 
                borderLeft: '16px solid transparent',
                borderRight: '16px solid transparent',
                borderTop: '15px solid var(--card-bg, #fff)',
                filter: 'drop-shadow(0 5px 3px rgba(168,230,207,0.04))'
              }} />
            </div>

            {/* Profile Avatar */}
            <div className="testimonial-avatar" style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff0f7b 0%, #f89b29 100%)', // Vibrant gradient!
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontFamily: 'var(--font-serif)',
              fontSize: '1.75rem',
              fontWeight: 700,
              boxShadow: '0 6px 20px rgba(168,230,207,0.15)',
              border: '4px solid var(--card-bg, #fff)',
              flexShrink: 0,
              zIndex: 3,
              transition: 'all 0.3s ease'
            }}>
              {t.name.charAt(0)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
