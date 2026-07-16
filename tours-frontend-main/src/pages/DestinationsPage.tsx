import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';
import type { Destination } from '../data';
import { Star, MapPin, ArrowUpRight, Compass, Heart, Mountain, Users, Gem, ArrowRight, ShieldCheck, Clock, Plane } from 'lucide-react';

import bgImageFallback1 from '../assets/destination1.png';
import bgImageFallback2 from '../assets/destination2.png';
const baliImg = "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop";
const switzerlandImg = "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2000&auto=format&fit=crop";
const maldivesImg = "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2000&auto=format&fit=crop";
const dubaiImg = "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop";

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/api/destinations`)
      .then(r => r.json())
      .then(data => setDestinations(data))
      .catch(err => console.error(err));
  }, []);

  // Fallback data in case the API is slow or returns few items
  const displayDestinations = destinations.length >= 6 ? destinations : [
    { name: 'Bali', slug: 'bali', image: baliImg, country: 'Indonesia' },
    { name: 'Switzerland', slug: 'switzerland', image: switzerlandImg, country: 'Switzerland' },
    { name: 'Maldives', slug: 'maldives', image: maldivesImg, country: 'Maldives' },
    { name: 'Dubai', slug: 'dubai', image: dubaiImg, country: 'UAE' },
    { name: 'Canada', slug: 'canada', image: bgImageFallback1, country: 'Canada' },
    { name: 'Europe', slug: 'europe', image: bgImageFallback2, country: 'Europe' },
    ...destinations
  ].slice(0, 8) as Destination[]; // ensure we have enough items for a nice masonry

  // We assign varying sizes to cards to create a dense masonry layout without empty spaces
  const getSpanClasses = (index: number) => {
    // A repeating pattern of spans to make a dense, irregular grid
    const patterns = [
      "col-span-1 md:col-span-2 row-span-2", // large
      "col-span-1 md:col-span-1 row-span-1", // small
      "col-span-1 md:col-span-1 row-span-1", // small
      "col-span-1 md:col-span-2 row-span-1", // wide
      "col-span-1 md:col-span-1 row-span-2", // tall
      "col-span-1 md:col-span-1 row-span-1", // small
      "col-span-1 md:col-span-2 row-span-2", // large
      "col-span-1 md:col-span-1 row-span-1", // small
    ];
    return patterns[index % patterns.length];
  };

  const experiences = [
    { title: "Romantic Escapes", icon: <Heart className="w-8 h-8 mb-4 text-[#D4AF37]" />, desc: "Idyllic settings for honeymooners and couples looking for intimate retreats." },
    { title: "Adventure Trails", icon: <Mountain className="w-8 h-8 mb-4 text-[#D4AF37]" />, desc: "Thrilling expeditions for the adrenaline seekers across mountains and forests." },
    { title: "Family Holidays", icon: <Users className="w-8 h-8 mb-4 text-[#D4AF37]" />, desc: "Curated experiences that bring joy to every member of the family." },
    { title: "Luxury Cruises", icon: <Gem className="w-8 h-8 mb-4 text-[#D4AF37]" />, desc: "Sail the oceans in unparalleled comfort with our premium cruise packages." },
  ];

  const benefits = [
    { title: "Curated Itineraries", icon: <Compass className="w-6 h-6 text-[#186a76]" />, desc: "Every trip is hand-crafted by destination experts to ensure a unique, authentic experience." },
    { title: "24/7 Support", icon: <Clock className="w-6 h-6 text-[#186a76]" />, desc: "Our travel concierges are available around the clock to assist you during your journey." },
    { title: "Secure & Trusted", icon: <ShieldCheck className="w-6 h-6 text-[#186a76]" />, desc: "Book with confidence knowing your transactions and travel plans are fully protected." },
    { title: "Global Network", icon: <Plane className="w-6 h-6 text-[#186a76]" />, desc: "Exclusive partnerships with premium properties and airlines worldwide for the best rates." },
  ];

  return (
    <main className="relative w-full bg-[#fafafa] text-gray-900 overflow-hidden min-h-screen">
      
      {/* Dynamic CSS animations */}
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marqueeScroll 25s linear infinite;
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>

      {/* ── Marquee Header Background ── */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none" style={{ zIndex: 0, opacity: 0.03 }}>
        <div className="whitespace-nowrap flex py-20" style={{ width: '200%' }}>
          <div className="animate-marquee inline-block text-[15rem] font-bold tracking-tighter uppercase font-serif text-[#186a76]">
            EXPLORE • DISCOVER • JOURNEY • WANDER • EXPLORE • DISCOVER • JOURNEY • WANDER •
          </div>
        </div>
      </div>

      <div className="container relative mx-auto px-4 pt-32 lg:pt-40 z-10">
        
        {/* ── Header Section ── */}
        <section className="fade-in-up mb-16 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-gray-200 pb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-sm font-semibold tracking-wide uppercase">
              <Compass size={14} />
              <span>Global Reach</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-serif leading-none tracking-tight text-[#186a76]">
              Trending <span className="italic text-[#D4AF37]">Destinations</span>
            </h1>
          </div>
          <p className="text-gray-600 max-w-sm md:text-right leading-relaxed font-sans">
            Discover the most sought-after locations for your next unforgettable adventure. Handpicked exclusively for our luxury travelers.
          </p>
        </section>

        {/* ── Dense Masonry Grid ── */}
        <section className="fade-in-up w-full mb-24" style={{ animationDelay: '0.2s' }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 w-full grid-flow-dense" style={{ gridAutoRows: '250px' }}>
            {displayDestinations.map((d, index) => (
              <Link 
                to={`/packages?q=${d.slug}`} 
                key={d.slug + index} 
                className={`group relative rounded-3xl overflow-hidden block ${getSpanClasses(index)} bg-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500`}
              >
                {/* Background Image */}
                <img 
                  src={d.image || bgImageFallback1} 
                  alt={d.name} 
                  onError={(e) => { e.currentTarget.src = bgImageFallback1 }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80 opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-[#186a76]/30 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    
                    <div className="flex items-center justify-between mb-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider">
                        <MapPin size={12} />
                        { (d.country === 'INDIAINDIA' ? 'India' : d.country) || d.name }
                      </div>
                      
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-white font-serif mb-2">
                      {d.name} Tours
                    </h3>
                    
                    <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <div className="flex items-center gap-1 text-[#D4AF37]">
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                      </div>
                      <div className="text-white font-semibold text-sm">
                        Explore packages <ArrowUpRight className="inline" size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Travel Types Section ── */}
        <section className="py-24 border-t border-gray-200">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#186a76] mb-4">Journeys by <span className="text-[#D4AF37] italic">Experience</span></h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Whether you're looking for a romantic getaway, an adrenaline rush, or a relaxing cruise, we have curated the perfect packages for you.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {experiences.map((exp, idx) => (
              <div key={idx} className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-6 group-hover:bg-[#186a76] transition-colors duration-500">
                  <div className="group-hover:scale-110 transition-transform duration-500 text-[#D4AF37] group-hover:text-white">
                    {exp.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold font-serif mb-3 text-gray-900">{exp.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{exp.desc}</p>
                <Link to={`/packages`} className="inline-flex items-center gap-2 text-sm font-semibold text-[#186a76] group-hover:text-[#D4AF37] transition-colors">
                  View Packages <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── Information / Why Choose Us Section ── */}
        <section className="py-24 my-10 bg-[#186a76] rounded-[3rem] overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          <div className="container mx-auto px-8 md:px-16 relative z-10 flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-sm mb-4 block">The Book My Dream Advantage</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                Travel with <br /><span className="italic text-[#D4AF37]">Confidence</span> & Style
              </h2>
              <p className="text-blue-100 text-lg leading-relaxed mb-8 max-w-lg">
                We believe that travel is not just about visiting places, but experiencing them fully. Our dedicated team ensures every aspect of your journey is flawless, luxurious, and completely tailored to your desires.
              </p>
              
              <Link to="/about" className="inline-flex items-center gap-3 px-8 py-4 bg-[#D4AF37] hover:bg-white text-gray-900 font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-black/20">
                Discover Our Story <ArrowRight size={18} />
              </Link>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl hover:bg-white/20 transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="text-white text-lg font-bold mb-2">{benefit.title}</h3>
                    <p className="text-blue-100 text-sm leading-relaxed opacity-90">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}