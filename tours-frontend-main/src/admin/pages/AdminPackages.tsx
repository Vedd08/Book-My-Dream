import { useEffect, useState, useCallback } from 'react'
import { Plus, Pencil, Trash2, X, Save, Package as PkgIcon } from 'lucide-react'
import { getImageUrl } from '../../config'
import { useApi } from '../AuthContext'
import { inr } from '../../data'

type Pkg = {
  slug: string; name: string; type: string; region: string
  destination: string; country: string; duration: string
  price: number; discountPrice: number; rating: number
  foreignCurrency?: string; foreignPrice?: number; foreignDiscountPrice?: number;
  reviews: number; image: string; featured?: boolean
  highlights: string[]; inclusions: string[]; exclusions: string[];
  itinerary: { day: number; title: string; description: string }[];
  faqs: { q: string; a: string }[];
}

const ALL_CURRENCIES = [
  { code: 'USD', name: 'US Dollar' }, { code: 'EUR', name: 'Euro' }, { code: 'GBP', name: 'British Pound' },
  { code: 'INR', name: 'Indian Rupee' }, { code: 'AUD', name: 'Australian Dollar' }, { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'SGD', name: 'Singapore Dollar' }, { code: 'CHF', name: 'Swiss Franc' }, { code: 'MYR', name: 'Malaysian Ringgit' },
  { code: 'JPY', name: 'Japanese Yen' }, { code: 'CNY', name: 'Chinese Yuan' }, { code: 'AED', name: 'UAE Dirham' },
  { code: 'NZD', name: 'New Zealand Dollar' }, { code: 'THB', name: 'Thai Baht' }, { code: 'ZAR', name: 'South African Rand' },
  { code: 'HKD', name: 'Hong Kong Dollar' }, { code: 'IDR', name: 'Indonesian Rupiah' }, { code: 'PHP', name: 'Philippine Peso' },
  { code: 'VND', name: 'Vietnamese Dong' }, { code: 'LKR', name: 'Sri Lankan Rupee' }, { code: 'NPR', name: 'Nepalese Rupee' },
  { code: 'BDT', name: 'Bangladeshi Taka' }, { code: 'SAR', name: 'Saudi Riyal' }, { code: 'QAR', name: 'Qatari Riyal' },
  { code: 'OMR', name: 'Omani Rial' }, { code: 'BHD', name: 'Bahraini Dinar' }, { code: 'KWD', name: 'Kuwaiti Dinar' },
  { code: 'MUR', name: 'Mauritian Rupee' }, { code: 'MVR', name: 'Maldivian Rufiyaa' }, { code: 'SEK', name: 'Swedish Krona' },
  { code: 'NOK', name: 'Norwegian Krone' }, { code: 'DKK', name: 'Danish Krone' }, { code: 'BRL', name: 'Brazilian Real' },
  { code: 'MXN', name: 'Mexican Peso' }, { code: 'ARS', name: 'Argentine Peso' }, { code: 'RUB', name: 'Russian Ruble' },
  { code: 'TRY', name: 'Turkish Lira' }, { code: 'EGP', name: 'Egyptian Pound' }, { code: 'ILS', name: 'Israeli New Shekel' },
  { code: 'PLN', name: 'Polish Zloty' }, { code: 'CZK', name: 'Czech Koruna' }, { code: 'HUF', name: 'Hungarian Forint' },
  { code: 'KRW', name: 'South Korean Won' }, { code: 'TWD', name: 'New Taiwan Dollar' }
];

