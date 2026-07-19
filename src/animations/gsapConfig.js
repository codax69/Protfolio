import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Suppress warnings for null targets (helpful during React dynamic mounts)
gsap.config({
  nullTargetWarn: false
});

export { gsap, ScrollTrigger };
export default gsap;
