import { useParams, Link, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { API_URL } from '../config'
import { Clock, MapPin, Star, CheckCircle2, X, ArrowRight, ChevronDown, Users, Calendar, Shield, Award, Camera } from 'lucide-react'
import { inr, formatCurrency } from '../data'
import type { Package } from '../data'
import InquiryForm from '../components/InquiryForm'
import PackageCard from '../components/PackageCard'

export default function PackageDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [pkg, setPkg] = useState<Package | null>(null)
  const [related, setRelated] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(`${API_URL}/api/packages/${slug}`)
      .then(r => { if (!r.ok) throw new Error('Not found'); return r.json() })
      .then(data => { setPkg(data); return fetch(`${API_URL}/api/packages?region=${data.region}`) })
      .then(r => r.json())
      .then(data => { setRelated(Array.isArray(data) ? data.filter((p: Package) => p.slug !== slug).slice(0, 3) : []) })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return (
    <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
      <div style={{ width: 44, height: 44, border: '3px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin .8s linear infinite' }} />
      <p style={{ color: 'var(--muted-fg)', fontSize: '.875rem' }}>Loading your journey...</p>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
  if (notFound || !pkg) return <Navigate to="/packages" replace />

  const discount = Math.round(((pkg.price - pkg.discountPrice) / pkg.price) * 100)

  return (
    <main style={{ background: 'var(--background)' }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '72vh', minHeight: 500 }}>
        <img
          src={pkg.image}
          alt={pkg.name}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity .4s' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,18,36,.96) 0%, rgba(8,18,36,.5) 45%, rgba(8,18,36,.15) 100%)' }} />

        {/* Breadcrumb */}
        <div style={{ position: 'absolute', top: '1.5rem', left: 0, right: 0 }}>
          <div className="container">
            <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '.75rem', color: 'rgba(255,255,255,.6)' }}>
              <Link to="/" style={{ color: 'rgba(255,255,255,.6)', textDecoration: 'none' }}>Home</Link>
              <span>/</span>
              <Link to="/packages" style={{ color: 'rgba(255,255,255,.6)', textDecoration: 'none' }}>Packages</Link>
              <span>/</span>
              <span style={{ color: '#fff' }}>{pkg.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero content */}
        <div style={{ position: 'absolute', inset: '0 0 5rem 0', display: 'flex', alignItems: 'flex-end' }}>
          <div className="container" style={{ paddingBottom: '2rem', color: '#fff' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.45rem', marginBottom: '.85rem' }}>
              <span style={{ padding: '.25rem .8rem', borderRadius: 9999, background: 'var(--secondary)', fontSize: '.7rem', fontWeight: 700, color: 'var(--secondary-fg)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{pkg.type}</span>
              <span style={{ padding: '.25rem .8rem', borderRadius: 9999, background: 'rgba(255,255,255,.14)', fontSize: '.7rem', fontWeight: 600, color: '#fff', border: '1px solid rgba(255,255,255,.25)' }}>{pkg.region}</span>
              {discount > 0 && <span style={{ padding: '.25rem .8rem', borderRadius: 9999, background: '#e53e3e', fontSize: '.7rem', fontWeight: 700, color: '#fff' }}>{discount}% OFF</span>}
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.18, maxWidth: 700, textShadow: '0 2px 20px rgba(0,0,0,.4)', marginBottom: '1rem' }}>
              {pkg.name}
            </h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
              {[
                { icon: <MapPin size={13} />, label: `${pkg.destination}, ${pkg.country}` },
                { icon: <Clock size={13} />, label: pkg.duration },
                { icon: <Star size={13} />, label: `${pkg.rating} · ${pkg.reviews} reviews` },
              ].map((s, i) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '.32rem .8rem', borderRadius: 9999, background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.2)', fontSize: '.78rem', color: '#fff' }}>
                  {s.icon}{s.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK-STAT BAR ── */}
      <div style={{ background: 'var(--primary)', color: '#fff' }}>
        <div className="container">
          <div className="quick-stat-grid">
            {[
              { icon: <Calendar size={16} />, label: 'Duration', value: pkg.duration },
              { icon: <Users size={16} />, label: 'Group type', value: 'Small group' },
              { icon: <Shield size={16} />, label: 'Cancellation', value: 'Free · 7 days' },
              { icon: <Star size={16} />, label: 'Rating', value: `${pkg.rating} / 5` },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {s.icon}
                </div>
                <div>
                  <p style={{ fontSize: '.63rem', opacity: .7, margin: 0, textTransform: 'uppercase', letterSpacing: '.07em' }}>{s.label}</p>
                  <p style={{ fontSize: '.82rem', fontWeight: 700, margin: 0 }}>{s.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="container" style={{ paddingBlock: '3rem' }}>
        <div className="pkg-body-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(300px, 1fr)', gap: '2.5rem', alignItems: 'start' }}>

          {/* ── LEFT ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

            {/* Highlights */}
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
                <span style={{ width: 4, height: 22, borderRadius: 9999, background: 'var(--primary)', flexShrink: 0, display: 'inline-block' }} />
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>Tour Highlights</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(195px, 1fr))', gap: '.65rem' }}>
                {pkg.highlights.map((h, i) => (
                  <div key={i}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 10, borderRadius: 12, border: '1px solid var(--border)', background: 'var(--card)', padding: '.8rem 1rem', transition: 'border-color .2s, transform .2s, box-shadow .2s', cursor: 'default' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'var(--primary)'; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 6px 20px -6px rgba(168,230,207,.18)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'var(--border)'; el.style.transform = 'none'; el.style.boxShadow = 'none'; }}
                  >
                    <CheckCircle2 size={16} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: '.855rem', lineHeight: 1.5 }}>{h}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Itinerary */}
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
                <span style={{ width: 4, height: 22, borderRadius: 9999, background: 'var(--primary)', flexShrink: 0, display: 'inline-block' }} />
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>Day-by-Day Itinerary</h2>
              </div>
              <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
                {pkg.itinerary.map((item, idx) => (
                  <li key={item.day} style={{ display: 'flex', gap: '1rem', position: 'relative', paddingBottom: idx < pkg.itinerary.length - 1 ? '1.25rem' : 0 }}>
                    {idx < pkg.itinerary.length - 1 && (
                      <div style={{ position: 'absolute', left: 18, top: 36, bottom: 0, width: 2, background: 'linear-gradient(to bottom, var(--primary), var(--border))', zIndex: 0 }} />
                    )}
                    <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '.78rem', flexShrink: 0, zIndex: 1, border: '3px solid var(--background)', boxShadow: '0 0 0 2px var(--primary)' }}>
                      {item.day}
                    </div>
                    <div style={{ flex: 1, borderRadius: 14, border: '1px solid var(--border)', background: 'var(--card)', padding: '1rem 1.15rem', transition: 'border-color .2s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--primary)'}
                      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'}
                    >
                      <p style={{ fontSize: '.7rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '.07em', margin: '0 0 .25rem' }}>Day {item.day}</p>
                      <h3 style={{ fontWeight: 700, fontSize: '.975rem', margin: '0 0 .4rem' }}>{item.title}</h3>
                      <p style={{ fontSize: '.855rem', color: 'var(--muted-fg)', lineHeight: 1.65, margin: 0 }}>{item.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Inclusions / Exclusions */}
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
                <span style={{ width: 4, height: 22, borderRadius: 9999, background: 'var(--primary)', flexShrink: 0, display: 'inline-block' }} />
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>Inclusions & Exclusions</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ borderRadius: 16, border: '1px solid #d1fae5', background: '#f0fdf4', padding: '1.25rem' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '.78rem', color: '#065f46', marginBottom: '.9rem', textTransform: 'uppercase', letterSpacing: '.06em' }}>✓ Included</h3>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '.55rem' }}>
                    {pkg.inclusions.map((item, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '.845rem', color: '#064e3b' }}>
                        <CheckCircle2 size={14} style={{ color: '#10b981', flexShrink: 0, marginTop: 3 }} />{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ borderRadius: 16, border: '1px solid #fee2e2', background: '#fff5f5', padding: '1.25rem' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '.78rem', color: '#991b1b', marginBottom: '.9rem', textTransform: 'uppercase', letterSpacing: '.06em' }}>✕ Not included</h3>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '.55rem' }}>
                    {pkg.exclusions.map((item, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '.845rem', color: '#7f1d1d' }}>
                        <X size={14} style={{ color: '#ef4444', flexShrink: 0, marginTop: 3 }} />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
                <span style={{ width: 4, height: 22, borderRadius: 9999, background: 'var(--primary)', flexShrink: 0, display: 'inline-block' }} />
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>Frequently Asked Questions</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                {pkg.faqs.map((f, i) => (
                  <div key={i} style={{ borderRadius: 14, border: `1px solid ${openFaq === i ? 'var(--primary)' : 'var(--border)'}`, background: 'var(--card)', overflow: 'hidden', transition: 'border-color .2s' }}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.15rem', background: openFaq === i ? 'rgba(var(--primary-rgb),.04)' : 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: '.9rem', color: 'var(--fg)', gap: '1rem' }}
                    >
                      <span>{f.q}</span>
                      <ChevronDown size={17} style={{ flexShrink: 0, color: 'var(--muted-fg)', transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform .25s' }} />
                    </button>
                    {openFaq === i && (
                      <div style={{ padding: '0 1.15rem 1rem', borderTop: '1px solid var(--border)' }}>
                        <p style={{ margin: '.8rem 0 0', fontSize: '.875rem', lineHeight: 1.7, color: 'var(--muted-fg)' }}>{f.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* ── SIDEBAR ── */}
          <aside>
            <div style={{ position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: '1rem' }}>

              {/* Price card */}
              <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 12px 40px -10px rgba(168,230,207,.22)' }}>
                <div style={{ background: 'var(--primary)', padding: '1.35rem 1.5rem', color: '#fff' }}>
                  <p style={{ fontSize: '.65rem', opacity: .75, margin: '0 0 .3rem', textTransform: 'uppercase', letterSpacing: '.08em' }}>Starting from</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '.5rem' }}>
                      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.1rem', fontWeight: 800, lineHeight: 1 }}>{inr(pkg.discountPrice)}</span>
                      {discount > 0 && <span style={{ fontSize: '.85rem', textDecoration: 'line-through', opacity: .6 }}>{inr(pkg.price)}</span>}
                    </div>
                    {pkg.foreignPrice ? (
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '.5rem', marginTop: '.25rem', color: 'rgba(255,255,255,0.9)' }}>
                        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, lineHeight: 1 }}>{formatCurrency(pkg.foreignDiscountPrice || pkg.foreignPrice, pkg.foreignCurrency || 'USD')}</span>
                        {pkg.foreignDiscountPrice && pkg.foreignDiscountPrice < pkg.foreignPrice && <span style={{ fontSize: '.75rem', textDecoration: 'line-through', opacity: .6 }}>{formatCurrency(pkg.foreignPrice, pkg.foreignCurrency || 'USD')}</span>}
                      </div>
                    ) : null}
                  </div>
                  <p style={{ fontSize: '.68rem', opacity: .7, margin: '.3rem 0 0' }}>per person · twin sharing</p>
                  {discount > 0 && (
                    <span style={{ display: 'inline-block', marginTop: '.65rem', background: 'rgba(255,255,255,.18)', border: '1px solid rgba(255,255,255,.3)', borderRadius: 9999, padding: '.22rem .7rem', fontSize: '.68rem', fontWeight: 700 }}>
                      You save {inr(pkg.price - pkg.discountPrice)} 🎉
                    </span>
                  )}
                </div>
                <div style={{ background: 'var(--card)', padding: '1.35rem 1.5rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 700, margin: '0 0 1rem' }}>Enquire About This Trip</h3>
                  <InquiryForm defaultSubject={pkg.name} compact />
                </div>
              </div>

              {/* Trust badges */}
              <div style={{ borderRadius: 16, border: '1px solid var(--border)', background: 'var(--card)', padding: '1rem 1.15rem' }}>
                <p style={{ fontSize: '.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--muted-fg)', margin: '0 0 .75rem' }}>Why book with us</p>
                {[
                  { icon: <Shield size={15} />, text: 'Free cancellation up to 7 days' },
                  { icon: <Award size={15} />, text: 'Price match guarantee' },
                  { icon: <Users size={15} />, text: 'Dedicated tour manager' },
                  { icon: <Star size={15} />, text: `Rated ${pkg.rating}/5 by ${pkg.reviews} travellers` },
                ].map((b, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '.825rem', color: 'var(--muted-fg)', padding: '.5rem 0', borderTop: i === 0 ? 'none' : '1px solid var(--border)' }}>
                    <span style={{ color: 'var(--primary)', flexShrink: 0 }}>{b.icon}</span>
                    {b.text}
                  </div>
                ))}
              </div>

            </div>
          </aside>
        </div>
      </div>

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <section style={{ borderTop: '1px solid var(--border)', background: 'var(--muted)', paddingBlock: '3.5rem' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <div>
                <p style={{ fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.09em', color: 'var(--primary)', margin: '0 0 .3rem' }}>Explore more</p>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>You May Also Like</h2>
              </div>
              <Link to="/packages" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: '.875rem', fontWeight: 600, color: 'var(--primary)', textDecoration: 'none' }}>
                View all <ArrowRight size={15} />
              </Link>
            </div>
            <div className="grid-3">
              {related.map(p => <PackageCard key={p.slug} pkg={p} />)}
            </div>
          </div>
        </section>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        
        .quick-stat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          padding: 1rem 0;
        }

        @media (max-width: 900px) {
          .pkg-body-grid { grid-template-columns: 1fr !important; }
        }
        
        @media (max-width: 768px) {
          .quick-stat-grid {
            grid-template-columns: repeat(2, 1fr);
            row-gap: 1.25rem;
          }
        }
      `}</style>
    </main>
  )
}