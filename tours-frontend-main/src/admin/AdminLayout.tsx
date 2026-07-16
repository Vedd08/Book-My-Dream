import { useState, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Package, MapPin, MessageSquare, Mail,
  LogOut, Menu, ChevronLeft, ChevronRight, Edit3, Image as ImageIcon
} from 'lucide-react'
import { useAuth, useApi } from './AuthContext'
import logoImg from '../assets/new_logo.png'

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/packages', icon: Package, label: 'Packages' },
  { to: '/admin/destinations', icon: MapPin, label: 'Destinations' },
  { to: '/admin/blogs', icon: Edit3, label: 'Blogs' },
  { to: '/admin/gallery', icon: ImageIcon, label: 'Gallery Grid' },
  { to: '/admin/gallery-slides', icon: ImageIcon, label: 'Hero Slides' },
  { to: '/admin/inquiries', icon: MessageSquare, label: 'Inquiries' },
  { to: '/admin/subscribers', icon: Mail, label: 'Subscribers' },
]

export default function AdminLayout() {
  const { auth, logout } = useAuth()
  const api = useApi()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [newInqCount, setNewInqCount] = useState(0)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api(`/api/admin/stats?t=${Date.now()}`)
        if (res.ok) {
          const data = await res.json()
          if (data && typeof data.newInquiries === 'number') {
            setNewInqCount(data.newInquiries)
          }
        }
      } catch (err) {
        console.error('Failed to fetch stats:', err)
      }
    }
    fetchStats()
    const interval = setInterval(fetchStats, 5000) // Poll every 5 seconds for faster updates
    return () => clearInterval(interval)
  }, [api])

  const handleLogout = () => { logout(); navigate('/admin') }

  const sidebarW = sidebarOpen ? 240 : 72

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', fontFamily: 'var(--font-sans)' }}>
      {/* ── Sidebar ── */}
      <aside style={{
        width: sidebarW, flexShrink: 0, transition: 'width .25s cubic-bezier(0.4, 0, 0.2, 1)',
        background: 'linear-gradient(180deg, #0a101d 0%, #111827 100%)', color: '#fff', display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 40,
        boxShadow: '4px 0 24px rgba(0,0,0,.15)',
      }}>
        <div style={{ padding: '1.25rem 1rem', borderBottom: '1px solid rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: sidebarOpen ? 'flex-start' : 'center', gap: '.75rem', overflow: 'hidden', height: '76px', transition: 'all .25s ease' }}>
          <img src={logoImg} alt="Logo" style={{ height: sidebarOpen ? '48px' : '36px', width: sidebarOpen ? '48px' : '36px', objectFit: 'contain', flexShrink: 0, transition: 'all .25s ease' }} />
          {sidebarOpen && (
            <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em' }}>Book My Dream</p>
              <p style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: '#e49d21', marginTop: 4 }}>Admin</p>
            </div>
          )}
        </div>

        {/* Toggle */}
        <button onClick={() => setSidebarOpen(v => !v)} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 28, height: 28, borderRadius: '50%', background: '#fff',
          border: '1px solid #e2e8f0', color: '#186a76', cursor: 'pointer',
          position: 'absolute', top: '24px', right: -14, zIndex: 50,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)', transition: 'transform 0.2s ease',
        }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: '1.5rem .75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '.875rem',
              padding: '.75rem .875rem', borderRadius: 12, textDecoration: 'none',
              color: isActive ? '#fff' : 'rgba(255,255,255,.65)',
              background: isActive ? 'rgba(255,255,255,.15)' : 'transparent',
              fontWeight: isActive ? 600 : 500, fontSize: '.9rem',
              transition: 'all .2s ease', whiteSpace: 'nowrap', overflow: 'hidden',
            })}>
              {({ isActive }) => (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={20} style={{ flexShrink: 0, color: isActive ? '#e49d21' : 'inherit' }} />
                  </div>
                  {sidebarOpen && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                      <span>{label}</span>
                      {label === 'Inquiries' && newInqCount > 0 && (
                        <span style={{
                          background: 'linear-gradient(135deg, #ff3b3b 0%, #d80000 100%)',
                          color: '#fff', fontSize: '0.75rem', fontWeight: 800,
                          height: 20, minWidth: 20, padding: '0 6px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          borderRadius: 9999, boxShadow: '0 2px 4px rgba(216,0,0,0.4)'
                        }}>
                          {newInqCount > 99 ? '99+' : newInqCount}
                        </span>
                      )}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div style={{ padding: '1.25rem .75rem', borderTop: '1px solid rgba(255,255,255,.1)' }}>
          {sidebarOpen && (
            <div style={{ padding: '.875rem', borderRadius: 12, background: 'rgba(255,255,255,.06)', marginBottom: '1rem', border: '1px solid rgba(255,255,255,.05)' }}>
              <p style={{ fontSize: '.875rem', fontWeight: 600, color: '#fff' }}>{auth?.username}</p>
              <p style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.5)', marginTop: 2 }}>Administrator</p>
            </div>
          )}
          <button onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: '.875rem',
            width: '100%', padding: '.75rem .875rem', borderRadius: 12,
            background: 'rgba(239,68,68,.1)', color: '#fca5a5',
            border: '1px solid rgba(239,68,68,.2)', cursor: 'pointer',
            fontSize: '.9rem', fontWeight: 600, transition: 'all .2s ease',
            fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap', overflow: 'hidden',
          }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,.2)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,.1)'}>
            <LogOut size={18} style={{ flexShrink: 0 }} />
            {sidebarOpen && 'Logout'}
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main style={{ flex: 1, marginLeft: sidebarW, transition: 'margin-left .25s cubic-bezier(0.4, 0, 0.2, 1)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Top bar */}
        <header style={{
          padding: '1rem 2rem', background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 4px 20px rgba(0,0,0,.03)', position: 'sticky', top: 0, zIndex: 30,
        }}>
          <button onClick={() => setSidebarOpen(v => !v)} style={{
            width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 10, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)', transition: 'all .2s ease'
          }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
            <Menu size={18} style={{ color: '#475569' }} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '.75rem', color: '#64748b', fontWeight: 500, marginBottom: 2 }}>Welcome back,</p>
              <p style={{ fontSize: '.9rem', fontWeight: 700, color: '#1a2332', lineHeight: 1 }}>{auth?.username}</p>
            </div>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: 'linear-gradient(135deg, #e49d21 0%, #e85a28 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '1.125rem', boxShadow: '0 4px 12px rgba(228,157,33, 0.3)' }}>
              {auth?.username?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page content */}
        <div style={{ flex: 1, padding: '2rem', maxWidth: 1400, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
