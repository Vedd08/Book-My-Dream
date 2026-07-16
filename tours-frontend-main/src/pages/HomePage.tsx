import { Link } from 'react-router-dom'
import { API_URL } from '../config'
const baliImg = "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop";
const maldivesImg = "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2000&auto=format&fit=crop";
const switzerlandImg = "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2000&auto=format&fit=crop";
const dubaiImg = "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop";
const kerelaImg = "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2000&auto=format&fit=crop";
const offer1Img = "https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=2000&auto=format&fit=crop";
import frame1 from '../assets/Frame.png'
import frame2 from '../assets/Frame2.png'
import hotAirBalloonImg from '../assets/hot_air_balloon.png'
import realBalloonImg from '../assets/real_balloon_transparent.png'
import {
  Search, Star, ShieldCheck, Award, CheckCircle2, ArrowRight, Headphones,
  Wallet, Map, Plane, Heart, ChevronLeft, ChevronRight, Compass, Building2,
  Car, BadgePercent, LayoutGrid, Calendar, Clock, Users2, Utensils, Hotel as HotelIcon,
  Bus, UserCheck, Tag, Quote
} from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { blogPosts, galleryImages, testimonials, services, inr, packages as staticPackages } from '../data'
import type { Package, Destination } from '../data'
import SectionHeading from '../components/SectionHeading'

import MagneticButton from '../components/MagneticButton'
import LottieAirplane from '../components/LottieAirplane'
import LottieHotel from '../components/LottieHotel'
import DestinationEditorial from '../components/luxury-trending/DestinationEditorial'
import DepartureCitiesEditorial from '../components/luxury-trending/DepartureCitiesEditorial'
import FeaturedPackagesEditorial from '../components/luxury-trending/FeaturedPackagesEditorial'
import FloatingBalloons from '../components/FloatingBalloons'
import PackageCard from '../components/PackageCard'
import DestinationCard from '../components/DestinationCard'
import TestimonialCarousel from '../components/TestimonialCarousel'
import PromoPopup from '../components/PromoPopup'
import { Send } from 'lucide-react'
import {
  MapPin, Globe, Sparkles, Hotel, TrainFront, Ship, FileCheck, BookUser, Users, Briefcase
} from 'lucide-react'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Performance: throttle helper ────────────────────────────────────────────
function throttle<T extends (...args: any[]) => void>(fn: T, ms: number): T {
  let last = 0
  return ((...args: any[]) => {
    const now = performance.now()
    if (now - last < ms) return
    last = now
    fn(...args)
  }) as T
}

const iconMap: Record<string, React.ElementType> = {
  MapPin, Globe, Sparkles, Hotel, Plane, TrainFront, Ship, FileCheck, BookUser, Heart, Users, Briefcase,
}

const quickCategories = [
  { icon: Compass, label: 'Holiday Packages', to: '/packages', bg: 'var(--color-2)', border: 'var(--color-2)' },
  { icon: Plane, label: 'Destinations', to: '/destinations', bg: 'var(--color-4)', border: 'var(--color-4)' },
  { icon: LayoutGrid, label: 'All', to: '/packages', bg: 'var(--color-3)', border: 'var(--color-3)' },
]

const trustStats = [
  { value: '1000+', label: 'Happy Guests' },
  { value: '500+', label: 'Tours Completed' },
  { value: '150+', label: 'Destinations' },
]


const heroImages = [kerelaImg, baliImg, maldivesImg, dubaiImg, switzerlandImg]

const offerCards = [
  {
    id: 'domestic', to: '/packages?q=Domestic',
    img: kerelaImg,
    eyebrow: '🔥 Limited-Time Offer',
    title: 'Best Domestic Deals',
    sub: 'Kerala · Goa · Rajasthan · Himachal',
    discount: 'Up to 30% OFF',
    tag: 'Most Popular',
    tagColor: '#22c55e',
    accent: '#84cc16',
    featured: true,
  },
  {
    id: 'international', to: '/packages?q=International',
    img: switzerlandImg,
    eyebrow: "✈️ Editor's Pick",
    title: 'International Tours',
    sub: 'Bali · Switzerland · Dubai · Maldives',
    discount: 'Up to 25% OFF',
    tag: 'Trending',
    tagColor: '#3b82f6',
    accent: '#60a5fa',
    featured: false,
  },
  {
    id: 'adventure', to: '/packages?q=Adventure',
    img: dubaiImg,
    eyebrow: '⚡ Flash Sale',
    title: 'Adventure Escapes',
    sub: 'Trekking · Safari · Water Sports',
    discount: 'Up to 20% OFF',
    tag: 'Flash Sale',
    tagColor: '#f97316',
    accent: '#fb923c',
    featured: false,
  },
]


const slideDestinations = [
  { name: 'Kerala', region: 'Domestic' },
  { name: 'Bali', region: 'International' },
  { name: 'Maldives', region: 'International' },
  { name: 'Dubai', region: 'International' },
  { name: 'Switzerland', region: 'International' },
]

