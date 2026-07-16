import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Award, Users, Clock, Globe, Shield, Heart, Map, ArrowRight, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const heroImg = "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2000&auto=format&fit=crop";
const maldivesImg = "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2000&auto=format&fit=crop";
const baliImg = "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop";

gsap.registerPlugin(ScrollTrigger)

const flightMapSvg = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 600' preserveAspectRatio='xMidYMid slice'>
  <style>
    .path { fill: none; stroke: rgba(255,255,255,0.2); stroke-width: 2.5; stroke-dasharray: 10 12; stroke-linecap: round; }
    .pin { fill: rgba(255,255,255,0.15); }
  </style>
  <path class="path" d="M -100 150 Q 250 20 450 180 T 850 80 T 1500 300" />
  <path class="path" d="M 0 500 Q 300 350 600 500 T 1100 250 T 1500 100" />
  <path class="path" d="M 150 650 Q 350 400 700 550 T 1300 500 T 1500 700" />
  <g transform="translate(280, 220) scale(1.8)"><path class="pin" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></g>
  <g transform="translate(850, 100) scale(1.8)"><path class="pin" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></g>
</svg>
`)}`

const stats = [
  { icon: Users, value: '1000+', label: 'Happy Travelers' },
  { icon: Award, value: '150+', label: 'Destinations' },
  // { icon: Clock, value: '20+', label: 'Years Exp' },
  { icon: CheckCircle2, value: '4.9★', label: 'Avg Rating' },
]

