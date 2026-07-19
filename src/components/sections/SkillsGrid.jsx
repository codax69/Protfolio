import { useRef } from 'react';
import { skillsData } from '../../data/skills';
import DepthCard from '../ui/DepthCard';
import { Code, Server, Database, Cloud, Repeat, ShieldCheck, Cpu } from 'lucide-react';
import { useScrollReveal } from '../../animations/useScrollReveal';

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
    <section ref={containerRef} id="skills" className="py-24 bg-base border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="mb-12 reveal-item">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">02 / Competencies</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl mt-2 tracking-tight">Skills & Tech Stack</h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {skillsData.map((item, index) => (
            <DepthCard
              key={index}
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
                      className="text-xs px-3 py-1.5 rounded-lg border border-border bg-base/50 text-muted hover:border-accent hover:text-text transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </DepthCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsGrid;
