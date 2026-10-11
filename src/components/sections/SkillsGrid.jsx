import { useRef } from 'react';
import { skillsData } from '../../data/skills';
import { Code, Server, Database, Cloud, Repeat, ShieldCheck, Cpu } from 'lucide-react';
import { useScrollReveal } from '../../animations/useScrollReveal';
import { GlowingCards, GlowingCard } from "@/components/lightswind/glowing-cards"

const SkillsGrid = () => {
  const containerRef = useRef(null);

  // Stagger reveal on the bento tiles
  useScrollReveal(containerRef, '.reveal-item', 0.08);

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return <Code size={20} className="text-accent" />;
      case 'backend':
        return <Server size={20} className="text-accent" />;
      case 'database':
        return <Database size={20} className="text-accent" />;
      case 'devops & infrastructure':
      case 'devops/infra':
        return <Cloud size={20} className="text-accent" />;
      case 'ci/cd':
        return <Repeat size={20} className="text-accent" />;
      case 'integrations':
        return <Cpu size={20} className="text-accent" />;
      default:
        return <ShieldCheck size={20} className="text-accent" />;
    }
  };

  const getColSpan = (index) => {
    if (index === 0) return "lg:col-span-8";
    if (index === 1) return "lg:col-span-4";
    if (index === 2) return "lg:col-span-4";
    if (index === 3) return "lg:col-span-8";
    if (index === 4) return "lg:col-span-4";
    if (index === 5) return "lg:col-span-4";
    if (index === 6) return "lg:col-span-4";
    return "lg:col-span-4";
  };

  return (
    <section ref={containerRef} id="skills" className="relative py-24 bg-base border-t border-border overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="mb-12 reveal-item">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Competencies</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl mt-2 tracking-tight">Skills & Tech Stack</h2>
          <p className="text-muted text-sm md:text-base mt-2 max-w-xl">
            Core technologies and tools powering my full stack MERN and modern web development workflow.
          </p>
        </div>

        {/* Bento Grid Layout using GlowingCards */}
        <GlowingCards
          layout="grid"
          gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6"
          glowRadius={12}
          glowOpacity={0.8}
          padding="0"
          gap="1.5rem"
          maxWidth="100%"
        >
          {skillsData.map((item, index) => (
            <GlowingCard
              key={index}
              glowColor="#7C5CFF"
              className={`${getColSpan(index)} flex flex-col justify-between min-h-[160px] reveal-item`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-lg tracking-wide text-text">
                    {item.category}
                  </h3>
                  <div className="p-2 bg-base border border-border rounded-xl">
                    {getCategoryIcon(item.category)}
                  </div>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2.5">
                  {item.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-xs px-3 py-1.5 rounded-xl border border-white/5 bg-gradient-to-br from-[#1c1c1c] to-[#0d0d0d] text-muted hover:text-accent hover:border-[#7C5CFF]/40 shadow-[2px_2px_5px_rgba(0,0,0,0.5),inset_1px_1px_2px_rgba(255,255,255,0.05),inset_-1px_-1px_2px_rgba(0,0,0,0.7)] hover:shadow-[4px_4px_10px_rgba(124,92,255,0.15),inset_1.5px_1.5px_3px_rgba(255,255,255,0.08),inset_-1.5px_-1.5px_3px_rgba(0,0,0,0.7)] transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </GlowingCard>
          ))}
        </GlowingCards>
      </div>
    </section>
  );
};

export default SkillsGrid;
