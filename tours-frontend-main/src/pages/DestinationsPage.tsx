import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { API_URL, getImageUrl } from '../config';
import type { Destination } from '../data';
import { Star, MapPin, ArrowUpRight, Compass, Heart, Mountain, Users, Gem, ArrowRight, ShieldCheck, Clock, Plane, Globe } from 'lucide-react';

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const rawTab = (searchParams.get('type') || searchParams.get('region') || 'all').toLowerCase();
  const activeTab = ['all', 'domestic', 'international'].includes(rawTab) ? rawTab : 'all';

  const handleTabChange = (tab: string) => {
    if (tab === 'all') {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('type');
      newParams.delete('region');
      setSearchParams(newParams);
    } else {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('type', tab);
      newParams.delete('region');
      setSearchParams(newParams);
    }
  };

  useEffect(() => {
    fetch(`${API_URL}/api/destinations`)
      .then(r => r.json())
      .then(data => setDestinations(Array.isArray(data) ? data : []))
      .catch(err => console.error(err));
  }, []);

  const getRegion = (d: Destination): 'Domestic' | 'International' => {
    const reg = (d.region || '').toLowerCase();
    const country = (d.country || '').toLowerCase();
    if (reg === 'domestic' || country === 'india' || country === 'indiaindia') return 'Domestic';
    if (reg === 'international') return 'International';
    return 'International';
  };

  const domesticList = destinations.filter(d => getRegion(d) === 'Domestic');
  const internationalList = destinations.filter(d => getRegion(d) === 'International');

  const getSpanClasses = (index: number) => {
    const patterns = [
      "col-span-1 md:col-span-2 row-span-2",
      "col-span-1 md:col-span-1 row-span-1",
      "col-span-1 md:col-span-1 row-span-1",
      "col-span-1 md:col-span-2 row-span-1",
      "col-span-1 md:col-span-1 row-span-2",
      "col-span-1 md:col-span-1 row-span-1",
      "col-span-1 md:col-span-2 row-span-2",
      "col-span-1 md:col-span-1 row-span-1",
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

  const renderDestinationGrid = (list: Destination[], sectionTag: string) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 w-full grid-flow-dense" style={{ gridAutoRows: '250px' }}>
      {list.map((d, index) => (
        <Link 
          to={`/destinations/${d.slug}`}
          key={sectionTag + '-' + d.slug + '-' + index} 
          className={`group relative rounded-3xl overflow-hidden block ${getSpanClasses(index)} bg-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500`}
        >
          <img
            src={getImageUrl(d.image)}
            alt={d.name}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundColor: '#1a1a2e' }}
          />
         
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-[#186a76]/30 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-500" />
          
          {/* Region Badge Top Right */}
          <div className="absolute top-4 right-4 z-10">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md border shadow-sm ${
              getRegion(d) === 'Domestic' 
                ? 'bg-amber-500/90 text-white border-amber-300/40' 
                : 'bg-teal-600/90 text-white border-teal-300/40'
            }`}>
              {getRegion(d)}
            </span>
          </div>

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
  );

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
        <section className="fade-in-up mb-12 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-gray-200 pb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-sm font-semibold tracking-wide uppercase">
              <Compass size={14} />
              <span>Global & Domestic Reach</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-serif leading-none tracking-tight text-[#186a76]">
              Explore <span className="italic text-[#D4AF37]">Destinations</span>
            </h1>
          </div>
          <p className="text-gray-600 max-w-sm md:text-right leading-relaxed font-sans">
            Discover breathtaking places across India and around the world, separated for your seamless browsing.
          </p>
        </section>

        {/* ── Tab Filter Switcher ── */}
        <section className="fade-in-up mb-14" style={{ animationDelay: '0.1s' }}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleTabChange('all')}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'all'
                  ? 'bg-[#186a76] text-white shadow-lg shadow-[#186a76]/20 scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Compass size={18} />
              All Destinations ({destinations.length})
            </button>

            <button
              onClick={() => handleTabChange('domestic')}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'domestic'
                  ? 'bg-[#186a76] text-white shadow-lg shadow-[#186a76]/20 scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <MapPin size={18} className={activeTab === 'domestic' ? 'text-[#D4AF37]' : 'text-amber-500'} />
              Domestic Destinations ({domesticList.length})
            </button>

            <button
              onClick={() => handleTabChange('international')}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'international'
                  ? 'bg-[#186a76] text-white shadow-lg shadow-[#186a76]/20 scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Globe size={18} className={activeTab === 'international' ? 'text-[#D4AF37]' : 'text-teal-600'} />
              International Destinations ({internationalList.length})
            </button>
          </div>
        </section>

        {/* ── Domestic Destinations Section ── */}
        {(activeTab === 'all' || activeTab === 'domestic') && (
          <section className="fade-in-up w-full mb-24" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-bold uppercase tracking-wider">
                  <MapPin size={13} />
                  Incredible India
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#186a76]">
                  Domestic <span className="text-[#D4AF37] italic">Destinations</span>
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Discover stunning beaches, mountains, backwaters, and heritage sites across India.
                </p>
              </div>
              <span className="hidden sm:inline-block px-4 py-1.5 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold rounded-full">
                {domesticList.length} {domesticList.length === 1 ? 'Destination' : 'Destinations'}
              </span>
            </div>

            {domesticList.length > 0 ? (
              renderDestinationGrid(domesticList, 'domestic')
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-200">
                <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">No Domestic Destinations Found</h3>
                <p className="text-gray-500 text-sm">Check back soon for new domestic tour destinations!</p>
              </div>
            )}
          </section>
        )}

        {/* ── International Destinations Section ── */}
        {(activeTab === 'all' || activeTab === 'international') && (
          <section className="fade-in-up w-full mb-24" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-700 text-xs font-bold uppercase tracking-wider">
                  <Globe size={13} />
                  Global Getaways
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#186a76]">
                  International <span className="text-[#D4AF37] italic">Destinations</span>
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Embark on memorable journeys to exotic locations, tropical islands, and iconic global cities.
                </p>
              </div>
              <span className="hidden sm:inline-block px-4 py-1.5 bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold rounded-full">
                {internationalList.length} {internationalList.length === 1 ? 'Destination' : 'Destinations'}
              </span>
            </div>

            {internationalList.length > 0 ? (
              renderDestinationGrid(internationalList, 'intl')
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-200">
                <Globe className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">No International Destinations Found</h3>
                <p className="text-gray-500 text-sm">Check back soon for new international tour destinations!</p>
              </div>
            )}
          </section>
        )}

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