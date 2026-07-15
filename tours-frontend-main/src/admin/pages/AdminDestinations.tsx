import { useEffect, useState, useCallback } from 'react'
import { Plus, Pencil, Trash2, X, Save, MapPin, RefreshCw } from 'lucide-react'
import { useApi } from '../AuthContext'

type Destination = {
  slug: string
  name: string
  country: string
  state: string
  region: string
  bestTime: string
  image: string
  description: string
}

const REGIONS = ['Domestic', 'International', 'Honeymoon']
const emptyForm = (): Destination => ({
  slug: '', name: '', country: 'India', state: '', region: 'Domestic',
  bestTime: 'Anytime', image: '', description: ''
})

export default function AdminDestinations() {
  const api = useApi()
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm())
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const load = useCallback(() => {
    setLoading(true)
    api('/api/admin/destinations').then(r => r.json()).then(data => {
      setDestinations(Array.isArray(data) ? data : [])
    }).finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  const update = (k: string, v: string | number | boolean) => setForm(f => ({ ...f, [k]: v }))

  const openAdd = () => { setForm(emptyForm()); setEditing(null); setShowForm(true); setMsg('') }
  const openEdit = (dest: Destination) => {
    setForm(dest)
    setEditing(dest.slug); setShowForm(true); setMsg('')
  }

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true); setMsg('')
    const method = editing ? 'PUT' : 'POST'
    const url    = editing ? `/api/admin/destinations/${editing}` : '/api/admin/destinations'
    const res = await api(url, { method, body: JSON.stringify(form) })
    if (res.ok) {
      setMsg(editing ? 'Destination updated!' : 'Destination added!')
      load(); setShowForm(false)
    } else {
      const err = await res.json()
      setMsg(err.error ?? 'Error saving destination')
    }
    setSaving(false)
  }

  const remove = async (slug: string) => {
    if (!confirm('Delete this destination? This cannot be undone.')) return
    const res = await api(`/api/admin/destinations/${slug}`, { method: 'DELETE' })
    if (res.ok) {
      setMsg('Destination deleted!')
      load()
    } else {
      setMsg('Failed to delete destination')
    }
  }

  const inputStyle: React.CSSProperties = { width: '100%', padding: '.5rem .75rem', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '.875rem', fontFamily: 'var(--font-sans)', outline: 'none', boxSizing: 'border-box' }
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: '.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', color: '#64748b', marginBottom: 4 }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, color: '#1a2332' }}>Destinations</h1>
          <p style={{ color: '#64748b', fontSize: '.875rem' }}>Manage all destinations</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={load} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', padding: '.625rem 1rem', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontSize: '.875rem', fontFamily: 'var(--font-sans)' }}>
            <RefreshCw size={16} /> Refresh
          </button>
          <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', padding: '.625rem 1.25rem', borderRadius: 10, border: 'none', background: '#a8e6cf', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: '.9rem', fontFamily: 'var(--font-sans)', boxShadow: '0 2px 8px rgba(168,230,207,.3)' }}>
            <Plus size={18} /> Add Destination
          </button>
        </div>
      </div>

      {msg && <div style={{ padding: '.875rem 1.25rem', borderRadius: 10, background: (msg.includes('added') || msg.includes('updated')) ? 'rgba(22,163,74,.1)' : 'rgba(239,68,68,.1)', border: `1px solid ${(msg.includes('added') || msg.includes('updated')) ? 'rgba(22,163,74,.25)' : 'rgba(239,68,68,.25)'}`, color: (msg.includes('added') || msg.includes('updated')) ? '#16a34a' : '#ef4444', fontSize: '.875rem', marginBottom: '1rem' }}>{msg}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: '1.25rem' }}>
        {loading ? (
          <div style={{ gridColumn: '1/-1', padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>Loading destinations…</div>
        ) : destinations.length === 0 ? (
          <div style={{ gridColumn: '1/-1', padding: '3rem', textAlign: 'center' }}>
            <MapPin size={40} style={{ color: '#e2e8f0', margin: '0 auto .75rem' }} />
            <p style={{ color: '#94a3b8' }}>No destinations found.</p>
          </div>
        ) : (
          destinations.map(dest => (
            <div key={dest.slug} style={{ borderRadius: 14, background: '#fff', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,.06)' }}>
              <div style={{ position: 'relative', height: 140, overflow: 'hidden' }}>
                <img src={dest.image} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.6), transparent)' }} />
                <span style={{ position: 'absolute', top: 8, left: 8, padding: '.2rem .6rem', borderRadius: 9999, background: 'rgba(255,255,255,.9)', fontSize: '.7rem', fontWeight: 700, color: '#a8e6cf' }}>{dest.region}</span>
                <p style={{ position: 'absolute', bottom: 8, left: 10, fontSize: '.9rem', color: '#fff', fontWeight: 600 }}>{dest.name}</p>
              </div>
              <div style={{ padding: '1rem' }}>
                <p style={{ fontSize: '.8125rem', color: '#475569', fontWeight: 500 }}>{dest.state ? dest.state + ', ' : ''}{dest.country}</p>
                <p style={{ fontSize: '.75rem', color: '#64748b', marginTop: '.25rem' }}>Best time: {dest.bestTime}</p>
                <div style={{ marginTop: '.75rem', display: 'flex', gap: '.5rem', justifyContent: 'flex-end' }}>
                  <button onClick={() => openEdit(dest)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, border: '1px solid #bfdbfe', background: '#f0f7ff', cursor: 'pointer', color: '#a8e6cf', transition: 'all .15s' }}>
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => remove(dest.slug)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, border: '1px solid #fee2e2', background: '#fff5f5', cursor: 'pointer', color: '#ef4444', transition: 'all .15s' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex' }}>
          <div style={{ flex: 1, background: 'rgba(0,0,0,.4)', backdropFilter: 'blur(4px)' }} onClick={() => setShowForm(false)} />
          <div style={{ width: '100%', maxWidth: 520, background: '#fff', overflowY: 'auto', boxShadow: '-8px 0 40px rgba(0,0,0,.15)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#fff', zIndex: 1 }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600 }}>{editing ? 'Edit Destination' : 'Add New Destination'}</h2>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 4 }}><X size={20} /></button>
            </div>
            <form onSubmit={save} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <label style={{ gridColumn: 'span 2' }}>
                  <span style={labelStyle}>Destination Name</span>
                  <input required value={form.name} onChange={e => update('name', e.target.value)} style={inputStyle} />
                </label>
                <label style={{ gridColumn: 'span 2' }}>
                  <span style={labelStyle}>Slug (URL)</span>
                  <input required disabled={!!editing} value={form.slug} onChange={e => update('slug', e.target.value)} style={{ ...inputStyle, background: editing ? '#f8fafc' : '#fff' }} />
                </label>
                <label style={{ gridColumn: 'span 1' }}>
                  <span style={labelStyle}>State / Province</span>
                  {form.country.toLowerCase() === 'india' ? (
                    <select required value={form.state} onChange={e => update('state', e.target.value)} style={inputStyle}>
                      <option value="">Select State/UT...</option>
                      {[
                        "Andaman & Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
                        "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli and Daman & Diu", "Delhi", "Goa",
                        "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka",
                        "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
                        "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
                        "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
                      ].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  ) : (
                    <input required value={form.state} onChange={e => update('state', e.target.value)} style={inputStyle} />
                  )}
                </label>
                <label style={{ gridColumn: 'span 1' }}>
                  <span style={labelStyle}>Country</span>
                  <input required value={form.country} onChange={e => update('country', e.target.value)} style={inputStyle} />
                </label>
                <label>
                  <span style={labelStyle}>Region</span>
                  <select value={form.region} onChange={e => update('region', e.target.value)} style={inputStyle}>
                    {REGIONS.map(r => <option key={r}>{r}</option>)}
                  </select>
                </label>
                <label>
                  <span style={labelStyle}>Best Time</span>
                  <input required value={form.bestTime} onChange={e => update('bestTime', e.target.value)} style={inputStyle} />
                </label>
                <label style={{ gridColumn: 'span 2' }}>
                  <span style={labelStyle}>Description</span>
                  <textarea required value={form.description} onChange={e => update('description', e.target.value)} style={{ ...inputStyle, minHeight: 80 }} />
                </label>
                <label style={{ gridColumn: 'span 2' }}>
                  <span style={labelStyle}>Image</span>
                  <input type="file" accept="image/*" onChange={async (e) => {
                    const file = e.target.files?.[0]; if (!file) return;
                    const data = new FormData(); data.append('image', file);
                    try {
                      const res = await api('/api/admin/upload', { method: 'POST', headers: {} as any, body: data });
                      if (!res.ok) throw new Error('Upload failed');
                      const json = await res.json();
                      update('image', json.url);
                    } catch (err) { alert('Failed to upload image') }
                  }} style={{ fontSize: '.875rem' }} />
                  {form.image && <img src={form.image} alt="Preview" style={{ marginTop: '0.5rem', width: '100%', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />}
                </label>
              </div>
              <div style={{ position: 'sticky', bottom: 0, background: '#fff', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '.75rem' }}>
                <button type="submit" disabled={saving} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem', padding: '.75rem', borderRadius: 10, border: 'none', background: '#a8e6cf', color: '#fff', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-sans)', fontSize: '.9rem' }}>
                  <Save size={18} />{saving ? 'Saving…' : (editing ? 'Update Destination' : 'Add Destination')}
                </button>
                <button type="button" onClick={() => setShowForm(false)} style={{ padding: '.75rem 1.25rem', borderRadius: 10, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '.9rem' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
