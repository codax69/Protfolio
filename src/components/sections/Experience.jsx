import { useRef } from 'react';
import { experienceData } from '../../data/experience';
import DepthCard from '../ui/DepthCard';
import { Calendar, ExternalLink, ShieldCheck } from 'lucide-react';
import { useScrollReveal } from '../../animations/useScrollReveal';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../animations/gsapConfig';

const Experience = () => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const progressBarRef = useRef(null);

  // Stagger timeline nodes
  useScrollReveal(containerRef, '.reveal-item', 0.1);

  // Animate the timeline progress bar on scroll (scrubbing)
  useGSAP(() => {
    if (!progressBarRef.current || !timelineRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(progressBarRef.current, { scaleY: 1 });
      return;
    }

    gsap.fromTo(progressBarRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 75%",
          end: "bottom 70%",
          scrub: 0.5
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="experience" className="relative py-24 bg-base border-t border-border overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="mb-12 reveal-item">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">History</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl mt-2 tracking-tight">Experience</h2>
        </div>

        {/* Timeline container */}
        <div ref={timelineRef} className="relative max-w-4xl border-l border-border pl-6 ml-4 md:pl-8 md:ml-8 flex flex-col gap-12">
          
          {/* Vertical scroll progress indicator */}
          <div
            ref={progressBarRef}
            className="absolute top-0 left-0 w-[2px] bg-accent origin-top h-full scale-y-0"
            style={{ left: '-1px' }} // Center exactly on the border-l
          />

          {experienceData.map((exp, index) => (
            <div key={index} className="relative group reveal-item">
              {/* Timeline marker */}
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-border bg-base group-hover:border-accent transition-colors duration-300 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-accent transition-colors duration-300" />
              </div>

              {/* Content Card */}
              <DepthCard className="p-8">
                {/* Meta details */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="font-display font-bold text-xl text-text">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-medium text-muted">{exp.company}</span>
                      <span className="text-border">•</span>
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-accent hover:underline font-semibold"
                      >
                        {exp.link.replace('https://', '')}
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold text-muted bg-base border border-border px-3 py-1.5 rounded-full self-start md:self-center">
                    <Calendar size={14} className="text-accent" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="flex flex-col gap-3 text-muted text-sm md:text-base font-light leading-relaxed">
                  {exp.highlights.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex gap-3">
                      <ShieldCheck size={18} className="text-accent shrink-0 mt-0.5" />
                      <span className='text-text'>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </DepthCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
