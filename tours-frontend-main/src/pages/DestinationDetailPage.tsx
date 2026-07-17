import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPin, CalendarDays, Compass, Lightbulb, ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import { API_URL, getImageUrl } from '../config'
import type { Destination } from '../data'

export default function DestinationDetailPage() {
  const { slug } = useParams()
  const [dest, setDest] = useState<Destination | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true); setError(false)
    fetch(`${API_URL}/api/destinations/${slug}`)
      .then(r => {
        if (!r.ok) throw new Error('Destination not found')
        return r.json()
      })
      .then(data => { setDest(data); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [slug])

  if (loading) {
    return (
      <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <div style={{ width: 40, height: 40, border: '3px solid rgba(212,175,55,0.2)', borderTopColor: '#D4AF37', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </main>
    )
  }

  if (error || !dest) {
    return (
      <main style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: '#f8fafc', color: '#1e293b' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)', fontWeight: 800 }}>Destination Not Found</h2>
        <p style={{ color: '#64748b', marginBottom: '2.5rem', fontSize: '1.1rem' }}>We couldn't find the destination you're looking for.</p>
        <Link to="/destinations" className="premium-btn primary" style={{ textDecoration: 'none', display: 'inline-block', padding: '0.75rem 2rem', background: '#1e293b', color: '#fff', borderRadius: '8px', fontWeight: 600 }}>
          Back to Destinations
        </Link>
      </main>
    )
  }

  return (
    <main style={{ background: '#f8fafc', color: '#1e293b', fontFamily: 'var(--font-sans)' }}>
      <PageHero
        crumb={dest.name}
        title={dest.name}
        subtitle={`${dest.state ? dest.state + ', ' : ''}${dest.country}`}
        image={getImageUrl(dest.image)}
      />

      <style>{`
        .dest-detail-content {
          background: white;
          border-radius: 20px;
          padding: 3.5rem;
          box-shadow: 0 15px 40px rgba(0,0,0,0.06);
          margin-top: -80px;
          position: relative;
          z-index: 10;
        }
        .dest-detail-grid { display: grid; grid-template-columns: 1.6fr 1fr; gap: 3.5rem; }
        .dest-region-badge {
          display: inline-block; padding: 0.4rem 1rem; border-radius: 100px;
          background: rgba(24,106,118,0.1); color: #186a76;
          font-size: 0.75rem; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.08em; margin-bottom: 1.5rem;
        }
        .dest-description {
          font-size: 1.1rem; color: #475569; line-height: 1.85; margin-bottom: 2.5rem;
        }
        .dest-section-title {
          font-size: 1.5rem; color: #0f172a; margin: 0 0 1.25rem;
          font-family: var(--font-serif); font-weight: 700; display: flex; align-items: center; gap: 0.6rem;
        }
        .dest-tag-list { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 2.5rem; }
        .dest-tag {
          padding: 0.5rem 1rem; border-radius: 10px; background: #f1f5f9;
          color: #334155; font-size: 0.85rem; font-weight: 600;
        }
        .dest-tips-list { display: flex; flex-direction: column; gap: 0.9rem; }
        .dest-tip-item {
          display: flex; gap: 0.75rem; align-items: flex-start;
          font-size: 0.95rem; color: #475569; line-height: 1.6;
        }
        .dest-sidebar-card {
          background: #f8fafc; border-radius: 16px; padding: 1.75rem;
          border: 1px solid #e2e8f0; position: sticky; top: 6rem;
        }
        .dest-fact-row {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.85rem 0; border-bottom: 1px solid #e2e8f0;
        }
        .dest-fact-row:last-of-type { border-bottom: none; }
        .dest-cta-btn {
          margin-top: 1.5rem; width: 100%; display: flex; align-items: center; justify-content: center;
          gap: 0.5rem; padding: 0.9rem; border-radius: 10px; background: #186a76; color: #fff;
          font-weight: 700; text-decoration: none; transition: background 0.2s, transform 0.2s;
        }
        .dest-cta-btn:hover { background: #124d56; transform: translateY(-2px); }

        @media (max-width: 900px) {
          .dest-detail-content { padding: 2rem 1.5rem; margin-top: -40px; }
          .dest-detail-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .dest-sidebar-card { position: static; }
        }
      `}</style>

      <div className="container" style={{ paddingBottom: '6rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div className="dest-detail-content">
          <div className="dest-detail-grid">
            <div>
              <span className="dest-region-badge">{dest.region}</span>

              {dest.description && (
                <p className="dest-description">{dest.description}</p>
              )}

              {dest.attractions?.length > 0 && (
                <>
                  <h3 className="dest-section-title"><Compass size={22} color="#D4AF37" /> Top Attractions</h3>
                  <div className="dest-tag-list">
                    {dest.attractions.map((a, i) => <span key={i} className="dest-tag">{a}</span>)}
                  </div>
                </>
              )}

              {dest.tips?.length > 0 && (
                <>
                  <h3 className="dest-section-title"><Lightbulb size={22} color="#D4AF37" /> Travel Tips</h3>
                  <div className="dest-tips-list">
                    {dest.tips.map((tip, i) => (
                      <div key={i} className="dest-tip-item">
                        <ArrowRight size={16} color="#186a76" style={{ flexShrink: 0, marginTop: 3 }} />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div>
              <div className="dest-sidebar-card">
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.5rem' }}>At a Glance</h3>

                <div className="dest-fact-row">
                  <MapPin size={18} color="#186a76" />
                  <div>
                    <div style={{ fontSize: '.75rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>Location</div>
                    <div style={{ fontSize: '.9rem', fontWeight: 600, color: '#1e293b' }}>{dest.state ? `${dest.state}, ` : ''}{dest.country}</div>
                  </div>
                </div>

                <div className="dest-fact-row">
                  <CalendarDays size={18} color="#186a76" />
                  <div>
                    <div style={{ fontSize: '.75rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>Best Time to Visit</div>
                    <div style={{ fontSize: '.9rem', fontWeight: 600, color: '#1e293b' }}>{dest.bestTime || 'Anytime'}</div>
                  </div>
                </div>

                <Link to={`/packages?q=${encodeURIComponent(dest.name)}`} className="dest-cta-btn">
                  Explore {dest.name} Packages <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
