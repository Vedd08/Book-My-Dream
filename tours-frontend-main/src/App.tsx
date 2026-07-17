import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import PackagesPage from './pages/PackagesPage'
import PackageDetailPage from './pages/PackageDetailPage'
import DestinationsPage from './pages/DestinationsPage'
import DestinationDetailPage from './pages/DestinationDetailPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import GalleryPage from './pages/GalleryPage'
import BlogPage from './pages/BlogPage'
import BlogDetailPage from './pages/BlogDetailPage'
import ServicesPage from './pages/ServicesPage'
import NotFoundPage from './pages/NotFoundPage'

// Disable browser's default scroll restoration to always start at the top on refresh
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Exposed so modals/overlays can pause it — Lenis drives scroll via its
    // own RAF loop, so `overflow:hidden` on body alone doesn't stop it.
    ;(window as any).lenis = lenis

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
      delete (window as any).lenis
    }
  }, [])
  return null
}

// Admin
import { AuthProvider, useAuth } from './admin/AuthContext'
import AdminLogin from './admin/AdminLogin'
import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminPackages from './admin/pages/AdminPackages'
import AdminDestinations from './admin/pages/AdminDestinations'
import AdminInquiries from './admin/pages/AdminInquiries'
import AdminSubscribers from './admin/pages/AdminSubscribers'
import AdminBlogs from './admin/pages/AdminBlogs'
import AdminGallery from './admin/pages/AdminGallery'
import AdminGallerySlides from './admin/pages/AdminGallerySlides'

function ProtectedAdminRoute({ children }: { children: JSX.Element }) {
  const { auth } = useAuth()
  if (!auth) return <Navigate to="/admin" replace />
  return children
}

function AdminLoginRoute() {
  const { auth } = useAuth()
  if (auth) return <Navigate to="/admin/dashboard" replace />
  return <AdminLogin />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <SmoothScroll />
        <ScrollToTop />
        <Routes>
          {/* ── Public Frontend ── */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/packages/:slug" element={<PackageDetailPage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/destinations/:slug" element={<DestinationDetailPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            {/* Catch-all */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* ── Admin Auth ── */}
          <Route path="/admin" element={<AdminLoginRoute />} />

          {/* ── Admin Protected ── */}
          <Route path="/admin" element={<ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="packages" element={<AdminPackages />} />
            <Route path="destinations" element={<AdminDestinations />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="gallery-slides" element={<AdminGallerySlides />} />
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="subscribers" element={<AdminSubscribers />} />
          </Route>


        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
