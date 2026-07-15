// ── Shared data (server-side copy) ──────────────────────────
export type Package = {
  slug: string; name: string; type: string
  region: 'Domestic' | 'International'
  destination: string; country: string; duration: string
  price: number; discountPrice: number; rating: number; reviews: number
  image: string; highlights: string[]; inclusions: string[]; exclusions: string[]
  itinerary: { day: number; title: string; description: string }[]
  faqs: { q: string; a: string }[]
  featured?: boolean
}

export const getPackages = (): Package[] => {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'packages.json')
    const raw = fs.readFileSync(dataPath, 'utf-8')
    return JSON.parse(raw)
  } catch (err) {
    console.error('Error reading packages.json:', err)
    return []
  }
}

export const savePackages = (pkgs: Package[]) => {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'packages.json')
    const dir = path.dirname(dataPath)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    
    fs.writeFileSync(dataPath, JSON.stringify(pkgs, null, 2), 'utf-8')
  } catch (err) {
    console.error('Error writing packages.json:', err)
  }
}

export type Destination = {
  slug: string; name: string; country: string; state: string
  region: 'Domestic' | 'International' | 'Honeymoon'
  description: string; image: string; bestTime: string
  attractions: string[]; tips: string[]
}

export const getDestinations = (): Destination[] => {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'destinations.json')
    const raw = fs.readFileSync(dataPath, 'utf-8')
    return JSON.parse(raw)
  } catch (err) {
    console.error('Error reading destinations.json:', err)
    return []
  }
}

export const saveDestinations = (dests: Destination[]) => {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'destinations.json')
    const dir = path.dirname(dataPath)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    
    fs.writeFileSync(dataPath, JSON.stringify(dests, null, 2), 'utf-8')
  } catch (err) {
    console.error('Error writing destinations.json:', err)
  }
}

export type Inquiry = {
  id: string
  subject: string
  name: string
  email: string
  phone: string
  travelers: number
  date: string
  message: string
  status: 'new' | 'read' | 'resolved'
  createdAt: string
}

export const getInquiries = (): Inquiry[] => {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'inquiries.json')
    if (!fs.existsSync(dataPath)) return []
    const raw = fs.readFileSync(dataPath, 'utf-8')
    return JSON.parse(raw)
  } catch (err) {
    console.error('Error reading inquiries.json:', err)
    return []
  }
}

export const saveInquiries = (inqs: Inquiry[]) => {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'inquiries.json')
    const dir = path.dirname(dataPath)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    
    fs.writeFileSync(dataPath, JSON.stringify(inqs, null, 2), 'utf-8')
  } catch (err) {
    console.error('Error writing inquiries.json:', err)
  }
}

import fs from 'fs'
import path from 'path'

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
  author: string
}

export const getBlogs = (): BlogPost[] => {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'blogs.json')
    const raw = fs.readFileSync(dataPath, 'utf-8')
    return JSON.parse(raw)
  } catch (err) {
    console.error('Error reading blogs.json:', err)
    return []
  }
}

export const saveBlogs = (blogs: BlogPost[]) => {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'blogs.json')
    const dir = path.dirname(dataPath)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    
    fs.writeFileSync(dataPath, JSON.stringify(blogs, null, 2), 'utf-8')
  } catch (err) {
    console.error('Error writing blogs.json:', err)
  }
}

export type GalleryImage = {
  id: string
  src: string
  title: string
  category: string
  createdAt: string
}

export const getGallery = (): GalleryImage[] => {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'gallery.json')
    if (!fs.existsSync(dataPath)) return []
    const raw = fs.readFileSync(dataPath, 'utf-8')
    return JSON.parse(raw)
  } catch (err) {
    console.error('Error reading gallery.json:', err)
    return []
  }
}

export const saveGallery = (images: GalleryImage[]) => {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'gallery.json')
    const dir = path.dirname(dataPath)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    
    fs.writeFileSync(dataPath, JSON.stringify(images, null, 2), 'utf-8')
  } catch (err) {
    console.error('Error writing gallery.json:', err)
  }
}

export type GallerySlide = {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  cardSubtitle: string
  cardTitle: string
}

export const getGallerySlides = (): GallerySlide[] => {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'gallerySlides.json')
    if (!fs.existsSync(dataPath)) return []
    const raw = fs.readFileSync(dataPath, 'utf-8')
    return JSON.parse(raw)
  } catch (err) {
    console.error('Error reading gallerySlides.json:', err)
    return []
  }
}

export const saveGallerySlides = (slides: GallerySlide[]) => {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'gallerySlides.json')
    const dir = path.dirname(dataPath)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    
    fs.writeFileSync(dataPath, JSON.stringify(slides, null, 2), 'utf-8')
  } catch (err) {
    console.error('Error writing gallerySlides.json:', err)
  }
}