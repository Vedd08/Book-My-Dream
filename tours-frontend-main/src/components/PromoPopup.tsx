import React, { useState, useEffect } from 'react';
import { X, User, Phone, Users, Map, CheckCircle2, Mail, Sparkles, ChevronRight, ShieldCheck } from 'lucide-react';
import logoImg from '../assets/new_logo.png';
const bgImg = "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1200&auto=format&fit=crop";
import { API_URL } from '../config';

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // for button hover

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Lock background scroll while the modal is open so the popup behaves
  // like a contained dialog instead of letting the page scroll behind it.
  // Both html and body need it — some browsers tie viewport scroll to
  // documentElement rather than body.
  useEffect(() => {
    if (!isOpen) return;
    const html = document.documentElement;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    html.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    (window as any).lenis?.stop();
    return () => {
      html.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      (window as any).lenis?.start();
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      travelers: Number(formData.get('travelers')),
      subject: formData.get('tourType'),
      message: formData.get('visit_office') ? 'User wants to visit the office.' : 'New Popup Inquiry',
    };

    try {
      await fetch(`${API_URL}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (err) {
      console.error('Failed to submit inquiry:', err);
    }

    setSubmitted(true);
    setTimeout(() => {
      handleClose();
    }, 4000);
  };

  if (!isOpen) return null;

  return (
    <div className="promo-overlay" style={{
      position: 'fixed', inset: 0,
      background: 'rgba(10, 16, 18, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 99999,
      animation: 'fadeInOverlay 0.5s ease-out forwards'
    }}>
      <style>{`
        @keyframes fadeInOverlay { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalEntrance { 
          0% { opacity: 0; transform: scale(0.95) translateY(20px) rotateX(5deg); } 
          100% { opacity: 1; transform: scale(1) translateY(0) rotateX(0deg); } 
        }
        @keyframes floatLogo {
          0% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-8px); }
          100% { transform: translate(-50%, -50%) translateY(0px); }
        }
        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.5); }
          70% { box-shadow: 0 0 0 15px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        @keyframes successPop {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .premium-input-wrapper {
          display: flex;
          align-items: center;
          border: 1.5px solid #e5e7eb;
          border-radius: 12px;
          overflow: hidden;
          background: #f9fafb;
          transition: all 0.3s ease;
        }
        .premium-input-wrapper:focus-within {
          border-color: #186a76;
          box-shadow: 0 0 0 4px rgba(24, 106, 118, 0.1);
          background: #ffffff;
        }
        .premium-input-wrapper .icon-box {
          padding: 0.8rem;
          color: #9ca3af;
          transition: color 0.3s ease;
        }
        .premium-input-wrapper:focus-within .icon-box {
          color: #186a76;
        }
        .premium-input {
          flex: 1;
          min-width: 0;
          border: none;
          padding: 0.8rem 0.8rem 0.8rem 0;
          background: transparent;
          outline: none;
          font-size: 0.9rem;
          color: #1f2937;
          font-family: 'Inter', sans-serif;
        }
        .premium-input::placeholder { color: #9ca3af; }
        select.premium-input { cursor: pointer; appearance: none; }

        .promo-overlay { padding: 1rem; }
        .promo-card { min-height: 500px; max-height: 90vh; }
        .promo-form-grid { display: grid; grid-template-columns: 1fr; gap: 1.2rem; }
        .promo-form-full { grid-column: 1 / -1; }
        .promo-close-btn { top: 12px; right: 12px; width: 40px; height: 40px; border: 1px solid #f0f0f0; }
        .promo-left-panel { display: none; }
        .promo-right-panel { padding: 2rem; justify-content: center; }
        .promo-badge { margin-bottom: 0.5rem; }
        .promo-badge span { font-size: 0.8rem; }
        .promo-heading { font-size: 2rem; margin-bottom: 0.5rem; }
        .promo-subtext { font-size: 0.9rem; margin-bottom: 2rem; }
        .promo-form { gap: 1.2rem; }
        .promo-office-toggle { padding: 1rem; gap: 1rem; margin-top: 0.5rem; }
        .promo-submit-btn { padding: 1rem; font-size: 0.95rem; margin-top: 0.5rem; }
        .promo-footer-features { gap: 1.5rem; margin-top: 1.5rem; padding-top: 1.2rem; }

        @media (min-width: 640px) {
          .promo-form-grid { grid-template-columns: 1fr 1fr; }
          .promo-close-btn { top: -15px; right: -15px; border: none; }
        }
        @media (min-width: 768px) {
          .promo-left-panel { display: block; }
          .promo-right-panel { padding: 3rem 3rem 2rem; }
        }

        /* ── Mobile: compact + keep everything reachable within its own scroll area ── */
        @media (max-width: 639px) {
          .promo-overlay { padding: 0.6rem; }
          .promo-card { min-height: 0; max-height: 95vh; border-radius: 18px; overflow: hidden; }
          .promo-right-panel {
            padding: 1.5rem 1.25rem;
            /* flex-start, not center: centering an overflowing flex column
               pushes its top content above y=0, which is unreachable since
               scrollTop can never go negative. */
            justify-content: flex-start;
          }
          .promo-close-btn { width: 32px; height: 32px; }
          .promo-badge svg { width: 16px; height: 16px; }
          .promo-badge span { font-size: 0.7rem; }
          .promo-heading { font-size: 1.4rem; margin-bottom: 0.3rem; }
          .promo-subtext { font-size: 0.82rem; margin-bottom: 1.1rem; line-height: 1.45; }
          .promo-form { gap: 0.85rem; }
          .promo-form-grid { gap: 0.85rem; }
          .premium-input-wrapper .icon-box { padding: 0.65rem; }
          .premium-input { padding: 0.65rem 0.65rem 0.65rem 0; font-size: 0.88rem; }
          .promo-office-toggle { padding: 0.75rem; gap: 0.65rem; }
          .promo-submit-btn { padding: 0.8rem; font-size: 0.88rem; }
          .promo-footer-features { gap: 0.6rem 1rem; margin-top: 1rem; padding-top: 0.9rem; flex-wrap: wrap; }
        }
      `}</style>

      <div className="promo-card" style={{
        background: '#ffffff',
        borderRadius: 24,
        width: '100%',
        maxWidth: 900,
        display: 'flex',
        position: 'relative',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
        animation: 'modalEntrance 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
        perspective: '1000px'
      }}>

        {/* Floating Close Button */}
        <button
          onClick={handleClose}
          className="promo-close-btn"
          style={{
            position: 'absolute',
            background: '#ffffff',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
            transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.background = '#fef2f2'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = '#ffffff'; }}
        >
          <X size={20} color="#ef4444" strokeWidth={2.5} />
        </button>

        {/* Left Panel (Image) */}
        <div className="promo-left-panel" style={{
          flex: '0 0 45%',
          position: 'relative',
          borderRadius: '24px 0 0 24px',
          overflow: 'hidden'
        }}>
          <img
            src={bgImg}
            alt="Travel Destination"
            style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.05)', transition: 'transform 10s ease-out' }}
            onLoad={e => e.currentTarget.style.transform = 'scale(1)'}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7))' }} />
          
          {/* Animated Logo in Red Round */}
          <div style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '130px',
            height: '130px',
            borderRadius: '50%',
            backgroundColor: '#ef4444', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.2rem',
            boxSizing: 'border-box',
            border: '4px solid rgba(255,255,255,0.9)',
            animation: 'floatLogo 4s ease-in-out infinite, pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}>
            <img src={logoImg} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>

          <div style={{ position: 'absolute', bottom: 30, left: 30, right: 30, color: '#fff' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 900, lineHeight: 1.1, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              Ek safar <br/><span style={{ color: '#f5d742' }}>hamare saath</span>
            </h3>
            <p style={{ marginTop: '0.8rem', fontSize: '0.9rem', opacity: 0.9, lineHeight: 1.5, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
              Discover the world's most breathtaking destinations with our exclusive luxury travel packages.
            </p>
          </div>
        </div>

        {/* Right Panel (Form) */}
        <div className="promo-right-panel" style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          overflowY: 'auto'
        }}>

          <div className="promo-badge" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={20} color="#f5d742" fill="#f5d742" />
            <span style={{ fontWeight: 700, color: '#f5d742', textTransform: 'uppercase', letterSpacing: '0.1em' }}>VIP Access</span>
          </div>

          <h2 className="promo-heading" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, color: '#111827', lineHeight: 1.2 }}>
            Plan Your Perfect Trip
          </h2>
          <p className="promo-subtext" style={{ color: '#4b5563', lineHeight: 1.5 }}>
            Get a <strong style={{ color: '#186a76' }}>FREE</strong> personalized itinerary with the best pricing from our expert travel agents.
          </p>

          {submitted ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 0', flex: 1, animation: 'successPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <CheckCircle2 size={40} color="#10b981" />
              </div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>You're All Set!</h3>
              <p style={{ color: '#4b5563', textAlign: 'center' }}>Thank you for reaching out.<br/>Our luxury travel expert will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="promo-form" style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              <div className="promo-form-grid">
                
                {/* Full Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>Full Name <span style={{ color: '#ef4444' }}>*</span></label>
                  <div className="premium-input-wrapper">
                    <div className="icon-box"><User size={18} /></div>
                    <input required name="name" type="text" placeholder="John Doe" className="premium-input" />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>Phone Number <span style={{ color: '#ef4444' }}>*</span></label>
                  <div className="premium-input-wrapper">
                    <div className="icon-box"><Phone size={18} /></div>
                    <input required name="phone" type="tel" placeholder="+1 (555) 000-0000" className="premium-input" />
                  </div>
                </div>

                {/* Email Address */}
                <div className="promo-form-full">
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>Email Address <span style={{ color: '#ef4444' }}>*</span></label>
                  <div className="premium-input-wrapper">
                    <div className="icon-box"><Mail size={18} /></div>
                    <input required name="email" type="email" placeholder="john@example.com" className="premium-input" />
                  </div>
                </div>

                {/* Number of Travellers */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>Travellers <span style={{ color: '#ef4444' }}>*</span></label>
                  <div className="premium-input-wrapper">
                    <div className="icon-box"><Users size={18} /></div>
                    <input required name="travelers" type="number" min="1" placeholder="2 Adults" className="premium-input" />
                  </div>
                </div>

                {/* Tour Type */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>Tour Type <span style={{ color: '#ef4444' }}>*</span></label>
                  <div className="premium-input-wrapper">
                    <div className="icon-box"><Map size={18} /></div>
                    <select required name="tourType" className="premium-input" defaultValue="">
                      <option value="" disabled>Select destination</option>
                      <option value="domestic">Domestic Tour</option>
                      <option value="international">International Tour</option>
                      <option value="honeymoon">Honeymoon</option>
                      <option value="group">Group Tour</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Office Visit Toggle */}
              <div className="promo-office-toggle" style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <input type="checkbox" name="visit_office" id="visit_office" style={{ width: 20, height: 20, accentColor: '#186a76', cursor: 'pointer' }} />
                <div>
                  <label htmlFor="visit_office" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1f2937', cursor: 'pointer' }}>I prefer an in-office consultation</label>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0.2rem 0 0 0' }}>Schedule a meeting at our nearest luxury branch.</p>
                </div>
              </div>

              <button type="submit"
                className="promo-submit-btn"
                style={{
                  width: '100%',
                  background: isHovered ? '#12545e' : '#186a76',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: isHovered ? '0 10px 25px rgba(24, 106, 118, 0.4)' : '0 4px 14px rgba(24, 106, 118, 0.2)',
                  transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Reveal My Itinerary <ChevronRight size={18} strokeWidth={3} />
              </button>
            </form>
          )}

          {/* Footer Features */}
          <div className="promo-footer-features" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderTop: '1px solid #f3f4f6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#6b7280', fontSize: '0.75rem', fontWeight: 600 }}>
              <ShieldCheck size={14} color="#10b981" /> 100% Secure
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#6b7280', fontSize: '0.75rem', fontWeight: 600 }}>
               Data Privacy
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#6b7280', fontSize: '0.75rem', fontWeight: 600 }}>
               Luxury Standard
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
