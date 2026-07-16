import { useState, useEffect } from 'react'
import { Plus, Search, Trash2, Image as ImageIcon } from 'lucide-react'
import { useApi } from '../AuthContext'

type GalleryImage = {
  id: string
  src: string
  title: string
  category: string
  createdAt: string
}

export default function AdminGallery() {
  const api = useApi()
  const [images, setImages] = useState<GalleryImage[]>([])
  const [search, setSearch] = useState('')
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [newImg, setNewImg] = useState({ title: '', category: 'Domestic Tours' })
  const [uploading, setUploading] = useState(false)

  const fetchGallery = () => {
    setLoading(true)
    api('/api/admin/gallery')
      .then(res => res.json())
      .then(data => { setImages(data); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    fetchGallery()
  }, [api])

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return
    await api(`/api/admin/gallery/${id}`, { method: 'DELETE' })
    fetchGallery()
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!uploadFile) {
      alert('Please select an image')
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

      await api('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ src: uploadData.url, title: newImg.title, category: newImg.category })
      })

      setIsAddOpen(false)
      setUploadFile(null)
      setNewImg({ title: '', category: 'Domestic Tours' })
      fetchGallery()
    } catch (err: any) {
      alert(err.message)
    } finally {
      setUploading(false)
    }
  }

  const filtered = images.filter(img => 
    img.title.toLowerCase().includes(search.toLowerCase()) || 
    img.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {/* Preview banner */}
      <div style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)', border: '1px solid #bfdbfe', borderRadius: 12, padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 36, height: 36, background: '#3b82f6', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ImageIcon size={18} color="#fff" />
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 700, color: '#1e40af', fontSize: '0.95rem' }}>Gallery Grid Photos</p>
            <p style={{ margin: 0, color: '#3b82f6', fontSize: '0.82rem' }}>Photos uploaded here appear in the Destination lightbox on the Gallery page</p>
          </div>
        </div>
        <a href="/gallery" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#3b82f6', color: '#fff', padding: '0.6rem 1.25rem', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: '0.88rem', flexShrink: 0 }}>
          <Search size={15} /> Preview Gallery Page
        </a>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1a2332' }}>Gallery Management</h1>
        <button onClick={() => setIsAddOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', background: 'linear-gradient(135deg, #e49d21 0%, #e85a28 100%)', color: '#fff', padding: '.75rem 1.5rem', borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(228,157,33, 0.3)' }}>
          <Plus size={18} /> Add Photo
        </button>
      </div>

      <div style={{ background: '#fff', padding: '1rem', borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input type="text" placeholder="Search gallery by title or category..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: '100%', padding: '.75rem 1rem .75rem 2.75rem', borderRadius: 8, border: '1px solid #e2e8f0', outline: 'none', fontSize: '.95rem', boxSizing: 'border-box' }} />
        </div>
      </div>

      {loading ? (
        <p>Loading gallery...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {filtered.map(img => (
            <div key={img.id} style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9', position: 'relative', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: 180, position: 'relative', overflow: 'hidden', background: '#f8fafc' }}>
                <img src={img.src} alt={img.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', color: '#fff', fontSize: '.75rem', padding: '4px 8px', borderRadius: 4, fontWeight: 500 }}>
                  {img.category}
                </div>
              </div>
              <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '.95rem', fontWeight: 600, color: '#1a2332', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{img.title || 'Untitled'}</h3>
                <button onClick={() => handleDelete(img.id)} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }} title="Delete Image">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {isAddOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#fff', width: 500, borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #f1f5f9' }}>
              <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#1a2332' }}>Add New Photo</h2>
            </div>
            <form onSubmit={handleAdd} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '.875rem', fontWeight: 600, color: '#475569', marginBottom: '.5rem' }}>Image File</label>
                <div style={{ border: '2px dashed #e2e8f0', borderRadius: 8, padding: '2rem', textAlign: 'center', background: '#f8fafc' }}>
                  <ImageIcon size={32} style={{ color: '#94a3b8', marginBottom: '.5rem' }} />
                  <input type="file" accept="image/*" required onChange={e => setUploadFile(e.target.files?.[0] || null)} style={{ display: 'block', width: '100%' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '.875rem', fontWeight: 600, color: '#475569', marginBottom: '.5rem' }}>Title</label>
                <input type="text" value={newImg.title} onChange={e => setNewImg({...newImg, title: e.target.value})} required style={{ width: '100%', padding: '.75rem', borderRadius: 8, border: '1px solid #e2e8f0', boxSizing: 'border-box' }} placeholder="e.g. Beautiful Sunset in Bali" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '.875rem', fontWeight: 600, color: '#475569', marginBottom: '.5rem' }}>Category</label>
                <select value={newImg.category} onChange={e => setNewImg({...newImg, category: e.target.value})} required style={{ width: '100%', padding: '.75rem', borderRadius: 8, border: '1px solid #e2e8f0', boxSizing: 'border-box' }}>
                  <option>Domestic Tours</option>
                  <option>International Tours</option>
                  <option>Honeymoon Tours</option>
                  <option>Family Tours</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsAddOpen(false)} style={{ flex: 1, padding: '.875rem', borderRadius: 8, background: '#f1f5f9', color: '#475569', fontWeight: 600, border: 'none', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={uploading} style={{ flex: 1, padding: '.875rem', borderRadius: 8, background: '#1a2332', color: '#fff', fontWeight: 600, border: 'none', cursor: uploading ? 'not-allowed' : 'pointer' }}>
                  {uploading ? 'Uploading...' : 'Save Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
