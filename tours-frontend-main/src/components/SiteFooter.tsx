import { Link } from 'react-router-dom'
import { Phone, Mail } from 'lucide-react'
import { COMPANY } from '../data'
import logoImg from '../assets/new_logo.png'
import skylineImg from '../assets/skyline-footer.png'

function Facebook() {
  return <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.87h2.78l-.44 2.9h-2.34V22c4.78-.79 8.43-4.94 8.43-9.94Z" /></svg>
}
function Instagram() {
  return <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.86 3.93 2.3 7.15 2.23c1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 2.69.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.36-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.36-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84Zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4Zm6.4-11.44a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" /></svg>
}
function YouTube() {
  return <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor"><path d="M23.5 6.18a3 3 0 0 0-2.11-2.11C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.39.57A3 3 0 0 0 .5 6.18C0 8.04 0 12 0 12s0 3.96.5 5.82a3 3 0 0 0 2.11 2.11C4.47 20.5 12 20.5 12 20.5s7.53 0 9.39-.57a3 3 0 0 0 2.11-2.11C24 15.96 24 12 24 12s0-3.96-.5-5.82ZM9.54 15.57V8.43L15.82 12l-6.28 3.57Z" /></svg>
}

export default function SiteFooter() {
  return (
    <footer className="sf" style={{ backgroundImage: `url(${skylineImg})` }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&display=swap');

        /* ── Footer shell: skyline as full background ── */
        .sf {
          position: relative;
          font-family: 'Inter', sans-serif;
          overflow: hidden;

          /* Image is 1024x1024 — top 50% = monuments+sky, bottom 50% = white.
             background is set via inline style on the element so Vite's import URL is used.
             background-size: 100% 200% → image spans full width, 2x the footer height
             background-position: top  → anchors to top, so only the top half shows */
          background-size: 100% 200%;
          background-position: center top;
          background-repeat: no-repeat;
          background-color: #a8d5e8;
        }

        /* Dark gradient overlay — makes ALL text clearly legible over the illustration */
        .sf::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(5, 30, 50, 0.72) 0%,
            rgba(5, 30, 50, 0.60) 55%,
            rgba(5, 30, 50, 0.80) 100%
          );
          z-index: 0;
        }

        /* Everything inside sits above the overlay */
        .sf-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem 2.5rem;
        }

        /* ── Top: Brand + Newsletter ── */
        .sf-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 4rem;
          padding-bottom: 3rem;
          margin-bottom: 3rem;
          border-bottom: 1px solid rgba(255,255,255,0.18);
          flex-wrap: wrap;
        }

        /* Brand */
        .sf-brand { flex: 1; min-width: 260px; }
        .sf-brand-link {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          text-decoration: none;
          margin-bottom: 1.1rem;
        }
        .sf-brand-name {
          font-family: 'Playfair Display', serif;
          font-weight: 800;
          font-size: 1.85rem;
          color: #ffffff;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 12px rgba(0,0,0,0.4);
        }
        .sf-brand p {
          color: rgba(255,255,255,0.78);
          line-height: 1.75;
          font-size: 0.95rem;
          max-width: 420px;
          margin: 0;
          word-break: break-word;
          overflow-wrap: break-word;
        }

        /* Newsletter */
        .sf-newsletter { flex: 1; min-width: 240px; max-width: 420px; }
        .sf-newsletter h3 {
          font-family: 'Playfair Display', serif;
          font-weight: 800;
          font-size: 1.3rem;
          color: #ffffff;
          margin: 0 0 0.85rem;
          text-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .sf-newsletter p {
          color: rgba(255,255,255,0.68);
          font-size: 0.88rem;
          line-height: 1.65;
          margin: 0.85rem 0 0;
        }
        .sf-nl-form {
          display: flex;
          flex-wrap: wrap;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.2);
        }
        .sf-nl-input {
          flex: 1;
          padding: 0.9rem 1.1rem;
          background: rgba(255,255,255,0.12);
          border: none;
          outline: none;
          color: #ffffff;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          backdrop-filter: blur(8px);
        }
        .sf-nl-input::placeholder { color: rgba(255,255,255,0.55); }
        .sf-nl-input:focus { background: rgba(255,255,255,0.2); }
        .sf-nl-btn {
          background: #D4AF37;
          color: #0a1a24;
          border: none;
          padding: 0 1.5rem;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          white-space: nowrap;
          letter-spacing: 0.02em;
        }
        .sf-nl-btn:hover { background: #e8c84a; transform: scale(1.03); }

        /* ── Links grid ── */
        .sf-links {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 2.5rem;
          margin-bottom: 3rem;
        }
        .sf-col h4 {
          font-family: 'Playfair Display', serif;
          font-weight: 800;
          font-size: 1.05rem;
          color: #D4AF37;
          margin: 0 0 1.25rem;
          letter-spacing: 0.01em;
        }
        .sf-col ul { list-style: none; padding: 0; margin: 0; }
        .sf-col ul li + li { margin-top: 0.65rem; }
        .sf-col a {
          color: rgba(255,255,255,0.78);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s, padding-left 0.2s;
          display: inline-block;
        }
        .sf-col a:hover { color: #D4AF37; padding-left: 5px; }

        /* Contact info */
        .sf-contact { display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.25rem; }
        .sf-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          color: rgba(255,255,255,0.78);
          font-size: 0.85rem;
          word-break: break-all;
          overflow-wrap: anywhere;
        }
        .sf-contact-item svg { flex-shrink: 0; margin-top: 2px; }

        /* Social buttons */
        .sf-socials { display: flex; gap: 0.65rem; }
        .sf-social-btn {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.25);
          display: flex !important;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.9);
          text-decoration: none;
          transition: background 0.2s, transform 0.2s, border-color 0.2s;
        }
        .sf-social-btn:hover {
          background: #D4AF37;
          border-color: #D4AF37;
          color: #0a1a24;
          transform: translateY(-3px);
        }

        /* Divider above copyright */
        .sf-divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.15);
          margin: 0;
        }

        /* Copyright bar */
        .sf-copy {
          position: relative;
          z-index: 1;
          background: rgba(5, 20, 35, 0.85);
          backdrop-filter: blur(6px);
          text-align: center;
          padding: 1.1rem 1rem;
          font-size: 0.88rem;
          color: rgba(255,255,255,0.88);
          line-height: 1.8;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .sf-copy a { color: #D4AF37; font-weight: 700; text-decoration: none; }
        .sf-copy a:hover { text-decoration: underline; }
        .sf-copy-sub { font-size: 0.80rem; opacity: 0.78; }
      `}</style>

      {/* All footer content sits directly on the skyline background */}
      <div className="sf-inner">

        {/* Top: Brand + Newsletter */}
        <div className="sf-top">
          <div className="sf-brand">
            <Link to="/" className="sf-brand-link">
              <img src={logoImg} alt="Book My Dream" style={{ width: 58, height: 58, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(212,175,55,0.6)', boxShadow: '0 4px 16px rgba(0,0,0,0.4)' }} />
              <span className="sf-brand-name">Book My Dream</span>
            </Link>
            <p>Book My Dream is where tradition meets luxury. We create bespoke travel experiences that honor India's heritage while caring for you and the planet.</p>
          </div>

          <div className="sf-newsletter">
            <h3>Newsletter</h3>
            <div className="sf-nl-form">
              <input type="email" placeholder="Enter your email address" className="sf-nl-input" />
              <button className="sf-nl-btn" onClick={(e) => e.preventDefault()}>Subscribe</button>
            </div>
            <p>Stay connected with our journeys. Get updates on new destinations, exclusive offers, and stories from our travelers.</p>
          </div>
        </div>

        {/* Middle: 4-col links */}
        <div className="sf-links">
          <div className="sf-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/packages">Holiday Packages</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>
          <div className="sf-col">
            <h4>Customer Care</h4>
            <ul>
              <li><Link to="/contact">FAQs</Link></li>
              <li><Link to="/contact">Booking Policy</Link></li>
              <li><Link to="/contact">Cancellation</Link></li>
              <li><Link to="/contact">Help &amp; Support</Link></li>
            </ul>
          </div>
          <div className="sf-col">
            <h4>Company Links</h4>
            <ul>
              <li><Link to="/contact">Terms &amp; Conditions</Link></li>
              <li><Link to="/contact">Privacy Policy</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/contact">Work With Us</Link></li>
            </ul>
          </div>
          <div className="sf-col">
            <h4>Connect With Us</h4>
            <div className="sf-contact">
              <span className="sf-contact-item"><Mail size={14} /> {COMPANY.email}</span>
              <span className="sf-contact-item"><Phone size={14} /> {COMPANY.phone}</span>
            </div>
            <div className="sf-socials">
              <a href="#" className="sf-social-btn" aria-label="Facebook"><Facebook /></a>
              <a href="#" className="sf-social-btn" aria-label="Instagram"><Instagram /></a>
              <a href="#" className="sf-social-btn" aria-label="YouTube"><YouTube /></a>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="sf-copy">
        <div>© {new Date().getFullYear()} Book My Dream. All Rights Reserved.</div>
        <div className="sf-copy-sub">
          Designed &amp; Developed by{' '}
          <a href="https://www.logicmindsbyparii.com/" target="_blank" rel="noopener noreferrer">Logicminds by parii</a>
        </div>
      </div>
    </footer>
  )
}
