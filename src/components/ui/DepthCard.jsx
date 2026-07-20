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
    const rotationXTo = gsap.quickTo(card, "rotationX", { duration: 0.3, ease: "power2.out" });
    const rotationYTo = gsap.quickTo(card, "rotationY", { duration: 0.3, ease: "power2.out" });
    const zTo = gsap.quickTo(card, "z", { duration: 0.3, ease: "power2.out" });

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;
      const normX = mouseX / (rect.width / 2);
      const normY = mouseY / (rect.height / 2);
      rotationXTo(-normY * 7);
      rotationYTo(normX * 7);
      zTo(10);
    };

    const handleMouseLeave = () => {
      rotationXTo(0);
      rotationYTo(0);
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
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
      className={`relative bg-gradient-to-br from-[#141414]/85 to-[#0A0A0A]/95 border border-[#7C5CFF]/15 shadow-[8px_8px_24px_rgba(0,0,0,0.6),inset_3px_3px_6px_rgba(255,255,255,0.04),inset_-4px_-4px_8px_rgba(0,0,0,0.8),inset_0_0_10px_rgba(124,92,255,0.1)] hover:border-[#7C5CFF]/40 hover:shadow-[12px_12px_32px_rgba(124,92,255,0.15),inset_4px_4px_8px_rgba(255,255,255,0.06),inset_-5px_-5px_10px_rgba(0,0,0,0.85),inset_0_0_15px_rgba(124,92,255,0.25)] transition-all duration-400 ease-out rounded-[24px] p-6 overflow-hidden will-change-transform ${className}`}
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
