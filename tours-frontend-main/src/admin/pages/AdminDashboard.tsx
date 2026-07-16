import { useEffect, useState } from 'react'
import { Package, MessageSquare, MapPin, Mail, TrendingUp, Star, Clock, CheckCircle2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useApi } from '../AuthContext'

type Stats = {
  totalPackages: number
  totalDestinations: number
  totalInquiries: number
  newInquiries: number
  totalSubscribers: number
}

type Inquiry = { id: string; name: string; subject: string; status: string; createdAt: string }

const statCards = (s: Stats) => [
  { icon: Package,       label: 'Total Packages',    value: s.totalPackages,    color: '#186a76', bg: 'rgba(24,106,118,.1)',  link: '/admin/packages' },
  { icon: MapPin,        label: 'Destinations',       value: s.totalDestinations, color: '#7c3aed', bg: 'rgba(124,58,237,.1)', link: '/admin/destinations' },
  { icon: MessageSquare, label: 'Total Inquiries',    value: s.totalInquiries,   color: '#e49d21', bg: 'rgba(228,157,33,.1)', link: '/admin/inquiries' },
  { icon: Mail,          label: 'Subscribers',        value: s.totalSubscribers, color: '#16a34a', bg: 'rgba(22,163,74,.1)',  link: '/admin/subscribers' },
]

export default function AdminDashboard() {
  const api = useApi()
  const [stats, setStats] = useState<Stats | null>(null)
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api(`/api/admin/stats?t=${Date.now()}`).then(r => r.json()),
      api(`/api/admin/inquiries?t=${Date.now()}`).then(r => r.json()),
    ]).then(([s, inq]) => {
      setStats(s)
      setInquiries(Array.isArray(inq) ? inq.slice(0, 5) : [])
    }).finally(() => setLoading(false))
  }, [api])

  const statusColor: Record<string, string> = { new: '#e49d21', read: '#186a76', resolved: '#16a34a' }
  const statusBg:    Record<string, string> = { new: 'rgba(228,157,33,.1)', read: 'rgba(24,106,118,.1)', resolved: 'rgba(22,163,74,.1)' }
  const StatusIcon: Record<string, React.ElementType> = { new: Clock, read: Star, resolved: CheckCircle2 }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 48, height: 48, border: '4px solid #e2e8f0', borderTopColor: '#186a76', borderRadius: '50%', margin: 'auto', animation: 'spin 1s linear infinite' }} />
        <p style={{ marginTop: '1rem', color: '#64748b', fontSize: '.875rem' }}>Loading dashboard…</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  return (
    <div>
      {/* Page title */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, color: '#1a2332' }}>Dashboard</h1>
        <p style={{ color: '#64748b', fontSize: '.875rem', marginTop: '.25rem' }}>Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stat cards */}
      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {statCards(stats).map(c => (
            <Link key={c.label} to={c.link} style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              padding: '1.25rem', borderRadius: 16, background: '#fff',
              border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,.06)',
              textDecoration: 'none', color: 'inherit', transition: 'all .2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,.1)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,.06)' }}
            >
              <span style={{ width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 14, background: c.bg, flexShrink: 0 }}>
                <c.icon size={26} style={{ color: c.color }} />
              </span>
              <div>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, color: '#1a2332', lineHeight: 1 }}>{c.value}</p>
                <p style={{ fontSize: '.8125rem', color: '#64748b', marginTop: '.25rem' }}>{c.label}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* New inquiries alert */}
      {stats && stats.newInquiries > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '.875rem', padding: '1rem 1.25rem', borderRadius: 12, background: 'rgba(228,157,33,.08)', border: '1px solid rgba(228,157,33,.2)', marginBottom: '1.5rem' }}>
          <Clock size={20} style={{ color: '#e49d21', flexShrink: 0 }} />
          <p style={{ fontSize: '.9rem', color: '#1a2332' }}>
            You have <strong style={{ color: '#e49d21' }}>{stats.newInquiries} new inquiry{stats.newInquiries > 1 ? 'ies' : ''}</strong> waiting for your response.
          </p>
          <Link to="/admin/inquiries" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontSize: '.8125rem', fontWeight: 600, color: '#e49d21', textDecoration: 'none', flexShrink: 0 }}>
            Review <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {/* Recent inquiries table */}
      <div style={{ borderRadius: 16, background: '#fff', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,.06)' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', fontWeight: 600, color: '#1a2332' }}>Recent Inquiries</h2>
          <Link to="/admin/inquiries" style={{ fontSize: '.8125rem', fontWeight: 600, color: '#186a76', textDecoration: 'none' }}>View all →</Link>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Customer', 'Package / Subject', 'Date', 'Status'].map(h => (
                  <th key={h} style={{ padding: '.875rem 1.25rem', textAlign: 'left', fontSize: '.75rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#94a3b8', borderBottom: '1px solid #f1f5f9' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inquiries.length === 0 ? (
                <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8', fontSize: '.875rem' }}>No inquiries yet.</td></tr>
              ) : inquiries.map((inq, i) => {
                const SIcon = StatusIcon[inq.status] ?? Clock
                return (
                  <tr key={inq.id} style={{ borderBottom: i < inquiries.length - 1 ? '1px solid #f1f5f9' : 'none', transition: 'background .15s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '.875rem 1.25rem', fontSize: '.9rem', fontWeight: 600, color: '#1a2332' }}>{inq.name}</td>
                    <td style={{ padding: '.875rem 1.25rem', fontSize: '.875rem', color: '#475569' }}>{inq.subject || '—'}</td>
                    <td style={{ padding: '.875rem 1.25rem', fontSize: '.8125rem', color: '#94a3b8' }}>
                      {new Date(inq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td style={{ padding: '.875rem 1.25rem' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '.25rem .75rem', borderRadius: 9999, fontSize: '.75rem', fontWeight: 600, background: statusBg[inq.status], color: statusColor[inq.status] }}>
                        <SIcon size={12} />{inq.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick links */}
      <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem' }}>
        {[
          { label: 'Add New Package', to: '/admin/packages?action=new', icon: Package, color: '#186a76' },
          { label: 'View All Inquiries', to: '/admin/inquiries', icon: MessageSquare, color: '#e49d21' },
          { label: 'Manage Subscribers', to: '/admin/subscribers', icon: Mail, color: '#16a34a' },
          { label: 'View Live Site', to: '/', icon: TrendingUp, color: '#7c3aed', external: true },
        ].map(q => (
          <Link key={q.label} to={q.to} target={q.external ? '_blank' : undefined} style={{
            display: 'flex', alignItems: 'center', gap: '.875rem',
            padding: '1rem 1.25rem', borderRadius: 12, background: '#fff',
            border: '1px solid #e2e8f0', textDecoration: 'none', color: 'inherit',
            fontSize: '.9rem', fontWeight: 500, transition: 'all .2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = q.color; e.currentTarget.style.background = '#f8fafc' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#fff' }}
          >
            <q.icon size={18} style={{ color: q.color }} />{q.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
