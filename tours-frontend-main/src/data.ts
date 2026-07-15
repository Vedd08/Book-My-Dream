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

export const packages: Package[] = [
  {
    slug: 'maldives-luxury-escape',
    name: 'Maldives Luxury Overwater Escape',
    type: 'Honeymoon',
    region: 'International',
    destination: 'Maldives',
    country: 'Maldives',
    duration: '5 Days / 4 Nights',
    price: 185000,
    discountPrice: 149000,
    rating: 4.9,
    reviews: 214,
    image: '/images/hero-maldives.png',
    featured: true,
    highlights: [
      'Private overwater villa with infinity pool',
      'Sunset dolphin cruise',
      'Candlelight dinner on the beach',
      'Complimentary snorkeling experience',
    ],
    inclusions: [
      '4 nights luxury overwater villa',
      'Daily breakfast & dinner',
      'Return airport speedboat transfers',
      'Seaplane transfers',
    ],
    exclusions: ['International airfare', 'Travel insurance', 'Personal expenses', 'Visa fees'],
    itinerary: [
      { day: 1, title: 'Arrival & Welcome', description: 'Arrive at Malé, seaplane transfer to your resort, evening at leisure.' },
      { day: 2, title: 'Island Bliss', description: 'Relax at your villa, snorkeling in the house reef, sunset dolphin cruise.' },
      { day: 3, title: 'Adventure Day', description: 'Optional water sports, spa session, candlelight beach dinner.' },
      { day: 4, title: 'Leisure & Explore', description: 'Visit a local island, shopping, and a romantic sandbank picnic.' },
      { day: 5, title: 'Departure', description: 'Breakfast and transfer back to Malé for your flight home.' },
    ],
    faqs: [
      { q: 'Is this package good for honeymooners?', a: 'Absolutely. It is our most popular honeymoon package with romantic inclusions.' },
      { q: 'Are flights included?', a: 'International airfare is not included but we can arrange the best fares for you.' },
    ],
  },
  {
    slug: 'bali-island-paradise',
    name: 'Bali Island Paradise',
    type: 'Family',
    region: 'International',
    destination: 'Bali',
    country: 'Indonesia',
    duration: '6 Days / 5 Nights',
    price: 98000,
    discountPrice: 79000,
    rating: 4.8,
    reviews: 178,
    image: '/images/dest-bali.png',
    featured: true,
    highlights: [
      'Ubud rice terraces & temples',
      'Private pool villa stay',
      'Water sports at Nusa Dua',
      'Traditional Balinese dinner show',
    ],
    inclusions: ['5 nights stay', 'Daily breakfast', 'Private guided sightseeing', 'Airport transfers'],
    exclusions: ['Airfare', 'Lunch & dinner', 'Visa', 'Personal expenses'],
    itinerary: [
      { day: 1, title: 'Arrival in Bali', description: 'Transfer to hotel, evening free to explore Seminyak.' },
      { day: 2, title: 'Ubud Tour', description: 'Rice terraces, monkey forest, art markets and temples.' },
      { day: 3, title: 'Water Adventure', description: 'Nusa Dua water sports and beach relaxation.' },
      { day: 4, title: 'Island Hopping', description: 'Day trip to Nusa Penida with stunning viewpoints.' },
      { day: 5, title: 'Leisure Day', description: 'Spa, shopping and a sunset dinner at Jimbaran.' },
      { day: 6, title: 'Departure', description: 'Breakfast and transfer to airport.' },
    ],
    faqs: [{ q: 'Is Bali family-friendly?', a: 'Yes, this itinerary is designed with activities for all ages.' }],
  },
  {
    slug: 'swiss-alps-grand-tour',
    name: 'Swiss Alps Grand Tour',
    type: 'Luxury',
    region: 'International',
    destination: 'Switzerland',
    country: 'Switzerland',
    duration: '8 Days / 7 Nights',
    price: 265000,
    discountPrice: 229000,
    rating: 4.9,
    reviews: 132,
    image: '/images/dest-switzerland.png',
    featured: true,
    highlights: [
      'Glacier Express scenic train',
      'Jungfraujoch - Top of Europe',
      'Lake Lucerne cruise',
      'Mount Titlis cable car',
    ],
    inclusions: ['7 nights 4-star stay', 'Daily breakfast', 'Swiss Travel Pass', 'Guided city tours'],
    exclusions: ['Airfare', 'Lunch & dinner', 'Schengen visa', 'Personal expenses'],
    itinerary: [
      { day: 1, title: 'Arrive Zurich', description: 'Transfer to hotel, evening city walk.' },
      { day: 2, title: 'Lucerne', description: 'Lake cruise, Lion Monument and Chapel Bridge.' },
      { day: 3, title: 'Mount Titlis', description: 'Rotair cable car and snow activities.' },
      { day: 4, title: 'Interlaken', description: 'Adventure capital, free time for optional activities.' },
      { day: 5, title: 'Jungfraujoch', description: 'Cogwheel train to the Top of Europe.' },
      { day: 6, title: 'Glacier Express', description: 'Scenic train journey to Zermatt.' },
      { day: 7, title: 'Zermatt', description: 'Matterhorn views and alpine village charm.' },
      { day: 8, title: 'Departure', description: 'Transfer to airport for departure.' },
    ],
    faqs: [{ q: 'Is the Swiss Travel Pass included?', a: 'Yes, unlimited travel on trains, buses and boats is included.' }],
  },
  {
    slug: 'dubai-luxury-getaway',
    name: 'Dubai Luxury Getaway',
    type: 'Group',
    region: 'International',
    destination: 'Dubai',
    country: 'UAE',
    duration: '5 Days / 4 Nights',
    price: 89000,
    discountPrice: 72000,
    rating: 4.7,
    reviews: 256,
    image: '/images/dest-dubai.png',
    highlights: ['Burj Khalifa 124th floor', 'Desert safari with BBQ dinner', 'Dubai Marina dhow cruise', 'Abu Dhabi city tour'],
    inclusions: ['4 nights stay', 'Daily breakfast', 'Desert safari', 'City tours with transfers'],
    exclusions: ['Airfare', 'UAE visa', 'Lunch & dinner', 'Optional tours'],
    itinerary: [
      { day: 1, title: 'Arrival', description: 'Transfer to hotel, evening Marina cruise.' },
      { day: 2, title: 'City Tour', description: 'Burj Khalifa, Dubai Mall and Palm Jumeirah.' },
      { day: 3, title: 'Desert Safari', description: 'Dune bashing, camel ride and BBQ dinner.' },
      { day: 4, title: 'Abu Dhabi', description: 'Sheikh Zayed Mosque and Ferrari World.' },
      { day: 5, title: 'Departure', description: 'Shopping and transfer to airport.' },
    ],
    faqs: [{ q: 'Is visa assistance available?', a: 'Yes, we provide full UAE visa assistance.' }],
  },
  {
    slug: 'kerala-backwaters-bliss',
    name: 'Kerala Backwaters Bliss',
    type: 'Family',
    region: 'Domestic',
    destination: 'Kerala',
    country: 'India',
    duration: '6 Days / 5 Nights',
    price: 42000,
    discountPrice: 34000,
    rating: 4.8,
    reviews: 312,
    image: '/images/dest-kerala.png',
    featured: true,
    highlights: ['Alleppey houseboat stay', 'Munnar tea gardens', 'Kathakali cultural show', 'Spice plantation tour'],
    inclusions: ['5 nights stay incl. houseboat', 'Daily breakfast', 'All transfers', 'Sightseeing'],
    exclusions: ['Airfare/train', 'Lunch & dinner', 'Entry fees', 'Personal expenses'],
    itinerary: [
      { day: 1, title: 'Arrive Kochi', description: 'Fort Kochi heritage walk and Chinese fishing nets.' },
      { day: 2, title: 'Munnar', description: 'Drive through tea gardens and waterfalls.' },
      { day: 3, title: 'Munnar Sightseeing', description: 'Eravikulam park, tea museum and viewpoints.' },
      { day: 4, title: 'Thekkady', description: 'Periyar wildlife and spice plantation tour.' },
      { day: 5, title: 'Alleppey', description: 'Overnight stay on a traditional houseboat.' },
      { day: 6, title: 'Departure', description: 'Transfer to Kochi for departure.' },
    ],
    faqs: [{ q: 'Is the houseboat private?', a: 'Yes, you get a private houseboat with a chef and crew.' }],
  },
  {
    slug: 'rajasthan-royal-heritage',
    name: 'Rajasthan Royal Heritage',
    type: 'Luxury',
    region: 'Domestic',
    destination: 'Rajasthan',
    country: 'India',
    duration: '7 Days / 6 Nights',
    price: 58000,
    discountPrice: 47000,
    rating: 4.7,
    reviews: 198,
    image: '/images/dest-rajasthan.png',
    highlights: ['Jaipur Amber Fort', 'Udaipur lake palace', 'Jaisalmer desert camp', 'Heritage haveli stays'],
    inclusions: ['6 nights heritage stay', 'Daily breakfast', 'AC transport', 'Guided tours'],
    exclusions: ['Airfare/train', 'Lunch & dinner', 'Monument fees', 'Camel ride'],
    itinerary: [
      { day: 1, title: 'Jaipur', description: 'City Palace, Hawa Mahal and local bazaars.' },
      { day: 2, title: 'Amber Fort', description: 'Fort tour and Jal Mahal photo stop.' },
      { day: 3, title: 'Pushkar', description: 'Brahma temple and holy lake visit.' },
      { day: 4, title: 'Udaipur', description: 'City of Lakes, boat ride on Lake Pichola.' },
      { day: 5, title: 'Jodhpur', description: 'Mehrangarh Fort and the blue city.' },
      { day: 6, title: 'Jaisalmer', description: 'Golden fort and desert camp with cultural night.' },
      { day: 7, title: 'Departure', description: 'Transfer for onward journey.' },
    ],
    faqs: [{ q: 'Are heritage hotels included?', a: 'Yes, you stay in handpicked heritage properties.' }],
  },
  {
    slug: 'goa-beach-retreat',
    name: 'Goa Beach Retreat',
    type: 'Group',
    region: 'Domestic',
    destination: 'Goa',
    country: 'India',
    duration: '4 Days / 3 Nights',
    price: 28000,
    discountPrice: 21000,
    rating: 4.6,
    reviews: 421,
    image: '/images/dest-goa.png',
    highlights: ['North & South Goa beaches', 'Sunset cruise', 'Water sports', 'Beachside resort stay'],
    inclusions: ['3 nights resort stay', 'Daily breakfast', 'Sightseeing', 'Airport transfers'],
    exclusions: ['Airfare', 'Lunch & dinner', 'Water sports fees', 'Entry tickets'],
    itinerary: [
      { day: 1, title: 'Arrival', description: 'Check in and relax at the beach.' },
      { day: 2, title: 'North Goa', description: 'Baga, Calangute and Fort Aguada.' },
      { day: 3, title: 'South Goa', description: 'Colva beach, Basilica and a sunset cruise.' },
      { day: 4, title: 'Departure', description: 'Breakfast and transfer to airport.' },
    ],
    faqs: [{ q: 'Is it good for groups?', a: 'Yes, ideal for friends and group getaways.' }],
  },
  {
    slug: 'thailand-island-hopper',
    name: 'Thailand Island Hopper',
    type: 'Group',
    region: 'International',
    destination: 'Thailand',
    country: 'Thailand',
    duration: '6 Days / 5 Nights',
    price: 76000,
    discountPrice: 61000,
    rating: 4.7,
    reviews: 289,
    image: '/images/dest-thailand.png',
    highlights: ['Phi Phi islands tour', 'Bangkok city & temples', 'Phuket beaches', 'Thai cooking class'],
    inclusions: ['5 nights stay', 'Daily breakfast', 'Island tours', 'Transfers'],
    exclusions: ['Airfare', 'Visa', 'Lunch & dinner', 'Optional shows'],
    itinerary: [
      { day: 1, title: 'Bangkok', description: 'Arrival and evening at leisure.' },
      { day: 2, title: 'City Tour', description: 'Grand Palace and temple tour.' },
      { day: 3, title: 'Phuket', description: 'Fly to Phuket and relax at the beach.' },
      { day: 4, title: 'Phi Phi Islands', description: 'Speedboat tour and snorkeling.' },
      { day: 5, title: 'Leisure', description: 'Optional tours and shopping.' },
      { day: 6, title: 'Departure', description: 'Transfer to airport.' },
    ],
    faqs: [{ q: 'Do you assist with Thailand visa?', a: 'Yes, we provide complete visa assistance.' }],
  },
]

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

