import { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projects';
import { ExternalLink, Code, ChevronLeft, ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../animations/gsapConfig';
import { useScrollReveal } from '../animations/useScrollReveal';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { initLenis } from '../lib/lenis';
import useSEO from '../hooks/useSEO';

// ─── Image With Fallback ──────────────────────────────────────────────────────
const ImageWithFallback = ({ src, alt, className }) => {
  const [hasError, setHasError] = useState(false);
  if (hasError || !src) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-surface text-xs text-muted font-mono uppercase tracking-wider text-center p-4">
        {alt}
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setHasError(true)} />;
};

// ─── Mini Image Slider ────────────────────────────────────────────────────────
const ProjectImageSlider = ({ images, title, fallbackImage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);
  const timerRef = useRef(null);
  const totalSlides = images?.length ?? 0;

  const stopAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    if (totalSlides <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % totalSlides);
    }, 4000);
  }, [totalSlides, stopAutoplay]);

  useGSAP(() => {
    if (!trackRef.current || totalSlides <= 1) return;
    gsap.to(trackRef.current, {
      xPercent: -currentIndex * (100 / totalSlides),
      duration: 0.6,
      ease: 'power2.out',
    });
  }, [currentIndex, totalSlides]);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  const handleNext = (e) => { e.stopPropagation(); e.preventDefault(); setCurrentIndex((p) => (p + 1) % totalSlides); startAutoplay(); };
  const handlePrev = (e) => { e.stopPropagation(); e.preventDefault(); setCurrentIndex((p) => (p - 1 + totalSlides) % totalSlides); startAutoplay(); };

  if (!images || images.length === 0) {
    return (
      <ImageWithFallback
        src={fallbackImage}
        alt={`${title} Screenshot`}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
    );
  }

  if (images.length === 1) {
    return (
      <ImageWithFallback
        src={images[0]}
        alt={`${title} Screenshot`}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden w-full h-full group/slider">
      <div ref={trackRef} className="flex h-full select-none" style={{ width: `${totalSlides * 100}%` }}>
        {images.map((imgSrc, idx) => (
          <div key={idx} className="h-full relative flex-shrink-0" style={{ width: `${100 / totalSlides}%` }}>
            <img src={imgSrc} alt={`${title} screenshot ${idx + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <button onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-1.5 bg-base/85 backdrop-blur-sm border border-border text-text rounded-full opacity-0 group-hover/slider:opacity-100 hover:bg-accent hover:border-accent hover:text-base transition-all duration-200 cursor-pointer" aria-label="Previous">
        <ChevronLeft size={14} />
      </button>
      <button onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-1.5 bg-base/85 backdrop-blur-sm border border-border text-text rounded-full opacity-0 group-hover/slider:opacity-100 hover:bg-accent hover:border-accent hover:text-base transition-all duration-200 cursor-pointer" aria-label="Next">
        <ChevronRight size={14} />
      </button>
      <div className="absolute bottom-2 right-2 bg-base/80 backdrop-blur-sm border border-border px-2 py-0.5 rounded-md text-[10px] text-muted font-bold pointer-events-none z-20 flex items-center gap-1">
        <span className="text-text">{currentIndex + 1}</span>/<span>{totalSlides}</span>
      </div>
    </div>
  );
};

// ─── Project Card ─────────────────────────────────────────────────────────────
const ProjectCard = ({ project, index, globalRank }) => {
  const isFullWidth = index % 3 === 2; // Every 3rd card spans full width

  return (
    <div className={`${isFullWidth ? 'lg:col-span-12' : 'lg:col-span-6'} reveal-item`}>
      <div className="clay-card h-full p-0 overflow-hidden group transition-all duration-300 hover:border-accent/20 rounded-2xl border border-border">
        <div className={`flex flex-col ${isFullWidth ? 'lg:flex-row h-full' : ''}`}>

          {/* Image */}
          <div className={`relative bg-surface/50 border-b border-border overflow-hidden ${isFullWidth ? 'lg:w-1/2 lg:border-b-0 lg:border-r' : 'aspect-video'}`}>
            <ProjectImageSlider images={project.images} title={project.title} fallbackImage={project.image} />

            {/* Left: position + type badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
              <span className="font-display font-black text-[11px] text-base bg-accent px-2.5 py-1 rounded-full tracking-wider shadow-[0_0_12px_rgba(124,92,255,0.5)]">
                {String(globalRank).padStart(2, '0')}
              </span>
              <span className="bg-gradient-to-br from-surface to-base border border-border px-3 py-1 rounded-full text-xs font-semibold text-accent shadow-[2px_2px_5px_rgba(0,0,0,0.5),inset_1px_1px_2px_rgba(255,255,255,0.05),inset_-1px_-1px_2px_rgba(0,0,0,0.7)]">
                {project.type}
              </span>
            </div>

            {/* Right: status badges */}
            <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5 z-20">
              {project.comingSoon && (
                <span className="bg-[#0a0a0a]/80 backdrop-blur-sm border border-amber-500/40 px-2.5 py-1 rounded-full text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                  Coming Soon
                </span>
              )}
              {project.featured && !project.comingSoon && (
                <span className="bg-accent/10 border border-accent/30 px-2.5 py-1 rounded-full text-[10px] font-bold text-accent uppercase tracking-wider">
                  Featured
                </span>
              )}
            </div>
          </div>

          {/* Info */}
          <div className={`p-8 flex flex-col justify-between ${isFullWidth ? 'lg:w-1/2' : 'flex-1'}`}>
            <div>
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="font-display font-bold text-xl md:text-2xl text-text leading-tight">{project.title}</h3>
                <span className="text-xs font-medium text-muted bg-gradient-to-br from-surface to-base border border-border px-2.5 py-1 rounded-full whitespace-nowrap shadow-[2px_2px_5px_rgba(0,0,0,0.5),inset_1px_1px_2px_rgba(255,255,255,0.05),inset_-1px_-1px_2px_rgba(0,0,0,0.7)]">
                  {project.date}
                </span>
              </div>

              <p className="text-sm text-muted font-light leading-relaxed mb-6">{project.impact}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((tag, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-xl border border-white/5 bg-gradient-to-br from-[#1c1c1c] to-[#0d0d0d] text-muted hover:text-accent hover:border-[#7C5CFF]/40 shadow-[2px_2px_5px_rgba(0,0,0,0.5),inset_1px_1px_2px_rgba(255,255,255,0.05),inset_-1px_-1px_2px_rgba(0,0,0,0.7)] transition-all duration-300 cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-4 border-t border-border pt-6 mt-auto">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold text-text hover:text-accent transition-colors duration-200">
                  <ExternalLink size={16} />
                  <span>Live Site</span>
                </a>
              )}
              {project.codeUrl && (
                <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold text-muted hover:text-text transition-colors duration-200">
                  <Code size={16} />
                  <span>Code</span>
                </a>
              )}
              {project.comingSoon ? (
                <span className="ml-auto text-xs font-bold uppercase tracking-wider text-amber-400/70 cursor-default">
                  In Development
                </span>
              ) : (
                <Link
                  to={`/proof-of-work/${project.id}`}
                  className="ml-auto flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent hover:gap-2.5 transition-all duration-200 group/link"
                >
                  <span>View Details</span>
                  <ArrowRight size={13} className="group-hover/link:translate-x-0.5 transition-transform duration-200" />
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// ─── Main ProofOfWorkPage ─────────────────────────────────────────────────────
const ProofOfWorkPage = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  useSEO({
    title: 'Proof of Work & WebDev Projects | Pritesh Patel - MERN Stack Developer',
    description: 'Production web development (WebDev) portfolio by Pritesh Patel, Full Stack MERN Developer (mernstack). Explore real-world web apps: VegBazar, TechStore, SwapEase, and custom systems.',
    keywords: 'Pritesh Patel projects, proof of work, mernstack, mern stack, webdev, webdevelopment, web developer, VegBazar, TechStore, React, Node.js, Express, MongoDB',
    canonical: 'https://priteshpatel.dev/proof-of-work',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = initLenis();
    return () => {
      if (lenis && typeof lenis.destroyInstance === 'function') {
        lenis.destroyInstance();
      }
    };
  }, []);

  // Hero animation
  useGSAP(() => {
    if (!heroRef.current) return;
    gsap.fromTo(
      heroRef.current.querySelectorAll('.hero-anim'),
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1 }
    );
  }, { scope: heroRef });

  useScrollReveal(containerRef, '.reveal-item', 0.1);

  const featuredProjects = projectsData.filter((p) => p.featured);
  const otherProjects = projectsData.filter((p) => !p.featured);

  return (
    <div className="relative min-h-screen bg-base text-text selection:bg-accent/30 selection:text-text overflow-hidden">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-32 pb-16 bg-base border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none z-0" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-accent/8 blur-[90px] rounded-full pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="hero-anim mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-text transition-colors duration-200 group">
              <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Home
            </Link>
          </div>

          <div className="hero-anim mb-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">All Projects</span>
          </div>
          <h1 className="hero-anim font-display font-bold text-4xl md:text-6xl tracking-tight leading-tight mb-4">
            Proof of Work
          </h1>
          <p className="hero-anim text-base md:text-lg text-muted leading-relaxed max-w-2xl">
            Every project here is a real-world solution — shipped, used, and built to solve actual problems. From freelance client work to personal experiments.
          </p>

          {/* Stats row */}
          <div className="hero-anim mt-10 flex flex-wrap gap-8">
            <div>
              <p className="text-3xl font-bold text-text font-display">{projectsData.length}</p>
              <p className="text-xs text-muted uppercase tracking-wider mt-0.5">Total Projects</p>
            </div>
            <div className="w-px bg-border" />
            <div>
              <p className="text-3xl font-bold text-text font-display">{featuredProjects.length}</p>
              <p className="text-xs text-muted uppercase tracking-wider mt-0.5">Featured</p>
            </div>
            <div className="w-px bg-border" />
            <div>
              <p className="text-3xl font-bold text-text font-display">
                {projectsData.filter((p) => p.type === 'Freelance').length}
              </p>
              <p className="text-xs text-muted uppercase tracking-wider mt-0.5">Freelance</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── All Projects Grid ─────────────────────────────────────────────── */}
      <div ref={containerRef} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">

          {/* Featured */}
          {featuredProjects.length > 0 && (
            <div className="mb-20">
              <div className="flex items-center gap-4 mb-10 reveal-item">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent block mb-1">Highlighted</span>
                  <h2 className="font-display font-bold text-2xl md:text-3xl">Featured Projects</h2>
                </div>
                <div className="flex-1 h-px bg-border ml-4 hidden md:block" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {featuredProjects.map((project, index) => {
                  const globalRank = projectsData.findIndex((p) => p.id === project.id) + 1;
                  return <ProjectCard key={project.id} project={project} index={index} globalRank={globalRank} />;
                })}
              </div>
            </div>
          )}

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-10 reveal-item">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted block mb-1">More Work</span>
                  <h2 className="font-display font-bold text-2xl md:text-3xl">Other Projects</h2>
                </div>
                <div className="flex-1 h-px bg-border ml-4 hidden md:block" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {otherProjects.map((project, index) => {
                  const globalRank = projectsData.findIndex((p) => p.id === project.id) + 1;
                  return <ProjectCard key={project.id} project={project} index={index} globalRank={globalRank} />;
                })}
              </div>
            </div>
          )}

          {/* Empty state for other projects */}
          {otherProjects.length === 0 && (
            <div className="reveal-item border border-dashed border-border rounded-2xl p-16 text-center">
              <p className="text-muted text-sm">More projects coming soon...</p>
            </div>
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProofOfWorkPage;
