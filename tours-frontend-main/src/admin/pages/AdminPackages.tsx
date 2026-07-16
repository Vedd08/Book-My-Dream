import { useEffect, useState, useCallback } from 'react'
import { Plus, Pencil, Trash2, X, Save, Package as PkgIcon } from 'lucide-react'
import { getImageUrl } from '../../config'
import { useApi } from '../AuthContext'
import { inr } from '../../data'

type Pkg = {
  slug: string; name: string; type: string; region: string
  destination: string; country: string; duration: string
  price: number; discountPrice: number; rating: number
  reviews: number; image: string; featured?: boolean
  highlights: string[]; inclusions: string[]; exclusions: string[];
  itinerary: { day: number; title: string; description: string }[];
  faqs: { q: string; a: string }[];
}

const TYPES = ['Honeymoon', 'Family', 'Luxury', 'Group', 'Adventure', 'Solo']
const REGIONS = ['Domestic', 'International']
const emptyForm = (): Omit<Pkg, 'rating' | 'reviews'> & { rating: string; reviews: string } => ({
  slug: '', name: '', type: 'Group', region: 'Domestic',
  destination: '', country: 'India', duration: '3 Days / 2 Nights',
  price: 0, discountPrice: 0, rating: '4.5', reviews: '0',
  image: '/images/dest-goa.png', featured: false,
  highlights: [], inclusions: [], exclusions: [], itinerary: [], faqs: []
})

