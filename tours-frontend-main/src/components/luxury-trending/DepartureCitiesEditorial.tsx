import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom'
import { getImageUrl } from '../../config';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CityData {
  name: string;
  count: string;
  price: string;
  image: string;
}

const cities: CityData[] = [
  { name: 'MUMBAI', count: '670 Departures', price: '₹24,000', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=2000&auto=format&fit=crop' }, // Gateway of India
  { name: 'DELHI', count: '267 Departures', price: '₹49,000', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2000&auto=format&fit=crop' }, // India Gate
  { name: 'BANGALORE', count: '31 Departures', price: '₹84,000', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=2000&auto=format&fit=crop' }, // Bangalore Palace
  { name: 'KOLKATA', count: '255 Departures', price: '₹49,000', image: 'https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=2000&auto=format&fit=crop' }, // Kolkata taxi
  { name: 'PUNE', count: '16 Departures', price: '₹44,000', image: 'https://images.unsplash.com/photo-1595928642581-f50f4f3453a5?q=80&w=2000&auto=format&fit=crop' }, // Pune
];

const DepartureCitiesEditorial: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current || !listRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.city-header-text',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );

      const items = gsap.utils.toArray('.city-list-item');
      gsap.fromTo(items,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 85%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen py-32 overflow-hidden bg-[#F8F4EE] text-[#222] flex flex-col justify-center transition-colors duration-700"
    >
      {/* Background Images */}
      {cities.map((city, idx) => (
        <div
          key={`bg-${idx}`}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out pointer-events-none z-0 ${
            hoveredIndex === idx ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${getImageUrl(city.image)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}
      {/* Light overlay to ensure dark text legibility while keeping images bright */}
      <div className={`absolute inset-0 bg-cream/35 z-0 pointer-events-none transition-opacity duration-700 ${hoveredIndex !== null ? 'opacity-100' : 'opacity-0'}`} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:gap-8 items-start">
        
        {/* Left Section: Header */}
        <div className="w-full md:w-1/3 relative md:sticky top-32 mb-16 md:mb-0">
          <p className="city-header-text uppercase tracking-[0.3em] text-xs font-semibold text-[#671231] mb-4">
            From Your Doorstep
          </p>
          <h2 className="city-header-text font-serif text-5xl md:text-7xl leading-tight mb-6">
            Departure <br/> <span className="italic text-[#806b73] font-light">Cities</span>
          </h2>
          <p className="city-header-text text-[#806b73] text-sm md:text-base max-w-sm mb-8 leading-relaxed">
            From flights and stays to sightseeing and meals — every tour begins conveniently from your doorstep.
          </p>
          <Link 
            to="/packages"
            className="city-header-text group inline-flex items-center gap-3 text-sm uppercase tracking-widest font-medium text-[#120f0b] hover:text-[#671231] transition-colors"
          >
            All Packages
            <span className="w-8 h-[1px] bg-[#120f0b] group-hover:bg-[#671231] group-hover:w-12 transition-all duration-300"></span>
          </Link>
        </div>

        {/* Right Section: Interactive List */}
        <div className="w-full md:w-2/3">
          <ul ref={listRef} className="flex flex-col w-full list-none m-0 p-0">
            {cities.map((city, idx) => (
              <li 
                key={`city-${idx}`}
                className="city-list-item group relative border-b border-[#120f0b]/10 last:border-b-0 py-8 md:py-12 cursor-pointer transition-all duration-500"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={`flex flex-col md:flex-row md:items-end justify-between transition-opacity duration-500 ${
                  hoveredIndex !== null && hoveredIndex !== idx ? 'opacity-60' : 'opacity-100'
                }`}>
                  <h3 className="font-serif text-5xl md:text-8xl tracking-tight m-0 text-transparent transition-all duration-500"
                      style={{ 
                        WebkitTextStroke: hoveredIndex === idx ? '0px transparent' : '1.5px rgba(18,15,11,0.6)',
                        color: hoveredIndex === idx ? '#120f0b' : 'transparent',
                      }}
                  >
                    {city.name}
                  </h3>

                  <div className={`mt-4 md:mt-0 flex flex-col items-start md:items-end overflow-hidden transition-all duration-500 ${
                    hoveredIndex === idx ? 'opacity-100 translate-y-0 max-h-40' : 'opacity-0 translate-y-4 max-h-0 md:max-h-40'
                  }`}>
                    <p className="text-[#671231] font-semibold text-sm tracking-widest uppercase mb-1">{city.count}</p>
                    <p className="text-[#120f0b] text-lg font-medium mb-4">from {city.price}</p>
                    <Link 
                      to={`/packages?from=${city.name.toLowerCase()}`}
                      className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#120f0b]/30 hover:border-[#671231] hover:bg-[#671231] hover:text-white transition-all duration-300"
                    >
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};

export default DepartureCitiesEditorial;
