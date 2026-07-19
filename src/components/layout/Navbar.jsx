import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { socialsData } from '../../data/socials';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-base/80 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo/Name */}
        <a href="#hero" className="font-display font-bold text-xl tracking-wider text-text flex items-center gap-1 group">
          <span>PRITESH</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-150 transition-transform duration-300"></span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium tracking-wide text-muted hover:text-text transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
          <a
            href={socialsData.resumeUrl}
            download
            className="text-xs font-semibold uppercase tracking-wider bg-accent text-base px-5 py-2.5 rounded-full hover:bg-accent/80 transition-colors duration-200"
          >
            Resume
          </a>
        </div>

        {/* Mobile Navigation Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-text p-2 hover:bg-surface rounded-full transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-surface border-b border-border shadow-xl">
          <div className="px-6 py-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="text-lg font-medium text-muted hover:text-text transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <a
              href={socialsData.resumeUrl}
              download
              onClick={handleLinkClick}
              className="text-center font-semibold uppercase tracking-wider bg-accent text-base py-3 rounded-xl hover:bg-accent/80 transition-colors duration-200"
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
