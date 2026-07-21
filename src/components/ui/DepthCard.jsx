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
      className={`relative clay-card rounded-[24px] p-6 overflow-hidden will-change-transform ${className}`}
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
