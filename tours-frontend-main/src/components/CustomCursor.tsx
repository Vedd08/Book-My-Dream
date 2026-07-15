import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    gsap.set([cursor, follower], { xPercent: -50, yPercent: -50 });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.2;

    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");
    
    const xSetFollower = gsap.quickSetter(follower, "x", "px");
    const ySetFollower = gsap.quickSetter(follower, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      xSet(mouse.x);
      ySet(mouse.y);
    };

    window.addEventListener("mousemove", onMouseMove);

    gsap.ticker.add(() => {
      // smooth trailing effect for follower
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSetFollower(pos.x);
      ySetFollower(pos.y);
    });

    // Handle hover states for links/buttons
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.closest('.hover-expand')) {
        gsap.to(follower, { scale: 2.5, backgroundColor: 'rgba(132, 204, 22, 0.2)', borderColor: 'transparent', duration: 0.3 });
      }
    };
    const handleMouseOut = () => {
      gsap.to(follower, { scale: 1, backgroundColor: 'transparent', borderColor: 'rgba(132, 204, 22, 0.8)', duration: 0.3 });
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          body { cursor: none; }
          a, button, input, textarea, select { cursor: none !important; }
        }
      `}</style>
      <div 
        ref={cursorRef} 
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 8, height: 8,
          backgroundColor: 'var(--accent)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999
        }}
      />
      <div 
        ref={followerRef} 
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 40, height: 40,
          border: '1.5px solid var(--accent)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'opacity 0.2s',
        }}
      />
    </>
  );
}
