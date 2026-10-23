import { socialsData } from '../../data/socials';
import { Github, Linkedin, Mail, Phone, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Side */}
        <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
          <p className="font-display font-bold text-lg text-text tracking-wider">
            PRITESH PATEL
          </p>
          <p className="text-xs text-muted">
            Full Stack Developer — MERN Stack
          </p>
        </div>

        {/* Center - Contacts and Socials */}
        <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-muted">
          <a
            href={`mailto:${socialsData.email}`}
            className="flex items-center gap-2 hover:text-text transition-colors duration-200"
          >
            <Mail size={16} />
            <span>{socialsData.email}</span>
          </a>
          <a
            href={`tel:${socialsData.phone}`}
            className="flex items-center gap-2 hover:text-text transition-colors duration-200"
          >
            <Phone size={16} />
            <span>{socialsData.phoneFormatted}</span>
          </a>
          <div className="flex items-center gap-4">
            <a
              href={socialsData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href={socialsData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-center md:items-end gap-2 text-xs text-muted text-center md:text-right">
          <p>© {currentYear} Pritesh Patel. All rights reserved.</p>
          <a
            href="#hero"
            className="flex items-center gap-1 hover:text-text transition-colors duration-200 group"
          >
            <span>Back to top</span>
            <ArrowUp size={12} className="group-hover:-translate-y-1 transition-transform duration-200" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
