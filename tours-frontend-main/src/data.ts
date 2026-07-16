// ============================================================
//  Shared data — converted from Next.js lib/data.ts
// ============================================================

export type Package = {
  slug: string
  name: string
  type: string
  region: 'Domestic' | 'International'
  destination: string
  country: string
  duration: string
  price: number
  discountPrice: number
  rating: number
  reviews: number
  image: string
  highlights: string[]
  inclusions: string[]
  exclusions: string[]
  itinerary: { day: number; title: string; description: string }[]
  faqs: { q: string; a: string }[]
  featured?: boolean
}

export const packages: Package[] = []
export const destinations: Destination[] = []
export const testimonials: Testimonial[] = []
export const services: Service[] = []
export const blogPosts: BlogPost[] = []
export const galleryImages: { src: string; category: string; title: string }[] = []

export const COMPANY = {
  name: 'Book My Dream Travels',
  phone: ['+91 87802 57606','+91 95863 64385'],
  // whatsapp: '919876543210',
  email: 'kalashbookmydream@gmail.com',
  address: 'UG-16 , Ascon Plaza ,Nr, Bhulka Bhavan School , Anand Mahal Road , Adajan , Surat',
  whatsappMessage: 'Hello Book My Dream Travels, I am interested in your travel services.',
}

export function inr(amount: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
}
