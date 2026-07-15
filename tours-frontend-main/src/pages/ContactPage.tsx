import React, { useState } from 'react'
import { COMPANY } from '../data'
import { API_URL } from '../config'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  // We are using a beautiful tropical/resort destination from the public folder
  const bgImg = '/images/hero-maldives.png';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    const payload = {
      name: data.get('name'),
      email: data.get('email'),
      phone: data.get('phone'),
      travelers: Number(data.get('travelers')),
      subject: data.get('tourType'),
      message: data.get('message'),
    };

    try {
      await fetch(`${API_URL}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setSubmitted(true);
      form.reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Failed to submit:', err);
    }
  };

  return (
    <main style={{
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '80px', // account for header
      paddingBottom: '4rem'
    }}>
      {/* Background Image with dark overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
        <img src={bgImg} alt="Destination Background" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(11,21,40,0.95) 0%, rgba(11,21,40,0.6) 100%)' }} />
      </div>

      <div className="container" style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>

        {/* Left Column - Content */}
        <div style={{ color: '#fff' }}>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            background: 'linear-gradient(to right, #ffffff, #aedfff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 4px 20px rgba(0,0,0,0.2)'
          }}>
            You Have Questions,<br />We Have Answers
          </h1>
          <p style={{ fontSize: '1rem', lineHeight: 1.7, opacity: 0.9, maxWidth: '500px', marginBottom: '2.5rem', fontWeight: 300 }}>
            Discover experiences you won't find anywhere else — thoughtfully designed to immerse you in the heart of the destination. Soulful stories waiting to be lived.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)', marginBottom: '0.75rem' }}>Location</h3>
              <p style={{ opacity: 0.9, fontSize: '0.95rem', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line', fontWeight: 400 }}>
                {COMPANY.address}
              </p>
              <p style={{ opacity: 0.7, fontSize: '0.85rem', marginTop: '1rem', fontStyle: 'italic' }}>
                Mon–Sat | 09:00 – 19:00 (IST)
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)', marginBottom: '0.75rem' }}>Social Media</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, opacity: 0.9, fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 400 }}>
                <li><a href="https://www.instagram.com/bookmy.dream?igsh=MXZweTJ6MXoyeWMwZA==" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.color = 'inherit'}>Instagram</a></li>
                {/* <li><a href="#" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.color = 'inherit'}>LinkedIn</a></li> */}
                <li><a href="https://www.facebook.com/share/18tCiPVjBn/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.color = 'inherit'}>Facebook</a></li>
                <li><a href="https://youtube.com/@book.mydream?si=Bxoq1RmPq28VZ5xi" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.color = 'inherit'}>YouTube</a></li>
              </ul>
            </div>

            <div>
              <h3 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)', marginBottom: '0.75rem' }}>Email</h3>
              <p style={{ opacity: 0.9, fontSize: '0.95rem', margin: 0, fontWeight: 400 }}>
                {COMPANY.email}
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)', marginBottom: '0.75rem' }}>Contact</h3>
              <p style={{ opacity: 0.9, fontSize: '0.95rem', margin: 0, fontWeight: 400, lineHeight: 1.6 }}>
                {COMPANY.phone[0]}<br />
                {COMPANY.phone[1]}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div style={{ background: '#fff', borderRadius: '24px', padding: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.5rem', fontWeight: 700, color: '#111', marginBottom: '0.5rem' }}>
            Tell Us What You Need
          </h2>
          <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            Our team is ready to assist you with every detail, big or small.
          </p>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--primary)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Thank you!</h3>
              <p>Your inquiry has been sent. We'll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', width: '100%' }}>
                {/* Full Name */}
                <div style={{ minWidth: 0 }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#111', marginBottom: '0.4rem' }}>Full Name *</label>
                  <div style={{ display: 'flex', border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden', background: '#f9fafb', width: '100%' }}>
                    <div style={{ padding: '0.6rem', background: '#f1f5f9', borderRight: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: 'var(--primary)', fontSize: '1rem' }}>👤</span>
                    </div>
                    <input required name="name" type="text" placeholder="Enter Your Name" style={{ flex: 1, minWidth: 0, width: '100%', boxSizing: 'border-box', border: 'none', padding: '0.6rem', background: 'transparent', outline: 'none', fontSize: '0.85rem' }} />
                  </div>
                </div>

                {/* Phone Number */}
                <div style={{ minWidth: 0 }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#111', marginBottom: '0.4rem' }}>Phone Number *</label>
                  <div style={{ display: 'flex', border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden', background: '#f9fafb', width: '100%' }}>
                    <div style={{ padding: '0.6rem', background: '#f1f5f9', borderRight: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: 'var(--primary)', fontSize: '1rem' }}>📞</span>
                    </div>
                    <input required name="phone" type="tel" placeholder="Enter Phone Number" style={{ flex: 1, minWidth: 0, width: '100%', boxSizing: 'border-box', border: 'none', padding: '0.6rem', background: 'transparent', outline: 'none', fontSize: '0.85rem' }} />
                  </div>
                </div>

                {/* Email Address */}
                <div style={{ gridColumn: 'span 2', minWidth: 0 }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#111', marginBottom: '0.4rem' }}>Email Address *</label>
                  <div style={{ display: 'flex', border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden', background: '#f9fafb', width: '100%' }}>
                    <div style={{ padding: '0.6rem', background: '#f1f5f9', borderRight: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: 'var(--primary)', fontSize: '1rem' }}>✉️</span>
                    </div>
                    <input required name="email" type="email" placeholder="Enter Your Email" style={{ flex: 1, minWidth: 0, width: '100%', boxSizing: 'border-box', border: 'none', padding: '0.6rem', background: 'transparent', outline: 'none', fontSize: '0.85rem' }} />
                  </div>
                </div>

                {/* Number of Travellers */}
                <div style={{ minWidth: 0 }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#111', marginBottom: '0.4rem' }}>Number of Travellers *</label>
                  <div style={{ display: 'flex', border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden', background: '#f9fafb', width: '100%' }}>
                    <div style={{ padding: '0.6rem', background: '#f1f5f9', borderRight: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: 'var(--primary)', fontSize: '1rem' }}>👥</span>
                    </div>
                    <input required name="travelers" type="number" min="1" placeholder="Number of travellers" style={{ flex: 1, minWidth: 0, width: '100%', boxSizing: 'border-box', border: 'none', padding: '0.6rem', background: 'transparent', outline: 'none', fontSize: '0.85rem' }} />
                  </div>
                </div>

                {/* Tour Type */}
                <div style={{ minWidth: 0 }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#111', marginBottom: '0.4rem' }}>Tour Type *</label>
                  <div style={{ display: 'flex', border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden', background: '#f9fafb', width: '100%' }}>
                    <div style={{ padding: '0.6rem', background: '#f1f5f9', borderRight: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: 'var(--primary)', fontSize: '1rem' }}>🗺️</span>
                    </div>
                    <select required name="tourType" style={{ flex: 1, minWidth: 0, width: '100%', boxSizing: 'border-box', border: 'none', padding: '0.6rem', background: 'transparent', outline: 'none', fontSize: '0.85rem', color: '#111', appearance: 'none', cursor: 'pointer' }}>
                      <option value="">Select tour type</option>
                      <option value="Domestic Tour">Domestic Tour</option>
                      <option value="International Tour">International Tour</option>
                      <option value="Honeymoon">Honeymoon</option>
                      <option value="Group Tour">Group Tour</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div style={{ minWidth: 0 }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#111', marginBottom: '0.4rem' }}>Message (Optional)</label>
                <textarea name="message" placeholder="Tell us more about your requirements..." rows={3} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid #e2e8f0', background: '#f9fafb', outline: 'none', fontSize: '0.85rem', resize: 'none', boxSizing: 'border-box' }} />
              </div>

              {/* Submit Button */}
              <button type="submit" style={{
                width: '100%',
                padding: '0.85rem',
                background: 'var(--accent)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(255,183,178, 0.3)',
                transition: 'transform 0.2s'
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Contact Our Travel Expert
              </button>
            </form>
          )}
        </div>

      </div>
    </main>
  )
}
