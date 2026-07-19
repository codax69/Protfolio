import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../animations/gsapConfig';

const RevealText = ({ children, className = "", as: Tag = "h1" }) => {
  const containerRef = useRef(null);
  const text = typeof children === 'string' ? children : '';

  useGSAP(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.reveal-char');
    if (chars.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Accessible fade in
      gsap.fromTo(chars,
        { opacity: 0 },
        { opacity: 1, duration: 1.0 }
      );
    } else {
      // Premium staggered 3D popup
      gsap.fromTo(chars,
        { 
          opacity: 0, 
          y: 60, 
          rotateX: 45 
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.02,
          delay: 0.2 // Small delay after page load
        }
      );
    }
  }, { scope: containerRef });

  if (!text) {
    return <Tag className={className}>{children}</Tag>;
  }

  // Split string into words first to prevent mid-word layout wrapping
  const words = text.split(" ");

  return (
    <Tag ref={containerRef} className={`reveal-text-container ${className}`} style={{ perspective: '1000px' }}>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split("").map((char, cIdx) => (
            <span key={cIdx} className="inline-block reveal-char origin-bottom will-change-transform opacity-0">
              {char}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
};

export default RevealText;