export default function AdminPackages() {
  const api = useApi()
  const [packages, setPackages] = useState<Pkg[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm())
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const load = useCallback(() => {
    setLoading(true)
    api('/api/admin/packages').then(r => r.json()).then(d => setPackages(Array.isArray(d) ? d : [])).finally(() => setLoading(false))
  }, [])
  useEffect(() => { load() }, [load])

  const update = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))

  const openAdd = () => { setForm(emptyForm()); setEditing(null); setShowForm(true); setMsg('') }
  const openEdit = (pkg: Pkg) => {
    setForm({ 
      ...pkg, 
      price: pkg.price, discountPrice: pkg.discountPrice, rating: String(pkg.rating), reviews: String(pkg.reviews),
      highlights: pkg.highlights ?? [], inclusions: pkg.inclusions ?? [], exclusions: pkg.exclusions ?? [],
      itinerary: pkg.itinerary ?? [], faqs: pkg.faqs ?? []
    })
    setEditing(pkg.slug); setShowForm(true); setMsg('')
  }

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true); setMsg('')
    const body = {
      ...form,
      price: Number(form.price), discountPrice: Number(form.discountPrice),
      rating: parseFloat(form.rating), reviews: parseInt(form.reviews),
    }
    const method = editing ? 'PUT' : 'POST'
    const url    = editing ? `/api/admin/packages/${editing}` : '/api/admin/packages'
    const res = await api(url, { method, body: JSON.stringify(body) })
    if (res.ok) {
      setMsg(editing ? 'Package updated!' : 'Package added!')
      load(); setShowForm(false)
    } else {
      const err = await res.json()
      setMsg(err.error ?? 'Error saving package')
    }
    setSaving(false)
  }

  const remove = async (slug: string) => {
    if (!confirm('Delete this package? This cannot be undone.')) return
    const res = await api(`/api/admin/packages/${slug}`, { method: 'DELETE' })
    if (res.ok) {
      setMsg('Package deleted!')
      load()
    } else {
      setMsg('Failed to delete package')
    }
  }

  const discount = (p: Pkg) => p.price > 0 ? Math.round(((p.price - p.discountPrice) / p.price) * 100) : 0

  const inputStyle: React.CSSProperties = { width: '100%', padding: '.5rem .75rem', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '.875rem', fontFamily: 'var(--font-sans)', outline: 'none', boxSizing: 'border-box' }
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: '.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', color: '#64748b', marginBottom: 4 }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, color: '#1a2332' }}>Packages</h1>
          <p style={{ color: '#64748b', fontSize: '.875rem' }}>Manage all holiday packages</p>
        </div>
        <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', padding: '.625rem 1.25rem', borderRadius: 10, border: 'none', background: '#186a76', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: '.9rem', fontFamily: 'var(--font-sans)', boxShadow: '0 2px 8px rgba(24,106,118,.3)' }}>
          <Plus size={18} /> Add Package
        </button>
      </div>

      {msg && <div style={{ padding: '.875rem 1.25rem', borderRadius: 10, background: (msg.includes('added') || msg.includes('updated')) ? 'rgba(22,163,74,.1)' : 'rgba(239,68,68,.1)', border: `1px solid ${(msg.includes('added') || msg.includes('updated')) ? 'rgba(22,163,74,.25)' : 'rgba(239,68,68,.25)'}`, color: (msg.includes('added') || msg.includes('updated')) ? '#16a34a' : '#ef4444', fontSize: '.875rem', marginBottom: '1rem' }}>{msg}</div>}

      {/* Package grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1rem' }}>
        {loading ? (
          <div style={{ gridColumn: '1/-1', padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>Loading packages…</div>
        ) : packages.map(pkg => (
          <div key={pkg.slug} style={{ borderRadius: 14, background: '#fff', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,.06)' }}>
            <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
              <img src={getImageUrl(pkg.image)} alt={pkg.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.5), transparent)' }} />
              <div style={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 6 }}>
                <span style={{ padding: '.2rem .6rem', borderRadius: 9999, background: 'rgba(255,255,255,.9)', fontSize: '.7rem', fontWeight: 700, color: '#186a76' }}>{pkg.type}</span>
                {pkg.featured && <span style={{ padding: '.2rem .6rem', borderRadius: 9999, background: '#e49d21', fontSize: '.7rem', fontWeight: 700, color: '#fff' }}>Featured</span>}
                {discount(pkg) > 0 && <span style={{ padding: '.2rem .6rem', borderRadius: 9999, background: '#16a34a', fontSize: '.7rem', fontWeight: 700, color: '#fff' }}>{discount(pkg)}% OFF</span>}
              </div>
              <p style={{ position: 'absolute', bottom: 8, left: 10, fontSize: '.8rem', color: 'rgba(255,255,255,.9)', fontWeight: 500 }}>{pkg.destination}, {pkg.country}</p>
            </div>
            <div style={{ padding: '1rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 600, color: '#1a2332', lineHeight: 1.3 }}>{pkg.name}</h3>
              <p style={{ fontSize: '.8125rem', color: '#64748b', marginTop: '.25rem' }}>{pkg.duration} · ⭐ {pkg.rating}</p>
              <div style={{ marginTop: '.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 700, color: '#186a76' }}>{inr(pkg.discountPrice)}</p>
                  {pkg.price !== pkg.discountPrice && <p style={{ fontSize: '.75rem', color: '#94a3b8', textDecoration: 'line-through' }}>{inr(pkg.price)}</p>}
                </div>
                <div style={{ display: 'flex', gap: '.5rem' }}>
                  <button onClick={() => openEdit(pkg)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, border: '1px solid #bfdbfe', background: '#f0f7ff', cursor: 'pointer', color: '#186a76', transition: 'all .15s' }}>
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => remove(pkg.slug)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, border: '1px solid #fee2e2', background: '#fff5f5', cursor: 'pointer', color: '#ef4444', transition: 'all .15s' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit slide-over */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex' }}>
          <div style={{ flex: 1, background: 'rgba(0,0,0,.4)', backdropFilter: 'blur(4px)' }} onClick={() => setShowForm(false)} />
          <div style={{ width: '100%', maxWidth: 640, background: '#fff', overflowY: 'auto', boxShadow: '-8px 0 40px rgba(0,0,0,.15)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#fff', zIndex: 1 }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600 }}>{editing ? 'Edit Package' : 'Add New Package'}</h2>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 4 }}><X size={20} /></button>
            </div>
            <form onSubmit={save} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <label style={{ gridColumn: 'span 2' }}>
                  <span style={labelStyle}>Package Name</span>
                  <input required value={form.name} onChange={e => update('name', e.target.value)} style={inputStyle} />
                </label>
                <label style={{ gridColumn: 'span 2' }}>
                  <span style={labelStyle}>Slug (URL)</span>
                  <input required disabled={!!editing} value={form.slug} onChange={e => update('slug', e.target.value)} style={{ ...inputStyle, background: editing ? '#f8fafc' : '#fff' }} />
                </label>
                <label style={{ gridColumn: 'span 1' }}>
                  <span style={labelStyle}>Destination</span>
                  <input required value={form.destination} onChange={e => update('destination', e.target.value)} style={inputStyle} />
                </label>
                <label style={{ gridColumn: 'span 1' }}>
                  <span style={labelStyle}>Country</span>
                  <input required value={form.country} onChange={e => update('country', e.target.value)} style={inputStyle} />
                </label>
                <label style={{ gridColumn: 'span 2' }}>
                  <span style={labelStyle}>Duration</span>
                  <input required value={form.duration} onChange={e => update('duration', e.target.value)} style={inputStyle} />
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
                  {form.image && <img src={getImageUrl(form.image)} alt="Preview" style={{ marginTop: '0.5rem', width: '100%', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />}
                </label>
                <label>
                  <span style={labelStyle}>Type</span>
                  <select value={form.type} onChange={e => update('type', e.target.value)} style={inputStyle}>
                    {TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </label>
                <label>
                  <span style={labelStyle}>Region</span>
                  <select value={form.region} onChange={e => update('region', e.target.value)} style={inputStyle}>
                    {REGIONS.map(r => <option key={r}>{r}</option>)}
                  </select>
                </label>
                {[
                  { key: 'price', label: 'Original Price (₹)' },
                  { key: 'discountPrice', label: 'Sale Price (₹)' },
                  { key: 'rating', label: 'Rating (0–5)' },
                  { key: 'reviews', label: 'Reviews Count' },
                ].map(({ key, label }) => (
                  <label key={key}>
                    <span style={labelStyle}>{label}</span>
                    <input type="number" step="0.1" value={String((form as any)[key])} onChange={e => update(key, e.target.value)} style={inputStyle} />
                  </label>
                ))}
                <label style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', gap: '.75rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={!!form.featured} onChange={e => update('featured', e.target.checked)} style={{ width: 18, height: 18 }} />
                  <span style={{ fontWeight: 500, fontSize: '.875rem' }}>Mark as Featured Package</span>
                </label>
              </div>

              {/* Advanced Arrays Section */}
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#1a2332' }}>Additional Details</h3>
                
                <label>
                  <span style={labelStyle}>Tour Highlights (One per line)</span>
                  <textarea value={form.highlights?.join('\n')} onChange={e => update('highlights', e.target.value.split('\n').filter(Boolean))} style={{ ...inputStyle, minHeight: 80 }} placeholder="e.g. Guided tour of the Taj Mahal&#10;Sunset cruise on the backwaters" />
                </label>
                
                <label>
                  <span style={labelStyle}>Inclusions (One per line)</span>
                  <textarea value={form.inclusions?.join('\n')} onChange={e => update('inclusions', e.target.value.split('\n').filter(Boolean))} style={{ ...inputStyle, minHeight: 80 }} placeholder="e.g. Airport Transfers&#10;Breakfast & Dinner" />
                </label>
                
                <label>
                  <span style={labelStyle}>Exclusions (One per line)</span>
                  <textarea value={form.exclusions?.join('\n')} onChange={e => update('exclusions', e.target.value.split('\n').filter(Boolean))} style={{ ...inputStyle, minHeight: 80 }} placeholder="e.g. Flight Tickets&#10;Personal Expenses" />
                </label>

                <div>
                  <span style={{ ...labelStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Itinerary
                    <button type="button" onClick={() => update('itinerary', [...(form.itinerary || []), { day: (form.itinerary?.length || 0) + 1, title: '', description: '' }])} style={{ color: '#186a76', background: 'none', border: 'none', fontSize: '.75rem', cursor: 'pointer', fontWeight: 600 }}>+ Add Day</button>
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', marginTop: '.5rem' }}>
                    {form.itinerary?.map((it, i) => (
                      <div key={i} style={{ border: '1px solid #e2e8f0', padding: '.75rem', borderRadius: 8, background: '#f8fafc' }}>
                        <div style={{ display: 'flex', gap: '.5rem', marginBottom: '.5rem' }}>
                          <input placeholder="Day" type="number" value={it.day} onChange={e => { const n = [...form.itinerary]; n[i].day = Number(e.target.value); update('itinerary', n) }} style={{ width: 60, ...inputStyle }} />
                          <input placeholder="Title (e.g. Arrival in Delhi)" value={it.title} onChange={e => { const n = [...form.itinerary]; n[i].title = e.target.value; update('itinerary', n) }} style={{ flex: 1, ...inputStyle }} />
                          <button type="button" onClick={() => { const n = [...form.itinerary]; n.splice(i, 1); update('itinerary', n) }} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><X size={16} /></button>
                        </div>
                        <textarea placeholder="Description of the day's activities..." value={it.description} onChange={e => { const n = [...form.itinerary]; n[i].description = e.target.value; update('itinerary', n) }} style={{ ...inputStyle, minHeight: 60 }} />
                      </div>
                    ))}
                    {(!form.itinerary || form.itinerary.length === 0) && <p style={{ fontSize: '.875rem', color: '#94a3b8' }}>No itinerary days added.</p>}
                  </div>
                </div>

                <div>
                  <span style={{ ...labelStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Frequently Asked Questions (FAQs)
                    <button type="button" onClick={() => update('faqs', [...(form.faqs || []), { q: '', a: '' }])} style={{ color: '#186a76', background: 'none', border: 'none', fontSize: '.75rem', cursor: 'pointer', fontWeight: 600 }}>+ Add FAQ</button>
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', marginTop: '.5rem' }}>
                    {form.faqs?.map((faq, i) => (
                      <div key={i} style={{ border: '1px solid #e2e8f0', padding: '.75rem', borderRadius: 8, background: '#f8fafc' }}>
                        <div style={{ display: 'flex', gap: '.5rem', marginBottom: '.5rem' }}>
                          <input placeholder="Question" value={faq.q} onChange={e => { const n = [...form.faqs]; n[i].q = e.target.value; update('faqs', n) }} style={{ flex: 1, ...inputStyle }} />
                          <button type="button" onClick={() => { const n = [...form.faqs]; n.splice(i, 1); update('faqs', n) }} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><X size={16} /></button>
                        </div>
                        <textarea placeholder="Answer" value={faq.a} onChange={e => { const n = [...form.faqs]; n[i].a = e.target.value; update('faqs', n) }} style={{ ...inputStyle, minHeight: 60 }} />
                      </div>
                    ))}
                    {(!form.faqs || form.faqs.length === 0) && <p style={{ fontSize: '.875rem', color: '#94a3b8' }}>No FAQs added.</p>}
                  </div>
                </div>
              </div>

              <div style={{ position: 'sticky', bottom: 0, background: '#fff', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '.75rem', zIndex: 10 }}>
                <button type="submit" disabled={saving} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem', padding: '.75rem', borderRadius: 10, border: 'none', background: '#186a76', color: '#fff', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-sans)', fontSize: '.9rem' }}>
                  <Save size={18} />{saving ? 'Saving…' : (editing ? 'Update Package' : 'Add Package')}
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
