"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    document.addEventListener('mousemove', updatePosition);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: position.x - 8,
          top: position.y - 8,
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
        }}
      >
        <div className="w-4 h-4 bg-white rounded-full transition-transform duration-200" />
      </div>

      {/* Cursor trail */}
      <div
        className="fixed pointer-events-none z-40 mix-blend-difference"
        style={{
          left: position.x - 12,
          top: position.y - 12,
          transform: isHovering ? 'scale(2)' : 'scale(1)',
        }}
      >
        <div className="w-6 h-6 border border-white rounded-full transition-all duration-300 opacity-50" />
      </div>
    </>
  );
}
