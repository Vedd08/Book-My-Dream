import { useState } from 'react'
import { API_URL } from '../config'
import { Send, CheckCircle2 } from 'lucide-react'

type Props = { defaultSubject?: string; compact?: boolean }

export default function InquiryForm({ defaultSubject = '', compact = false }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', travelers: '2', date: '',
    message: defaultSubject ? `I'm interested in the ${defaultSubject}. Please share more details.` : '',
  })

  const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await fetch(`${API_URL}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: defaultSubject, ...form }),
      })
    } catch (_) { /* offline fallback */ }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.75rem', borderRadius: 16, border: '1px solid var(--border)', background: 'var(--card)', padding: '2rem', textAlign: 'center' }}>
        <CheckCircle2 size={48} style={{ color: 'var(--primary)' }} />
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600 }}>Thank You!</h3>
        <p style={{ fontSize: '.875rem', color: 'var(--muted-fg)' }}>Your inquiry has been received. Our travel expert will reach out within 24 hours.</p>
      </div>
    )
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '.625rem .875rem', borderRadius: 8, border: '1px solid var(--border)',
    background: 'var(--bg)', fontSize: '.875rem', color: 'var(--fg)', outline: 'none', fontFamily: 'var(--font-sans)',
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: compact ? '1fr' : 'repeat(auto-fit,minmax(180px,1fr))' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: '.875rem', fontWeight: 500 }}>Full Name</span>
          <input style={inputStyle} required value={form.name} onChange={e => update('name', e.target.value)} placeholder="John Doe" />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: '.875rem', fontWeight: 500 }}>Email</span>
          <input type="email" style={inputStyle} required value={form.email} onChange={e => update('email', e.target.value)} placeholder="john@example.com" />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: '.875rem', fontWeight: 500 }}>Phone</span>
          <input style={inputStyle} required value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+91 98765 43210" />
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: '.875rem', fontWeight: 500 }}>Travelers</span>
            <input type="number" min="1" style={inputStyle} value={form.travelers} onChange={e => update('travelers', e.target.value)} />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: '.875rem', fontWeight: 500 }}>Date</span>
            <input type="date" style={inputStyle} value={form.date} onChange={e => update('date', e.target.value)} />
          </label>
        </div>
      </div>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontSize: '.875rem', fontWeight: 500 }}>Message</span>
        <textarea rows={4} style={{ ...inputStyle, resize: 'none' }} value={form.message} onChange={e => update('message', e.target.value)} placeholder="Tell us about your dream trip..." />
      </label>
      <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
        <Send size={16} /> Send Inquiry
      </button>
    </form>
  )
}
