import { useRef } from 'react';
import { useMagnetic } from '../../animations/useMagnetic';

const MagneticButton = ({ children, className = "", onClick, type = "button" }) => {
  const buttonRef = useRef(null);
  const labelRef = useRef(null);

  // Hook up GSAP magnetic effect
  useMagnetic(buttonRef, labelRef);

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border border-border bg-surface text-text transition-colors hover:border-accent hover:text-white select-none cursor-pointer will-change-transform whitespace-nowrap ${className}`}
    >
      <span ref={labelRef} className="relative z-10 flex items-center gap-2 will-change-transform">
        {children}
      </span>
    </button>
  );
};

export default MagneticButton;
