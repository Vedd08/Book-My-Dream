import { useState } from 'react'
import { Plane, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAuth } from './AuthContext'

export default function AdminLogin() {
  const { login } = useAuth()
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.username, form.password)
    } catch {
      setError('Invalid username or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      padding: '1rem',
    }}>
      {/* Background pattern */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute', borderRadius: 9999,
            background: 'rgba(255,255,255,.04)',
            width: `${200 + i * 80}px`, height: `${200 + i * 80}px`,
            top: `${[10, 60, 20, 70, 40, 5][i]}%`,
            left: `${[5, 70, 40, 10, 80, 55][i]}%`,
            transform: 'translate(-50%, -50%)',
          }} />
        ))}
      </div>

      <div style={{
        position: 'relative', width: '100%', maxWidth: 420,
        borderRadius: 24, background: 'rgba(255,255,255,.1)',
        backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,.2)',
        padding: '2.5rem', boxShadow: '0 25px 60px rgba(0,0,0,.4)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex', width: 64, height: 64, alignItems: 'center', justifyContent: 'center',
            borderRadius: 20, background: 'rgba(228,157,33,.9)', marginBottom: '1rem',
            boxShadow: '0 8px 24px rgba(228,157,33,.4)',
          }}>
            <Plane size={32} color="#fff" />
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>
            Admin Panel
          </h1>
          <p style={{ fontSize: '.875rem', color: 'rgba(255,255,255,.7)', marginTop: '.25rem' }}>
            Book My Dream Travels
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '1rem',
            padding: '.75rem 1rem', borderRadius: 10,
            background: 'rgba(239,68,68,.2)', border: '1px solid rgba(239,68,68,.4)',
            fontSize: '.875rem', color: '#fca5a5',
          }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Username */}
          <div>
            <label style={{ display: 'block', fontSize: '.8125rem', fontWeight: 600, color: 'rgba(255,255,255,.8)', marginBottom: '.5rem' }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,.5)' }} />
              <input
                type="text" required autoComplete="username"
                value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                placeholder="Username"
                style={{
                  width: '100%', padding: '.75rem .75rem .75rem 2.5rem',
                  borderRadius: 10, border: '1px solid rgba(255,255,255,.2)',
                  background: 'rgba(255,255,255,.1)', color: '#fff',
                  fontSize: '.9375rem', outline: 'none', fontFamily: 'var(--font-sans)',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{ display: 'block', fontSize: '.8125rem', fontWeight: 600, color: 'rgba(255,255,255,.8)', marginBottom: '.5rem' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,.5)' }} />
              <input
                type={showPw ? 'text' : 'password'} required autoComplete="current-password"
                value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '.75rem 2.75rem .75rem 2.5rem',
                  borderRadius: 10, border: '1px solid rgba(255,255,255,.2)',
                  background: 'rgba(255,255,255,.1)', color: '#fff',
                  fontSize: '.9375rem', outline: 'none', fontFamily: 'var(--font-sans)',
                  boxSizing: 'border-box',
                }}
              />
              <button type="button" onClick={() => setShowPw(v => !v)} style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,.5)', padding: 2,
              }}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Hint Removed */}

          <button type="submit" disabled={loading} style={{
            marginTop: '.5rem', padding: '.875rem', borderRadius: 10, border: 'none',
            background: loading ? 'rgba(228,157,33,.5)' : 'var(--accent)',
            color: '#fff', fontSize: '1rem', fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer', transition: 'all .2s',
            boxShadow: '0 4px 16px rgba(228,157,33,.4)',
            fontFamily: 'var(--font-sans)',
          }}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
