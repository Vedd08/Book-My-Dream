'use client'

import { useEffect, useRef, useState } from 'react'
import { services, galleryImages } from '../data'
import {
  MapPin, Globe, Sparkles, Hotel, TrainFront, Ship, FileCheck, BookUser, Users, Briefcase, Plane, Heart, ChevronLeft, ChevronRight
} from 'lucide-react'

import { API_URL } from '../config'

const iconMap: Record<string, React.ElementType> = {
  MapPin, Globe, Sparkles, Hotel, Plane, TrainFront, Ship, FileCheck, BookUser, Heart, Users, Briefcase,
}

export default function ServicesPage() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [galleryImgs, setGalleryImgs] = useState(galleryImages)

  useEffect(() => {
    fetch(`${API_URL}/api/gallery`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setGalleryImgs(data)
      })
      .catch(console.error)
  }, [])

  // Autoplay logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          let cols = 4
          if (window.innerWidth <= 768) cols = 1
          else if (window.innerWidth <= 1024) cols = 2
          
          const colWidth = clientWidth / cols
          scrollRef.current.scrollBy({ left: colWidth, behavior: 'smooth' })
        }
      }
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  // Manual Navigation Logic
  const scrollLeftBtn = () => {
    if (scrollRef.current) {
      const clientWidth = scrollRef.current.clientWidth
      let cols = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 4
      const colWidth = clientWidth / cols
      scrollRef.current.scrollBy({ left: -colWidth, behavior: 'smooth' })
    }
  }

  const scrollRightBtn = () => {
    if (scrollRef.current) {
      const clientWidth = scrollRef.current.clientWidth
      let cols = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 4
      const colWidth = clientWidth / cols
      scrollRef.current.scrollBy({ left: colWidth, behavior: 'smooth' })
    }
  }

  // Mouse Drag to Scroll Logic
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
    scrollRef.current.style.scrollSnapType = 'none'
    scrollRef.current.style.cursor = 'grabbing'
  }

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false)
    if (scrollRef.current) {
      scrollRef.current.style.scrollSnapType = 'x mandatory'
      scrollRef.current.style.cursor = 'grab'
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <main style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden', background: '#000' }}>
      <style>{`
        .svc-slider-container {
          display: flex;
          height: 100%;
          width: 100%;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          -ms-overflow-style: none; 
          scrollbar-width: none; 
          cursor: grab;
        }
        .svc-slider-container::-webkit-scrollbar {
          display: none;
        }

        .svc-slide {
          flex: 0 0 25%;
          height: 100%;
          scroll-snap-align: start;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 5rem;
          border-right: 1px solid rgba(255,255,255,0.05);
          user-select: none;
        }

        @media (max-width: 1024px) {
          .svc-slide { flex: 0 0 50%; }
        }
        @media (max-width: 768px) {
          .svc-slide { flex: 0 0 100%; }
        }

        .svc-slide-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          z-index: 1;
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .svc-slide:hover .svc-slide-bg {
          transform: scale(1.05);
        }

        .svc-slide-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%);
          z-index: 2;
          pointer-events: none;
        }

        .svc-slide-content {
          position: relative;
          z-index: 3;
          text-align: center;
          color: white;
          padding: 0 2rem;
          transform: translateY(30px);
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          width: 100%;
        }
        .svc-slide:hover .svc-slide-content {
          transform: translateY(0);
        }

        .svc-icon-wrapper {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.2);
          transition: all 0.4s ease;
        }
        .svc-slide:hover .svc-icon-wrapper {
          background: var(--accent);
          border-color: var(--accent);
          transform: rotate(-10deg) scale(1.1);
          box-shadow: 0 10px 30px rgba(255,183,178,0.4);
        }

        .svc-category {
          font-family: var(--font-script, 'Satisfy', cursive);
          font-size: 2rem;
          color: #fff;
          margin: 0 0 0.5rem 0;
          font-weight: 400;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }

        .svc-title {
          font-family: var(--font-sans, sans-serif);
          font-size: 1.8rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 0 1rem;
          color: #fff;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
          line-height: 1.2;
        }

        .svc-desc {
          font-size: 1rem;
          color: rgba(255,255,255,0.85);
          line-height: 1.5;
          margin: 0;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          height: 0;
          overflow: hidden;
        }
        .svc-slide:hover .svc-desc {
          opacity: 1;
          transform: translateY(0);
          height: auto;
          margin-top: 1rem;
        }

        /* Nav Buttons */
        .svc-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .svc-nav-btn:hover {
          background: var(--accent);
          border-color: var(--accent);
          transform: translateY(-50%) scale(1.1);
        }
        .svc-nav-btn.left { left: 2rem; }
        .svc-nav-btn.right { right: 2rem; }

        @media (max-width: 768px) {
          .svc-category { font-size: 1.5rem; }
          .svc-title { font-size: 1.35rem; }
          .svc-desc { font-size: 0.875rem; opacity: 1; height: auto; transform: translateY(0); margin-top: 0.75rem; }
          .svc-slide-content { transform: translateY(0); padding: 0 1.25rem; }
          .svc-icon-wrapper { width: 56px; height: 56px; margin-bottom: 1rem; }
          
          .svc-nav-btn { width: 44px; height: 44px; }
          .svc-nav-btn.left { left: 1rem; }
          .svc-nav-btn.right { right: 1rem; }
        }
      `}</style>

      <button onClick={scrollLeftBtn} className="svc-nav-btn left" aria-label="Previous">
        <ChevronLeft size={32} />
      </button>
      
      <button onClick={scrollRightBtn} className="svc-nav-btn right" aria-label="Next">
        <ChevronRight size={32} />
      </button>

      <div 
        ref={scrollRef}
        className="svc-slider-container"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
      >
          {services.map((svc, i) => {
            const Icon = iconMap[svc.icon] || Sparkles
            const bgImage = svc.image || galleryImgs[i % galleryImgs.length]?.src || '/images/hero-maldives.png'
            
            return (
              <div key={svc.title} className="svc-slide">
              <div 
                className="svc-slide-bg" 
                style={{ backgroundImage: `url('${bgImage}')` }} 
              />
              <div className="svc-slide-overlay" />
              <div className="svc-slide-content">
                <div className="svc-icon-wrapper">
                  <Icon size={30} strokeWidth={1.5} />
                </div>
                <h4 className="svc-category">Book My Dream</h4>
                <h2 className="svc-title">{svc.title}</h2>
                <p className="svc-desc">{svc.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
