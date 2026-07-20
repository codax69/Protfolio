import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../animations/gsapConfig';
import { useScrollReveal } from '../../animations/useScrollReveal';
import {
  MapPin, Briefcase, ArrowRight,
  Coffee, Zap, Target, Globe
} from 'lucide-react';
import { scrollToSection } from '../../lib/lenis';
import { socialsData } from '../../data/socials';

/* ─── helpers ──────────────────────────────────────────────── */

/** Animated dot-matrix canvas */
const DotMatrix = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const GAP = 24;          // px between dot centres
    const RADIUS = 1.5;      // dot radius
    const COLOR = '124,92,255'; // accent RGB
    let raf;
    let t = 0;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = Math.ceil(canvas.width  / GAP) + 1;
      const rows = Math.ceil(canvas.height / GAP) + 1;
      const cx = canvas.width  / 2;
      const cy = canvas.height / 2;
      const maxDist = Math.hypot(cx, cy);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * GAP;
          const y = r * GAP;
          const dist = Math.hypot(x - cx, y - cy);
          const norm = dist / maxDist;                          // 0 (centre) → 1 (corner)
          // Wave phase: ripple outward from centre
          const wave = prefersReduced ? 0 : Math.sin(t * 0.8 - dist * 0.018) * 0.5;
          const alpha = Math.max(0, (0.18 - norm * 0.14) + wave * 0.06);
          ctx.beginPath();
          ctx.arc(x, y, RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${COLOR},${alpha.toFixed(3)})`;
          ctx.fill();
        }
      }
      t++;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

/** Marquee strip of tech badges that scroll infinitely */
const TechMarquee = () => {
  const trackRef = useRef(null);

  const techs = [
    'React.js', 'Node.js', 'MongoDB', 'Express.js',
    'Tailwind CSS', 'GSAP', 'Linux VPS', 'Nginx',
    'Docker', 'GitHub Actions', 'Razorpay', 'Cloudinary',
  ];
  const doubled = [...techs, ...techs];

  useGSAP(() => {
    if (!trackRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.to(trackRef.current, {
      xPercent: -50,
      ease: 'none',
      duration: 24,
      repeat: -1,
    });
  }, { scope: trackRef });

  return (
    <div className="overflow-hidden w-full py-1 mask-fade-x">
      <div ref={trackRef} className="flex gap-3 w-max">
        {doubled.map((t, i) => (
          <span
            key={i}
            className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-white/5 bg-gradient-to-br from-[#1c1c1c] to-[#0d0d0d] text-muted hover:text-accent hover:border-[#7C5CFF]/40 shadow-[2px_2px_5px_rgba(0,0,0,0.5),inset_1px_1px_2px_rgba(255,255,255,0.05),inset_-1px_-1px_2px_rgba(0,0,0,0.7)] transition-all duration-300 cursor-default"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

/** A single quick-fact card with lift + icon pop on hover */
const FactCard = ({ icon: Icon, label, value, sub }) => {
  const cardRef = useRef(null);
  const iconRef = useRef(null);

  useGSAP(() => {
    const card = cardRef.current;
    const icon = iconRef.current;
    if (!card || !icon) return;

    const isHoverable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isHoverable || prefersReduced) return;

    const onEnter = () => {
      gsap.to(card, { y: -4, duration: 0.3, ease: 'power2.out' });
      gsap.to(icon, { scale: 1.2, rotate: 10, duration: 0.3, ease: 'back.out(2)' });
    };
    const onLeave = () => {
      gsap.to(card, { y: 0, duration: 0.4, ease: 'power2.out' });
      gsap.to(icon, { scale: 1, rotate: 0, duration: 0.4, ease: 'elastic.out(1,0.4)' });
    };

    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      className="relative flex items-start gap-4 bg-gradient-to-br from-[#141414]/85 to-[#0A0A0A]/95 border border-[#7C5CFF]/15 shadow-[8px_8px_24px_rgba(0,0,0,0.6),inset_3px_3px_6px_rgba(255,255,255,0.04),inset_-4px_-4px_8px_rgba(0,0,0,0.8),inset_0_0_10px_rgba(124,92,255,0.1)] hover:border-[#7C5CFF]/40 hover:shadow-[12px_12px_32px_rgba(124,92,255,0.15),inset_4px_4px_8px_rgba(255,255,255,0.06),inset_-5px_-5px_10px_rgba(0,0,0,0.85),inset_0_0_15px_rgba(124,92,255,0.25)] transition-all duration-400 ease-out rounded-[24px] p-5 cursor-default overflow-hidden group"
    >
      {/* Glow bleed */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div
        ref={iconRef}
        className="p-2.5 bg-base border border-border rounded-xl text-accent will-change-transform shrink-0"
      >
        <Icon size={18} />
      </div>

      <div className="relative z-10">
        <p className="text-[10px] text-muted font-semibold uppercase tracking-widest">{label}</p>
        <p className="text-sm font-bold text-text mt-0.5 leading-snug">{value}</p>
        {sub && <p className="text-xs text-muted font-light mt-0.5">{sub}</p>}
      </div>
    </div>
  );
};

/** Animated paragraph that reveals on scroll */
const AnimatedPara = ({ children, delay = 0 }) => {
  const ref = useRef(null);

  useGSAP(() => {
    if (!ref.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: prefersReduced ? 0 : 28 },
      {
        opacity: 1, y: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          once: true,
        },
      }
    );
  }, { scope: ref });

  return (
    <p ref={ref} className="text-muted text-base md:text-lg font-light leading-relaxed opacity-0">
      {children}
    </p>
  );
};

/* ─── main component ───────────────────────────────────────── */
const About = () => {
  const containerRef = useRef(null);
  const avatarRef    = useRef(null);
  const glowRef      = useRef(null);

  useScrollReveal(containerRef, '.reveal-item', 0.1);

  /* Floating avatar bob */
  useGSAP(() => {
    if (!avatarRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.to(avatarRef.current, {
      y: -10,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }, { scope: avatarRef });

  /* Glow orb follows mouse inside the panel */
  const handleMouseMove = (e) => {
    if (!glowRef.current || !containerRef.current) return;
    const isHoverable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isHoverable) return;
    const rect = containerRef.current.getBoundingClientRect();
    gsap.to(glowRef.current, {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      duration: 1.2,
      ease: 'power3.out',
    });
  };

  const quickFacts = [
    {
      icon: MapPin,
      label: 'Location',
      value: 'Surat, Gujarat, India',
      sub: 'Open to remote & on-site roles',
    },
    {
      icon: Briefcase,
      label: 'Availability',
      value: 'Open to Fresher / Junior Roles',
      sub: 'Freelance projects welcomed too',
    },
    {
      icon: Zap,
      label: 'Focus',
      value: 'Production-grade MERN Apps',
      sub: 'End-to-end: design → deploy',
    },
    {
      icon: Coffee,
      label: 'Work Style',
      value: 'Self-taught & Autonomous',
      sub: 'Shipped 3+ real-world products',
    },
  ];

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative py-28 bg-base border-t border-border overflow-hidden"
      onMouseMove={handleMouseMove}
    >

      {/* Dot matrix animated backdrop */}
      <DotMatrix />



      {/* Mouse-chasing glow orb */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute w-[480px] h-[480px] rounded-full
                   bg-accent/6 blur-3xl -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{ left: 0, top: 0 }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Section heading ── */}
        <div className="mb-16 reveal-item">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            Profile
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl mt-2 tracking-tight">
            About Me
          </h2>
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-16 items-start">

          {/* ─── Left: avatar + identity card ─── */}
          <div className="xl:col-span-4 reveal-item flex flex-col gap-6">

            {/* Identity card */}
            <div className="relative bg-gradient-to-br from-[#141414]/85 to-[#0A0A0A]/95 border border-[#7C5CFF]/15 shadow-[8px_8px_24px_rgba(0,0,0,0.6),inset_3px_3px_6px_rgba(255,255,255,0.04),inset_-4px_-4px_8px_rgba(0,0,0,0.8),inset_0_0_10px_rgba(124,92,255,0.1)] rounded-3xl p-8 overflow-hidden">
              {/* Background deco */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/8 rounded-bl-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />

              {/* Avatar */}
              <div
                ref={avatarRef}
                className="relative mx-auto mb-6 will-change-transform"
                style={{ width: 'fit-content' }}
              >
                {/* Ring glow */}
                <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl scale-110" />
                <div className="relative w-28 h-28 rounded-full border-2 border-white/20 bg-gradient-to-br from-[#141414] to-[#0A0A0A] p-[3px] shadow-[6px_6px_18px_rgba(0,0,0,0.5),inset_3px_3px_6px_rgba(255,255,255,0.2),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_0_0_10px_rgba(124,92,255,0.25)] overflow-hidden">
                  <img
                    src={`${socialsData.github}.png`}
                    alt="Pritesh Patel"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                {/* Status dot */}
                <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full
                                 border-2 border-surface shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              </div>

              {/* Name + role */}
              <div className="text-center relative z-10">
                <h3 className="font-display font-bold text-2xl text-text tracking-tight">
                  Pritesh Patel
                </h3>
                <p className="text-sm text-accent font-medium mt-1">
                  Full Stack Developer · MERN
                </p>
                <p className="text-xs text-muted font-light mt-3 leading-relaxed max-w-[200px] mx-auto">
                  Building production-grade apps from scratch — solo, fast, and shipped.
                </p>
              </div>

              {/* Divider */}
              <div className="my-6 border-t border-border relative z-10" />

              {/* Key badges */}
              <div className="flex flex-wrap gap-2 justify-center relative z-10">
                {['Self-taught', 'Co-founder', 'Freelancer', 'Open Source'].map((b) => (
                  <span
                    key={b}
                    className="text-[10px] px-2.5 py-1 rounded-full border border-white/5 bg-gradient-to-br from-[#1c1c1c] to-[#0d0d0d] text-muted hover:text-accent hover:border-[#7C5CFF]/40 shadow-[2px_2px_5px_rgba(0,0,0,0.5),inset_1px_1px_2px_rgba(255,255,255,0.05),inset_-1px_-1px_2px_rgba(0,0,0,0.7)] transition-all duration-300 cursor-default"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Tech marquee strip */}
            <div className="bg-gradient-to-br from-[#141414]/85 to-[#0A0A0A]/95 border border-[#7C5CFF]/15 shadow-[8px_8px_24px_rgba(0,0,0,0.6),inset_3px_3px_6px_rgba(255,255,255,0.04),inset_-4px_-4px_8px_rgba(0,0,0,0.8),inset_0_0_10px_rgba(124,92,255,0.1)] rounded-2xl py-4 px-2 overflow-hidden">
              <p className="text-[9px] font-bold uppercase tracking-widest text-muted text-center mb-3">
                Tech I work with
              </p>
              <TechMarquee />
            </div>
          </div>

          {/* ─── Right: narrative + facts ─── */}
          <div className="xl:col-span-8 flex flex-col gap-10">

            {/* Narrative paragraphs */}
            <div className="flex flex-col gap-6">
              <AnimatedPara delay={0}>
                My journey into software development started out of pure curiosity — no bootcamp,
                no formal CS degree. As a{' '}
                <span className="text-text font-medium">self-taught developer</span>, I spent
                countless hours understanding web protocols, systems architecture, and JavaScript
                from the ground up.
              </AnimatedPara>
              <AnimatedPara delay={0.08}>
                Instead of building tutorials, I jumped straight into solving real-world local
                problems. I co-founded{' '}
                <a
                  href="https://vegbazar.store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent font-medium hover:underline inline-flex items-center gap-0.5"
                >
                  VegBazar
                  <ArrowRight size={12} className="inline" />
                </a>
                {' '}— a production MERN grocery platform that scaled to{' '}
                <span className="text-text font-medium">600+ users</span> and{' '}
                <span className="text-text font-medium">1,500+ orders</span>. Every layer —
                API design, database optimisation, VPS deployment, Nginx, SSL — was handled solo.
              </AnimatedPara>
              <AnimatedPara delay={0.16}>
                Following that I took on freelance work for regional businesses: a slot-based car-wash
                booking system, a WhatsApp-integrated product storefront, and a QR attendance system
                adopted by{' '}
                <span className="text-text font-medium">120+ students</span> at an ITI institute. My
                focus is always the same —{' '}
                <span className="text-text font-medium">ship things that work in the real world</span>,
                not just in localhost.
              </AnimatedPara>
            </div>

            {/* Quick-fact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 reveal-item">
              {quickFacts.map((fact, i) => (
                <FactCard key={i} {...fact} />
              ))}
            </div>

            {/* CTA strip */}
            <div className="reveal-item flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => scrollToSection('#projects')}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-[#0A0A0A] border border-white/20 shadow-[0_6px_16px_rgba(124,92,255,0.3),inset_2.5px_2.5px_5px_rgba(255,255,255,0.35),inset_-2.5px_-2.5px_5px_rgba(0,0,0,0.35)] hover:bg-[#8b6eff] hover:-translate-y-[1.5px] hover:scale-[1.03] hover:shadow-[0_10px_20px_rgba(124,92,255,0.45),inset_3px_3px_6px_rgba(255,255,255,0.4),inset_-3px_-3px_6px_rgba(0,0,0,0.3)] active:scale-[0.97] transition-all duration-300 text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                <Target size={14} />
                See my work
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button
                onClick={() => scrollToSection('#contact')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-br from-[#141414]/85 to-[#0A0A0A]/95 border border-[#7C5CFF]/15 shadow-[4px_4px_12px_rgba(0,0,0,0.5),inset_2.5px_2.5px_5px_rgba(255,255,255,0.04),inset_-2.5px_-2.5px_5px_rgba(0,0,0,0.6)] hover:border-[#7C5CFF]/45 hover:text-accent hover:-translate-y-[1.5px] hover:shadow-[6px_6px_16px_rgba(124,92,255,0.15),inset_3px_3px_6px_rgba(255,255,255,0.05),inset_-3px_-3px_6px_rgba(0,0,0,0.6)] active:scale-[0.97] transition-all duration-300 text-xs font-bold uppercase tracking-wider text-muted cursor-pointer"
              >
                <Globe size={14} />
                Get in touch
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
