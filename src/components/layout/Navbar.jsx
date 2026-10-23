import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { socialsData } from '../../data/socials';
import { scrollToSection } from '../../lib/lenis';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

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
    setMounted(true);
    const handleScroll = () => {
      setIsSticky(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className={`left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl z-50 rounded-full transition-all duration-300 premium-card ${
        isSticky
          ? 'fixed top-4 animate-slide-down'
          : 'absolute top-4'
      }`}
    >
      <div className="px-6 h-16 flex items-center justify-between">
        {/* Logo/Name */}
        <a 
          href="#hero" 
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('#hero');
          }}
          className="font-display font-bold text-xl tracking-wider text-text flex items-center gap-1 group transition-[text-shadow] duration-300 hover:[text-shadow:0_0_8px_rgba(124,92,255,0.55)]"
        >
          <span>PRITESH</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-150 transition-transform duration-300"></span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="text-sm font-medium tracking-wide text-muted hover:text-text transition-all duration-300 hover:-translate-y-[1.5px] relative inline-block after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 hover:after:origin-bottom-left"
            >
              {link.name}
            </a>
          ))}
          
          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-muted hover:text-text bg-surface border border-border hover:border-accent rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            {mounted && theme === 'dark' ? <Sun size={15} className="text-accent" /> : <Moon size={15} />}
          </button>

          <a
            href={socialsData.resumeUrl}
            download
            className="btn-accent-glow text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full inline-flex items-center justify-center hover:-translate-y-[1.5px] hover:scale-[1.03] active:scale-[0.97] active:translate-y-0"
          >
            Resume
          </a>
        </div>

        {/* Mobile Navigation Trigger */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-muted hover:text-text bg-surface border border-border hover:border-accent rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            {mounted && theme === 'dark' ? <Sun size={15} className="text-accent" /> : <Moon size={15} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="text-text p-2 hover:bg-surface rounded-full transition-transform hover:scale-110 active:scale-90 duration-300"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden absolute top-[calc(100%+0.5rem)] left-0 w-full premium-card rounded-2xl z-50 animate-fade-in" role="navigation" aria-label="Mobile navigation">
          <div className="px-6 py-6 flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                  handleLinkClick();
                }}
                className="text-base font-medium text-muted hover:text-text transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <a
              href={socialsData.resumeUrl}
              download
              onClick={handleLinkClick}
              className="btn-accent-glow text-center font-semibold uppercase tracking-wider py-2.5 rounded-xl inline-flex items-center justify-center w-full hover:-translate-y-[1.5px] hover:scale-[1.03] active:scale-[0.97] active:translate-y-0"
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

