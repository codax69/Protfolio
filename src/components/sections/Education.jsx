import React, { useRef } from 'react';
import { Calendar } from 'lucide-react';
import { useScrollReveal } from '../../animations/useScrollReveal';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../animations/gsapConfig';

const Education = () => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const progressBarRef = useRef(null);

  // Stagger reveal education nodes
  useScrollReveal(containerRef, '.reveal-item', 0.12);

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
          start: "top 80%",
          end: "bottom 70%",
          scrub: 0.5
        }
      }
    );
  }, { scope: containerRef });

  const educationData = [
    {
      institution: "State Polytechnic",
      degree: "Diploma in Information Technology",
      year: "2026(Pursuing)",
      details: "In-depth study of software engineering principles, database systems, object-oriented programming, and computer networks."
    },
    {
      institution: "ITI Pardi",
      degree: "ICTSM (Information & Communication Technology System Maintenance)",
      year: "2025",
      details: "Focus on networking, hardware maintenance, software systems administration, and fundamental IT operations."
    },
    {
      institution: "GSHSEB",
      degree: "10th Standard Secondary Education",
      year: "2020",
      details: "Secondary education board studies with foundation in Mathematics, Science, and computer basics."
    }
  ];

  return (
    <section ref={containerRef} id="education" className="relative py-24 bg-base border-t border-border overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="mb-12 reveal-item">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Academics</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl mt-2 tracking-tight">Education</h2>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="max-w-3xl relative border-l border-border pl-6 ml-4 md:pl-8 md:ml-8 flex flex-col gap-8">
          
          {/* Vertical scroll progress indicator */}
          <div
            ref={progressBarRef}
            className="absolute top-0 left-0 w-[2px] bg-accent origin-top h-full scale-y-0"
            style={{ left: '-1px' }} // Center exactly on the border-l
          />

          {educationData.map((edu, index) => (
            <div key={index} className="relative group reveal-item">
              {/* Marker */}
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-border bg-base group-hover:border-accent transition-colors duration-300 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-accent transition-colors duration-300" />
              </div>

              {/* Card Details */}
              <div className="bg-gradient-to-br from-[#141414]/85 to-[#0A0A0A]/95 border border-[#7C5CFF]/15 shadow-[8px_8px_24px_rgba(0,0,0,0.6),inset_3px_3px_6px_rgba(255,255,255,0.04),inset_-4px_-4px_8px_rgba(0,0,0,0.8),inset_0_0_10px_rgba(124,92,255,0.1)] hover:border-[#7C5CFF]/40 hover:shadow-[12px_12px_32px_rgba(124,92,255,0.15),inset_4px_4px_8px_rgba(255,255,255,0.06),inset_-5px_-5px_10px_rgba(0,0,0,0.85),inset_0_0_15px_rgba(124,92,255,0.25)] transition-all duration-400 ease-out p-6 rounded-[24px]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-display font-bold text-lg text-text">
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-muted mt-0.5">{edu.institution}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-muted bg-base border border-border px-3 py-1 rounded-full self-start md:self-center">
                    <Calendar size={12} className="text-accent" />
                    <span>{edu.year}</span>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-muted font-light leading-relaxed">
                  {edu.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
