import { useState, useEffect } from 'react'
import { Plus, Search, Trash2, Image as ImageIcon } from 'lucide-react'
import { useApi } from '../AuthContext'

type GallerySlide = {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  cardSubtitle: string
  cardTitle: string
}

export default function AdminGallerySlides() {
  const api = useApi()
  const [slides, setSlides] = useState<GallerySlide[]>([])
  const [search, setSearch] = useState('')
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [newSlide, setNewSlide] = useState({
    title: '', subtitle: '', description: '', cardSubtitle: '', cardTitle: ''
  })
  const [uploading, setUploading] = useState(false)

  const fetchSlides = () => {
    setLoading(true)
    api('/api/admin/gallery-slides')
      .then(res => res.json())
      .then(data => { setSlides(data); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    fetchSlides()
  }, [api])

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this slide?')) return
    await api(`/api/admin/gallery-slides/${id}`, { method: 'DELETE' })
    fetchSlides()
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!uploadFile) {
      alert('Please select a background image')
      return
    }

    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('image', uploadFile)
      
      const uploadRes = await api('/api/admin/upload', {
        method: 'POST', body: fd
      })
      const uploadData = await uploadRes.json()
      
      if (!uploadRes.ok) throw new Error(uploadData.error || 'Upload failed')

      await api('/api/admin/gallery-slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newSlide, image: uploadData.url })
      })

      setIsAddOpen(false)
      setUploadFile(null)
      setNewSlide({ title: '', subtitle: '', description: '', cardSubtitle: '', cardTitle: '' })
      fetchSlides()
    } catch (err: any) {
      alert(err.message)
    } finally {
      setUploading(false)
    }
  }

  const filtered = slides.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase()) || 
    s.cardTitle.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {/* Preview banner */}
      <div style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', border: '1px solid #bbf7d0', borderRadius: 12, padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 36, height: 36, background: '#22c55e', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ImageIcon size={18} color="#fff" />
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 700, color: '#15803d', fontSize: '0.95rem' }}>Hero Slides — Gallery Page</p>
            <p style={{ margin: 0, color: '#22c55e', fontSize: '0.82rem' }}>These slides power the fullscreen cinematic carousel on the Gallery page</p>
          </div>
        </div>
        <a href="/gallery" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#22c55e', color: '#fff', padding: '0.6rem 1.25rem', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: '0.88rem', flexShrink: 0 }}>
          <Search size={15} /> Preview Gallery Page
        </a>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1a2332' }}>Hero Slides Management</h1>
        <button onClick={() => setIsAddOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', background: 'linear-gradient(135deg, #e49d21 0%, #e85a28 100%)', color: '#fff', padding: '.75rem 1.5rem', borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(228,157,33, 0.3)' }}>
          <Plus size={18} /> Add Slide
        </button>
      </div>

      <div style={{ background: '#fff', padding: '1rem', borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input type="text" placeholder="Search slides by title..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: '100%', padding: '.75rem 1rem .75rem 2.75rem', borderRadius: 8, border: '1px solid #e2e8f0', outline: 'none', fontSize: '.95rem', boxSizing: 'border-box' }} />
        </div>
      </div>

      {loading ? (
        <p>Loading slides...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {filtered.map(slide => (
            <div key={slide.id} style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: 250, height: 160, flexShrink: 0, position: 'relative', overflow: 'hidden', background: '#f8fafc' }}>
                <img src={slide.image} alt={slide.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1, padding: '1.5rem 0', paddingRight: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a2332', margin: '0 0 0.5rem 0' }}>{slide.title} <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>({slide.subtitle})</span></h3>
                  <p style={{ color: '#475569', fontSize: '0.95rem', margin: '0 0 1rem 0', maxWidth: '600px' }}>{slide.description}</p>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <span style={{ fontSize: '0.85rem', background: '#f1f5f9', padding: '4px 8px', borderRadius: 6, fontWeight: 500, color: '#64748b' }}>Card Sub: {slide.cardSubtitle}</span>
                    <span style={{ fontSize: '0.85rem', background: '#f1f5f9', padding: '4px 8px', borderRadius: 6, fontWeight: 500, color: '#64748b' }}>Card Title: {slide.cardTitle}</span>
                  </div>
                </div>
                <button onClick={() => handleDelete(slide.id)} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', width: 40, height: 40, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }} title="Delete Slide">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p style={{ color: '#64748b' }}>No slides found.</p>}
        </div>
      )}

      {/* Add Modal */}
      {isAddOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#fff', width: 600, maxHeight: '90vh', overflowY: 'auto', borderRadius: 16, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #f1f5f9' }}>
              <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#1a2332' }}>Add New Hero Slide</h2>
            </div>
            <form onSubmit={handleAdd} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '.875rem', fontWeight: 600, color: '#475569', marginBottom: '.5rem' }}>Main Title (e.g. KERALA)</label>
                  <input type="text" value={newSlide.title} onChange={e => setNewSlide({...newSlide, title: e.target.value})} required style={{ width: '100%', padding: '.75rem', borderRadius: 8, border: '1px solid #e2e8f0', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '.875rem', fontWeight: 600, color: '#475569', marginBottom: '.5rem' }}>Subtitle (e.g. God's Own Country)</label>
                  <input type="text" value={newSlide.subtitle} onChange={e => setNewSlide({...newSlide, subtitle: e.target.value})} required style={{ width: '100%', padding: '.75rem', borderRadius: 8, border: '1px solid #e2e8f0', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '.875rem', fontWeight: 600, color: '#475569', marginBottom: '.5rem' }}>Description</label>
                <textarea value={newSlide.description} onChange={e => setNewSlide({...newSlide, description: e.target.value})} required rows={3} style={{ width: '100%', padding: '.75rem', borderRadius: 8, border: '1px solid #e2e8f0', boxSizing: 'border-box', resize: 'vertical' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '.875rem', fontWeight: 600, color: '#475569', marginBottom: '.5rem' }}>Card Top Text (e.g. South India)</label>
                  <input type="text" value={newSlide.cardSubtitle} onChange={e => setNewSlide({...newSlide, cardSubtitle: e.target.value})} required style={{ width: '100%', padding: '.75rem', borderRadius: 8, border: '1px solid #e2e8f0', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '.875rem', fontWeight: 600, color: '#475569', marginBottom: '.5rem' }}>Card Bold Text (e.g. ALLEPPEY)</label>
                  <input type="text" value={newSlide.cardTitle} onChange={e => setNewSlide({...newSlide, cardTitle: e.target.value})} required style={{ width: '100%', padding: '.75rem', borderRadius: 8, border: '1px solid #e2e8f0', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '.875rem', fontWeight: 600, color: '#475569', marginBottom: '.5rem' }}>Background Image File</label>
                <div style={{ border: '2px dashed #e2e8f0', borderRadius: 8, padding: '2rem', textAlign: 'center', background: '#f8fafc' }}>
                  <ImageIcon size={32} style={{ color: '#94a3b8', marginBottom: '.5rem' }} />
                  <input type="file" accept="image/*" required onChange={e => setUploadFile(e.target.files?.[0] || null)} style={{ display: 'block', width: '100%' }} />
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsAddOpen(false)} style={{ flex: 1, padding: '.875rem', borderRadius: 8, background: '#f1f5f9', color: '#475569', fontWeight: 600, border: 'none', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={uploading} style={{ flex: 1, padding: '.875rem', borderRadius: 8, background: '#1a2332', color: '#fff', fontWeight: 600, border: 'none', cursor: uploading ? 'not-allowed' : 'pointer' }}>
                  {uploading ? 'Uploading...' : 'Save Slide'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
