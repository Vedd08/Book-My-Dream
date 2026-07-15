import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, ImageOff } from 'lucide-react'
import gsap from 'gsap'
import type { Destination } from '../data'
import { getImageUrl } from '../config'

export default function DestinationCard({ dest }: { dest: Destination }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [imageOk, setImageOk] = useState(!!dest.image);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;

    const xTo = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3.out" });
    const scaleTo = gsap.quickTo(el, "scale", { duration: 0.5, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation (-10 to 10 degrees)
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      
      xTo(rotateY);
      yTo(rotateX);
      scaleTo(1.05);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      scaleTo(1);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Link
      ref={cardRef}
      to={`/packages?q=${encodeURIComponent(dest.slug.replace('-', ' '))}`}
      className="dest-card"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        borderRadius: 24, // softer, modern corners
        overflow: 'hidden',
        textDecoration: 'none',
        color: '#fff',
        aspectRatio: '3/4',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        background: '#1a1a2e',
        perspective: 1000,
        transformStyle: 'preserve-3d',
        width: '100%',
        height: '100%',
        padding: '0.6rem' // inner padding for the floating panel
      }}
    >
      {/* Background image (with graceful fallback for missing/broken images) */}
      {imageOk ? (
        <img
          src={getImageUrl(dest.image)}
          alt={dest.name}
          className="dest-card-img"
          onError={() => setImageOk(false)}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            transition: 'transform .7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
      ) : (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, var(--primary) 0%, #16324a 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ImageOff size={32} style={{ color: 'rgba(255,255,255,.35)' }} />
        </div>
      )}

      {/* Gentle gradient overlay so the image isn't too bright behind the glass */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,.6) 0%, transparent 60%)',
      }} />

      {/* Floating Glassmorphic Content Block */}
      <div className="dest-glass-panel" style={{
        position: 'relative',
        padding: '1rem',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: 18,
        border: '1px solid rgba(255, 255, 255, 0.25)',
        transition: 'transform 0.3s ease, background 0.3s ease',
      }}>

        {/* Top row of glass panel: Country and Best Time */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <p style={{
            fontSize: '.75rem',
            color: 'rgba(255,255,255,.9)',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontWeight: 500
          }}>
            <MapPin size={12} /> {dest.country}
          </p>
          {dest.bestTime && (
            <span style={{
              display: 'inline-block',
              padding: '.15rem .45rem',
              borderRadius: 9999,
              background: 'rgba(0,0,0,.25)',
              fontSize: '.62rem',
              fontWeight: 600,
              color: '#fff',
              letterSpacing: '.02em',
              whiteSpace: 'nowrap',
            }}>
              {dest.bestTime.split(' ')[0]} {/* Show just the starting month for a cleaner look if it's long */}
            </span>
          )}
        </div>

        {/* Name */}
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.25rem',
          fontWeight: 700,
          lineHeight: 1.1,
          margin: '0',
          textShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}>
          {dest.name}
        </h3>

        {/* Explore CTA */}
        <span className="dest-cta" style={{
          marginTop: '.6rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          fontSize: '.8rem',
          fontWeight: 700,
          color: '#fff',
          opacity: 0.8,
          transition: 'opacity 0.2s',
        }}>
          Explore <ArrowRight size={14} />
        </span>
      </div>

      <style>{`
        /* Hover: lift + zoom + glow — desktop only */
        @media (min-width: 768px) {
          .dest-card:hover {
            box-shadow: 0 30px 50px rgba(0,0,0,0.4), 0 0 20px rgba(255,255,255,0.1) !important;
            z-index: 10;
          }
          .dest-card:hover .dest-card-img {
            transform: scale(1.1);
          }
          .dest-card:hover .dest-glass-panel {
            background: rgba(255, 255, 255, 0.25);
            border-color: rgba(255, 255, 255, 0.4);
            transform: translateY(-2px);
          }
          .dest-card:hover .dest-cta {
            opacity: 1;
            color: var(--accent);
          }
        }

        /* ── Mobile only ── */
        @media (max-width: 767px) {
          .dest-card {
            aspect-ratio: unset !important;
            height: 250px !important;
            width: 100% !important;
            border-radius: 16px !important;
          }
        }
      `}</style>
    </Link>
  )
}