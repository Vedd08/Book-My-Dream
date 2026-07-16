import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Package, inr } from '../../data';

interface FeaturedPackagesEditorialProps {
  packages: Package[];
}

const AUTOPLAY_INTERVAL_MS = 3000;

const FeaturedPackagesEditorial: React.FC<FeaturedPackagesEditorialProps> = ({ packages }) => {
  const count = packages?.length ?? 0;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i: number) => {
    setIndex(((i % count) + count) % count);
  }, [count]);

  useEffect(() => {
    if (paused || count <= 1) return;
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % count);
    }, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused, count]);

  if (!packages || packages.length === 0) return null;

  return (
    <section
      className="relative bg-[#120f0b] text-[#f8f4ee] overflow-hidden min-h-[100svh]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Intro Overlay Text that stays pinned in the corner */}
      <div className="absolute top-12 left-6 md:top-16 md:left-12 z-20 pointer-events-none mix-blend-difference text-white">
        <p className="uppercase tracking-[0.3em] text-xs font-semibold mb-2">Featured</p>
        <h2 className="font-serif text-3xl md:text-5xl leading-tight">
          Trending <br/> <span className="italic font-light">Journeys</span>
        </h2>
      </div>

      {packages.map((pkg, idx) => {
        const discount = Math.round(((pkg.price - pkg.discountPrice) / pkg.price) * 100);
        const isActive = idx === index;

        return (
          <div
            key={pkg.slug}
            className={`absolute inset-0 w-full h-full flex items-center justify-center p-6 md:p-24 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
            aria-hidden={!isActive}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${pkg.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            {/* Gradient Overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#120f0b]/90 via-[#120f0b]/40 to-transparent" />
            <div className="absolute inset-0 bg-[#671231]/20 mix-blend-multiply" />

            {/* Package Content */}
            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-end justify-between gap-8 md:gap-16 mt-auto pb-12 md:pb-0">

              {/* Left Side: Details */}
              <div className="flex-1 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider">
                    {pkg.type}
                  </span>
                  {discount > 0 && (
                    <span className="px-3 py-1 bg-[#e49d21] text-[#120f0b] rounded-full text-xs font-bold uppercase tracking-wider">
                      {discount}% OFF
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-4xl md:text-7xl font-bold leading-[1.1] mb-6 drop-shadow-lg">
                  {pkg.name}
                </h3>

                <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-gray-200 font-light mb-8">
                  <span className="flex items-center gap-2">
                    <MapPin size={18} className="text-[#e49d21]" />
                    {pkg.destination}, {pkg.country}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={18} className="text-[#e49d21]" />
                    {pkg.duration}
                  </span>
                  <span className="flex items-center gap-2">
                    <Star size={18} className="text-[#e49d21] fill-[#e49d21]" />
                    {pkg.rating} ({pkg.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Right Side: Pricing & CTA */}
              <div className="w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between md:justify-end gap-6 bg-white/10 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-6 md:p-0 rounded-2xl md:rounded-none">
                <div className="text-left md:text-right">
                  <p className="text-gray-300 text-sm mb-1 uppercase tracking-widest">From</p>
                  <div className="flex flex-col md:items-end">
                    <span className="text-gray-400 line-through text-lg mb-1">{inr(pkg.price)}</span>
                    <span className="font-serif text-3xl md:text-5xl font-bold text-[#e49d21]">{inr(pkg.discountPrice)}</span>
                  </div>
                </div>

                <Link
                  to={`/packages/${pkg.slug}`}
                  className="group inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#e49d21] text-[#120f0b] hover:bg-white transition-all duration-300 transform hover:scale-110"
                >
                  <ArrowRight size={28} className="transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>
          </div>
        );
      })}

      {/* Prev / Next Controls */}
      {count > 1 && (
        <>
          <button
            onClick={() => goTo(index - 1)}
            aria-label="Previous journey"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => goTo(index + 1)}
            aria-label="Next journey"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Progress / Nav Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {packages.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to journey ${i + 1}`}
            className={`h-[2px] rounded-full transition-all duration-500 ${i === index ? 'w-8 bg-[#e49d21]' : 'w-4 bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedPackagesEditorial;
