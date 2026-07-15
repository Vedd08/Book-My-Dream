import { useEffect, useState, useCallback } from 'react'
import { Mail, RefreshCw } from 'lucide-react'
import { useApi } from '../AuthContext'

type Subscriber = { email: string; createdAt: string }

export default function AdminSubscribers() {
  const api = useApi()
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(() => {
    setLoading(true)
    api('/api/admin/subscribers').then(r => r.json()).then(data => {
      setSubscribers(Array.isArray(data) ? data : [])
    }).finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, color: '#1a2332' }}>Subscribers</h1>
          <p style={{ color: '#64748b', fontSize: '.875rem' }}>Newsletter subscription list</p>
        </div>
        <button onClick={load} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', padding: '.625rem 1rem', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontSize: '.875rem', fontFamily: 'var(--font-sans)' }}>
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      <div style={{ borderRadius: 16, background: '#fff', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,.06)' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>Loading subscribers…</div>
        ) : subscribers.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <Mail size={40} style={{ color: '#e2e8f0', margin: '0 auto .75rem' }} />
            <p style={{ color: '#94a3b8' }}>No subscribers yet.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ padding: '.875rem 1.25rem', textAlign: 'left', fontSize: '.75rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#94a3b8', borderBottom: '1px solid #f1f5f9' }}>Email Address</th>
                <th style={{ padding: '.875rem 1.25rem', textAlign: 'left', fontSize: '.75rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#94a3b8', borderBottom: '1px solid #f1f5f9' }}>Date Subscribed</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub, i) => (
                <tr key={sub.email} style={{ borderBottom: i < subscribers.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                  <td style={{ padding: '.875rem 1.25rem', fontSize: '.9rem', fontWeight: 600, color: '#1a2332' }}>{sub.email}</td>
                  <td style={{ padding: '.875rem 1.25rem', fontSize: '.8125rem', color: '#64748b' }}>
                    {new Date(sub.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
