import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, X } from 'lucide-react'
import { API_URL } from '../../config'
import { useAuth } from '../AuthContext'

type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
  author: string
}

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null)
  const [msg, setMsg] = useState('')
  
  const { auth } = useAuth()
  const headers = { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${auth?.token}`
  }

  // Form State
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '', excerpt: '', category: '', image: '', author: '', readTime: ''
  })

  useEffect(() => { fetchBlogs() }, [])

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/blogs`, { headers })
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setBlogs(data)
    } catch (err) {
      console.error('Failed to fetch blogs', err)
      setBlogs([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return
    try {
      const res = await fetch(`${API_URL}/api/admin/blogs/${slug}`, { method: 'DELETE', headers })
      if (!res.ok) throw new Error('Delete failed')
      setBlogs(blogs.filter(b => b.slug !== slug))
      setMsg('Blog deleted!')
    } catch (err) {
      setMsg('Failed to delete blog')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMsg('')
    try {
      if (editingBlog) {
        // UPDATE
        const res = await fetch(`${API_URL}/api/admin/blogs/${editingBlog.slug}`, {
          method: 'PUT', headers, body: JSON.stringify(formData)
        })
        if (!res.ok) throw new Error('Update failed')
        const updated = await res.json()
        setBlogs(blogs.map(b => b.slug === updated.slug ? updated : b))
        setMsg('Blog updated!')
      } else {
        // CREATE
        const res = await fetch(`${API_URL}/api/admin/blogs`, {
          method: 'POST', headers, body: JSON.stringify(formData)
        })
        if (!res.ok) throw new Error('Create failed')
        const newBlog = await res.json()
        setBlogs([newBlog, ...blogs])
        setMsg('Blog added!')
      }
      closeModal()
    } catch (err) {
      setMsg('Failed to save blog')
    }
  }

  const openModal = (blog?: BlogPost) => {
    if (blog) {
      setEditingBlog(blog)
      setFormData(blog)
    } else {
      setEditingBlog(null)
      setFormData({ title: '', excerpt: '', category: '', image: '', author: 'Team BMDT', readTime: '5 min read' })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingBlog(null)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const data = new FormData()
    data.append('image', file)

    try {
      const res = await fetch(`${API_URL}/api/admin/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${auth?.token}` }, // FormData doesn't need Content-Type JSON
        body: data
      })
      if (!res.ok) throw new Error('Upload failed')
      
      const json = await res.json()
      setFormData(prev => ({ ...prev, image: json.url }))
    } catch (err) {
      alert('Failed to upload image')
    }
  }

  if (loading) return <div>Loading blogs...</div>

  return (
    <div>
      {/* Preview banner */}
      <div style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', border: '1px solid #fde047', borderRadius: 12, padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 36, height: 36, background: '#d97706', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Edit2 size={18} color="#fff" />
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 700, color: '#92400e', fontSize: '0.95rem' }}>Travel Journal (Blog)</p>
            <p style={{ margin: 0, color: '#d97706', fontSize: '0.82rem' }}>Stories published here appear immediately on the public Travel Journal page.</p>
          </div>
        </div>
        <a href="/blog" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#d97706', color: '#fff', padding: '0.6rem 1.25rem', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: '0.88rem', flexShrink: 0 }}>
          Preview Journal Page <span style={{ marginLeft: 4 }}>→</span>
        </a>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Manage Blogs</h1>
        <button 
          onClick={() => openModal()}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'var(--primary)', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
        >
          <Plus size={18} /> Add Blog
        </button>
      </div>

      {msg && <div style={{ padding: '.875rem 1.25rem', borderRadius: 10, background: (msg.includes('added') || msg.includes('updated')) ? 'rgba(22,163,74,.1)' : 'rgba(239,68,68,.1)', border: `1px solid ${(msg.includes('added') || msg.includes('updated')) ? 'rgba(22,163,74,.25)' : 'rgba(239,68,68,.25)'}`, color: (msg.includes('added') || msg.includes('updated')) ? '#16a34a' : '#ef4444', fontSize: '.875rem', marginBottom: '1rem' }}>{msg}</div>}

      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #eee', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: '#f8fafc', borderBottom: '1px solid #eee' }}>
            <tr>
              <th style={{ padding: '1rem', fontWeight: 600, color: '#64748b' }}>Image</th>
              <th style={{ padding: '1rem', fontWeight: 600, color: '#64748b' }}>Title</th>
              <th style={{ padding: '1rem', fontWeight: 600, color: '#64748b' }}>Category</th>
              <th style={{ padding: '1rem', fontWeight: 600, color: '#64748b' }}>Date</th>
              <th style={{ padding: '1rem', fontWeight: 600, color: '#64748b', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(blog => (
              <tr key={blog.slug} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '1rem' }}>
                  <img src={blog.image} alt={blog.title} style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                </td>
                <td style={{ padding: '1rem', fontWeight: 500, maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {blog.title}
                </td>
                <td style={{ padding: '1rem', color: '#64748b' }}>{blog.category}</td>
                <td style={{ padding: '1rem', color: '#64748b' }}>{blog.date}</td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <button onClick={() => openModal(blog)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', marginRight: '1rem' }}><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(blog.slug)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No blogs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{editingBlog ? 'Edit Blog' : 'Add New Blog'}</h2>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={24} /></button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: 500 }}>Title</label>
                <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: 500 }}>Category</label>
                <input required value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: 500 }}>Excerpt (Short Description)</label>
                <textarea required value={formData.excerpt} onChange={e => setFormData({ ...formData, excerpt: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', minHeight: '80px' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: 500 }}>Image</label>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ fontSize: '0.875rem' }} />
                  </div>
                  {formData.image && (
                    <img src={formData.image} alt="Preview" style={{ marginTop: '0.5rem', width: '100%', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                  )}
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: 500 }}>Read Time</label>
                  <input value={formData.readTime} onChange={e => setFormData({ ...formData, readTime: e.target.value })} placeholder="5 min read" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
              </div>

              <button type="submit" style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--primary)', color: 'white', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
                {editingBlog ? 'Update Blog' : 'Create Blog'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
