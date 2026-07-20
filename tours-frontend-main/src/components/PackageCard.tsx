import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { inr, formatCurrency, type Package } from '../data'
import { getImageUrl } from '../config'

export default function PackageCard({ pkg }: { pkg: Package }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      to={`/packages/${pkg.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        position: 'relative',
        paddingBottom: '2rem' // Space for overlapping card
      }}
    >
      {/* Image Area */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/11', borderRadius: '8px', overflow: 'hidden' }}>
        <img
          src={getImageUrl(pkg.image)}
          alt={pkg.name}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            backgroundColor: '#f1f5f9',
            transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
      </div>

      {/* Overlapping White Content Box */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '5%',
        width: '90%',
        background: 'white',
        borderRadius: '8px',
        padding: '1.25rem',
        boxShadow: '0 10px 20px rgba(24, 106, 118, 0.08)',
        transition: 'transform 0.3s ease',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
      }}>
        {/* Yellow Tag */}
        <div style={{
          position: 'absolute',
          top: '-12px',
          left: '1.25rem',
          background: '#D4AF37',
          color: 'white',
          fontSize: '0.75rem',
          fontWeight: 700,
          padding: '4px 12px',
          borderRadius: '999px',
          boxShadow: '0 4px 10px rgba(212, 175, 55, 0.3)'
        }}>
          {pkg.region === 'International' && pkg.foreignPrice ? (
            <>
              {formatCurrency(pkg.foreignPrice, pkg.foreignCurrency || 'USD')}
              {' / '}{pkg.discountPrice ? inr(pkg.discountPrice) : inr(pkg.price)}
            </>
          ) : (
            <>
              {pkg.discountPrice ? inr(pkg.discountPrice) : inr(pkg.price)}
            </>
          )}
        </div>

        <h3 style={{
          fontSize: '1.05rem',
          fontWeight: 700,
          color: '#186a76',
          margin: '0.5rem 0 0.5rem 0',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {pkg.name}
        </h3>

        <p style={{
          fontSize: '0.8rem',
          color: '#666',
          lineHeight: 1.5,
          marginBottom: '0.75rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {pkg.duration} - {pkg.destination}, {pkg.country}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#186a76', fontWeight: 600, fontSize: '0.85rem' }}>
          <div style={{
            width: 18, height: 18,
            borderRadius: '50%',
            background: '#186a76',
            color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <ArrowRight size={10} />
          </div>
          View Details
        </div>
      </div>
    </Link>
  )
}
