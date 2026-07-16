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

export type Destination = {
  slug: string
  name: string
  country: string
  state: string
  region: 'Domestic' | 'International' | 'Honeymoon'
  description: string
  image: string
  bestTime: string
  attractions: string[]
  tips: string[]
}
export const destinations: Destination[] = []

export type Testimonial = {
  name: string
  location: string
  rating: number
  review: string
  trip: string
}
export const testimonials: Testimonial[] = []

export type Service = { title: string; description: string; icon: string; image: string }
export const services: Service[] = [
  { title: 'Domestic Holiday Packages', description: 'Discover the beauty of incredible India with curated domestic tours.', icon: 'MapPin', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80' },
  { title: 'International Holiday Packages', description: 'Explore the world with handcrafted international getaways.', icon: 'Globe', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80' },
  { title: 'Customized Tour Packages', description: 'Tailor-made itineraries designed around your dreams and budget.', icon: 'Sparkles', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80' },
  { title: 'Hotel Reservations Worldwide', description: 'Best rates on hotels and resorts across the globe.', icon: 'Hotel', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80' },
  { title: 'Flight Ticket Bookings', description: 'Cheapest fares on domestic and international flights.', icon: 'Plane', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80' },
  { title: 'Train Ticket Bookings', description: 'Hassle-free rail bookings and scenic train journeys.', icon: 'TrainFront', image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80' },
  { title: 'Luxury Cruise Bookings', description: 'Sail in style with premium cruise holiday packages.', icon: 'Ship', image: 'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?w=800&q=80' },
  { title: 'Visa Assistance', description: 'End-to-end visa documentation and processing support.', icon: 'FileCheck', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80' },
  { title: 'Passport Assistance', description: 'Quick and reliable passport application assistance.', icon: 'BookUser', image: 'https://images.unsplash.com/photo-1581452936746-d50eb312b9d0?w=800&q=80' },
  { title: 'Honeymoon Packages', description: 'Romantic escapes designed for unforgettable beginnings.', icon: 'Heart', image: 'https://images.unsplash.com/photo-1516815231560-8f41ec531527?w=800&q=80' },
  { title: 'Family Vacations', description: 'Fun-filled trips crafted for the whole family.', icon: 'Users', image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80' },
  { title: 'Corporate Trips', description: 'Seamless MICE and corporate travel management.', icon: 'Briefcase', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80' },
]

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