export const destinations: Destination[] = [
  {
    slug: 'maldives',
    name: 'Maldives',
    country: 'Maldives',
    state: 'Indian Ocean',
    region: 'International',
    description: 'A tropical paradise of crystal-clear lagoons, overwater villas and untouched coral reefs. The ultimate luxury and honeymoon destination.',
    image: '/images/hero-maldives.png',
    bestTime: 'November to April',
    attractions: ['Overwater villas', 'Coral reefs', 'Sandbanks', 'Underwater restaurants'],
    tips: ['Carry reef-safe sunscreen', 'Book seaplane transfers in advance', 'Respect local island dress codes'],
  },
  {
    slug: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    state: 'Bali Province',
    region: 'International',
    description: 'The Island of Gods blends lush rice terraces, sacred temples, vibrant culture and stunning beaches into one unforgettable escape.',
    image: '/images/dest-bali.png',
    bestTime: 'April to October',
    attractions: ['Ubud rice terraces', 'Tanah Lot temple', 'Nusa Penida', 'Seminyak beaches'],
    tips: ['Rent a scooter to explore', 'Carry cash for local markets', 'Dress modestly at temples'],
  },
  {
    slug: 'switzerland',
    name: 'Switzerland',
    country: 'Switzerland',
    state: 'Central Europe',
    region: 'International',
    description: 'Snow-capped peaks, pristine lakes and scenic railways make Switzerland the crown jewel of European travel.',
    image: '/images/dest-switzerland.png',
    bestTime: 'May to September',
    attractions: ['Jungfraujoch', 'Lake Lucerne', 'Glacier Express', 'Matterhorn'],
    tips: ['Get a Swiss Travel Pass', 'Pack warm layers', 'Trains run exactly on time'],
  },
  {
    slug: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    state: 'Emirate of Dubai',
    region: 'International',
    description: 'A dazzling city of record-breaking skyscrapers, golden deserts and world-class shopping and entertainment.',
    image: '/images/dest-dubai.png',
    bestTime: 'November to March',
    attractions: ['Burj Khalifa', 'Desert safari', 'Palm Jumeirah', 'Dubai Mall'],
    tips: ['Dress modestly in public', 'Stay hydrated', 'Fridays are the local weekend'],
  },
  {
    slug: 'kerala',
    name: 'Kerala',
    country: 'India',
    state: 'Kerala',
    region: 'Domestic',
    description: "God's Own Country welcomes you with serene backwaters, misty tea hills, Ayurveda and lush tropical greenery.",
    image: '/images/dest-kerala.png',
    bestTime: 'September to March',
    attractions: ['Alleppey backwaters', 'Munnar tea gardens', 'Periyar wildlife', 'Fort Kochi'],
    tips: ['Try a houseboat stay', 'Sample authentic sadya meals', 'Carry mosquito repellent'],
  },
  {
    slug: 'rajasthan',
    name: 'Rajasthan',
    country: 'India',
    state: 'Rajasthan',
    region: 'Domestic',
    description: 'The land of kings dazzles with majestic forts, royal palaces, golden deserts and a rich cultural heritage.',
    image: '/images/dest-rajasthan.png',
    bestTime: 'October to March',
    attractions: ['Amber Fort', 'Lake Pichola', 'Jaisalmer dunes', 'Mehrangarh Fort'],
    tips: ['Bargain at local markets', 'Carry sun protection', 'Try the royal Rajasthani thali'],
  },
  {
    slug: 'goa',
    name: 'Goa',
    country: 'India',
    state: 'Goa',
    region: 'Domestic',
    description: 'Sun, sand and a laid-back vibe. Goa offers golden beaches, Portuguese heritage and a vibrant nightlife.',
    image: '/images/dest-goa.png',
    bestTime: 'November to February',
    attractions: ['Baga beach', 'Fort Aguada', 'Old Goa churches', 'Sunset cruises'],
    tips: ['Rent a scooter', 'Try fresh seafood', 'Respect beach safety flags'],
  },
  {
    slug: 'paris',
    name: 'Paris',
    country: 'France',
    state: 'Île-de-France',
    region: 'International',
    description: 'The City of Light enchants with iconic landmarks, world-class art, romantic boulevards and exquisite cuisine.',
    image: '/images/dest-paris.png',
    bestTime: 'April to June, October',
    attractions: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Seine river cruise'],
    tips: ['Book attractions online', 'Learn a few French phrases', 'Watch for pickpockets'],
  },
]

