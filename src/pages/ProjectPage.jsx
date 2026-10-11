import { useRef, useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projectsData } from '../data/projects';
import {
  ArrowLeft,
  ExternalLink,
  Code,
  Calendar,
  Briefcase,
  Zap,
  AlertTriangle,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../animations/gsapConfig';
import { useScrollReveal } from '../animations/useScrollReveal';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { initLenis } from '../lib/lenis';
import useSEO from '../hooks/useSEO';

// ─── Image Slider ────────────────────────────────────────────────────────────
const ImageWithFallback = ({ src, alt, className }) => {
  const [hasError, setHasError] = useState(false);
  if (hasError || !src) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-surface text-sm text-muted font-mono uppercase tracking-wider text-center p-6">
        {alt}
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setHasError(true)} />;
};

const FullscreenSlider = ({ images, title, fallbackImage }) => {
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
      duration: 0.65,
      ease: 'power2.out',
    });
  }, [currentIndex, totalSlides]);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  const handleNext = (e) => { e.stopPropagation(); setCurrentIndex((p) => (p + 1) % totalSlides); startAutoplay(); };
  const handlePrev = (e) => { e.stopPropagation(); setCurrentIndex((p) => (p - 1 + totalSlides) % totalSlides); startAutoplay(); };

  if (!images || images.length === 0) {
    return (
      <div className="relative w-full aspect-video bg-surface/50 rounded-2xl overflow-hidden border border-border">
        <ImageWithFallback src={fallbackImage} alt={`${title} Screenshot`} className="w-full h-full object-cover" />
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className="relative w-full aspect-video bg-surface/50 rounded-2xl overflow-hidden border border-border">
        <ImageWithFallback src={images[0]} alt={`${title} Screenshot`} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-surface/50 rounded-2xl overflow-hidden border border-border group/slider">
      <div ref={trackRef} className="flex h-full select-none" style={{ width: `${totalSlides * 100}%` }}>
        {images.map((imgSrc, idx) => (
          <div key={idx} className="h-full relative flex-shrink-0" style={{ width: `${100 / totalSlides}%` }}>
            <img src={imgSrc} alt={`${title} screenshot ${idx + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-base/85 backdrop-blur-sm border border-border text-text rounded-full opacity-0 group-hover/slider:opacity-100 hover:bg-accent hover:border-accent hover:text-base transition-all duration-200 cursor-pointer"
        aria-label="Previous screenshot"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-base/85 backdrop-blur-sm border border-border text-text rounded-full opacity-0 group-hover/slider:opacity-100 hover:bg-accent hover:border-accent hover:text-base transition-all duration-200 cursor-pointer"
        aria-label="Next screenshot"
      >
        <ChevronRight size={18} />
      </button>

      {/* Counter */}
      <div className="absolute bottom-4 right-4 bg-base/80 backdrop-blur-sm border border-border px-3 py-1.5 rounded-lg text-xs text-muted uppercase font-bold tracking-wider pointer-events-none flex items-center gap-2 z-20">
        <span className="text-text">{currentIndex + 1}</span>
        <span>/</span>
        <span>{totalSlides}</span>
      </div>

      {/* Dot navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); startAutoplay(); }}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === currentIndex ? 'bg-accent w-5' : 'bg-muted/50 hover:bg-muted'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Section Block helper ─────────────────────────────────────────────────────
const SectionBlock = ({ icon: Icon, label, accent = false, children, className = '' }) => (
  <div className={`reveal-item ${className}`}>
    <div className={`flex items-center gap-2.5 mb-4`}>
      <Icon size={16} className={accent ? 'text-accent' : 'text-muted'} />
      <span className={`text-xs font-bold uppercase tracking-[0.18em] ${accent ? 'text-accent' : 'text-muted'}`}>{label}</span>
    </div>
    {children}
  </div>
);

// ─── Main ProjectPage ─────────────────────────────────────────────────────────
const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  const project = projectsData.find((p) => p.id === id);

  useSEO({
    title: project
      ? `${project.title} | Pritesh Patel - MERN Stack Web Development Project`
      : 'Project Case Study | Pritesh Patel WebDev',
    description: project
      ? `${project.title} (${project.type}): ${project.impact || project.description}. Built with ${project.tech?.slice(0, 4).join(', ')} by Pritesh Patel (MERN developer).`
      : 'Full stack MERN web development project case study by Pritesh Patel.',
    keywords: project
      ? `${project.title}, Pritesh Patel, mernstack, mern stack, webdev, webdevelopment, ${project.tech?.join(', ')}`
      : 'Pritesh Patel, webdev, mernstack, web development',
    canonical: `https://pritesh.site/proof-of-work/${id || ''}`,
    ogImage: project?.image ? `https://pritesh.site${project.image}` : undefined,
  });

  // Scroll to top on mount & reinit Lenis
  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = initLenis();
    return () => {
      if (lenis && typeof lenis.destroyInstance === 'function') {
        lenis.destroyInstance();
      }
    };
  }, [id]);

  // Hero entrance animation
  useGSAP(() => {
    if (!heroRef.current) return;
    gsap.fromTo(
      heroRef.current.querySelectorAll('.hero-anim'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out', stagger: 0.1 }
    );
  }, { scope: heroRef, dependencies: [id] });

  // Scroll reveal for body sections
  useScrollReveal(containerRef, '.reveal-item', 0.1);

  if (!project) {
    return (
      <div className="relative min-h-screen bg-base text-text flex flex-col items-center justify-center gap-6">
        <Navbar />
        <p className="text-muted text-lg">Project not found.</p>
        <Link to="/#proof-of-work" className="flex items-center gap-2 text-accent hover:underline text-sm font-semibold">
          <ArrowLeft size={16} /> Back to Projects
        </Link>
        <Footer />
      </div>
    );
  }

  // Adjacent projects for navigation
  const currentIdx = projectsData.findIndex((p) => p.id === id);
  const prevProject = projectsData[currentIdx - 1] ?? null;
  const nextProject = projectsData[currentIdx + 1] ?? null;

  return (
    <div className="relative min-h-screen bg-base text-text selection:bg-accent/30 selection:text-text overflow-hidden">
      <Navbar />

      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-32 pb-16 bg-base border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none z-0" />

        {/* Accent glow blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/10 blur-[100px] rounded-full pointer-events-none z-0" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          {/* Back button */}
          <div className="hero-anim mb-10">
            <Link
              to="/#proof-of-work"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-text transition-colors duration-200 group"
            >
              <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Projects
            </Link>
          </div>

          {/* Type pill + date */}
          <div className="flex flex-wrap items-center gap-3 mb-5 hero-anim">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
              {project.type}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted">
              <Calendar size={12} />
              {project.date}
            </span>
            {project.role && (
              <span className="flex items-center gap-1.5 text-xs text-muted">
                <Briefcase size={12} />
                {project.role}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="hero-anim font-display font-bold text-4xl md:text-6xl tracking-tight leading-[1.1] mb-6">
            {project.title}
          </h1>

          {/* Impact */}
          <p className="hero-anim text-base md:text-lg text-muted leading-relaxed max-w-3xl mb-10">
            {project.impact}
          </p>

          {/* CTA Buttons */}
          <div className="hero-anim flex flex-wrap items-center gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent-glow inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider px-6 py-3 rounded-full hover:-translate-y-[2px] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
            >
              <ExternalLink size={15} />
              Live Site
            </a>
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-text border border-border px-6 py-3 rounded-full hover:border-accent hover:text-accent hover:bg-accent/5 hover:-translate-y-[2px] transition-all duration-200"
            >
              <Code size={15} />
              View Code
            </a>
          </div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div ref={containerRef} className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* ── Left Column (main) ──────────────────────────────────────── */}
        <div className="lg:col-span-2 flex flex-col gap-14">

          {/* Screenshot Gallery */}
          <div className="reveal-item">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted mb-4 block">Screenshots</span>
            <FullscreenSlider images={project.images} title={project.title} fallbackImage={project.image} />
          </div>

          {/* About the Project */}
          {project.description && (
            <SectionBlock icon={Zap} label="About the Project" accent>
              <p className="text-text/80 leading-relaxed text-sm md:text-base">{project.description}</p>
            </SectionBlock>
          )}

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <SectionBlock icon={CheckCircle2} label="Key Features" accent>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 group">
                    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <CheckCircle2 size={11} className="text-accent" />
                    </span>
                    <span className="text-sm text-muted group-hover:text-text transition-colors duration-200 leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            </SectionBlock>
          )}

          {/* Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <SectionBlock icon={AlertTriangle} label="Challenges & Solutions">
              <ul className="flex flex-col gap-4">
                {project.challenges.map((ch, i) => (
                  <li key={i} className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-border hover:border-accent/30 transition-colors duration-300">
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-[10px] font-bold text-accent">
                      {i + 1}
                    </span>
                    <span className="text-sm text-muted leading-relaxed">{ch}</span>
                  </li>
                ))}
              </ul>
            </SectionBlock>
          )}

          {/* Outcome */}
          {project.outcome && (
            <SectionBlock icon={TrendingUp} label="Outcome & Impact" accent>
              <div className="p-6 rounded-2xl bg-accent/5 border border-accent/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-2xl rounded-full pointer-events-none" />
                <p className="text-sm md:text-base text-text/90 leading-relaxed relative z-10">{project.outcome}</p>
              </div>
            </SectionBlock>
          )}
        </div>

        {/* ── Right Column (sidebar) ───────────────────────────────────── */}
        <div className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">

          {/* Tech Stack */}
          <div className="reveal-item p-6 rounded-2xl bg-surface border border-border">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted mb-4 block">Tech Stack</span>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1.5 rounded-xl border border-white/5 bg-gradient-to-br from-[#1c1c1c] to-[#0d0d0d] text-muted hover:text-accent hover:border-[#7C5CFF]/40 shadow-[2px_2px_5px_rgba(0,0,0,0.5),inset_1px_1px_2px_rgba(255,255,255,0.05),inset_-1px_-1px_2px_rgba(0,0,0,0.7)] transition-all duration-300 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="reveal-item p-6 rounded-2xl bg-surface border border-border flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted mb-1 block">Links</span>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-accent/40 hover:bg-accent/5 transition-all duration-200 group"
            >
              <ExternalLink size={15} className="text-accent shrink-0" />
              <div>
                <p className="text-xs font-semibold text-text group-hover:text-accent transition-colors duration-200">Live Site</p>
                <p className="text-[11px] text-muted truncate max-w-[160px]">{project.liveUrl}</p>
              </div>
            </a>
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-accent/40 hover:bg-accent/5 transition-all duration-200 group"
            >
              <Code size={15} className="text-muted shrink-0 group-hover:text-accent transition-colors duration-200" />
              <div>
                <p className="text-xs font-semibold text-text group-hover:text-accent transition-colors duration-200">Code Repository</p>
                <p className="text-[11px] text-muted truncate max-w-[160px]">{project.codeUrl}</p>
              </div>
            </a>
          </div>

          {/* Project meta */}
          <div className="reveal-item p-6 rounded-2xl bg-surface border border-border flex flex-col gap-4 text-sm">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted block">Project Info</span>
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-[11px] text-muted uppercase tracking-widest mb-0.5">Type</p>
                <p className="text-text font-medium">{project.type}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted uppercase tracking-widest mb-0.5">Timeline</p>
                <p className="text-text font-medium">{project.date}</p>
              </div>
              {project.role && (
                <div>
                  <p className="text-[11px] text-muted uppercase tracking-widest mb-0.5">Role</p>
                  <p className="text-text font-medium">{project.role}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Project Navigation ─────────────────────────────────────────── */}
      <div className="border-t border-border bg-surface/30">
        <div className="max-w-5xl mx-auto px-6 py-10 flex items-center justify-between gap-6">
          {prevProject ? (
            <Link
              to={`/proof-of-work/${prevProject.id}`}
              className="group flex items-center gap-3 text-left max-w-[45%]"
            >
              <div className="shrink-0 p-2.5 rounded-full border border-border group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-200">
                <ChevronLeft size={16} className="text-muted group-hover:text-accent transition-colors duration-200" />
              </div>
              <div>
                <p className="text-[11px] text-muted uppercase tracking-widest mb-0.5">Previous</p>
                <p className="text-sm font-semibold text-text group-hover:text-accent transition-colors duration-200 line-clamp-1">{prevProject.title}</p>
              </div>
            </Link>
          ) : <div />}

          {nextProject ? (
            <Link
              to={`/proof-of-work/${nextProject.id}`}
              className="group flex items-center gap-3 text-right max-w-[45%] ml-auto"
            >
              <div>
                <p className="text-[11px] text-muted uppercase tracking-widest mb-0.5">Next</p>
                <p className="text-sm font-semibold text-text group-hover:text-accent transition-colors duration-200 line-clamp-1">{nextProject.title}</p>
              </div>
              <div className="shrink-0 p-2.5 rounded-full border border-border group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-200">
                <ChevronRight size={16} className="text-muted group-hover:text-accent transition-colors duration-200" />
              </div>
            </Link>
          ) : <div />}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectPage;
