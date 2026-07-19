import { useGSAP } from '@gsap/react';
import { gsap } from './gsapConfig';

export const useMagnetic = (buttonRef, labelRef) => {
  useGSAP(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Media query to check for desktop cursor environment
    const isHoverable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isHoverable || prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      // Calculate cursor distance from the center of the button
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Magnetic strength bounds
      const buttonStrength = 0.25;
      const labelStrength = 0.45;

      gsap.to(button, {
        x: deltaX * buttonStrength,
        y: deltaY * buttonStrength,
        duration: 0.3,
        ease: "power3.out"
      });

      if (labelRef?.current) {
        gsap.to(labelRef.current, {
          x: deltaX * labelStrength,
          y: deltaY * labelStrength,
          duration: 0.3,
          ease: "power3.out"
        });
      }
    };

    const handleMouseLeave = () => {
      // Snap back smoothly
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });

      if (labelRef?.current) {
        gsap.to(labelRef.current, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        });
      }
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: buttonRef });
};
