import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { API_URL } from '../config'

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

export default function BlogDetailPage() {
  const { slug } = useParams()
  const [blog, setBlog] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`${API_URL}/api/blogs/${slug}`)
      .then(r => {
        if (!r.ok) throw new Error('Blog not found')
        return r.json()
      })
      .then(data => {
        setBlog(data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <div style={{ width: 40, height: 40, border: '3px solid rgba(212,175,55,0.2)', borderTopColor: '#D4AF37', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </main>
    )
  }

  if (error || !blog) {
    return (
      <main style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: '#f8fafc', color: '#1e293b' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)', fontWeight: 800 }}>Story Not Found</h2>
        <p style={{ color: '#64748b', marginBottom: '2.5rem', fontSize: '1.1rem' }}>We couldn't find the travel story you're looking for.</p>
        <Link to="/blog" className="premium-btn primary" style={{ textDecoration: 'none', display: 'inline-block', padding: '0.75rem 2rem', background: '#1e293b', color: '#fff', borderRadius: '8px', fontWeight: 600 }}>
          Back to Journal
        </Link>
      </main>
    )
  }

  return (
    <main style={{ background: '#f8fafc', color: '#1e293b', fontFamily: 'var(--font-sans)' }}>
      <PageHero 
        crumb={blog.title} 
        title={blog.title} 
        subtitle={`${blog.date} · ${blog.readTime} · By ${blog.author}`} 
        image={blog.image} 
      />

      <style>{`
        .blog-article-content {
          background: white;
          border-radius: 20px;
          padding: 5rem;
          box-shadow: 0 15px 40px rgba(0,0,0,0.06);
          margin-top: -80px;
          position: relative;
          z-index: 10;
        }

        .blog-category-badge {
          display: inline-block;
          padding: 0.5rem 1.25rem;
          border-radius: 100px;
          background: rgba(212,175,55, 0.1);
          color: #b49124;
          font-size: 0.8rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 2.5rem;
        }

        .blog-excerpt {
          font-size: 1.6rem;
          color: #0f172a;
          line-height: 1.5;
          font-weight: 500;
          font-family: var(--font-serif);
          margin-bottom: 3.5rem;
          border-left: 4px solid #D4AF37;
          padding-left: 2rem;
        }

        .blog-body-text {
          font-size: 1.15rem;
          color: #475569;
          line-height: 1.85;
        }

        .blog-body-text p {
          margin-bottom: 1.75rem;
        }
        
        .drop-cap {
          float: left;
          font-size: 4.5rem;
          line-height: 0.8;
          padding-right: 0.75rem;
          padding-top: 0.5rem;
          font-family: var(--font-serif);
          color: #D4AF37;
          font-weight: 700;
        }

        .blog-body-text h3 {
          font-size: 2rem;
          color: #0f172a;
          margin: 4rem 0 1.5rem;
          font-family: var(--font-serif);
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .blog-quote {
          margin: 4rem 0;
          padding: 3rem 4rem;
          background: #f8fafc;
          border-radius: 16px;
          font-size: 1.4rem;
          color: #0f172a;
          text-align: center;
          position: relative;
          font-weight: 500;
          font-family: var(--font-serif);
          line-height: 1.6;
        }

        .blog-quote::before {
          content: '"';
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 8rem;
          color: rgba(212,175,55,0.15);
          font-family: var(--font-serif);
          line-height: 1;
        }

        .blog-image {
          width: 100%;
          border-radius: 16px;
          margin: 4rem 0;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          max-height: 600px;
          object-fit: cover;
        }

        .blog-footer {
          margin-top: 5rem;
          padding-top: 3rem;
          border-top: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .blog-author-card {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .blog-author-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #0f172a;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.75rem;
          font-weight: 700;
          font-family: var(--font-serif);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 1.5rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          color: #0f172a;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .back-btn:hover {
          border-color: #0f172a;
          background: #0f172a;
          color: #fff;
        }

        @media (max-width: 768px) {
          .blog-article-content {
            padding: 2.5rem 1.5rem;
            margin-top: -40px;
          }
          .blog-excerpt { font-size: 1.3rem; padding-left: 1.25rem; }
          .blog-quote { padding: 2.5rem 1.5rem; font-size: 1.25rem; }
          .blog-footer { flex-direction: column; gap: 2rem; align-items: flex-start; }
          .drop-cap { font-size: 3.5rem; padding-top: 0.25rem; }
        }
      `}</style>

      <div className="container" style={{ paddingBottom: '6rem', maxWidth: '960px', margin: '0 auto' }}>
        <article className="blog-article-content">
          <span className="blog-category-badge">{blog.category}</span>
          
          <div className="blog-excerpt">
            {blog.excerpt}
          </div>

          <div className="blog-body-text">
            <p>
              <span className="drop-cap">T</span>
              raveling is more than just visiting new places; it's about immersing yourself in the culture, tasting the local cuisine, and creating memories that will last a lifetime. In this guide, we dive deep into everything you need to know to make your next trip absolutely perfect.
            </p>
            
            <p>
              Whether you're planning a serene retreat in the backwaters of Kerala or an adventurous safari in the heart of Africa, the key to a truly luxurious experience lies in the details. From meticulously curated itineraries to exclusive access to some of the world's most breathtaking sites, luxury travel is about seamless, stress-free exploration.
            </p>

            <h3>Why This Matters</h3>
            
            <p>
              The difference between a good trip and an unforgettable journey often comes down to the expertise behind it. Knowing when to visit, where to stay, and how to avoid the crowds can transform your experience. It's not just about luxury accommodations—it's about authentic connections with the destination.
            </p>

            <div className="blog-quote">
              "Travel makes one modest. You see what a tiny place you occupy in the world." 
              <span style={{ display: 'block', fontSize: '1rem', marginTop: '1.5rem', color: '#64748b', fontStyle: 'normal', fontFamily: 'var(--font-sans)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Gustave Flaubert</span>
            </div>

            <img src={blog.image} alt={blog.title} className="blog-image" />
            
            <h3>Top Recommendations for Discerning Travelers</h3>

            <p>
              When planning your next escape, consider properties that prioritize sustainability without compromising on elegance. Eco-luxury lodges, private villas, and chartered experiences allow you to enjoy the world's beauty responsibly. Remember, true luxury is having the freedom to experience the world on your own terms.
            </p>
          </div>

          <div className="blog-footer">
            <div className="blog-author-card">
              <div className="blog-author-avatar">
                {blog.author.charAt(0)}
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: '1.15rem', color: '#0f172a', margin: 0, fontFamily: 'var(--font-serif)' }}>{blog.author}</p>
                <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0.25rem 0 0 0', fontWeight: 500 }}>Travel Expert & Contributor</p>
              </div>
            </div>

            <Link to="/blog" className="back-btn">
              ← Back to Journal
            </Link>
          </div>
        </article>
      </div>
    </main>
  )
}
