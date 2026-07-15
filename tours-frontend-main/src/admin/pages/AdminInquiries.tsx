import { useEffect, useState, useCallback } from 'react'
import { Clock, Star, CheckCircle2, Trash2, RefreshCw, MessageSquare } from 'lucide-react'
import { useApi } from '../AuthContext'

type Inquiry = {
  id: string
  subject: string
  name: string
  email: string
  phone: string
  travelers: number
  date: string
  message: string
  status: 'new' | 'read' | 'resolved'
  createdAt: string
}

const STATUS_OPTIONS = ['new', 'read', 'resolved'] as const
const statusColor: Record<string, string> = { new: '#ffb7b2', read: '#a8e6cf', resolved: '#16a34a' }
const statusBg:    Record<string, string> = { new: 'rgba(255,183,178,.1)', read: 'rgba(168,230,207,.1)', resolved: 'rgba(22,163,74,.1)' }
const StatusIcon: Record<string, React.ElementType> = { new: Clock, read: Star, resolved: CheckCircle2 }

export default function AdminInquiries() {
  const api = useApi()
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [selected, setSelected] = useState<Inquiry | null>(null)

  const load = useCallback(() => {
    setLoading(true)
    api(`/api/admin/inquiries?t=${Date.now()}`).then(r => r.json()).then(data => {
      setInquiries(Array.isArray(data) ? data : [])
    }).finally(() => setLoading(false))
  }, [api])

  useEffect(() => { load() }, [load])

  const updateStatus = async (id: string, status: string) => {
    await api(`/api/admin/inquiries/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    })
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: status as Inquiry['status'] } : i))
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: status as Inquiry['status'] } : null)
  }

  const deleteInquiry = async (id: string) => {
    if (!confirm('Delete this inquiry? This cannot be undone.')) return
    await api(`/api/admin/inquiries/${id}`, { method: 'DELETE' })
    setInquiries(prev => prev.filter(i => i.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  const filtered = filterStatus === 'all' ? inquiries : inquiries.filter(i => i.status === filterStatus)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, color: '#1a2332' }}>Inquiries</h1>
          <p style={{ color: '#64748b', fontSize: '.875rem' }}>Manage and respond to travel inquiries</p>
        </div>
        <button onClick={load} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', padding: '.625rem 1rem', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontSize: '.875rem', fontFamily: 'var(--font-sans)' }}>
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {/* Status filter tabs */}
      <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {['all', ...STATUS_OPTIONS].map(s => {
          const count = s === 'all' ? inquiries.length : inquiries.filter(i => i.status === s).length
          return (
            <button key={s} onClick={() => setFilterStatus(s)} style={{
              padding: '.5rem 1rem', borderRadius: 9999, fontSize: '.8125rem', fontWeight: 600,
              border: 'none', cursor: 'pointer', transition: 'all .15s', fontFamily: 'var(--font-sans)',
              background: filterStatus === s ? '#a8e6cf' : '#fff',
              color: filterStatus === s ? '#fff' : '#475569',
              boxShadow: '0 1px 3px rgba(0,0,0,.08)',
            }}>
              {s.charAt(0).toUpperCase() + s.slice(1)} ({count})
            </button>
          )
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: '1.25rem', alignItems: 'start' }}>
        {/* Table */}
        <div style={{ borderRadius: 16, background: '#fff', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,.06)' }}>
          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>Loading inquiries…</div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center' }}>
              <MessageSquare size={40} style={{ color: '#e2e8f0', margin: '0 auto .75rem' }} />
              <p style={{ color: '#94a3b8' }}>No inquiries found.</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['Customer', 'Package / Subject', 'Travelers', 'Date Received', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '.875rem 1rem', textAlign: 'left', fontSize: '.75rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#94a3b8', borderBottom: '1px solid #f1f5f9', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((inq, i) => {
                  const SIcon = StatusIcon[inq.status]
                  return (
                    <tr key={inq.id}
                      onClick={() => setSelected(inq)}
                      style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f1f5f9' : 'none', cursor: 'pointer', background: selected?.id === inq.id ? '#f0f7ff' : 'transparent', transition: 'background .15s' }}
                      onMouseEnter={e => { if (selected?.id !== inq.id) e.currentTarget.style.background = '#f8fafc' }}
                      onMouseLeave={e => { if (selected?.id !== inq.id) e.currentTarget.style.background = 'transparent' }}
                    >
                      <td style={{ padding: '.875rem 1rem' }}>
                        <p style={{ fontSize: '.9rem', fontWeight: 600, color: '#1a2332' }}>{inq.name}</p>
                        <p style={{ fontSize: '.75rem', color: '#94a3b8' }}>{inq.email}</p>
                      </td>
                      <td style={{ padding: '.875rem 1rem', fontSize: '.875rem', color: '#475569', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inq.subject || '—'}</td>
                      <td style={{ padding: '.875rem 1rem', fontSize: '.875rem', color: '#475569', textAlign: 'center' }}>{inq.travelers}</td>
                      <td style={{ padding: '.875rem 1rem', fontSize: '.8125rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                        {new Date(inq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td style={{ padding: '.875rem 1rem' }}>
                        <select value={inq.status} onClick={e => e.stopPropagation()}
                          onChange={e => { e.stopPropagation(); updateStatus(inq.id, e.target.value) }}
                          style={{ padding: '.25rem .5rem', borderRadius: 9999, border: 'none', fontSize: '.75rem', fontWeight: 600, cursor: 'pointer', background: statusBg[inq.status], color: statusColor[inq.status], fontFamily: 'var(--font-sans)' }}
                        >
                          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td style={{ padding: '.875rem 1rem' }}>
                        <button onClick={e => { e.stopPropagation(); deleteInquiry(inq.id) }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, border: '1px solid #fee2e2', background: '#fff5f5', cursor: 'pointer', color: '#ef4444', transition: 'all .15s' }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = '#fff' }}
                          onMouseLeave={e => { e.currentTarget.style.background = '#fff5f5'; e.currentTarget.style.color = '#ef4444' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div style={{ borderRadius: 16, background: '#fff', border: '1px solid #e2e8f0', padding: '1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,.06)', position: 'sticky', top: 72 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', fontWeight: 600 }}>Inquiry Detail</h3>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '1.25rem', lineHeight: 1 }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.875rem', fontSize: '.875rem' }}>
              {[
                { label: 'Name', value: selected.name },
                { label: 'Email', value: selected.email },
                { label: 'Phone', value: selected.phone },
                { label: 'Package', value: selected.subject || '—' },
                { label: 'Travelers', value: String(selected.travelers) },
                { label: 'Preferred Date', value: selected.date || 'Not specified' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={{ fontSize: '.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: '#94a3b8' }}>{label}</span>
                  <span style={{ color: '#1a2332', fontWeight: 500 }}>{value}</span>
                </div>
              ))}
              <div>
                <span style={{ fontSize: '.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: '#94a3b8', display: 'block', marginBottom: 4 }}>Message</span>
                <p style={{ color: '#475569', lineHeight: 1.65, background: '#f8fafc', borderRadius: 8, padding: '.75rem' }}>{selected.message || 'No message.'}</p>
              </div>
              <div style={{ display: 'flex', gap: '.5rem', paddingTop: '.5rem' }}>
                <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} style={{ flex: 1, padding: '.625rem', borderRadius: 8, textAlign: 'center', background: '#a8e6cf', color: '#fff', textDecoration: 'none', fontSize: '.875rem', fontWeight: 600 }}>
                  Reply by Email
                </a>
                <a href={`tel:${selected.phone}`} style={{ flex: 1, padding: '.625rem', borderRadius: 8, textAlign: 'center', background: '#f0f7ff', color: '#a8e6cf', textDecoration: 'none', fontSize: '.875rem', fontWeight: 600, border: '1px solid #bfdbfe' }}>
                  Call
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
