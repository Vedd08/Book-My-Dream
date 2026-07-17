import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Plane, Phone } from 'lucide-react'
import { COMPANY } from '../data'
import logoImg from '../assets/new_logo.png'

const navLinks = [
  { href: '/', label: 'Home' },
  
  { href: '/destinations', label: 'Destinations' },
  { href: '/packages', label: 'Packages' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function SiteHeader() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredHref, setHoveredHref] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  const transparent = (pathname === '/gallery' && !open) || (pathname === '/' && !scrolled && !open)

  const headerStyle: React.CSSProperties = {
    position: 'fixed', inset: '0 0 auto 0', zIndex: 50,
    transition: 'all .3s',
    background: transparent ? 'transparent' : 'rgba(249,250,251,.85)',
    backdropFilter: transparent ? 'none' : 'blur(16px)',
    borderBottom: transparent ? 'none' : '1px solid var(--border)',
    boxShadow: transparent ? 'none' : 'var(--shadow-sm)',
  }

  const linkColor = transparent ? 'rgba(255,255,255,.9)' : 'var(--fg)'
  const logoColor = transparent ? '#fff' : 'var(--fg)'
  const accentColor = transparent ? 'rgba(255,255,255,.7)' : 'var(--accent)'

  return (
    <header style={headerStyle}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', paddingBlock: '.75rem' }}>
        {/* Logo */}
        <Link 
          to="/" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ display: 'flex', alignItems: 'center', gap: '.5rem', textDecoration: 'none', flexShrink: 1, minWidth: 0 }}
        >
          <img 
            src={logoImg} 
            alt="Book My Dream Travels Logo" 
            style={{ height: '50px', width: 'auto', borderRadius: '8px', flexShrink: 0 }} 
          />
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, overflow: 'hidden', minWidth: 0, width: '100%' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(0.9rem, 4vw, 1.125rem)', fontWeight: 700, color: logoColor, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', marginBottom: '0.15rem', minWidth: 0, maxWidth: '100%' }}>Book My Dream</span>
            <span style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.2em', color: accentColor, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', minWidth: 0, maxWidth: '100%' }}>Ek Safar Hamare Sath</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="lg-only" style={{ display: 'flex', alignItems: 'center', gap: '.25rem' }}>
          {navLinks.map(l => {
            const active = pathname === l.href
            const isHovered = hoveredHref === l.href
            return (
              <Link
                key={l.href}
                to={l.href}
                onMouseEnter={() => setHoveredHref(l.href)}
                onMouseLeave={() => setHoveredHref(null)}
                style={{
                  padding: '.5rem .875rem', borderRadius: 9999, fontSize: '.875rem', fontWeight: 500,
                  color: active ? (transparent ? '#fff' : 'var(--primary)') : linkColor,
                  background: active
                    ? (transparent ? 'rgba(255,255,255,.15)' : 'var(--secondary)')
                    : (transparent
                      ? (isHovered ? 'rgba(255,255,255,.12)' : 'rgba(255,255,255,.06)')
                      : (isHovered ? 'rgba(0,0,0,.05)' : 'rgba(0,0,0,.03)')),
                  transition: 'all .2s', textDecoration: 'none',
                }}
              >{l.label}</Link>
            )
          })}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', flexShrink: 0 }}>
          <a href={`tel:${COMPANY.phone[0].replace(/\s/g, '')}`} className="lg-only" style={{
            display: 'flex', alignItems: 'center', gap: '.5rem',
            padding: '.5rem 1rem', borderRadius: 9999, fontSize: '.875rem', fontWeight: 600,
            background: transparent ? '#fff' : 'var(--accent)', color: transparent ? 'var(--primary)' : '#fff',
            transition: 'all .2s', textDecoration: 'none',
          }}>
            <Phone size={16} /> Call Now
          </a>
          <button
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
            className="mobile-only"
            style={{
              width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: 10, border: 'none',
              background: transparent ? 'rgba(255,255,255,.2)' : 'var(--secondary)',
              color: transparent ? '#fff' : 'var(--fg)',
              flexShrink: 0,
            }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ borderTop: '1px solid var(--border)', background: 'var(--card)' }}>
          <nav className="container" style={{ display: 'flex', flexDirection: 'column', gap: '.25rem', paddingBlock: '1rem' }}>
            {navLinks.map(l => (
              <Link key={l.href} to={l.href} style={{
                padding: '.75rem 1rem', borderRadius: 8, fontSize: '.875rem', fontWeight: 500,
                color: pathname === l.href ? 'var(--primary)' : 'var(--fg)',
                background: pathname === l.href ? 'var(--secondary)' : 'transparent',
                textDecoration: 'none',
              }}>{l.label}</Link>
            ))}
            <Link to="/contact" style={{
              marginTop: '.5rem', padding: '.75rem 1rem', borderRadius: 8, textAlign: 'center',
              fontSize: '.875rem', fontWeight: 600, background: 'var(--accent)', color: '#fff',
              textDecoration: 'none',
            }}>Plan a Custom Tour</Link>
          </nav>
        </div>
      )}
    </header>
  )
}