export type Testimonial = {
  name: string
  location: string
  rating: number
  review: string
  trip: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Ananya & Rohit Sharma',
    location: 'Mumbai',
    rating: 5,
    review: 'Our Maldives honeymoon was absolutely magical. Every detail was perfectly planned and the overwater villa exceeded our dreams. Thank you Book My Dream Travels!',
    trip: 'Maldives Honeymoon',
  },
  {
    name: 'Vikram Patel',
    location: 'Ahmedabad',
    rating: 5,
    review: 'The Switzerland tour was flawless. The Glacier Express and Jungfraujoch were once-in-a-lifetime experiences. Highly professional team.',
    trip: 'Swiss Alps Grand Tour',
  },
  {
    name: 'The Reddy Family',
    location: 'Hyderabad',
    rating: 5,
    review: 'We travelled with our kids to Bali and everything from hotels to transfers was seamless. The kids loved every moment. Will book again!',
    trip: 'Bali Family Vacation',
  },
  {
    name: 'Sneha Iyer',
    location: 'Bengaluru',
    rating: 5,
    review: 'Kerala backwaters were breathtaking and the houseboat stay was so peaceful. Great value for money and wonderful guides.',
    trip: 'Kerala Backwaters Bliss',
  },
  {
    name: 'Arjun Mehta',
    location: 'Delhi',
    rating: 4,
    review: 'Dubai trip was very well organized. The desert safari was the highlight. Visa assistance made everything stress-free.',
    trip: 'Dubai Luxury Getaway',
  },
  {
    name: 'Priya Nair',
    location: 'Pune',
    rating: 5,
    review: 'I requested a customized Thailand itinerary and they delivered exactly what I wanted. Truly personalized service.',
    trip: 'Customized Thailand Tour',
  },
]

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

