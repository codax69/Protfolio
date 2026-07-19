import { useRef, useState, useEffect } from 'react';
import { projectsData } from '../../data/projects';
import DepthCard from '../ui/DepthCard';
import { ExternalLink, Code, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollReveal } from '../../animations/useScrollReveal';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../animations/gsapConfig';

const ImageWithFallback = ({ src, alt, className }) => {
  const [hasError, setHasError] = useState(false);
  if (hasError) {
    return <div className="absolute inset-0 flex items-center justify-center bg-surface text-xs text-muted font-mono uppercase tracking-wider">{alt}</div>;
  }
  return <img src={src} alt={alt} className={className} onError={() => setHasError(true)} />;
};

// Controlled autoplay slideshow screenshot component with navigation arrows
const ProjectImageSlider = ({ images, title, fallbackImage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);
  const timerRef = useRef(null);

  const totalSlides = images ? images.length : 0;

  // Autoplay function
  const startAutoplay = () => {
    stopAutoplay();
    if (totalSlides <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 4000); // Transition to next slide every 4 seconds
  };

  const stopAutoplay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // GSAP slide animation
  useGSAP(() => {
    if (!trackRef.current || totalSlides <= 1) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(trackRef.current, { xPercent: -currentIndex * (100 / totalSlides) });
      return;
    }

    gsap.to(trackRef.current, {
      xPercent: -currentIndex * (100 / totalSlides),
      duration: 0.6,
      ease: "power2.out"
    });
  }, [currentIndex, totalSlides]);

  // Autoplay lifecycle mounting
  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [totalSlides]);

  // Arrow controls (resets autoplay interval)
  const handleNext = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    startAutoplay();
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    startAutoplay();
  };

  // Fallback for missing images
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
      {/* Sliding Track */}
      <div 
        ref={trackRef} 
        className="flex h-full select-none" 
        style={{ width: `${totalSlides * 100}%` }}
      >
        {images.map((imgSrc, idx) => (
          <div key={idx} className="h-full relative flex-shrink-0" style={{ width: `${100 / totalSlides}%` }}>
            <img
              src={imgSrc}
              alt={`${title} screenshot ${idx + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.className = 'absolute inset-0 flex items-center justify-center bg-surface text-xs text-muted font-mono uppercase tracking-wider';
                fallback.textContent = `${title} Slide ${idx + 1}`;
                e.target.parentNode.appendChild(fallback);
              }}
            />
          </div>
        ))}
      </div>

      {/* Left Navigation Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 bg-base/85 backdrop-blur-sm border border-border text-text rounded-full opacity-0 group-hover/slider:opacity-100 hover:bg-accent hover:border-accent hover:text-base hover:scale-105 transition-all duration-200 cursor-pointer select-none"
        aria-label="Previous screenshot"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Right Navigation Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 bg-base/85 backdrop-blur-sm border border-border text-text rounded-full opacity-0 group-hover/slider:opacity-100 hover:bg-accent hover:border-accent hover:text-base hover:scale-105 transition-all duration-200 cursor-pointer select-none"
        aria-label="Next screenshot"
      >
        <ChevronRight size={16} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-3 right-3 bg-base/80 backdrop-blur-sm border border-border px-2.5 py-1 rounded-md text-[10px] text-muted uppercase font-bold tracking-wider pointer-events-none select-none flex items-center gap-1.5 z-20">
        <span className="text-text">{currentIndex + 1}</span>
        <span>/</span>
        <span>{totalSlides}</span>
      </div>
    </div>
  );
};

const Projects = () => {
  const containerRef = useRef(null);

  // Stagger reveal project cards
  useScrollReveal(containerRef, '.reveal-item', 0.12);

  return (
    <section ref={containerRef} id="projects" className="relative py-24 bg-base border-t border-border overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="mb-12 reveal-item">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">04 / Creations</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl mt-2 tracking-tight">Featured Projects</h2>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {projectsData.map((project, index) => {
            const isFullWidth = index === 2;
            
            return (
              <div
                key={project.id}
                className={`${isFullWidth ? "lg:col-span-12" : "lg:col-span-6"} reveal-item`}
              >
                <DepthCard className="h-full p-0 overflow-hidden">
                  <div className={`flex flex-col ${isFullWidth ? 'lg:flex-row h-full' : ''}`}>
                    
                    {/* Project Image Container */}
                    <div className={`relative bg-surface/50 border-b border-border overflow-hidden ${isFullWidth ? 'lg:w-1/2 lg:border-b-0 lg:border-r' : 'aspect-video'}`}>
                      <ProjectImageSlider
                        images={project.images}
                        title={project.title}
                        fallbackImage={project.image}
                      />
                      <div className="absolute top-4 left-4 bg-base/80 backdrop-blur-sm border border-border px-3 py-1 rounded-full text-xs font-semibold text-accent z-20">
                        {project.type}
                      </div>
                    </div>

                    {/* Project Info Container */}
                    <div className={`p-8 flex flex-col justify-between ${isFullWidth ? 'lg:w-1/2' : 'flex-1'}`}>
                      <div>
                        {/* Title & Date */}
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="font-display font-bold text-2xl text-text leading-tight">
                            {project.title}
                          </h3>
                          <span className="text-xs font-medium text-muted bg-base/50 border border-border px-2.5 py-1 rounded-full whitespace-nowrap">
                            {project.date}
                          </span>
                        </div>

                        {/* Impact Statement */}
                        <p className="text-sm md:text-base text-muted font-light leading-relaxed mb-6">
                          {project.impact}
                        </p>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.tech.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-xs px-2.5 py-1 rounded-md border border-border bg-base/30 text-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-4 border-t border-border pt-6 mt-auto">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm font-semibold text-text hover:text-accent transition-colors duration-200"
                        >
                          <ExternalLink size={16} />
                          <span>Live Site</span>
                        </a>
                        <a
                          href={project.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm font-semibold text-muted hover:text-text transition-colors duration-200"
                        >
                          <Code size={16} />
                          <span>Code Repository</span>
                        </a>
                      </div>
                    </div>

                  </div>
                </DepthCard>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default Projects;
