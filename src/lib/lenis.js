import Lenis from 'lenis';
import { gsap } from '../animations/gsapConfig';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenisInstance = null;

export const initLenis = () => {
  if (typeof window === 'undefined') return null;
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential out
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
    infinite: false
  });

  // Sync scroll events with ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  // Bind Lenis updates to GSAP ticker
  const gsapTickerUpdate = (time) => {
    lenisInstance.raf(time * 1000);
  };
  
  gsap.ticker.add(gsapTickerUpdate);

  // Disable GSAP's lag smoothing to prevent visual drift
  gsap.ticker.lagSmoothing(0);

  // Add cleanup hook
  lenisInstance.destroyInstance = () => {
    gsap.ticker.remove(gsapTickerUpdate);
    lenisInstance.destroy();
    lenisInstance = null;
  };

  return lenisInstance;
};

export const getLenis = () => lenisInstance;

export const scrollToSection = (target) => {
  if (typeof window === 'undefined') return;
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // match default easing
    });
  } else {
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