const values = [
  { icon: Heart, title: 'Customer First', desc: 'Your joy is our ultimate reward. Every decision starts and ends with your satisfaction.', color: '#ffb7b2', bg: 'rgba(255,183,178, 0.1)' },
  { icon: Shield, title: 'Transparency', desc: 'No hidden charges, no surprises. What you see is exactly what you get.', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
  { icon: Globe, title: 'Passion', desc: 'We live and breathe travel, bringing you the best experiences worldwide.', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
  { icon: Map, title: 'Expert Guidance', desc: 'Our travel experts guide you to the hidden gems of every destination.', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
]

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const ctx = gsap.context(() => {
      // Hero Animations
      const tl = gsap.timeline()
      tl.from('.hero-text-script', { opacity: 0, y: 30, duration: 0.8, ease: 'back.out(1.7)' })
      tl.from('.hero-text-marker', { opacity: 0, scale: 0.9, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      tl.from('.hero-subtext', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      
      // Story section scroll animation
      gsap.from('.story-image-1', {
        scrollTrigger: { trigger: '.story-section', start: 'top 70%' },
        x: -50, opacity: 0, duration: 1, ease: 'power3.out'
      })
      gsap.from('.story-image-2', {
        scrollTrigger: { trigger: '.story-section', start: 'top 70%' },
        x: 50, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2
      })
      
      // Stats scroll animation
      gsap.from('.stat-card', {
        scrollTrigger: { trigger: '.stats-section', start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.4)'
      })
      
      // Values scroll animation
      gsap.from('.value-card', {
        scrollTrigger: { trigger: '.values-section', start: 'top 75%' },
        y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out'
      })
    }, containerRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <main ref={containerRef} style={{ background: '#f0f4f8', color: 'var(--fg)' }}>
      {/* ═══════════════════════════════════════════════
          HERO SECTION (Matches HomePage Vibe)
      ═══════════════════════════════════════════════ */}
      <section ref={heroRef} style={{ position: 'relative', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: `var(--primary)` }}>
        <div style={{ position: 'absolute', inset: 0, background: `url(${heroImg}) center/cover no-repeat` }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(11,21,40,0.7), rgba(11,21,40,0.85))' }} />
        <div style={{ position: 'absolute', inset: 0, background: `url("${flightMapSvg}") center/cover no-repeat`, opacity: 0.6, pointerEvents: 'none' }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center', paddingTop: '6rem', paddingBottom: '4rem', color: '#fff' }}>
          <div className="hero-text-script" style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--accent)', marginBottom: '-1rem', transform: 'rotate(-2deg)' }}>
            the story behind
          </div>
          <h1 className="hero-text-marker" style={{ fontFamily: 'var(--font-marker)', fontSize: 'clamp(3.5rem, 10vw, 7rem)', fontWeight: 400, lineHeight: 1.1, textTransform: 'uppercase', textShadow: '0 4px 15px rgba(0,0,0,0.5)', letterSpacing: '2px' }}>
            OUR JOURNEY
          </h1>
          <p className="hero-subtext" style={{ marginTop: '1.5rem', maxWidth: '38rem', marginInline: 'auto', fontSize: '1.1rem', lineHeight: 1.6, color: 'rgba(255,255,255,.9)', fontFamily: 'var(--font-sans)' }}>
            For 4 years, we've been turning travel dreams into reality. We don't just plan trips; we craft unforgettable experiences.
          </p>
        </div>
        
        {/* Decorative Bottom Wave */}
        <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0, width: '100%', overflow: 'hidden', lineHeight: 0, zIndex: 10 }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ display: 'block', width: 'calc(100% + 2px)', height: '40px' }}>
            <path d="M0,120 L0,60 C300,0 900,0 1200,60 L1200,120 Z" style={{ fill: '#f0f4f8' }}></path>
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          THE STORY (Asymmetric Layout)
      ═══════════════════════════════════════════════ */}
      <section className="section story-section" style={{ position: 'relative', overflow: 'hidden', paddingTop: '4rem', paddingBottom: '6rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            
            {/* Collage */}
            <div style={{ position: 'relative', height: '550px', width: '100%' }}>
              <div className="story-image-1" style={{ position: 'absolute', top: 0, left: 0, width: '65%', height: '70%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', zIndex: 2 }}>
                <img src={storyImg1} alt="Travel Experience" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="story-image-2" style={{ position: 'absolute', bottom: 0, right: 0, width: '60%', height: '60%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', zIndex: 3, border: '8px solid #f0f4f8' }}>
                <img src={storyImg2} alt="Wanderlust" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              
              {/* Badge */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--accent)', color: '#fff', width: '130px', height: '130px', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 4, boxShadow: '0 10px 30px rgba(255,183,178, 0.4)', border: '6px solid #f0f4f8' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 900, lineHeight: 1 }}>4</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>Years</span>
              </div>
            </div>

            {/* Text Content */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'linear-gradient(135deg, #ff0f7b 0%, #f89b29 100%)', color: '#fff', padding: '0.35rem 0.9rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.5rem', boxShadow: '0 4px 16px rgba(255, 15, 123, 0.35)' }}>
                <Sparkles size={14} style={{ fill: '#fff' }} /> Our Origin
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--fg)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                Turning Your Travel Dreams Into Reality
              </h2>
              <p style={{ color: 'var(--muted-fg)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1rem' }}>
                At <strong style={{ color: 'var(--fg)' }}>Book My Dream</strong>, we believe that every journey should be memorable, comfortable, and stress-free. We are dedicated to helping travelers explore incredible destinations across India and around the world with carefully planned holiday packages.
              </p>
              <p style={{ color: 'var(--muted-fg)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1rem' }}>
                Whether you're planning a family vacation, honeymoon, pilgrimage, group tour, or adventure trip, our experienced team takes care of every detail—from transportation and accommodation to sightseeing and personalized itineraries.
              </p>
              <p style={{ color: 'var(--muted-fg)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1rem' }}>
                Our mission is to provide quality travel services at affordable prices while ensuring complete customer satisfaction. We focus on transparency, reliability, and creating unforgettable travel experiences for every guest.
              </p>
              <p style={{ color: 'var(--fg)', lineHeight: 1.8, fontSize: '1.15rem', fontWeight: 600, marginBottom: '2rem', fontStyle: 'italic' }}>
                With Book My Dream, you're not just booking a trip—you're creating memories that last a lifetime.
              </p>
              <Link to="/packages" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.8rem 1.8rem', borderRadius: '9999px', fontSize: '1rem' }}>
                Start Your Journey <ArrowRight size={18} />
              </Link>
            </div>
            
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TRUST STATS (Dark Glassmorphism)
      ═══════════════════════════════════════════════ */}
      <section className="section stats-section" style={{ position: 'relative', background: `var(--primary)`, padding: '5rem 0', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: `url(${maldivesImg}) center/cover fixed` }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,21,40,0.85)' }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="stat-card" style={{ 
                padding: '2.5rem 1.5rem', borderRadius: '24px', textAlign: 'center',
                background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', 
                border: '1px solid rgba(255,255,255,0.1)', borderTop: '1px solid rgba(255,255,255,0.2)',
                borderLeft: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                transition: 'transform 0.3s ease, background 0.3s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}>
                <div style={{ width: '64px', height: '64px', margin: '0 auto 1.25rem', background: 'linear-gradient(135deg, rgba(255,183,178,0.2) 0%, rgba(255,183,178,0) 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,183,178,0.3)' }}>
                  <Icon size={28} style={{ color: 'var(--accent)' }} />
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>{value}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.5rem' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CORE VALUES (Colorful Grid)
      ═══════════════════════════════════════════════ */}
      <section className="section values-section" style={{ paddingTop: '6rem', paddingBottom: '6rem', position: 'relative' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 4rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', fontWeight: 800, color: 'var(--fg)', marginBottom: '1rem' }}>
              What Drives Us Every Day
            </h2>
            <p style={{ color: 'var(--muted-fg)', fontSize: '1.1rem', lineHeight: 1.6 }}>
              These core principles are the foundation of everything we do, ensuring that every journey you take with us is extraordinary.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {values.map(v => (
              <div key={v.title} className="value-card" style={{ 
                padding: '2.5rem 2rem', borderRadius: '24px', background: 'var(--card)', 
                border: '1px solid var(--border)', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)', 
                position: 'relative', overflow: 'hidden', transition: 'box-shadow 0.3s ease, transform 0.3s ease' 
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 40px -15px rgba(0,0,0,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.05)' }}>
                {/* Glow accent */}
                <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, background: v.color, opacity: 0.15, borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none' }} />
                
                <div style={{ width: 56, height: 56, borderRadius: 16, background: v.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: `1px solid ${v.color}30` }}>
                  <v.icon size={26} style={{ color: v.color }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--fg)' }}>{v.title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--muted-fg)', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* ═══════════════════════════════════════════════
          MOMENTS (Masonry)
      ═══════════════════════════════════════════════ */}
      <section className="section" style={{ paddingBottom: '6rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1rem', height: '400px' }}>
            <div style={{ gridColumn: 'span 4', borderRadius: '24px', overflow: 'hidden', position: 'relative' }}>
               <img src={baliImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Gallery" />
            </div>
            <div style={{ gridColumn: 'span 8', borderRadius: '24px', overflow: 'hidden', position: 'relative' }}>
               <img src={heroImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Gallery" />
               <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.6), transparent)', display: 'flex', alignItems: 'center', padding: '3rem' }}>
                 <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 800, color: '#fff', maxWidth: '300px', lineHeight: 1.2 }}>
                   Creating Memories Since 2022
                 </h2>
               </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
