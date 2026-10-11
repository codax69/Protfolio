import { socialsData } from '../../data/socials';
import { Github, Linkedin, ArrowRight, Download } from 'lucide-react';
import { scrollToSection } from '../../lib/lenis';
import MagneticButton from '../ui/MagneticButton';
import RevealText from '../ui/RevealText';
import InteractiveGridBackground from "@/components/lightswind/interactive-grid-background";

const Hero = () => {
  return (
    <InteractiveGridBackground
        className="absolute inset-0 z-0"
        style={{ width: '100%', height: '100%' }}
        gridSize={40}
        gridColor="rgba(42, 42, 42, 0.3)"
        darkGridColor="rgba(42, 42, 42, 0.3)"
        effectColor="rgba(124, 92, 255, 0.15)"
        darkEffectColor="rgba(124, 92, 255, 0.15)"
        trailLength={5}
        glow
        glowRadius={30}
        showFade={false}
        fadeIntensity={25}
      >
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden"
    >
      {/* Interactive Background Grid */}
      
        <div className="w-full h-full flex flex-col items-center justify-center relative">
          {/* Ambient radial glow */}
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
                Full Stack MERN Stack Developer · Modern Web Development
              </h2>
            </div>

            {/* Hook statement */}
            <p className="max-w-2xl text-muted text-base md:text-lg leading-relaxed font-light">
              A self-taught <span className="text-text font-medium">Full Stack MERN developer</span> passionate about modern web development (WebDev). Co-founded <span className="text-text font-medium">VegBazar</span>, a live production platform serving <span className="text-text font-medium">600+ users</span> and processing over <span className="text-text font-medium">1,500+ orders</span>. Building high-performance, polished web solutions.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3.5 mt-6 w-full sm:w-auto">
              <MagneticButton
                className="btn-accent-glow w-full"
                onClick={() => scrollToSection('#projects')}
              >
                View Work
                <ArrowRight size={14} className="stroke-[2.5]" />
              </MagneticButton>
              <a href={socialsData.resumeUrl} download className="w-full sm:w-auto">
                <MagneticButton className="w-full premium-card hover:bg-btn-hover-bg hover:text-btn-hover-text hover:border-btn-hover-border transition-all duration-300">
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
        </div>
    </section>
     </InteractiveGridBackground>
  );
};

export default Hero;
