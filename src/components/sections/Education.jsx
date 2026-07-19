import React, { useRef } from 'react';
import { Calendar } from 'lucide-react';
import { useScrollReveal } from '../../animations/useScrollReveal';

const Education = () => {
  const containerRef = useRef(null);

  // Stagger reveal education nodes
  useScrollReveal(containerRef, '.reveal-item', 0.12);

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
    <section ref={containerRef} id="education" className="py-24 bg-base border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="mb-12 reveal-item">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">05 / Academics</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl mt-2 tracking-tight">Education</h2>
        </div>

        {/* Minimal Timeline */}
        <div className="max-w-3xl relative border-l border-border pl-6 ml-4 md:pl-8 md:ml-8 flex flex-col gap-8">
          {educationData.map((edu, index) => (
            <div key={index} className="relative group reveal-item">
              {/* Marker */}
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-border bg-base group-hover:border-accent transition-colors duration-300 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-accent transition-colors duration-300" />
              </div>

              {/* Card Details */}
              <div className="bg-surface/30 border border-border p-6 rounded-xl hover:border-accent/40 transition-colors duration-300">
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