const TYPES = ['Honeymoon', 'Family', 'Luxury', 'Group', 'Adventure', 'Solo']
const REGIONS = ['Domestic', 'International']
const emptyForm = (): Omit<Pkg, 'rating' | 'reviews' | 'foreignPrice' | 'foreignDiscountPrice'> & { rating: string; reviews: string; foreignPrice: string; foreignDiscountPrice: string } => ({
  slug: '', name: '', type: 'Group', region: 'Domestic',
  destination: '', country: 'India', duration: '3 Days / 2 Nights',
  price: 0, discountPrice: 0, rating: '4.5', reviews: '0',
  foreignCurrency: 'USD', foreignPrice: '', foreignDiscountPrice: '',
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

  const [uploadingImage, setUploadingImage] = useState(false)
  const [imageError, setImageError] = useState('')

  const load = useCallback(() => {
    setLoading(true)
    api('/api/admin/packages').then(r => r.json()).then(d => setPackages(Array.isArray(d) ? d : [])).finally(() => setLoading(false))
  }, [])
  useEffect(() => { load() }, [load])

  useEffect(() => {
    if (form.region === 'International' && form.foreignCurrency && (Number(form.price) > 0 || Number(form.discountPrice) > 0)) {
      const controller = new AbortController();
      fetch('https://api.exchangerate-api.com/v4/latest/INR', { signal: controller.signal })
        .then(res => res.json())
        .then(data => {
          const rate = data.rates[form.foreignCurrency!];
          if (rate) {
            setForm(f => {
              const priceToConvert = Number(f.discountPrice) > 0 ? Number(f.discountPrice) : Number(f.price);
              const newFP = String((priceToConvert * rate).toFixed(2));
              if (f.foreignPrice !== newFP) {
                return { ...f, foreignPrice: newFP, foreignDiscountPrice: '' };
              }
              return f;
            });
          }
        }).catch(err => {
          if (err.name !== 'AbortError') console.error('Rate fetch error', err);
        });
      return () => controller.abort();
    }
  }, [form.price, form.discountPrice, form.foreignCurrency, form.region]);

  const update = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))

  const openAdd = () => { setForm(emptyForm()); setEditing(null); setShowForm(true); setMsg(''); setImageError(''); setUploadingImage(false); }
  const openEdit = (pkg: Pkg) => {
    setForm({ 
      ...pkg, 
      price: pkg.price, discountPrice: pkg.discountPrice, rating: String(pkg.rating), reviews: String(pkg.reviews),
      foreignCurrency: pkg.foreignCurrency || 'USD',
      foreignPrice: pkg.foreignPrice ? String(pkg.foreignPrice) : '',
      foreignDiscountPrice: pkg.foreignDiscountPrice ? String(pkg.foreignDiscountPrice) : '',
      highlights: pkg.highlights ?? [], inclusions: pkg.inclusions ?? [], exclusions: pkg.exclusions ?? [],
      itinerary: pkg.itinerary ?? [], faqs: pkg.faqs ?? []
    })
    setEditing(pkg.slug); setShowForm(true); setMsg(''); setImageError(''); setUploadingImage(false);
  }

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    if (uploadingImage) return; // Prevent save if image is still uploading
    setSaving(true); setMsg('')
    const body = {
      ...form,
      price: Number(form.price), discountPrice: Number(form.discountPrice),
      rating: parseFloat(form.rating), reviews: parseInt(form.reviews),
      foreignPrice: form.foreignPrice ? Number(form.foreignPrice) : undefined,
      foreignDiscountPrice: form.foreignDiscountPrice ? Number(form.foreignDiscountPrice) : undefined,
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
              <img src={getImageUrl(pkg.image)} alt={pkg.name} onError={(e) => { e.currentTarget.style.display = 'none' }} style={{ width: '100%', height: '100%', objectFit: 'cover', backgroundColor: '#e2e8f0' }} />
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
          <div style={{ width: '100%', maxWidth: 640, background: '#fff', display: 'flex', flexDirection: 'column', maxHeight: '100vh' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600 }}>{editing ? 'Edit Package' : 'Add New Package'}</h2>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 4 }}><X size={20} /></button>
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <form id="package-form" onSubmit={save} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
                      setUploadingImage(true); setImageError('');
                      try {
                        const res = await api('/api/admin/upload', { method: 'POST', headers: {} as any, body: data });
                        if (!res.ok) {
                          const errData = await res.json().catch(()=>({}));
                          throw new Error(errData.error || 'Upload failed');
                        }
                        const json = await res.json();
                        update('image', json.url);
                      } catch (err: any) {
                        setImageError('Error uploading image: ' + err.message + '. (Are Cloudinary keys set in Render?)');
                      } finally {
                        setUploadingImage(false);
                      }
                    }} style={{ fontSize: '.875rem' }} />
                    {uploadingImage && <div style={{ fontSize: '.8rem', color: '#2563eb', marginTop: 4 }}>Uploading image, please wait...</div>}
                    {imageError && <div style={{ fontSize: '.8rem', color: '#ef4444', marginTop: 4 }}>{imageError}</div>}
                    {form.image && !uploadingImage && <img src={getImageUrl(form.image)} alt="Preview" style={{ marginTop: '0.5rem', width: '100%', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />}
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
                  {form.region === 'International' && (
                    <>
                      <label>
                        <span style={labelStyle}>Foreign Currency</span>
                        <input list="currency-options" value={form.foreignCurrency || ''} onChange={e => update('foreignCurrency', e.target.value)} style={inputStyle} placeholder="Search or select..." />
                        <datalist id="currency-options">
                          {ALL_CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                        </datalist>
                      </label>
                      <label>
                        <span style={labelStyle}>Foreign Price (Auto)</span>
                        <input type="number" step="0.1" value={String(form.foreignPrice)} readOnly style={{ ...inputStyle, background: '#f8fafc' }} />
                      </label>
                    </>
                  )}
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
              </form>
            </div>

            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '.75rem', background: '#fff', flexShrink: 0 }}>
              <button type="submit" form="package-form" disabled={saving || uploadingImage} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem', padding: '.75rem', borderRadius: 10, border: 'none', background: (saving || uploadingImage) ? '#94a3b8' : '#186a76', color: '#fff', fontWeight: 700, cursor: (saving || uploadingImage) ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-sans)', fontSize: '.9rem' }}>
                <Save size={18} />{(saving || uploadingImage) ? 'Saving…' : (editing ? 'Update Package' : 'Add Package')}
              </button>
              <button type="button" onClick={() => setShowForm(false)} style={{ padding: '.75rem 1.25rem', borderRadius: 10, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '.9rem' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
