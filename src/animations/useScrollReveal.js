import { useGSAP } from '@gsap/react';
import { gsap } from './gsapConfig';

export const useScrollReveal = (containerRef, childSelector, stagger = 0.1) => {
  useGSAP(() => {
    if (!containerRef.current) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const targets = containerRef.current.querySelectorAll(childSelector);
    if (targets.length === 0) return;

    if (prefersReducedMotion) {
      // Accessibility fallback: Simple opacity fade-in, no transforms
      gsap.fromTo(targets,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          stagger: stagger,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true
          }
        }
      );
    } else {
      // Normal staggered entry: slide up and fade in
      gsap.fromTo(targets,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: stagger,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true
          }
        }
      );
    }
  }, { scope: containerRef });
};
