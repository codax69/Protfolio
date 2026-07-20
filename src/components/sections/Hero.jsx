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
                className="w-full bg-accent text-[#0A0A0A] border border-white/20 shadow-[0_6px_16px_rgba(124,92,255,0.3),inset_2.5px_2.5px_5px_rgba(255,255,255,0.35),inset_-2.5px_-2.5px_5px_rgba(0,0,0,0.35)] hover:bg-[#8b6eff] hover:shadow-[0_10px_20px_rgba(124,92,255,0.45),inset_3px_3px_6px_rgba(255,255,255,0.4),inset_-3px_-3px_6px_rgba(0,0,0,0.3)] transition-all duration-300"
                onClick={() => scrollToSection('#projects')}
              >
                View Work
                <ArrowRight size={14} className="stroke-[2.5]" />
              </MagneticButton>
              <a href={socialsData.resumeUrl} download className="w-full sm:w-auto">
                <MagneticButton className="w-full bg-gradient-to-br from-[#141414]/85 to-[#0A0A0A]/95 border border-[#7C5CFF]/15 shadow-[4px_4px_12px_rgba(0,0,0,0.5),inset_2.5px_2.5px_5px_rgba(255,255,255,0.04),inset_-2.5px_-2.5px_5px_rgba(0,0,0,0.6)] hover:border-[#7C5CFF]/45 hover:text-accent hover:shadow-[6px_6px_16px_rgba(124,92,255,0.15),inset_3px_3px_6px_rgba(255,255,255,0.05),inset_-3px_-3px_6px_rgba(0,0,0,0.6)] transition-all duration-300">
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
