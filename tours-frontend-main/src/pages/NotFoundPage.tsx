import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 1rem' }}>
      <p style={{ fontFamily: 'var(--font-serif)', fontSize: '6rem', fontWeight: 700, color: 'var(--secondary)', lineHeight: 1 }}>404</p>
      <h1 style={{ marginTop: '1rem', fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700 }}>Page Not Found</h1>
      <p style={{ marginTop: '.75rem', color: 'var(--muted-fg)', maxWidth: '30rem' }}>Oops! The page you're looking for has drifted away. Let's get you back on track.</p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: '2rem' }}>Go Back Home</Link>
    </main>
  )
}
