import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { socialsData } from '../../data/socials';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Code", href: "#github" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" }
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl z-50 rounded-full transition-all duration-300 bg-gradient-to-br from-[#141414]/85 to-[#0A0A0A]/95 border border-[#7C5CFF]/15 shadow-[8px_8px_24px_rgba(0,0,0,0.6),inset_3px_3px_6px_rgba(255,255,255,0.04),inset_-4px_-4px_8px_rgba(0,0,0,0.8),inset_0_0_10px_rgba(124,92,255,0.1)] ${
        isSticky
          ? 'fixed top-4 animate-slide-down'
          : 'absolute top-4'
      }`}
    >
      <div className="px-6 h-16 flex items-center justify-between">
        {/* Logo/Name */}
        <a href="#hero" className="font-display font-bold text-xl tracking-wider text-text flex items-center gap-1 group transition-[text-shadow] duration-300 hover:[text-shadow:0_0_8px_rgba(124,92,255,0.55)]">
          <span>PRITESH</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-150 transition-transform duration-300"></span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium tracking-wide text-muted hover:text-text transition-all duration-300 hover:-translate-y-[1.5px] relative inline-block after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 hover:after:origin-bottom-left"
            >
              {link.name}
            </a>
          ))}
          <a
            href={socialsData.resumeUrl}
            download
            className="text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full inline-flex items-center justify-center bg-accent text-[#0A0A0A] border border-white/20 shadow-[0_6px_16px_rgba(124,92,255,0.3),inset_2.5px_2.5px_5px_rgba(255,255,255,0.35),inset_-2.5px_-2.5px_5px_rgba(0,0,0,0.35)] hover:bg-[#8b6eff] hover:-translate-y-[1.5px] hover:scale-[1.03] hover:shadow-[0_10px_20px_rgba(124,92,255,0.45),inset_3px_3px_6px_rgba(255,255,255,0.4),inset_-3px_-3px_6px_rgba(0,0,0,0.3)] active:scale-[0.97] active:translate-y-0 active:shadow-[0_4px_10px_rgba(124,92,255,0.25),inset_1.5px_1.5px_3px_rgba(255,255,255,0.2),inset_-1.5px_-1.5px_3px_rgba(0,0,0,0.4)] transition-all duration-300"
          >
            Resume
          </a>
        </div>

        {/* Mobile Navigation Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-text p-2 hover:bg-surface rounded-full transition-transform hover:scale-110 active:scale-90 duration-300"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden absolute top-[calc(100%+0.5rem)] left-0 w-full bg-gradient-to-br from-[#141414]/85 to-[#0A0A0A]/95 border border-[#7C5CFF]/15 shadow-[8px_8px_24px_rgba(0,0,0,0.6),inset_3px_3px_6px_rgba(255,255,255,0.04),inset_-4px_-4px_8px_rgba(0,0,0,0.8),inset_0_0_10px_rgba(124,92,255,0.1)] rounded-2xl z-50">
          <div className="px-6 py-6 flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="text-base font-medium text-muted hover:text-text transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <a
              href={socialsData.resumeUrl}
              download
              onClick={handleLinkClick}
              className="text-center font-semibold uppercase tracking-wider py-2.5 rounded-xl inline-flex items-center justify-center w-full bg-accent text-[#0A0A0A] border border-white/20 shadow-[0_6px_16px_rgba(124,92,255,0.3),inset_2.5px_2.5px_5px_rgba(255,255,255,0.35),inset_-2.5px_-2.5px_5px_rgba(0,0,0,0.35)] hover:bg-[#8b6eff] hover:-translate-y-[1.5px] hover:scale-[1.03] hover:shadow-[0_10px_20px_rgba(124,92,255,0.45),inset_3px_3px_6px_rgba(255,255,255,0.4),inset_-3px_-3px_6px_rgba(0,0,0,0.3)] active:scale-[0.97] active:translate-y-0 active:shadow-[0_4px_10px_rgba(124,92,255,0.25),inset_1.5px_1.5px_3px_rgba(255,255,255,0.2),inset_-1.5px_-1.5px_3px_rgba(0,0,0,0.4)] transition-all duration-300"
            >
              Download Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
