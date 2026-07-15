import React, { useEffect, useRef } from 'react';
import hotAirBalloonImg from '../assets/hot_air_balloon.png';
import gsap from 'gsap';

export default function FloatingBalloons() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Configuration for background balloons (sprinkles)
  const balloons = [
    { top: '15%', left: '5%', size: 60, delay: 0, opacity: 0.2 },
    { top: '45%', right: '10%', size: 45, delay: -2, opacity: 0.15 },
    { top: '75%', left: '15%', size: 80, delay: -4, opacity: 0.25 },
    { top: '30%', left: '85%', size: 50, delay: -1, opacity: 0.1 },
    { top: '85%', right: '25%', size: 70, delay: -3, opacity: 0.2 },
    { top: '10%', right: '40%', size: 35, delay: -5, opacity: 0.15 },
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    const elements = containerRef.current.querySelectorAll('.sprinkle-balloon');
    
    // Add subtle parallax on scroll to all balloons
    gsap.utils.toArray(elements).forEach((el: any, i) => {
      gsap.to(el, {
        y: -100 - (i * 20), // Each moves at a slightly different speed
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    });
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: 'absolute', 
        inset: 0, 
        overflow: 'hidden', 
        pointerEvents: 'none', 
        zIndex: 0 
      }}
    >
      {balloons.map((b, i) => (
        <img
          key={i}
          className="sprinkle-balloon"
          src={hotAirBalloonImg}
          alt=""
          style={{
            position: 'absolute',
            top: b.top,
            left: b.left,
            right: b.right,
            width: b.size,
            height: b.size,
            opacity: b.opacity,
            objectFit: 'cover',
            borderRadius: '50%',
            animation: `floatBlob ${6 + (i % 3)}s infinite alternate ease-in-out`,
            animationDelay: `${b.delay}s`,
            filter: 'grayscale(30%) sepia(20%)', // slightly blend them into background
          }}
        />
      ))}
    </div>
  );
}