export const blogPosts: BlogPost[] = [
  {
    slug: 'ultimate-packing-checklist',
    title: 'The Ultimate Travel Packing Checklist for Stress-Free Trips',
    excerpt: 'Never forget an essential again. Our complete packing guide covers everything from documents to gadgets.',
    category: 'Travel Tips',
    date: 'Mar 12, 2025',
    readTime: '6 min read',
    image: '/images/blog-packing.png',
    author: 'Team BMDT',
  },
  {
    slug: 'best-honeymoon-destinations-2025',
    title: '10 Best Honeymoon Destinations to Fall in Love With in 2025',
    excerpt: 'From the Maldives to Switzerland, discover the most romantic getaways for your perfect honeymoon.',
    category: 'Honeymoon',
    date: 'Feb 28, 2025',
    readTime: '8 min read',
    image: '/images/gallery-honeymoon.png',
    author: 'Team BMDT',
  },
  {
    slug: 'family-travel-guide-bali',
    title: 'A Family Travel Guide to Bali: Things to Do With Kids',
    excerpt: 'Planning a family trip to Bali? Here are the best kid-friendly activities and tips for a smooth vacation.',
    category: 'Family',
    date: 'Feb 10, 2025',
    readTime: '5 min read',
    image: '/images/gallery-family.png',
    author: 'Team BMDT',
  },
  {
    slug: 'kerala-backwaters-guide',
    title: 'Exploring Kerala Backwaters: A Complete Houseboat Guide',
    excerpt: 'Everything you need to know about planning the perfect houseboat experience in God\'s Own Country.',
    category: 'Destinations',
    date: 'Jan 22, 2025',
    readTime: '7 min read',
    image: '/images/dest-kerala.png',
    author: 'Team BMDT',
  },
  {
    slug: 'dubai-on-a-budget',
    title: 'How to Experience Dubai on a Budget Without Missing Out',
    excerpt: 'Luxury Dubai doesn\'t have to break the bank. Smart tips to enjoy the city for less.',
    category: 'Travel Tips',
    date: 'Jan 8, 2025',
    readTime: '6 min read',
    image: '/images/dest-dubai.png',
    author: 'Team BMDT',
  },
  {
    slug: 'visa-application-mistakes',
    title: '7 Common Visa Application Mistakes and How to Avoid Them',
    excerpt: 'Avoid rejections and delays with our expert guide to smooth visa applications.',
    category: 'Visa',
    date: 'Dec 18, 2024',
    readTime: '5 min read',
    image: '/images/dest-paris.png',
    author: 'Team BMDT',
  },
]

export const galleryImages = [
  { src: '/images/hero-maldives.png', category: 'Honeymoon Tours', title: 'Maldives' },
  { src: '/images/dest-bali.png', category: 'International Tours', title: 'Bali' },
  { src: '/images/dest-switzerland.png', category: 'International Tours', title: 'Switzerland' },
  { src: '/images/dest-dubai.png', category: 'International Tours', title: 'Dubai' },
  { src: '/images/dest-kerala.png', category: 'Domestic Tours', title: 'Kerala' },
  { src: '/images/dest-rajasthan.png', category: 'Domestic Tours', title: 'Rajasthan' },
  { src: '/images/dest-goa.png', category: 'Domestic Tours', title: 'Goa' },
  { src: '/images/dest-thailand.png', category: 'International Tours', title: 'Thailand' },
  { src: '/images/dest-paris.png', category: 'International Tours', title: 'Paris' },
  { src: '/images/gallery-honeymoon.png', category: 'Honeymoon Tours', title: 'Romantic Escape' },
  { src: '/images/gallery-family.png', category: 'Family Tours', title: 'Family Adventure' },
  { src: '/images/blog-packing.png', category: 'Domestic Tours', title: 'Journey Begins' },
]

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
