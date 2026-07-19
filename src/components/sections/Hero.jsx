import { socialsData } from '../../data/socials';
import { Github, Linkedin, ArrowRight, Download } from 'lucide-react';
import { scrollToSection } from '../../lib/lenis';
import MagneticButton from '../ui/MagneticButton';
import RevealText from '../ui/RevealText';

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden"
    >
      {/* Background Grids & Ambient Glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-radial-glow pointer-events-none z-0" />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center gap-6">
        
        {/* Intro Tag */}
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20">
          Available for Opportunities
        </span>

        {/* Headline */}
        <div className="flex flex-col gap-2">
          <RevealText className="font-display font-bold text-5xl md:text-8xl tracking-tight text-text">
            Pritesh Patel
          </RevealText>
          <h2 className="font-display text-xl md:text-3xl font-medium tracking-wide text-muted">
            Full Stack Developer — MERN Stack
          </h2>
        </div>

        {/* Hook statement */}
        <p className="max-w-2xl text-muted text-base md:text-lg leading-relaxed font-light">
          A self-taught Full Stack MERN developer. Co-founded <span className="text-text font-medium">VegBazar</span>, a live production platform serving <span className="text-text font-medium">600+ users</span> and processing over <span className="text-text font-medium">1,500+ orders</span>. Building high-performance, polished web solutions.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3.5 mt-6 w-full sm:w-auto">
          <MagneticButton
            className="w-full bg-accent text-[#0A0A0A] border-accent hover:bg-accent/85 hover:border-accent/85"
            onClick={() => scrollToSection('#projects')}
          >
            View Work
            <ArrowRight size={14} className="stroke-[2.5]" />
          </MagneticButton>
          <a href={socialsData.resumeUrl} download className="w-full sm:w-auto">
            <MagneticButton className="w-full bg-transparent border-border hover:border-text">
              Download Resume
              <Download size={14} className="stroke-[2.5]" />
            </MagneticButton>
          </a>
        </div>

        {/* Social Quick Links */}
        <div className="flex items-center gap-6 mt-8">
          <a
            href={socialsData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-text transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github size={22} />
          </a>
          <a
            href={socialsData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-text transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin size={22} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
