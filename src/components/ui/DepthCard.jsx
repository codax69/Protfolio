import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../animations/gsapConfig';

const DepthCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);

  useGSAP(() => {
    const card = cardRef.current;
    if (!card) return;

    const isHoverable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isHoverable || prefersReducedMotion) return;

    // quickTo targets for buttery smooth updates
    const rotateXTo = gsap.quickTo(card, "rotateX", { duration: 0.3, ease: "power2.out" });
    const rotateYTo = gsap.quickTo(card, "rotateY", { duration: 0.3, ease: "power2.out" });
    const zTo = gsap.quickTo(card, "z", { duration: 0.3, ease: "power2.out" });

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      
      const width = rect.width;
      const height = rect.height;
      
      // Calculate cursor coordinates relative to card center
      const mouseX = e.clientX - rect.left - width / 2;
      const mouseY = e.clientY - rect.top - height / 2;

      // Normalize offsets (-1 to 1)
      const normX = mouseX / (width / 2);
      const normY = mouseY / (height / 2);

      // Bounded tilt angle limits (max ±7 degrees)
      const maxTilt = 7;
      const rotateX = -normY * maxTilt;
      const rotateY = normX * maxTilt;

      // Update positions
      rotateXTo(rotateX);
      rotateYTo(rotateY);
      zTo(10); // Subtle pop-out depth
    };

    const handleMouseLeave = () => {
      // Reset card tilt smoothly
      rotateXTo(0);
      rotateYTo(0);
      zTo(0);
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      className={`relative bg-surface border border-border rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(124,92,255,0.18)] hover:border-accent/30 overflow-hidden will-change-transform ${className}`}
    >
      {/* Dynamic light reflection overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      <div className="relative z-10" style={{ transform: 'translateZ(25px)' }}>
        {children}
      </div>
    </div>
  );
};

export default DepthCard;