const socialLinks = [
  { icon: Facebook, label: 'Facebook', url: 'https://www.facebook.com/share/18tCiPVjBn/' },
  { icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com/bookmy.dream?igsh=MXZweTJ6MXoyeWMwZA==' },
  { icon: Youtube, label: 'YouTube', url: 'https://youtube.com/@book.mydream?si=Bxoq1RmPq28VZ5xi' },
]

const introStats = [
  { icon: Users2, value: '1000+', label: 'Happy Guests', color: 'var(--color-1)' },
  { icon: Award, value: '500+', label: 'Tours Completed', color: 'var(--color-5)' },
  { icon: Map, value: '150+', label: 'Tour Destinations', color: 'var(--color-4)' },
]

const reviewCards = [
  {
    tour: 'Best of Bali', type: 'Family', rating: 5,
    review: '"The tour was amazing and organised very well. It was a perfect combination of relaxation, adventure and sightseeing. The food served du..."',
    reviewer: 'Suruchee', date: 'May, 2026', guide: 'Swapnil Deshmukh', image: null,
  },
  {
    tour: 'Switzerland Highlights', type: 'Family', rating: 5,
    review: '"Excellent service right from the beginning of the tour. Every detail was taken care of beautifully by the team..."',
    reviewer: 'Dhananjay', date: 'May, 2026', guide: 'Amit Kene', image: switzerlandImg,
  },
  {
    tour: 'Kerala Backwaters', type: 'Family', rating: 5,
    review: '"A heartfelt thank you to our tour manager. The experience was beyond expectations — truly memorable for our family..."',
    reviewer: 'Kanta', date: 'May, 2026', guide: 'Rajan Nair', image: kerelaImg,
  },
]

const flightMapSvg = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 600' preserveAspectRatio='xMidYMid slice'>
  <style>
    .path { fill: none; stroke: rgba(255,255,255,0.6); stroke-width: 2.5; stroke-dasharray: 10 12; stroke-linecap: round; }
    .text { fill: rgba(255,255,255,0.95); font-family: 'Brush Script MT', 'Comic Sans MS', cursive, sans-serif; font-size: 32px; font-style: italic; }
    .pin { fill: rgba(255,255,255,0.35); }
    .cross { stroke: rgba(255,255,255,0.5); stroke-width: 2; stroke-linecap: round; }
  </style>

  <!-- Playful paths -->
  <path class="path" d="M -100 150 Q 250 20 450 180 T 850 80 T 1500 300" />
  <path class="path" d="M 0 500 Q 300 350 600 500 T 1100 250 T 1500 100" />
  <path class="path" d="M 150 650 Q 350 400 700 550 T 1300 500 T 1500 700" />

  <!-- Map pins -->
  <g transform="translate(280, 220) scale(1.8)"><path class="pin" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></g>
  <g transform="translate(850, 100) scale(1.8)"><path class="pin" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></g>
  <g transform="translate(1080, 260) scale(1.8)"><path class="pin" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></g>
  <g transform="translate(600, 480) scale(1.8)"><path class="pin" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></g>
  <g transform="translate(180, 420) scale(1.8)"><path class="pin" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></g>

  <!-- Crosses (stars) -->
  <path class="cross" d="M 400 100 L 410 100 M 405 95 L 405 105" />
  <path class="cross" d="M 900 250 L 910 250 M 905 245 L 905 255" />
  <path class="cross" d="M 150 280 L 160 280 M 155 275 L 155 285" />
  <path class="cross" d="M 1250 450 L 1260 450 M 1255 445 L 1255 455" />
  <path class="cross" d="M 750 400 L 760 400 M 755 395 L 755 405" />

  <!-- Texts -->
  <text x="320" y="210" class="text" transform="rotate(-5 320 210)">Majorca</text>
  <text x="890" y="90" class="text" transform="rotate(5 890 90)">Taiwan</text>
  <text x="1110" y="250" class="text" transform="rotate(-3 1110 250)">Japan</text>
  <text x="630" y="470" class="text" transform="rotate(2 630 470)">Hamburg</text>
  <text x="210" y="410" class="text" transform="rotate(-4 210 410)">Stockholm</text>

  <!-- Mini Paper Planes -->
  <g transform="translate(450, 180) rotate(20) scale(0.6)">
    <path fill="rgba(255,255,255,0.75)" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
  </g>
  <g transform="translate(1100, 250) rotate(-15) scale(0.6)">
    <path fill="rgba(255,255,255,0.75)" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
  </g>
  <g transform="translate(700, 550) rotate(-10) scale(0.6)">
    <path fill="rgba(255,255,255,0.75)" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
  </g>
</svg>
`)}`;

const lightFlightMapSvg = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 600' preserveAspectRatio='xMidYMid slice'>
  <style>
    .grid { stroke: rgba(168,230,207,0.08); stroke-width: 1; }
    .circle { fill: none; stroke: rgba(168,230,207,0.15); stroke-width: 1.5; stroke-dasharray: 6 8; }
    .plane { fill: rgba(168,230,207,0.25); }
  </style>

  <!-- Abstract grid -->
  <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
    <path d="M 60 0 L 0 0 0 60" fill="none" class="grid"/>
  </pattern>
  <rect width="100%" height="100%" fill="url(#grid)" />

  <!-- Departure Hub 1 -->
  <g transform="translate(200, 200)">
    <circle r="80" class="circle" />
    <circle r="180" class="circle" />
    <circle r="280" class="circle" />
    <circle r="380" class="circle" />
    
    <g transform="rotate(-30) translate(180, 0)"><g transform="translate(-12, -12) scale(0.8)"><path class="plane" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></g></g>
    <g transform="rotate(45) translate(280, 0)"><g transform="translate(-12, -12) scale(0.6)"><path class="plane" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></g></g>
    <g transform="rotate(160) translate(380, 0)"><g transform="translate(-12, -12) scale(0.9)"><path class="plane" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></g></g>
  </g>

  <!-- Departure Hub 2 -->
  <g transform="translate(1200, 450)">
    <circle r="100" class="circle" />
    <circle r="220" class="circle" />
    <circle r="340" class="circle" />
    <circle r="460" class="circle" />
    
    <g transform="rotate(-140) translate(220, 0)"><g transform="translate(-12, -12) scale(0.8)"><path class="plane" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></g></g>
    <g transform="rotate(-60) translate(340, 0)"><g transform="translate(-12, -12) scale(0.7)"><path class="plane" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></g></g>
    <g transform="rotate(20) translate(460, 0)"><g transform="translate(-12, -12) scale(0.9)"><path class="plane" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></g></g>
  </g>

  <!-- Departure Hub 3 (small) -->
  <g transform="translate(750, 50)">
    <circle r="90" class="circle" />
    <circle r="190" class="circle" />
    
    <g transform="rotate(110) translate(190, 0)"><g transform="translate(-12, -12) scale(0.6)"><path class="plane" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></g></g>
  </g>
</svg>
`)}`;

export default function HomePage() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [email, setEmail] = useState('')
  const [subDone, setSubDone] = useState(false)
  const [featured, setFeatured] = useState<Package[]>(staticPackages.filter(p => p.featured))
  const [trending, setTrending] = useState<Package[]>(staticPackages.slice(0, 12))
  const [popularDest, setPopularDest] = useState<Destination[]>([])
  const [galleryImgs, setGalleryImgs] = useState<{ src: string, title: string, category: string }[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const introSectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const statsRefs = useRef<(HTMLDivElement | null)[]>([])
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const popularSectionRef = useRef<HTMLElement>(null)
  const balloonRef = useRef<HTMLDivElement>(null)
  const heroTextRef = useRef<HTMLDivElement>(null)
  const dataLoadedRef = useRef(false)
  // Track if user prefers reduced motion
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    fetch(`${API_URL}/api/packages`).then(r => r.json()).then(allData => {
      const allSorted = Array.isArray(allData) && allData.length > 0
        ? allData.sort((a, b) => (a.region === 'Domestic' && b.region !== 'Domestic' ? -1 : a.region !== 'Domestic' && b.region === 'Domestic' ? 1 : 0))
        : staticPackages

      setTrending(allSorted.slice(0, 12))

      fetch(`${API_URL}/api/packages/featured`).then(r => r.json()).then(featuredData => {
        let featuredSorted = Array.isArray(featuredData) && featuredData.length > 0
          ? featuredData.sort((a, b) => (a.region === 'Domestic' && b.region !== 'Domestic' ? -1 : a.region !== 'Domestic' && b.region === 'Domestic' ? 1 : 0))
          : [];
        
        // If no featured packages exist in the database, fallback to the latest packages
        if (featuredSorted.length === 0) {
          featuredSorted = allSorted.slice(0, 5);
        }
        
        setFeatured(featuredSorted)
      }).catch(() => {
        setFeatured(allSorted.slice(0, 5))
      })
    }).catch(() => { /* keep static fallback */ })
    fetch(`${API_URL}/api/destinations`).then(r => r.json()).then(data => {
      const sorted = Array.isArray(data)
        ? data.sort((a, b) => (a.region === 'Domestic' && b.region !== 'Domestic' ? -1 : a.region !== 'Domestic' && b.region === 'Domestic' ? 1 : 0))
        : []
      setPopularDest(sorted.slice(0, 8))
    }).catch(() => { /* no destinations fallback */ })
    fetch(`${API_URL}/api/gallery`).then(r => r.json()).then(data => {
      if (Array.isArray(data)) setGalleryImgs(data)
    }).catch(() => { /* no gallery fallback */ })
  }, [])

  useEffect(() => {
    intervalRef.current = setInterval(() => setCurrentSlide(p => (p + 1) % heroImages.length), 5000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion.current) return;
    const ctx = gsap.context(() => {

      if (heroTextRef.current) {
        const textItems = heroTextRef.current.querySelectorAll('.hero-text-item');
        gsap.from(textItems, {
          y: 50,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
          delay: 0.2
        });
      }
    });
    return () => ctx.revert();
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => setCurrentSlide(p => (p + 1) % heroImages.length), 5000)
  }
  const nextSlide = () => goToSlide((currentSlide + 1) % heroImages.length)
  const prevSlide = () => goToSlide((currentSlide - 1 + heroImages.length) % heroImages.length)

  const latestBlogs = blogPosts.slice(0, 3)
  const galleryPreview = [
    { src: '/images/dest-kerala.png', title: 'Kerala Backwaters' },
    { src: '/images/dest-switzerland.png', title: 'Swiss Alps' },
    { src: '/images/dubai.jpg', title: 'Dubai Adventures' },
    { src: '/images/baku.jpg', title: 'Explore Baku' },
    { src: '/images/goa.jpg', title: 'Goa Beaches' },
    { src: '/images/nyc8.jpg', title: 'City Tours' }
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch(`${API_URL}/api/newsletter/subscribe`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    setSubDone(true)
  }

  // ── Scroll animations ─────────────────────────────────────────────────────
  useEffect(() => {
    if (prefersReducedMotion.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: introSectionRef.current,
          start: 'top 75%',
          // Use 'play none none none' to avoid reverse re-animation overhead
          toggleActions: 'play none none none',
        },
      })

      const validStats = statsRefs.current.filter(Boolean)
      if (validStats.length) {
        tl.from(validStats, { opacity: 0, y: 30, stagger: 0.1, duration: 0.5, ease: 'back.out(1.4)' })
      }

      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('.word')
        if (words.length) {
          tl.from(words, { opacity: 0, y: 20, stagger: 0.03, duration: 0.4, ease: 'back.out' }, '-=0.3')
        }
      }

      if (buttonRef.current) {
        tl.from(buttonRef.current, { opacity: 0, scale: 0.8, duration: 0.35, ease: 'back.out' }, '-=0.2')
      }

      // Dense cards: use IntersectionObserver instead of ScrollTrigger for performance
      const denseCards = document.querySelectorAll('.dense-card')
      if (denseCards.length) {
        gsap.set(denseCards, { opacity: 0, y: 20 })
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const card = entry.target as HTMLElement
                const idx = Array.from(denseCards).indexOf(card)
                gsap.to(card, { opacity: 1, y: 0, duration: 0.5, delay: idx * 0.06, ease: 'power2.out' })
                observer.unobserve(card)
              }
            })
          },
          { threshold: 0.15 }
        )
        denseCards.forEach(card => observer.observe(card))
        return () => observer.disconnect()
      }
    }, introSectionRef)

    return () => ctx.revert()
  }, [])

  // ── Destination card animations via IntersectionObserver ─────────────────
  useEffect(() => {
    if (!popularDest.length || dataLoadedRef.current) return
    if (prefersReducedMotion.current) { dataLoadedRef.current = true; return }
    dataLoadedRef.current = true

    // Small delay to let React render the cards first
    const timer = setTimeout(() => {
      const popCards = document.querySelectorAll('.pop-destination-card')
      if (!popCards.length) return

      gsap.set(popCards, { opacity: 0, y: 24 })

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const card = entry.target as HTMLElement
              const idx = Array.from(popCards).indexOf(card)
              gsap.to(card, { opacity: 1, y: 0, duration: 0.6, delay: idx * 0.08, ease: 'power2.out' })
              observer.unobserve(card)
            }
          })
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      )
      popCards.forEach(card => observer.observe(card))
      return () => observer.disconnect()
    }, 50)

    return () => clearTimeout(timer)
  }, [popularDest])

  return (
    <main style={{ position: 'relative' }}>
      {/* Background Sprinkles */}
      <FloatingBalloons />
      {/*
        ─────────────────────────────────────────────────────────────────
        GLOBAL PERF STYLES
        Key fixes:
        1. Hero slides use opacity only (GPU composite, no repaint)
        2. Hover effects use transform+opacity only (no box-shadow on hover)
        3. backdrop-filter removed from hero nav — solid bg instead
        4. Decorative blobs use CSS animation, not JS, and are isolated
           with contain:strict + will-change:transform
        5. All transition shorthand replaced with explicit
           transition-property to avoid animating layout props
        ─────────────────────────────────────────────────────────────────
      */}
      <style>{`
        /* ── Reduced motion override ── */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* ── Hero slide fade: GPU-only opacity transition ── */
        .hero-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          /* Use only opacity + transform — both are compositor-only */
          transition: opacity 1s ease-in-out;
          will-change: opacity;
          /* Force compositing layer */
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        .hero-slide.active { opacity: 1; }

        /* ── Quick category icon hover: CSS only, no JS ── */
        .quick-cat-icon {
          transition-property: transform, box-shadow;
          transition-duration: 0.2s;
          transition-timing-function: ease;
          will-change: transform;
          transform: translateZ(0);
        }
        .quick-cat-link:hover .quick-cat-icon {
          transform: translateY(-4px) scale(1.1) translateZ(0);
        }

        /* ── Hero social button hover ── */
        .hero-social-btn {
          transition-property: background-color, border-color, transform;
          transition-duration: 0.2s;
        }
        .hero-social-btn:hover {
          background: var(--accent) !important;
          border-color: var(--accent) !important;
          transform: translateY(-2px);
        }

        /* ── Offer banners: transform only, no layout shift ── */
        .offer-card-new {
          position: relative; overflow: hidden; border-radius: 20px;
          text-decoration: none; display: block;
          transition: transform 0.38s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.35s ease;
          will-change: transform;
        }
        .offer-card-new:hover { transform: translateY(-8px) scale(1.01); }
        .offer-card-new::after {
          content: '';
          position: absolute; top: 0; left: -80%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
          transform: skewX(-20deg);
          transition: left 0.6s ease;
          pointer-events: none;
        }
        .offer-card-new:hover::after { left: 130%; }
        .offer-card-new img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.65s ease;
        }
        .offer-card-new:hover img { transform: scale(1.06); }
        .offer-promo-strip {
          position: relative; overflow: hidden; border-radius: 20px;
          text-decoration: none; display: flex; align-items: center;
          background: linear-gradient(135deg, #0d1b2e 0%, #1a2e4a 50%, #0d1b2e 100%);
          border: 1.5px solid rgba(255,255,255,0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .offer-promo-strip:hover { transform: translateY(-4px); box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
        @keyframes offerCountdown {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .offer-countdown-digit {
          animation: offerCountdown 1s ease-in-out infinite;
        }
        .offer-deal-tag {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 0.68rem; font-weight: 800; color: #fff;
          padding: 0.25rem 0.75rem; border-radius: 100px;
          text-transform: uppercase; letter-spacing: 0.08em;
        }
        .offers-bento-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          grid-template-rows: 210px 210px;
          gap: 1.25rem;
        }
        .offers-featured {
          grid-row: span 2;
          height: 100%;
        }
        .offers-sm {
          height: 100%;
        }
        @media (max-width: 767px) {
          .offers-bento-grid {
            grid-template-columns: 1fr;
            grid-template-rows: 260px 200px 200px;
          }
          .offers-featured { grid-row: span 1; }
          .offer-promo-strip { padding: 1.25rem 1.25rem !important; }
        }


        /* ── Trending / dense cards ── */
        .dense-card {
          transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease;
          will-change: transform, box-shadow;
          transform: translateZ(0);
        }
        .dense-card img {
          transition: transform 0.6s ease;
        }
        .dense-card:hover { 
          transform: translateY(-8px) translateZ(0); 
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.2) !important;
        }
        .dense-card:hover img {
          transform: scale(1.1) !important;
        }

        /* ── Search button pulse ── */
        @keyframes searchPulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(132, 204, 22, 0.6); }
          70% { box-shadow: 0 0 0 10px rgba(132, 204, 22, 0); }
          100% { box-shadow: 0 0 0 0 rgba(132, 204, 22, 0); }
        }
        .search-btn-pulse {
          animation: searchPulseGlow 2s infinite;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .search-btn-pulse:hover {
          transform: scale(1.05);
          animation: none;
          box-shadow: 0 6px 16px rgba(132, 204, 22, 0.4);
        }

        /* ── City departure cards ── */
        .city-depart-card {
          transition-property: transform;
          transition-duration: 0.18s;
          transition-timing-function: ease;
          will-change: transform;
          transform: translateZ(0);
        }
        .city-depart-card:hover { transform: translateY(-3px) translateZ(0); }
        .city-depart-btn {
          transition-property: background-color, color;
          transition-duration: 0.16s;
        }
        .city-depart-btn:hover { background: #1e3a6e !important; color: #fff !important; }

        /* ── Gallery thumb: scale img only (not container) ── */
        .gallery-thumb {
          overflow: hidden;
        }
        .gallery-thumb img {
          transition-property: transform;
          transition-duration: 0.55s;
          transition-timing-function: ease;
          will-change: transform;
          transform: translateZ(0);
        }
        .gallery-thumb:hover img { transform: scale(1.05) translateZ(0); }

        /* ── Decorative blobs: isolated layers, no JS interaction ── */
        .ambient-blob {
          will-change: transform;
          transform: translateZ(0);
          contain: strict;
          pointer-events: none;
        }

        /* ── Floating Balloon ── */
        @keyframes floatBalloon {
          0% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-15px) rotate(-2deg); }
          100% { transform: translateY(0) rotate(-5deg); }
        }

        /* ── Responsive ── */
        @media(max-width:900px){
          .offers-row{ grid-template-columns:1fr 1fr !important; }
          .offers-row .offer-promo{ grid-column:span 2; height:140px !important; }
          .inclusions-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .intro-stats-grid{ grid-template-columns:repeat(2,1fr) !important; }
          .city-cards-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media(max-width:768px){
          .city-cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media(max-width:767px){
          .container { padding-left: 1rem !important; padding-right: 1rem !important; }
          .offers-row { grid-template-columns: 1fr !important; }
          .offers-row .offer-banner { height: 150px !important; }
          .offers-row .offer-promo { grid-column: span 1 !important; height: 120px !important; }
          .dense-card-row { grid-template-columns: 1fr !important; gap: .875rem !important; }
          .dense-card { flex-direction: row !important; height: 116px !important; }
          .dense-card > div:first-child { width: 116px !important; min-width: 116px !important; height: 100% !important; flex-shrink: 0 !important; }
          .dense-card > div:last-child { padding: .7rem .8rem !important; }
          .dense-card h3 { font-size: .875rem !important; }
          .pop-destination-card { flex: 0 0 200px !important; height: 280px !important; }
          .pop-dest-line { display: none !important; }
          .dest-scroll { padding-bottom: 0.5rem !important; }
          .dest-scroll::-webkit-scrollbar { display: none; }
          .pop-dest-btn-wrapper { margin-top: 0.5rem !important; }
          .dark-intro-card { padding: 1.75rem 1.1rem !important; border-radius: 18px !important; }
          .intro-stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: .75rem !important; }
          .intro-reviews-grid { grid-template-columns: 1fr !important; }
          .inclusions-grid { grid-template-columns: 1fr !important; row-gap: 1.5rem !important; }
          .inclusion-card { padding: 1.75rem !important; min-height: 240px !important; }
          .inclusion-title { font-size: 1.25rem !important; max-width: 100% !important; }
          .inclusion-desc { max-width: 100% !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-4 { grid-template-columns: 1fr !important; }
          .section { padding-top: 2.25rem !important; padding-bottom: 2.25rem !important; }
          .section-alt { padding-top: 2.25rem !important; padding-bottom: 2.25rem !important; }
          .review-carousel-track { gap: 1rem !important; }
          .review-card-new { min-width: 280px !important; }
          .trusted-stats-row { grid-template-columns: 1fr 1fr !important; }
          .inclusions-grid-new { grid-template-columns: 1fr !important; }
        }
        @media(max-width:600px){
          .offers-row{ grid-template-columns:1fr !important; }
          .offers-row .offer-promo{ grid-column:span 1; }
          .intro-reviews-grid { grid-template-columns: 1fr !important; }
          .masonry-gallery > div { grid-column: span 12 !important; height: 240px !important; }
          .trusted-stats-row { grid-template-columns: 1fr 1fr !important; }
        }
        @media(max-width:480px){
          .city-cards-grid { grid-template-columns: 1fr !important; }
          .dense-card > div:first-child { width: 100px !important; min-width: 100px !important; }
          .pop-destination-card { flex: 0 0 180px !important; }
          .review-card-new { min-width: 260px !important; }
        }
        @media (max-width: 900px) {
          .masonry-gallery > div { grid-column: span 6 !important; }
          .inclusions-grid-new { grid-template-columns: repeat(2, 1fr) !important; }
        }

        /* ── Destination scroll ── */
        .dest-scroll::-webkit-scrollbar { height: 6px; }
        .dest-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 9999px; }
        .dest-scroll::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); border-radius: 9999px; }

        /* ── Trusted Section ── */
        @keyframes pulseRing {
          0% { transform: scale(0.95); opacity: 0.7; }
          70% { transform: scale(1.4); opacity: 0; }
          100% { transform: scale(0.95); opacity: 0; }
        }
        @keyframes floatStar {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(15deg); }
        }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmerSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes carouselScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .review-carousel-wrapper {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }
        .review-carousel-track {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: carouselScroll 38s linear infinite;
        }
        .review-carousel-track:hover {
          animation-play-state: paused;
        }
        .review-card-new {
          background: #fff;
          border-radius: 20px;
          padding: 1.5rem;
          min-width: 320px;
          max-width: 340px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.07);
          border: 1.5px solid #f0f0f0;
          flex-shrink: 0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: default;
        }
        .review-card-new:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.13);
          border-color: #e0e7ff;
        }
        .trusted-stat-card {
          background: #fff;
          border-radius: 20px;
          padding: 1.5rem 1rem;
          text-align: center;
          border: 1.5px solid #f0f0f0;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .trusted-stat-card::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          transform: skewX(-20deg);
        }
        .trusted-stat-card:hover::after {
          animation: shimmerSlide 0.7s ease forwards;
        }
        .trusted-stat-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 16px 40px rgba(0,0,0,0.12);
        }
        .stat-icon-wrap {
          width: 60px; height: 60px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.75rem;
          position: relative;
        }
        .stat-icon-wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          animation: pulseRing 2.5s ease-out infinite;
        }
        .trusted-stars {
          display: inline-flex;
          gap: 3px;
        }
        .trusted-star {
          animation: floatStar 3s ease-in-out infinite;
        }
        .trusted-star:nth-child(2) { animation-delay: 0.2s; }
        .trusted-star:nth-child(3) { animation-delay: 0.4s; }
        .trusted-star:nth-child(4) { animation-delay: 0.6s; }
        .trusted-star:nth-child(5) { animation-delay: 0.8s; }

        /* ── No Hidden Costs / Inclusion Cards ── */
        @keyframes iconBounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-6px) scale(1.15); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.3); }
          50% { box-shadow: 0 0 20px 8px rgba(255,255,255,0.15); }
        }
        .inclusion-card-new {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1.5px solid rgba(255,255,255,0.6);
          border-radius: 24px;
          padding: 2rem 1.5rem 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.35s ease, border-color 0.35s ease;
          will-change: transform;
        }
        .inclusion-card-new::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 60%);
          pointer-events: none;
          border-radius: 24px;
        }
        .inclusion-card-new:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 24px 60px rgba(0,0,0,0.18);
          border-color: rgba(255,255,255,0.9);
        }
        .inclusion-icon-avatar {
          width: 68px; height: 68px;
          border-radius: 50%;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          border: 3px solid rgba(255,255,255,0.8);
          transition: transform 0.3s ease;
          position: relative;
          z-index: 1;
        }
        .inclusion-card-new:hover .inclusion-icon-avatar {
          animation: iconBounce 0.6s ease;
        }
        .no-hidden-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.15);
          border: 1.5px solid rgba(255,255,255,0.4);
          backdrop-filter: blur(8px);
          border-radius: 100px;
          padding: 0.4rem 1.2rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 1.25rem;
        }
        .inclusions-grid-new {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .tag-bubble {
          font-family: var(--font-script);
          font-size: 1.35rem;
          color: #65a30d;
          margin-top: auto;
          padding-top: 0.75rem;
          transform: rotate(-2deg);
          display: block;
        }

        /* ── Hero Enhancements ── */
        @keyframes kenBurns1 {
          0%   { transform: scale(1.05) translate(0%, 0%); }
          100% { transform: scale(1.18) translate(-2%, -1%); }
        }
        @keyframes kenBurns2 {
          0%   { transform: scale(1.08) translate(1%, 1%); }
          100% { transform: scale(1.18) translate(-1.5%, -2%); }
        }
        @keyframes kenBurns3 {
          0%   { transform: scale(1.12) translate(-1%, -1%); }
          100% { transform: scale(1.04) translate(2%, 1%); }
        }
        @keyframes kenBurns4 {
          0%   { transform: scale(1.05) translate(2%, 0%); }
          100% { transform: scale(1.16) translate(-1%, -1.5%); }
        }
        @keyframes kenBurns5 {
          0%   { transform: scale(1.1) translate(-1%, 1%); }
          100% { transform: scale(1.2) translate(1.5%, -2%); }
        }
        .hero-slide-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transform-origin: center center; will-change: transform;
        }
        .hero-slide.active .hero-slide-img { animation: kenBurns1 9s ease-out forwards; }
        .hero-slide:nth-child(2).active .hero-slide-img { animation-name: kenBurns2; }
        .hero-slide:nth-child(3).active .hero-slide-img { animation-name: kenBurns3; }
        .hero-slide:nth-child(4).active .hero-slide-img { animation-name: kenBurns4; }
        .hero-slide:nth-child(5).active .hero-slide-img { animation-name: kenBurns5; }

        .hero-overlay {
          position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background:
            linear-gradient(to top, rgba(3,7,18,0.88) 0%, rgba(3,7,18,0.35) 38%, rgba(3,7,18,0.08) 58%, rgba(3,7,18,0.42) 100%);
        }

        /* Vertical Social Bar */
        .hero-social-vert {
          position: absolute; left: 1.75rem; top: 50%; transform: translateY(-50%);
          z-index: 10; display: flex; flex-direction: column; align-items: center; gap: 0.65rem;
        }
        .hero-social-line {
          width: 1px; height: 38px; background: rgba(255,255,255,0.28); display: block;
        }
        .hero-social-icon {
          display: inline-flex; width: 34px; height: 34px; align-items: center; justify-content: center;
          border-radius: 50%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.22);
          color: #fff; text-decoration: none;
          transition: background 0.22s ease, transform 0.22s ease, border-color 0.22s ease;
        }
        .hero-social-icon:hover { background: var(--accent); border-color: var(--accent); transform: scale(1.15); }

        /* Destination badge crossfade */
        .hero-dest-label {
          display: flex; justify-content: center; align-items: center;
          height: 34px; margin-bottom: 0.75rem; position: relative;
        }
        .hero-dest-name {
          position: absolute;
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 0.72rem; font-weight: 700; color: rgba(255,255,255,0.88);
          text-transform: uppercase; letter-spacing: 0.15em; font-family: var(--font-sans);
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          border-radius: 100px; padding: 0.3rem 1rem;
          opacity: 0; transform: translateY(6px);
          transition: opacity 0.55s ease, transform 0.55s ease;
          white-space: nowrap;
        }
        .hero-dest-name.active { opacity: 1; transform: translateY(0); }

        /* Glassmorphism search */
        .hero-search-wrap { margin-top: 1.75rem; max-width: 40rem; margin-inline: auto; }
        .hero-chips { display: flex; gap: 0.5rem; justify-content: center; margin-bottom: 0.75rem; flex-wrap: wrap; }
        .hero-chip {
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.22);
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          color: rgba(255,255,255,0.88); font-size: 0.78rem; font-weight: 600;
          padding: 0.38rem 1.1rem; border-radius: 100px; cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
          font-family: var(--font-sans); letter-spacing: 0.02em;
        }
        .hero-chip:hover { background: rgba(255,255,255,0.22); border-color: rgba(255,255,255,0.42); color: #fff; }
        .hero-search-form {
          display: flex; gap: 0.5rem; align-items: center;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
          border: 1.5px solid rgba(255,255,255,0.22); border-radius: 100px;
          padding: 0.5rem 0.5rem 0.5rem 1.25rem;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.12);
        }
        .hero-search-input {
          flex: 1; border: none; outline: none; background: transparent;
          font-size: 0.92rem; color: #fff; font-family: var(--font-sans); min-width: 120px;
        }
        .hero-search-input::placeholder { color: rgba(255,255,255,0.48); }
        .hero-search-btn {
          background: linear-gradient(135deg, #ffb7b2, #ff8fab);
          color: #1a0a0a; border: none; border-radius: 100px; cursor: pointer;
          font-weight: 800; font-size: 0.88rem; padding: 0.62rem 1.6rem;
          font-family: var(--font-sans); white-space: nowrap;
          box-shadow: 0 4px 16px rgba(255,143,171,0.45);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .hero-search-btn:hover { transform: scale(1.05); box-shadow: 0 8px 28px rgba(255,143,171,0.6); }

        /* Trust badges */
        .hero-badges { display: flex; gap: 0.6rem; justify-content: center; flex-wrap: wrap; margin-top: 1.2rem; }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 5px;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.16);
          backdrop-filter: blur(8px); border-radius: 100px; padding: 0.3rem 0.9rem;
          font-size: 0.72rem; font-weight: 600; color: rgba(255,255,255,0.82);
          font-family: var(--font-sans); letter-spacing: 0.02em;
        }

        /* Thumbnail nav strip */
        @keyframes thumbProgress { from { width: 0%; } to { width: 100%; } }
        .hero-thumb-strip {
          position: absolute; bottom: 1.5rem; left: 50%; transform: translateX(-50%);
          z-index: 10; display: flex; gap: 0.55rem; padding: 0.5rem;
          background: rgba(0,0,0,0.28); backdrop-filter: blur(12px);
          border-radius: 14px; border: 1px solid rgba(255,255,255,0.1);
        }
        .hero-thumb {
          width: 76px; border-radius: 9px; overflow: hidden; cursor: pointer;
          border: 2px solid transparent; background: none; padding: 0;
          transition: border-color 0.3s ease, transform 0.25s ease;
          position: relative; flex-shrink: 0;
        }
        .hero-thumb:hover { transform: translateY(-4px); }
        .hero-thumb.active { border-color: var(--accent); }
        .hero-thumb img { width: 100%; height: 48px; object-fit: cover; display: block; border-radius: 7px 7px 0 0; }
        .hero-thumb-label {
          font-size: 0.5rem; font-weight: 700; color: rgba(255,255,255,0.9);
          text-align: center; padding: 3px 4px;
          background: rgba(0,0,0,0.6); font-family: var(--font-sans);
          text-transform: uppercase; letter-spacing: 0.06em;
          border-radius: 0 0 7px 7px; line-height: 1.4;
        }
        .hero-thumb-progress {
          position: absolute; bottom: 0; left: 0; height: 2.5px;
          background: var(--accent); width: 0%;
          animation: thumbProgress 5s linear forwards;
          border-radius: 0 0 9px 9px;
        }

        /* Nav arrows */
        .hero-nav-btn {
          position: absolute; top: 50%; transform: translateY(-50%);
          z-index: 10; background: rgba(255,255,255,0.1);
          border: 1.5px solid rgba(255,255,255,0.22); backdrop-filter: blur(12px);
          border-radius: 50%; width: 46px; height: 46px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #fff;
          transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
        }
        .hero-nav-btn:hover {
          background: rgba(255,255,255,0.24); border-color: rgba(255,255,255,0.4);
          transform: translateY(-50%) scale(1.1);
        }
        .hero-nav-left { left: 1.25rem; }
        .hero-nav-right { right: 1.25rem; }

        /* Balloon */
        @keyframes heroBalloonFloat {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          40%       { transform: translateY(-22px) rotate(-0.5deg); }
          70%       { transform: translateY(-10px) rotate(-4deg); }
        }
        .hero-balloon {
          position: absolute; top: 10%; right: 4%; z-index: 4;
          width: clamp(140px, 18vw, 340px);
          pointer-events: none; opacity: 0.92;
          filter: drop-shadow(0 18px 36px rgba(0,0,0,0.35));
          animation: heroBalloonFloat 7s ease-in-out infinite;
        }

        /* Hero responsive */
        @media (max-width: 900px) {
          .hero-social-vert { display: none; }
          .hero-thumb { width: 64px; }
          .hero-thumb img { height: 40px; }
        }
        @media (max-width: 767px) {
          .hero-social-vert { display: none; }
          .hero-thumb-strip { gap: 0.4rem; }
          .hero-thumb { width: 52px; }
          .hero-thumb img { height: 34px; }
          .hero-thumb-label { font-size: 0.42rem; }
          .hero-nav-btn { width: 36px; height: 36px; }
          .hero-nav-left { left: 0.5rem; }
          .hero-nav-right { right: 0.5rem; }
          .hero-badge { font-size: 0.67rem; padding: 0.26rem 0.7rem; }
          .hero-balloon { top: 5%; right: 1%; opacity: 0.7; }
        }
        @media (max-width: 480px) {
          .hero-thumb { width: 44px; }
          .hero-thumb img { height: 28px; }
          .hero-thumb-label { display: none; }
          .hero-search-btn { padding: 0.55rem 1rem; font-size: 0.82rem; }
          .hero-dest-name { font-size: 0.65rem; }
        }
      `}</style>

      {/* ═══════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════ */}
      <section style={{ position: 'relative', height: '100svh', minHeight: 620, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

        {/* ── Slides with Ken Burns ── */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          {heroImages.map((img, idx) => (
            <div key={idx} className={`hero-slide${idx === currentSlide ? ' active' : ''}`}>
              <img src={img} alt={slideDestinations[idx].name} className="hero-slide-img" loading={idx === 0 ? 'eager' : 'lazy'} />
            </div>
          ))}
        </div>

        {/* ── Multi-layer overlay ── */}
        <div className="hero-overlay" />

        {/* ── Vertical Social Bar (desktop only) ── */}
        <div className="hero-social-vert">
          <span className="hero-social-line" />
          {socialLinks.map(({ icon: SocialIcon, url, label }, i) => (
            <a key={i} href={url} target="_blank" rel="noopener noreferrer" aria-label={label} className="hero-social-icon">
              <SocialIcon size={14} />
            </a>
          ))}
          <span className="hero-social-line" />
        </div>

        {/* ── Floating Hot Air Balloon ── */}
        <img src={realBalloonImg} alt="Hot Air Balloon" className="hero-balloon" />

        {/* ── Main Content ── */}
        <div className="container" ref={heroTextRef} style={{ position: 'relative', zIndex: 5, textAlign: 'center', color: '#fff', paddingTop: '2rem', paddingBottom: '9rem' }}>

          {/* Per-slide crossfade destination badge */}
          <div className="hero-dest-label hero-text-item">
            {slideDestinations.map((dest, idx) => (
              <span key={idx} className={`hero-dest-name${idx === currentSlide ? ' active' : ''}`}>
                <MapPin size={11} /> {dest.region} · {dest.name}
              </span>
            ))}
          </div>

          {/* Script eyebrow */}
          <div className="hero-text-item" style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(2rem, 4.5vw, 3rem)', color: '#f8fafc', textShadow: '0 4px 15px rgba(0,0,0,0.5)', marginBottom: '-0.4rem', transform: 'rotate(-2deg)', display: 'block' }}>
            don't just dream it,
          </div>

          {/* Main headline */}
          <h1 className="hero-text-item" style={{ fontFamily: 'var(--font-marker)', fontSize: 'clamp(2.8rem, 9vw, 6.2rem)', fontWeight: 400, lineHeight: 1.05, textTransform: 'uppercase', letterSpacing: '2px', margin: '0.5rem 0 0', color: '#f8fafc', textShadow: '0 4px 20px rgba(0,0,0,0.55)' }}>
            <span>BOOK MY </span>
            <span>DREAM</span>
          </h1>

          {/* Subheadline */}
          <p className="hero-text-item" style={{ marginTop: '1rem', maxWidth: '34rem', marginInline: 'auto', fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255,255,255,.88)', fontFamily: 'var(--font-sans)' }}>
            From local escapes to far-flung journeys — find what makes you happy, anytime, anywhere.
          </p>

          {/* ── Glassmorphism Search ── */}
          <div className="hero-search-wrap hero-text-item">
            <div className="hero-chips">
              {['Domestic', 'International', 'Adventure'].map(chip => (
                <button key={chip} className="hero-chip"
                  onClick={() => { setQ(chip); navigate(`/packages?q=${chip}`) }}>
                  {chip}
                </button>
              ))}
            </div>
            <form onSubmit={e => { e.preventDefault(); navigate(`/packages?q=${q}`) }} className="hero-search-form">
              <Search size={18} style={{ color: 'rgba(255,255,255,0.55)', flexShrink: 0 }} />
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Search destinations, tours, activities..."
                className="hero-search-input"
              />
              <MagneticButton>
                <button type="submit" className="hero-search-btn">Search</button>
              </MagneticButton>
            </form>
          </div>

          {/* ── Trust Badges ── */}
          <div className="hero-badges hero-text-item">
            <span className="hero-badge"><ShieldCheck size={12} />&nbsp;100% Safe Travel</span>
            <span className="hero-badge"><Star size={12} style={{ fill: '#f59e0b', color: '#f59e0b' }} />&nbsp;4.9 Star Rating</span>
            <span className="hero-badge"><Plane size={12} />&nbsp;500+ Tours Done</span>
          </div>
        </div>

        {/* ── Social Links Strip ── */}
        <div className="hero-thumb-strip" style={{ padding: '0.75rem 1.5rem', gap: '1.25rem' }}>
          {socialLinks.map(({ icon: SocialIcon, url, label }, i) => (
            <a key={i} href={url} target="_blank" rel="noopener noreferrer" aria-label={label} className="hero-social-icon">
              <SocialIcon size={18} />
            </a>
          ))}
        </div>

        {/* ── Prev / Next arrows ── */}
        {([{ fn: prevSlide, side: 'left', Icon: ChevronLeft }, { fn: nextSlide, side: 'right', Icon: ChevronRight }] as const).map(({ fn, side, Icon }) => (
          <button key={side} onClick={fn} className={`hero-nav-btn hero-nav-${side}`}>
            <Icon size={20} />
          </button>
        ))}
      </section>


      {/* ═══════════════════════════════════════════════
          TRUST STRIP
      ═══════════════════════════════════════════════ */}
      <section style={{ background: 'var(--primary)', padding: '1.5rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
          {trustStats.map(s => (
            <div key={s.label} style={{ textAlign: 'center', color: '#fff' }}>
              <p style={{ fontFamily: "'Outfit', 'Segoe UI', sans-serif", fontSize: '1.625rem', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{s.value}</p>
              <p style={{ fontFamily: "'Inter', -apple-system, sans-serif", fontSize: '.75rem', fontWeight: 500, color: 'rgba(255,255,255,.8)', marginTop: '.2rem', letterSpacing: '.03em', textTransform: 'uppercase' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          OFFERS
      ═══════════════════════════════════════════════ */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', padding: '5rem 0' }}>
        {/* Background */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #f0f4ff 0%, #fdf9ff 50%, #fff5f0 100%)', zIndex: 0 }} />
        <div style={{ position: 'absolute', top: '-20%', right: '-8%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(132,204,22,0.07) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '-15%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,183,178,0.09) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(132,204,22,0.1)', border: '1.5px solid rgba(132,204,22,0.25)', borderRadius: 100, padding: '0.3rem 1rem', marginBottom: '0.75rem' }}>
                <BadgePercent size={13} style={{ color: '#84cc16' }} />
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#65a30d', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'var(--font-sans)' }}>Exclusive Deals</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#0d1b2e', margin: 0, lineHeight: 1.2 }}>
                Offers <span style={{ fontFamily: 'var(--font-script)', fontWeight: 400, color: 'var(--primary)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>for you</span>
              </h2>
            </div>
            <Link to="/packages"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--primary)', textDecoration: 'none', borderBottom: '2px solid var(--primary)', paddingBottom: '2px' }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '0.7'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '1'}
            >
              View all deals <ArrowRight size={15} />
            </Link>
          </div>

          {/* Bento Grid: featured left + 2 stacked right */}
          <div className="offers-bento-grid">

            {/* ── Large featured card (left, spans 2 rows) ── */}
            <Link to="/packages?q=Domestic" className="offer-card-new offers-featured" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.18)' }}>
              <img src={kerelaImg} alt="Domestic Deals" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.08) 100%)' }} />
              <div style={{ position: 'absolute', inset: 0, padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.88)', letterSpacing: '0.04em' }}>🔥 Limited-Time Offer</span>
                  <span style={{ background: '#22c55e', fontFamily: 'var(--font-sans)', fontSize: '0.68rem', fontWeight: 800, color: '#fff', padding: '0.25rem 0.75rem', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Most Popular</span>
                </div>
                <div>
                  <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #84cc16, #65a30d)', color: '#fff', fontFamily: 'var(--font-sans)', fontWeight: 900, fontSize: '0.85rem', padding: '0.28rem 1rem', borderRadius: 100, marginBottom: '0.75rem', letterSpacing: '0.04em', boxShadow: '0 4px 12px rgba(101,163,13,0.4)' }}>Up to 30% OFF</div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, color: '#fff', margin: '0 0 0.4rem', lineHeight: 1.15 }}>Best Domestic Deals</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.72)', margin: '0 0 1.25rem' }}>Kerala · Goa · Rajasthan · Himachal</p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(8px)', border: '1.5px solid rgba(255,255,255,0.28)', color: '#fff', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.85rem', padding: '0.55rem 1.4rem', borderRadius: 100 }}>
                    Explore Now <ArrowRight size={15} />
                  </span>
                </div>
              </div>
            </Link>

            {/* ── Right top card ── */}
            <Link to="/packages?q=International" className="offer-card-new offers-sm" style={{ boxShadow: '0 10px 36px rgba(0,0,0,0.15)' }}>
              <img src={switzerlandImg} alt="International Tours" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.84) 0%, rgba(0,0,0,0.18) 60%, transparent 100%)' }} />
              <div style={{ position: 'absolute', inset: 0, padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.04em' }}>✈️ Editor's Pick</span>
                  <span style={{ background: '#3b82f6', fontFamily: 'var(--font-sans)', fontSize: '0.62rem', fontWeight: 800, color: '#fff', padding: '0.22rem 0.7rem', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Trending</span>
                </div>
                <div>
                  <div style={{ display: 'inline-block', background: 'rgba(59,130,246,0.88)', color: '#fff', fontFamily: 'var(--font-sans)', fontWeight: 900, fontSize: '0.78rem', padding: '0.22rem 0.85rem', borderRadius: 100, marginBottom: '0.4rem', letterSpacing: '0.04em' }}>Up to 25% OFF</div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.2 }}>International Tours</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.68)', margin: '0.25rem 0 0' }}>Bali · Switzerland · Dubai · Maldives</p>
                </div>
              </div>
            </Link>

            {/* ── Right bottom card ── */}
            <Link to="/packages?q=Adventure" className="offer-card-new offers-sm" style={{ boxShadow: '0 10px 36px rgba(0,0,0,0.15)' }}>
              <img src={dubaiImg} alt="Adventure Escapes" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.18) 60%, transparent 100%)' }} />
              <div style={{ position: 'absolute', inset: 0, padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.04em' }}>⚡ Flash Sale</span>
                  <span style={{ background: '#f97316', fontFamily: 'var(--font-sans)', fontSize: '0.62rem', fontWeight: 800, color: '#fff', padding: '0.22rem 0.7rem', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Flash Sale</span>
                </div>
                <div>
                  <div style={{ display: 'inline-block', background: 'rgba(249,115,22,0.88)', color: '#fff', fontFamily: 'var(--font-sans)', fontWeight: 900, fontSize: '0.78rem', padding: '0.22rem 0.85rem', borderRadius: 100, marginBottom: '0.4rem', letterSpacing: '0.04em' }}>Up to 20% OFF</div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.2 }}>Adventure Escapes</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.68)', margin: '0.25rem 0 0' }}>Trekking · Safari · Water Sports</p>
                </div>
              </div>
            </Link>
          </div>

          {/* ── Full-width dark promo strip ── */}
          <Link to="/packages" className="offer-promo-strip" style={{ marginTop: '1.25rem', padding: '1.5rem 2rem', gap: '1.5rem', boxShadow: '0 14px 44px rgba(0,0,0,0.28)', flexWrap: 'wrap' }}>
            <div style={{ position: 'absolute', right: '8%', top: '50%', transform: 'translateY(-50%)', width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(132,204,22,0.16) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', left: '35%', top: '50%', transform: 'translateY(-50%)', width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,183,178,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

            {/* Icon */}
            <div style={{ flexShrink: 0, width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #84cc16, #65a30d)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(132,204,22,0.38)' }}>
              <BadgePercent size={28} style={{ color: '#fff' }} />
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 200, position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 700, color: '#84cc16', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Members Exclusive</span>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'inline-block' }} />
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>Limited Spots</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.2 }}>
                Early Bird Deals — Book Now &amp; Save Big
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', margin: '0.3rem 0 0' }}>All-inclusive packages from ₹14,999 · No hidden charges</p>
            </div>

            {/* CTA */}
            <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem', position: 'relative', zIndex: 1 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #84cc16, #65a30d)', color: '#fff', fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '0.88rem', padding: '0.65rem 1.75rem', borderRadius: 100, boxShadow: '0 6px 20px rgba(132,204,22,0.42)', whiteSpace: 'nowrap' }}>
                Grab Deal <ArrowRight size={15} />
              </span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.66rem', color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>*T&amp;C apply</span>
            </div>
          </Link>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════
          TRENDING PACKAGES (EDITORIAL)
      ═══════════════════════════════════════════════ */}
      <DestinationEditorial
        destinations={trending.map(pkg => ({
          slug: pkg.slug,
          image: pkg.image,
          country: pkg.country || pkg.destination,
          title: pkg.name,
          description: `Experience the breathtaking beauty of ${pkg.destination}. A premium journey designed for the elite traveler.`,
          price: pkg.discountPrice > 0 ? pkg.discountPrice : pkg.price,
          region: pkg.region,
        }))}
      />

      {/* ═══════════════════════════════════════════════
          POPULAR DESTINATIONS
      ═══════════════════════════════════════════════ */}
      <section ref={popularSectionRef} className="section" style={{
        position: 'relative',
        background: `url(${switzerlandImg}) center/cover no-repeat`,
        marginTop: 0,
        paddingTop: '5rem',
        paddingBottom: '5rem',
      }}>
        {/* Overlay as a separate layer so the bg image doesn't repaint */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(21, 52, 79, 0.85)', zIndex: 1, pointerEvents: 'none' }}></div>

        <div style={{
          position: 'absolute', top: -1, left: 0, right: 0, height: '24px', zIndex: 2, pointerEvents: 'none',
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20' preserveAspectRatio='none'%3E%3Cpath d='M0,0 L0,20 Q2,12 5,18 T12,10 T18,18 T25,8 T32,18 T38,12 T45,20 T52,10 T58,18 T65,8 T72,18 T78,12 T85,20 T92,10 T98,18 L100,12 L100,0 Z' fill='%23fafafa'/%3E%3C/svg%3E") repeat-x top / 150px 100%`
        }}></div>

        <div style={{
          position: 'absolute', bottom: -1, left: 0, right: 0, height: '24px', zIndex: 2, pointerEvents: 'none',
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20' preserveAspectRatio='none'%3E%3Cpath d='M0,20 L0,0 Q2,8 5,2 T12,10 T18,2 T25,12 T32,2 T38,8 T45,0 T52,10 T58,2 T65,12 T72,2 T78,8 T85,0 T92,10 T98,2 L100,8 L100,20 Z' fill='%23F4EEDF'/%3E%3C/svg%3E") repeat-x bottom / 150px 100%`
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 800, color: '#a3e635', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>
              Explore India
            </div>
            <h2 style={{ fontFamily: 'var(--font-marker)', fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: 400, color: '#fff', margin: 0, letterSpacing: '1px', textShadow: '0 2px 4px rgba(0,0,0,0.3)', textAlign: 'center', textTransform: 'uppercase' }}>
              DOMESTIC PACKAGES
            </h2>
          </div>

          <div className="dest-scroll" style={{
            display: 'flex',
            gap: '1.25rem',
            overflowX: 'auto',
            paddingBottom: '1.5rem',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            alignItems: 'stretch',
          }}>
            {popularDest.map(dest => (
              <div key={dest.slug} className="pop-destination-card" style={{
                flex: '0 0 240px',
                scrollSnapAlign: 'start',
                height: '340px',
                // will-change only on transform — not opacity (handled by GSAP after mount)
                willChange: 'transform',
              }}>
                <DestinationCard dest={dest} />
              </div>
            ))}
          </div>

          <div className="pop-dest-btn-wrapper" style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
            <Link to="/destinations" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '.9375rem', fontWeight: 600, color: '#fff', textDecoration: 'none', background: 'rgba(255,255,255,0.1)', padding: '0.6rem 1.25rem', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.2)' }}>
              See all destinations <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          DEPARTURE CITIES
      ═══════════════════════════════════════════════ */}
      <DepartureCitiesEditorial />

      {/* ═══════════════════════════════════════════════
          FEATURED PACKAGES
      ═══════════════════════════════════════════════ */}
      <FeaturedPackagesEditorial packages={featured} />

      {/* ═══════════════════════════════════════════════
          ABOUT / INTRO (dark card with review cards)
      ═══════════════════════════════════════════════ */}
      <section ref={introSectionRef} className="section" style={{ background: 'linear-gradient(135deg, #f8f9ff 0%, #eef2ff 40%, #fdf4ff 100%)', padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative background blobs */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div className="ambient-blob" style={{ position: 'absolute', top: '-15%', left: '-8%', width: '45%', paddingBottom: '45%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,130,255,0.12) 0%, transparent 70%)' }} />
          <div className="ambient-blob" style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '50%', paddingBottom: '50%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,121,249,0.1) 0%, transparent 70%)' }} />
          <div className="ambient-blob" style={{ position: 'absolute', top: '40%', left: '50%', width: '30%', paddingBottom: '30%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)', transform: 'translate(-50%, -50%)' }} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* ── Heading ── */}
          <div ref={headingRef} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            {/* Live badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(37,150,190,0.1)', border: '1.5px solid rgba(37,150,190,0.25)', borderRadius: 100, padding: '0.4rem 1.2rem', marginBottom: '1.25rem' }}>
              <span style={{ position: 'relative', display: 'inline-block', width: 10, height: 10 }}>
                <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#22c55e', animation: 'pulseRing 2s ease-out infinite' }} />
                <span style={{ position: 'relative', display: 'block', width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
              </span>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'var(--font-sans)' }}>Guests from 30+ Countries</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 800, color: '#0d1b2e', margin: '0 0 0.75rem', lineHeight: 1.2 }}>
              Trusted by Our Guests
              <span style={{ display: 'block', fontFamily: 'var(--font-script)', fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 400, color: 'var(--primary)', marginTop: '0.25rem' }}>across the World</span>
            </h2>
            {/* Animated stars */}
            <div className="trusted-stars" style={{ marginTop: '0.75rem' }}>
              {[...Array(5)].map((_, j) => <Star key={j} size={22} className="trusted-star" style={{ color: '#f59e0b', fill: '#f59e0b', animationDelay: `${j * 0.18}s` }} />)}
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: '#555', marginTop: '0.75rem', maxWidth: 480, marginInline: 'auto', lineHeight: 1.7 }}>Real travelers, real memories. Here's what our guests say about their journey with us.</p>
          </div>

          {/* ── Stats Row ── */}
          <div className="trusted-stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '3.5rem' }}>
            {introStats.map(({ icon: Icon, value, label, color }, idx) => (
              <div key={label} ref={el => (statsRefs.current[idx] = el)} className="trusted-stat-card">
                <div className="stat-icon-wrap" style={{ background: `color-mix(in srgb, ${color} 12%, #fff)` }}>
                  <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: color, animation: 'pulseRing 2.5s ease-out infinite', opacity: 0.35 }} />
                  <Icon size={26} style={{ color, position: 'relative', zIndex: 1 }} strokeWidth={2} />
                </div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, color: '#0d1b2e', margin: 0, lineHeight: 1, letterSpacing: '-0.02em' }}>{value}</p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: '#777', marginTop: '.4rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>
              </div>
            ))}
          </div>

          {/* ── Auto-scrolling Review Carousel ── */}
          <div className="review-carousel-wrapper" style={{ marginBottom: '0.5rem' }}>
            <div className="review-carousel-track">
              {/* Duplicate cards for infinite scroll */}
              {[...reviewCards, ...reviewCards, ...reviewCards].map((r, i) => (
                <div key={i} className="review-card-new">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <Star key={j} size={14} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.68rem', color: '#fff', background: 'linear-gradient(135deg,#e05c97,#a855f7)', borderRadius: 100, padding: '2px 10px', fontWeight: 700, letterSpacing: '0.04em' }}>{r.type}</span>
                  </div>
                  <p style={{ fontWeight: 800, fontSize: '1rem', color: '#0d1b2e', margin: '0 0 0.5rem', lineHeight: 1.3 }}>{r.tour}</p>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <Quote size={20} style={{ color: '#e2e8f0', flexShrink: 0, marginTop: 2 }} />
                    <p style={{ fontSize: '0.84rem', color: '#555', lineHeight: 1.65, margin: 0, flex: 1 }}>{r.review.replace(/^"|"$/g, '')}</p>
                    {r.image && <img src={r.image} alt={r.tour} style={{ width: 64, height: 64, borderRadius: 12, objectFit: 'cover', flexShrink: 0, border: '2px solid #e2e8f0' }} />}
                  </div>
                  <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0d1b2e', margin: 0 }}>{r.reviewer}</p>
                      <p style={{ fontSize: '0.72rem', color: '#aaa', margin: 0 }}>{r.date}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ display: 'inline-flex', width: 28, height: 28, alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'rgba(37,150,190,0.08)' }}>
                        <UserCheck size={14} style={{ color: 'var(--primary)' }} />
                      </span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--primary)' }}>{r.guide}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* See all reviews CTA */}
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/packages" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--primary)', color: '#fff', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.9rem', padding: '0.75rem 2rem', borderRadius: 100, textDecoration: 'none', boxShadow: '0 8px 24px rgba(37,150,190,0.3)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 12px 32px rgba(37,150,190,0.4)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 24px rgba(37,150,190,0.3)'; }}
            >
              View All Packages <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          WHAT'S INCLUDED
      ═══════════════════════════════════════════════ */}
      <section className="section" style={{
        backgroundColor: '#114c55',
        backgroundImage: `linear-gradient(rgba(37, 150, 190, 0.88), rgba(37, 150, 190, 0.92)), url(${baliImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '6rem 0',
        position: 'relative'
      }}>
        {/* Background Elements: Blobs & Travel Icons */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 1, pointerEvents: 'none' }}>
          {/* Fluid Blobs */}
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', right: '-10%', top: '-20%', width: '600px', height: '600px', transform: 'rotate(45deg)', opacity: 0.12 }}>
            <path fill="#ffffff" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.3,-46.3C90.8,-33.5,96.8,-18,97.7,-2.1C98.6,13.8,94.5,30,85.1,43.2C75.7,56.4,61.1,66.6,45.8,74.5C30.5,82.4,14.5,88,-1.7,90.8C-17.9,93.6,-34.3,93.6,-48.5,86.2C-62.7,78.8,-74.7,64.1,-82.2,47.9C-89.7,31.7,-92.7,14,-90.4,-2.7C-88.1,-19.4,-80.5,-35.1,-70.2,-48.1C-59.9,-61.1,-46.9,-71.4,-32.8,-78.6C-18.7,-85.8,-3.5,-89.9,11.5,-88.4C26.5,-86.9,41.2,-79.8,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: '-10%', bottom: '-10%', width: '500px', height: '500px', transform: 'rotate(-25deg)', opacity: 0.08 }}>
            <path fill="#ffffff" d="M39.9,-65.7C54.1,-60.5,69.5,-53.4,80,-41.2C90.5,-29,96.1,-11.7,93.8,4.5C91.5,20.7,81.3,35.8,69.3,47.8C57.3,59.8,43.5,68.7,28.4,74.3C13.3,79.9,-3.1,82.2,-19.6,79.7C-36.1,77.2,-52.7,69.9,-64.7,58.2C-76.7,46.5,-84.1,30.4,-86.8,13.6C-89.5,-3.2,-87.5,-20.7,-79.5,-34.5C-71.5,-48.3,-57.5,-58.4,-42.8,-63.4C-28.1,-68.4,-12.7,-68.3,1.3,-70C15.3,-71.7,30.6,-75.2,39.9,-65.7Z" transform="translate(100 100)" />
          </svg>

          {/* Floating Travel Icons */}
          <Compass size={220} strokeWidth={0.5} style={{ position: 'absolute', bottom: '10%', right: '5%', color: 'rgba(255,255,255,0.12)', transform: 'rotate(25deg)' }} />
          <MapPin size={90} strokeWidth={1} style={{ position: 'absolute', top: '12%', right: '20%', color: 'rgba(255,255,255,0.12)', transform: 'rotate(10deg)' }} />
          <Star size={70} strokeWidth={1.5} style={{ position: 'absolute', bottom: '25%', left: '12%', color: 'rgba(255,255,255,0.15)', transform: 'rotate(-10deg)' }} />
          <Heart size={50} strokeWidth={1.5} style={{ position: 'absolute', top: '45%', right: '8%', color: 'rgba(255,255,255,0.1)', transform: 'rotate(15deg)' }} />
        </div>
        {/* Wavy top divider (matches the ABOUT section above) */}
        <div style={{
          position: 'absolute', top: -1, left: 0, right: 0, height: 48, zIndex: 2, pointerEvents: 'none',
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320' preserveAspectRatio='none'%3E%3Cpath fill='%23186a76' d='M0,160L48,170.7C96,181,192,203,288,208C384,213,480,203,576,170.7C672,139,768,85,864,80C960,75,1056,117,1152,144C1248,171,1344,181,1392,186.7L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'%3E%3C/path%3E%3C/svg%3E") repeat-x top / 100% 100%`
        }}></div>
        {/* Wavy bottom divider (matches Gallery below) */}
        <div style={{
          position: 'absolute', bottom: -1, left: 0, right: 0, height: 48, zIndex: 2, pointerEvents: 'none',
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320' preserveAspectRatio='none'%3E%3Cpath fill='%23FAF9F6' d='M0,160L48,149.3C96,139,192,117,288,112C384,107,480,117,576,149.3C672,181,768,235,864,240C960,245,1056,203,1152,176C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E") repeat-x bottom / 100% 100%`
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="no-hidden-badge">
              <ShieldCheck size={14} />
              No Hidden Costs
            </div>
            <h2 style={{ fontFamily: 'var(--font-marker)', fontSize: 'clamp(2.25rem, 5.5vw, 3.5rem)', fontWeight: 400, color: '#ffffff', margin: '0 0 .25rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
              ALL-INCLUSIVE TOURS
            </h2>
            <div style={{ fontFamily: 'var(--font-script)', fontSize: '1.75rem', color: '#FFCE00', marginBottom: '1rem', transform: 'rotate(-2deg)' }}>
              everything you need!
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.8)', fontSize: '1rem', maxWidth: 480, marginInline: 'auto', lineHeight: 1.7 }}>Every package covers all essentials — no surprises, no extras, just pure travel joy.</p>
          </div>

          <div className="inclusions-grid-new">
            {[
              {
                title: 'Premium Handpicked Accommodation', desc: 'Comfortable & convenient hotels cherry-picked by our expert hotel management team.',
                tag: 'sleep well!', Icon: HotelIcon, color: '#f97316', bg: 'linear-gradient(135deg,#fff7ed,#ffedd5)'
              },
              {
                title: 'All-Inclusive Dining Experiences', desc: "Eat to your heart's content. Breakfast, lunch, and dinner thoughtfully included.",
                tag: 'yummy!', Icon: Utensils, color: '#eab308', bg: 'linear-gradient(135deg,#fefce8,#fef9c3)'
              },
              {
                title: 'Expert Tour Managers On-Site', desc: 'An exclusive team of 350+ tour managers specialising in India & World tours.',
                tag: 'local experts!', Icon: UserCheck, color: '#3b82f6', bg: 'linear-gradient(135deg,#eff6ff,#dbeafe)'
              },
              {
                title: 'Seamless On-Tour Transportation', desc: 'All rail, sea and road transport included as part of your package.',
                tag: 'enjoy the ride!', Icon: Bus, color: '#22c55e', bg: 'linear-gradient(135deg,#f0fdf4,#dcfce7)'
              },
              {
                title: 'Best Value Assured Itineraries', desc: 'Our dedicated research team curates the best value packages for every traveler.',
                tag: 'best price!', Icon: Award, color: '#a855f7', bg: 'linear-gradient(135deg,#faf5ff,#f3e8ff)'
              },
              {
                title: 'Convenient To & Fro Airfares', desc: 'Tours inclusive of airfare from many hubs within India for a seamless start.',
                tag: 'fly high!', Icon: Plane, color: '#ec4899', bg: 'linear-gradient(135deg,#fdf2f8,#fce7f3)'
              },
            ].map((item, i) => (
              <div key={i} className="inclusion-card-new" style={{ background: item.bg }}>
                {/* Number badge */}
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.6)', border: '1.5px solid rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '0.72rem', color: item.color }}>0{i + 1}</div>

                {/* Icon avatar */}
                <div className="inclusion-icon-avatar" style={{ boxShadow: `0 8px 24px ${item.color}30, 0 0 0 6px ${item.color}15` }}>
                  <item.Icon size={30} color={item.color} strokeWidth={2} />
                </div>

                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', fontWeight: 800, color: '#111', margin: '0 0 0.6rem', lineHeight: 1.35, letterSpacing: '-0.01em', position: 'relative', zIndex: 1 }}>{item.title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#666', lineHeight: 1.65, margin: '0 0 1rem', fontFamily: 'var(--font-sans)', position: 'relative', zIndex: 1 }}>{item.desc}</p>

                <span className="tag-bubble" style={{ color: item.color }}>{item.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          GALLERY
      ═══════════════════════════════════════════════ */}
      <section className="section" style={{ background: '#FAF9F6', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <div style={{ width: '40px', height: '3px', background: 'var(--accent)' }}></div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, color: '#1a2332', margin: 0 }}>
              Gallery
            </h2>
          </div>

          <div className="masonry-gallery" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1rem' }}>
            {galleryPreview.map((img, i) => {
              const spans = [3, 5, 4, 5, 4, 3];
              return (
                <div key={i} className="gallery-thumb" style={{ position: 'relative', height: '280px', gridColumn: `span ${spans[i]}` }}>
                  <img src={img.src} alt={img.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)', pointerEvents: 'none' }}></div>
                  <span style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', color: '#fff', fontSize: '.95rem', fontWeight: 400, letterSpacing: '.02em' }}>{img.title}</span>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <Link to="/gallery" style={{ display: 'inline-flex', alignItems: 'center', fontSize: '.9rem', fontWeight: 600, color: '#333', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '.05em', borderBottom: '1px solid #333', paddingBottom: '4px' }}>
              View Full Gallery <ArrowRight size={14} style={{ marginLeft: '6px' }} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════ */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #F4EEDF 0%, #fafafa 100%)' }}>

        {/* Wavy Top Edge to blend with Gallery */}
        <div style={{ position: 'absolute', top: '-1px', left: 0, width: '100%', overflow: 'hidden', lineHeight: 0, zIndex: 2 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '50px' }}>
            <path fill="#FAF9F6" d="M0,0 L1440,0 L1440,20 C1200,60 960,10 720,30 C480,50 240,0 0,20 Z"></path>
          </svg>
        </div>

        {/* Full-bleed decorative background elements */}
        <div className="ambient-blob" style={{ pointerEvents: 'none', position: 'absolute', left: '-5%', top: '-10%', width: '40vw', height: '40vw', borderRadius: 9999, background: 'radial-gradient(circle, rgba(255,183,178,0.15) 0%, transparent 70%)', zIndex: 0 }} />
        <div className="ambient-blob" style={{ pointerEvents: 'none', position: 'absolute', right: '-5%', bottom: '-10%', width: '40vw', height: '40vw', borderRadius: 9999, background: 'radial-gradient(circle, rgba(168,230,207,0.12) 0%, transparent 70%)', zIndex: 0 }} />

        <div style={{ position: 'absolute', top: '10%', left: '5%', color: 'var(--primary)', opacity: 0.04, pointerEvents: 'none', zIndex: 0 }}>
          <Quote size={200} />
        </div>
        <div style={{ position: 'absolute', bottom: '10%', right: '2%', color: 'var(--primary)', opacity: 0.04, pointerEvents: 'none', transform: 'rotate(180deg)', zIndex: 0 }}>
          <Quote size={240} />
        </div>

        {/* Small floating accents */}
        <div style={{ position: 'absolute', top: '20%', right: '15%', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent)', opacity: 0.5, pointerEvents: 'none', boxShadow: '0 0 10px rgba(255,183,178,0.4)' }} />
        <div style={{ position: 'absolute', bottom: '30%', left: '10%', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', opacity: 0.3, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '4%', width: '16px', height: '16px', borderRadius: '50%', border: '2px solid var(--accent)', opacity: 0.2, pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <SectionHeading eyebrow="Testimonials" title="What Our Travelers Say" description="Real stories from real travelers who trusted us with their dream trips." />
          <TestimonialCarousel />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          NEWSLETTER
      ═══════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div style={{ position: 'relative', borderRadius: 24, background: 'var(--primary)', padding: '3rem 2rem', textAlign: 'center', color: '#fff', overflow: 'hidden' }}>
            {/* Static ambient blobs — no JS movement, GPU isolated */}
            <div className="ambient-blob" style={{ pointerEvents: 'none', position: 'absolute', right: '-4rem', top: '-4rem', width: 256, height: 256, borderRadius: 9999, background: 'radial-gradient(circle, rgba(255,183,178,.3) 0%, transparent 70%)' }} />
            <div className="ambient-blob" style={{ pointerEvents: 'none', position: 'absolute', left: '-4rem', bottom: '-4rem', width: 256, height: 256, borderRadius: 9999, background: 'radial-gradient(circle, rgba(255,255,255,.2) 0%, transparent 70%)' }} />
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '36rem', marginInline: 'auto' }}>
              <h2 style={{ fontFamily: 'var(--font-marker)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '1px' }}>NEWSLETTER</h2>
              <p style={{ marginTop: '.75rem', color: 'rgba(255,255,255,.8)' }}>Subscribe for handpicked offers, new destinations, and insider travel tips. No spam.</p>
              {subDone ? (
                <p style={{ marginTop: '2rem', display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 9999, background: 'rgba(255,255,255,.15)', padding: '.75rem 1.5rem', fontWeight: 600 }}>
                  <CheckCircle2 size={20} style={{ color: 'var(--accent)' }} /> Thank you! You're subscribed.
                </p>
              ) : (
                <form onSubmit={handleSubscribe} style={{ marginTop: '2rem', display: 'flex', maxWidth: '28rem', marginInline: 'auto', gap: '.75rem', flexWrap: 'wrap' }}>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" style={{ flex: 1, borderRadius: 9999, border: 'none', padding: '.75rem 1.25rem', fontSize: '.875rem', outline: 'none', fontFamily: 'var(--font-sans)', minWidth: 180, color: '#333' }} />
                  <button type="submit" className="btn btn-accent"><Send size={16} /> Subscribe</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <PromoPopup />
    </main>
  )
}
