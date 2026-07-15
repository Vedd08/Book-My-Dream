import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, User, Calendar } from 'lucide-react'
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

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/api/blogs`)
      .then(r => r.json())
      .then(data => {
        setBlogPosts(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching blogs:', err)
        setLoading(false)
      })
  }, [])

  return (
    <main className="premium-blog" style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b', overflowX: 'hidden', fontFamily: 'var(--font-sans)' }}>
      
      {/* Cinematic Hero Section */}
      <section className="cinematic-hero" style={{
        position: 'relative',
        height: '65vh',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#0B1528'
      }}>
        {/* Parallax Background */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/tips3.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          filter: 'brightness(0.55)'
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #f8fafc 0%, transparent 60%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '4rem' }}>
          <span style={{ 
            display: 'inline-block', 
            color: '#D4AF37', // Gold accent
            fontWeight: 700, 
            letterSpacing: '0.2em', 
            textTransform: 'uppercase', 
            marginBottom: '1rem',
            animation: 'fadeInUp 1s ease forwards',
            fontSize: '0.9rem'
          }}>
            Explore The World
          </span>
          <h1 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(3rem, 6vw, 5rem)', 
            fontWeight: 800,
            lineHeight: 1.1,
            color: '#fff',
            letterSpacing: '-0.02em',
            margin: '0 auto',
            opacity: 0,
            animation: 'fadeInUp 1s ease 0.2s forwards'
          }}>
            Travel Stories & Inspiration
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.8)',
            maxWidth: '600px',
            margin: '1.5rem auto 0',
            fontSize: '1.1rem',
            lineHeight: 1.6,
            opacity: 0,
            animation: 'fadeInUp 1s ease 0.4s forwards'
          }}>
            Discover hidden gems, expert tips, and unforgettable journeys from our luxury travel experiences.
          </p>
        </div>
      </section>

      {/* Premium Blog Grid */}
      <section style={{ position: 'relative', padding: '0 2rem 6rem', marginTop: '-5rem', zIndex: 10 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
              <div style={{ width: 40, height: 40, border: '3px solid rgba(212,175,55,0.2)', borderTopColor: '#D4AF37', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            </div>
          ) : blogPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', background: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#1e293b' }}>No stories published yet</h2>
              <p style={{ color: '#64748b' }}>Check back soon for inspiring travel stories.</p>
            </div>
          ) : (
            <div className="blog-grid">
              {/* Featured Post (First one spans full width on large screens) */}
              {blogPosts.length > 0 && (
                <article className="blog-card featured">
                  <div className="blog-image-wrapper">
                    <img src={blogPosts[0].image} alt={blogPosts[0].title} />
                    <div className="blog-category">{blogPosts[0].category}</div>
                  </div>
                  <div className="blog-content">
                    <div className="blog-meta">
                      <span><Calendar size={14} /> {blogPosts[0].date}</span>
                      <span><Clock size={14} /> {blogPosts[0].readTime}</span>
                      <span><User size={14} /> {blogPosts[0].author}</span>
                    </div>
                    <h2>{blogPosts[0].title}</h2>
                    <p>{blogPosts[0].excerpt}</p>
                    <Link to={`/blog/${blogPosts[0].slug}`} className="read-more">
                      Read Article <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              )}

              {/* Remaining Posts */}
              {blogPosts.slice(1).map((post, index) => (
                <article key={post.slug} className="blog-card" style={{ animationDelay: `${(index % 3) * 0.15}s` }}>
                  <div className="blog-image-wrapper">
                    <img src={post.image} alt={post.title} loading="lazy" />
                    <div className="blog-category">{post.category}</div>
                  </div>
                  <div className="blog-content">
                    <div className="blog-meta">
                      <span><Calendar size={14} /> {post.date}</span>
                      <span><Clock size={14} /> {post.readTime}</span>
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                    <div style={{ marginTop: 'auto', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span className="author"><User size={14} /> {post.author}</span>
                      <Link to={`/blog/${post.slug}`} className="read-more icon-only" aria-label={`Read ${post.title}`}>
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 2.5rem;
        }

        .blog-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
          transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease;
          display: flex;
          flex-direction: column;
          grid-column: span 4;
          animation: fadeInUp 0.8s ease backwards;
        }
        
        @media (max-width: 1024px) {
          .blog-card { grid-column: span 6; }
        }
        @media (max-width: 640px) {
          .blog-card { grid-column: span 12; }
        }

        .blog-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.08);
        }

        .blog-card.featured {
          grid-column: span 12;
          flex-direction: row;
          align-items: center;
          gap: 2rem;
          padding: 1.5rem;
        }
        @media (max-width: 900px) {
          .blog-card.featured { flex-direction: column; padding: 0; }
        }

        .blog-image-wrapper {
          position: relative;
          overflow: hidden;
          aspect-ratio: 16/10;
        }
        .blog-card.featured .blog-image-wrapper {
          flex: 1.2;
          border-radius: 12px;
          height: 100%;
          min-height: 400px;
        }
        @media (max-width: 900px) {
          .blog-card.featured .blog-image-wrapper { min-height: auto; width: 100%; border-radius: 16px 16px 0 0; }
        }

        .blog-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .blog-card:hover .blog-image-wrapper img {
          transform: scale(1.05);
        }

        .blog-category {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(4px);
          color: #1e293b;
          padding: 0.4rem 1rem;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .blog-content {
          padding: 2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .blog-card.featured .blog-content {
          flex: 1;
          padding: 2rem 3rem 2rem 1rem;
        }
        @media (max-width: 900px) {
          .blog-card.featured .blog-content { padding: 2rem; }
        }

        .blog-meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.25rem;
          font-size: 0.85rem;
          color: #64748b;
          margin-bottom: 1rem;
          font-weight: 500;
        }
        .blog-meta span {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .blog-content h2 {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 1rem;
          line-height: 1.3;
          transition: color 0.3s ease;
        }
        .blog-card.featured .blog-content h2 {
          font-size: 2.25rem;
        }
        .blog-card:hover .blog-content h2 {
          color: #D4AF37;
        }

        .blog-content p {
          color: #475569;
          line-height: 1.7;
          margin: 0;
          font-size: 0.95rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .blog-card.featured .blog-content p {
          font-size: 1.05rem;
          -webkit-line-clamp: 4;
          margin-bottom: 2rem;
        }

        .read-more {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: #0f172a;
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          margin-top: auto;
          align-self: flex-start;
        }
        .blog-card.featured .read-more {
          background: #1e293b;
          color: #fff;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
        }
        .blog-card.featured .read-more:hover {
          background: #D4AF37;
          color: #000;
        }
        
        .read-more.icon-only {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #f1f5f9;
          justify-content: center;
          margin: 0;
          color: #1e293b;
        }
        .read-more.icon-only:hover {
          background: #D4AF37;
          color: #000;
          transform: translateX(4px);
        }
        .blog-card.featured .read-more:not(.icon-only):hover svg {
          transform: translateX(4px);
          transition: transform 0.3s ease;
        }

        .author {
          font-size: 0.85rem;
          font-weight: 600;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
      `}</style>
    </main>
  )
}
