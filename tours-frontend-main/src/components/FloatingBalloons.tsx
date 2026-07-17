import React, { useEffect, useRef } from 'react';
import hotAirBalloonImg from '../assets/hot_air_balloon.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Scroll parallax is pure decoration and its cost (scrub read/write on
      // every scroll frame) isn't worth paying on mobile. Desktop only.
      mm.add('(min-width: 1024px)', () => {
        const wraps = containerRef.current!.querySelectorAll('.sprinkle-balloon-wrap');

        // One ScrollTrigger driving a timeline instead of one per balloon.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });

        wraps.forEach((el, i) => {
          tl.to(el, { y: -100 - i * 20, ease: 'none' }, 0);
        });

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });
    }, containerRef);

    return () => ctx.revert();
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
        // GSAP parallax lives on this wrapper's transform; the CSS float
        // keyframes live on the img's transform below. Keeping them on
        // separate elements stops the two systems from overwriting each
        // other's transform on the same node every frame.
        <div
          key={i}
          className="sprinkle-balloon-wrap"
          style={{
            position: 'absolute',
            top: b.top,
            left: b.left,
            right: b.right,
            width: b.size,
            height: b.size,
            willChange: 'transform',
          }}
        >
          <img
            src={hotAirBalloonImg}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              opacity: b.opacity,
              objectFit: 'cover',
              borderRadius: '50%',
              animation: `floatBlob ${6 + (i % 3)}s infinite alternate ease-in-out`,
              animationDelay: `${b.delay}s`,
              filter: 'grayscale(30%) sepia(20%)', // slightly blend them into background
              willChange: 'transform',
            }}
          />
        </div>
      ))}
    </div>
  );
}
