import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

type Props = { title: string; subtitle?: string; crumb: string; image?: string; blur?: boolean; imagePos?: string }

export default function PageHero({ title, subtitle, crumb, image, blur, imagePos }: Props) {
  return (
    <section style={{
      position: 'relative', overflow: 'hidden',
      background: image ? undefined : 'var(--primary)',
      paddingTop: '8rem', paddingBottom: '4rem', color: '#fff',
    }}>
      {image && (
        <>
          <img src={image} alt="" style={{ position: 'absolute', inset: -20, width: 'calc(100% + 40px)', height: 'calc(100% + 40px)', objectFit: 'cover', objectPosition: imagePos || 'center', filter: blur ? 'blur(8px)' : 'none' }} />
          <div style={{ position: 'absolute', inset: 0, background: blur ? 'linear-gradient(to bottom, rgba(0,0,0,.4), rgba(0,0,0,.5))' : 'linear-gradient(to bottom, rgba(0,0,0,.65), rgba(0,0,0,.35))' }} />
        </>
      )}
      {/* Decorative blobs */}
      <div style={{ pointerEvents: 'none', position: 'absolute', right: '-5rem', top: '-6rem', width: 288, height: 288, borderRadius: 9999, background: 'rgba(255,183,178,.2)', filter: 'blur(48px)' }} />
      <div style={{ pointerEvents: 'none', position: 'absolute', left: '-5rem', bottom: '-6rem', width: 288, height: 288, borderRadius: 9999, background: 'rgba(255,255,255,.1)', filter: 'blur(48px)' }} />
      <div className="container" style={{ position: 'relative' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '.875rem', color: 'rgba(255,255,255,.7)' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none', transition: 'color .2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.7)')}
          >Home</Link>
          <ChevronRight size={16} />
          <span style={{ color: 'var(--accent)' }}>{crumb}</span>
        </nav>
        <h1 style={{ marginTop: '.75rem', fontFamily: 'var(--font-marker)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 400, maxWidth: '40rem', lineHeight: 1.1, textTransform: 'uppercase', letterSpacing: '1px' }}>{title}</h1>
        {subtitle && <p style={{ marginTop: '1.25rem', maxWidth: '38rem', fontSize: '1.1rem', lineHeight: 1.75, color: 'rgba(255,255,255,.9)', fontFamily: 'var(--font-sans)' }}>{subtitle}</p>}
      </div>
    </section>
  )
}
