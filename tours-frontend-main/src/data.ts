// ============================================================
//  Shared data — converted from Next.js lib/data.ts
// ============================================================

export const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
]

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
  foreignCurrency?: string
  foreignPrice?: number
  foreignDiscountPrice?: number
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
  { title: 'Domestic Holiday Packages', description: 'Discover the beauty of incredible India with curated domestic tours.', icon: 'MapPin', image: '/images/domestic-real.png' },
  { title: 'International Holiday Packages', description: 'Explore the world with handcrafted international getaways.', icon: 'Globe', image: '/images/international-real.png' },
  { title: 'Customized Tour Packages', description: 'Tailor-made itineraries designed around your dreams and budget.', icon: 'Sparkles', image: '/images/trekking2.jpg' },
  { title: 'Hotel Reservations Worldwide', description: 'Best rates on hotels and resorts across the globe.', icon: 'Hotel', image: '/images/hotel-real.png' },
  { title: 'Flight Ticket Bookings', description: 'Cheapest fares on domestic and international flights.', icon: 'Plane', image: '/images/flight-real.png' },
  { title: 'Train Ticket Bookings', description: 'Hassle-free rail bookings and scenic train journeys.', icon: 'TrainFront', image: '/images/train-real.png' },
  { title: 'Luxury Cruise Bookings', description: 'Sail in style with premium cruise holiday packages.', icon: 'Ship', image: '/images/cruise-real.png' },
  { title: 'Visa Assistance', description: 'End-to-end visa documentation and processing support.', icon: 'FileCheck', image: '/images/visa-real.png' },
  { title: 'Passport Assistance', description: 'Quick and reliable passport application assistance.', icon: 'BookUser', image: '/images/passport-real.png' },
  { title: 'Honeymoon Packages', description: 'Romantic escapes designed for unforgettable beginnings.', icon: 'Heart', image: '/images/gallery-honeymoon.png' },
  { title: 'Family Vacations', description: 'Fun-filled trips crafted for the whole family.', icon: 'Users', image: '/images/family-real.png' },
  { title: 'Corporate Trips', description: 'Seamless MICE and corporate travel management.', icon: 'Briefcase', image: '/images/corporate-real.png' },
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

export function formatCurrency(amount: number, currencyCode: string) {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode, maximumFractionDigits: 0 }).format(amount)
  } catch (e) {
    return `${currencyCode} ${amount}`
  }
}
