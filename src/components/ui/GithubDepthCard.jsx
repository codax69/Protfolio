/**
 * GithubDepthCard — Premium 3D hover card, GitHub Showcase only.
 *
 * Inspired by: Apple, Vercel, Linear, Framer, Stripe.
 *
 * Technique:
 *  • pointermove events (not mousemove) for accuracy
 *  • requestAnimationFrame + LERP interpolation — silky 60fps
 *  • Max ±12° tilt on both axes
 *  • Scale 1.03× on hover
 *  • Cursor-chasing radial glare (max ~12% opacity)
 *  • Dynamic accent shadow proportional to tilt magnitude
 *  • Border brightening with #7C5CFF on hover
 *  • Always-on diagonal glass sheen
 *  • Touch / stylus ignored (pointerType guard)
 *  • prefers-reduced-motion: card stays flat, fully usable
 *  • Keyboard focus ring preserved
 *
 * Usage:
 *   <GithubDepthCard className="h-full flex flex-col p-5">
 *     children
 *   </GithubDepthCard>
 *
 * Children can opt into Z-depth layers:
 *   <h2 style={{ transform: 'translateZ(40px)' }}>Title</h2>
 *   <p  style={{ transform: 'translateZ(20px)' }}>Description</p>
 *   <button style={{ transform: 'translateZ(60px)' }}>CTA</button>
 */

import { useRef, useEffect } from 'react';

/* ─── constants ─────────────────────────────────────────────── */
const MAX_TILT  = 12;    // max rotation in degrees (±)
const LERP_F    = 0.09;  // interpolation factor per frame (lower = silkier)
const SCALE_ON  = 1.03;  // hover scale multiplier
const EPSILON   = 0.005; // settle threshold — kill RAF when delta < this

/* ─── GithubDepthCard ─────────────────────────────────────────── */
const GithubDepthCard = ({ children, className = '' }) => {

  const perspRef = useRef(null); // perspective parent wrapper
  const cardRef  = useRef(null); // the tilting card surface
  const glareRef = useRef(null); // cursor-chasing light overlay
  const rafRef   = useRef(null); // requestAnimationFrame ID

  /**
   * All interpolation state is stored as a plain object ref.
   * Mutations never trigger React re-renders — pure perf.
   *
   *  current: rotX, rotY, scale, gX, gY
   *  target:  tRotX, tRotY, tScale, tGX, tGY
   */
  const v = useRef({
    rotX: 0, rotY: 0, scale: 1, gX: 50, gY: 50,
    tRotX: 0, tRotY: 0, tScale: 1, tGX: 50, tGY: 50,
    hovered: false,
  });

  useEffect(() => {
    const persp = perspRef.current;
    const card  = cardRef.current;
    const glare = glareRef.current;
    if (!persp || !card || !glare) return;

    /* ── Accessibility / device capability guards ─────────── */
    const canHover   = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefStatic = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!canHover || prefStatic) {
      glare.style.opacity = '0';
      return; // flat card — keyboard navigation unaffected
    }

    /* ── RAF animation tick ──────────────────────────────────
       Runs only while hovered OR while lerping back to rest.
       Automatically stops when all deltas drop below EPSILON.  */
    const tick = () => {
      const s = v.current;

      // Lerp all six channels toward their targets
      s.rotX  += (s.tRotX  - s.rotX)  * LERP_F;
      s.rotY  += (s.tRotY  - s.rotY)  * LERP_F;
      s.scale += (s.tScale - s.scale) * LERP_F;
      s.gX    += (s.tGX    - s.gX)    * LERP_F;
      s.gY    += (s.tGY    - s.gY)    * LERP_F;

      /* GPU-only card transform — no layout properties touched */
      card.style.transform =
        `rotateX(${s.rotX.toFixed(3)}deg) ` +
        `rotateY(${s.rotY.toFixed(3)}deg) ` +
        `scale(${s.scale.toFixed(4)})`;

      /* Dynamic accent shadow — magnitude drives spread + alpha */
      const mag  = Math.hypot(s.rotX / MAX_TILT, s.rotY / MAX_TILT); // 0..√2
      const sY   = (8  + mag * 22).toFixed(1);
      const sBlr = (20 + mag * 45).toFixed(1);
      const sSpr = (mag * 10).toFixed(1);
      const sAlp = Math.min(0.08 + mag * 0.30, 0.38).toFixed(3);
      card.style.boxShadow =
        `0 ${sY}px ${sBlr}px ${sSpr}px rgba(124,92,255,${sAlp}),` +
        `0 2px 10px rgba(0,0,0,0.35)`;

      /* Border brightens proportionally with tilt magnitude */
      const bAlp = Math.min(0.06 + mag * 0.44, 0.50).toFixed(3);
      card.style.borderColor = `rgba(124,92,255,${bAlp})`;

      /* Glare focal point tracks cursor — updated every frame */
      glare.style.backgroundImage =
        `radial-gradient(` +
          `circle at ${s.gX.toFixed(1)}% ${s.gY.toFixed(1)}%,` +
          `rgba(255,255,255,0.12) 0%,` +
          `rgba(255,255,255,0.04) 40%,` +
          `transparent 70%` +
        `)`;

      /* Settle check — stop RAF loop when animation is at rest */
      const atRest =
        !s.hovered &&
        Math.abs(s.tRotX  - s.rotX)  < EPSILON &&
        Math.abs(s.tRotY  - s.rotY)  < EPSILON &&
        Math.abs(s.tScale - s.scale) < EPSILON;

      if (atRest) {
        rafRef.current         = null;
        card.style.transform   = '';   // revert to CSS defaults
        card.style.boxShadow   = '';
        card.style.borderColor = '';
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    // Idempotent loop starter — never spawns two loops
    const startLoop = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    };

    /* ── Pointer handlers ────────────────────────────────────── */

    const onPointerMove = (e) => {
      // Only fine mouse pointer — silently ignore touch / stylus
      if (e.pointerType !== 'mouse') return;

      const r  = card.getBoundingClientRect();
      // Normalise cursor offset from card centre to [-1, +1]
      const nx = ((e.clientX - r.left) / r.width  - 0.5) * 2;
      const ny = ((e.clientY - r.top)  / r.height - 0.5) * 2;

      v.current.tRotY = nx * MAX_TILT;      // positive nx → tilt right
      v.current.tRotX = -ny * MAX_TILT;     // negative ny → tilt up
      v.current.tGX   = (nx + 1) / 2 * 100; // map to 0–100% for CSS
      v.current.tGY   = (ny + 1) / 2 * 100;

      startLoop();
    };

    const onPointerEnter = (e) => {
      if (e.pointerType !== 'mouse') return;
      v.current.hovered = true;
      v.current.tScale  = SCALE_ON;
      glare.style.opacity = '1'; // CSS transition animates fade-in
      startLoop();
    };

    const onPointerLeave = (e) => {
      if (e.pointerType !== 'mouse') return;
      v.current.hovered = false;
      v.current.tRotX   = 0;   // lerp back to resting pose
      v.current.tRotY   = 0;
      v.current.tScale  = 1;
      v.current.tGX     = 50;  // glare drifts back to centre
      v.current.tGY     = 50;
      glare.style.opacity = '0'; // CSS transition animates fade-out
      startLoop(); // keep loop alive to lerp back to zero
    };

    card.addEventListener('pointermove',  onPointerMove);
    card.addEventListener('pointerenter', onPointerEnter);
    card.addEventListener('pointerleave', onPointerLeave);

    return () => {
      card.removeEventListener('pointermove',  onPointerMove);
      card.removeEventListener('pointerenter', onPointerEnter);
      card.removeEventListener('pointerleave', onPointerLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  /* ── Render ─────────────────────────────────────────────────── */
  return (
    /**
     * perspRef — perspective parent.
     * No overflow:hidden here so the card can scale beyond its own bounds
     * on hover without being clipped.
     */
    <div
      ref={perspRef}
      className="relative h-full"
      style={{ perspective: '1200px' }}
    >
      {/**
       * cardRef — the 3D tilting surface.
       * preserve-3d enables child translateZ depth layers.
       * overflow:hidden clips the sheen + glare to rounded corners.
       *
       * ⚠ Trade-off: overflow:hidden creates a stacking context that
       *   may flatten preserve-3d in some browsers (CSS-Transforms-2 §6).
       *   For tilt-only use (no child Z-depth), this is a non-issue.
       */}
      <div
        ref={cardRef}
        tabIndex={-1}
        className={[
          'relative h-full',
          'bg-gradient-to-br from-[#141414]/85 to-[#0A0A0A]/95 border border-[#7C5CFF]/15 shadow-[8px_8px_24px_rgba(0,0,0,0.6),inset_3px_3px_6px_rgba(255,255,255,0.04),inset_-4px_-4px_8px_rgba(0,0,0,0.8),inset_0_0_10px_rgba(124,92,255,0.1)] hover:border-[#7C5CFF]/40 hover:shadow-[12px_12px_32px_rgba(124,92,255,0.15),inset_4px_4px_8px_rgba(255,255,255,0.06),inset_-5px_-5px_10px_rgba(0,0,0,0.85),inset_0_0_15px_rgba(124,92,255,0.25)] transition-all duration-400 ease-out rounded-[24px] overflow-hidden',
          'will-change-transform',
          // Keyboard focus ring — never interferes with pointer animation
          'focus-within:ring-2 focus-within:ring-accent/40 focus-within:outline-none',
          className,
        ].join(' ')}
        style={{
          transformStyle:  'preserve-3d',
          transformOrigin: 'center center',
        }}
      >

        {/**
         * Layer 1 — always-on diagonal glass sheen.
         * 3% white → transparent from top-left.
         * Gives the card a premium frosted-glass look at rest.
         */}
        <div
          aria-hidden="true"
          style={{
            position:      'absolute',
            inset:         0,
            borderRadius:  'inherit',
            background:    'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 55%)',
            pointerEvents: 'none',
            zIndex:        1,
          }}
        />

        {/**
         * Layer 2 — cursor-chasing glare.
         * backgroundImage updated every RAF frame to track the pointer.
         * opacity controlled by CSS transition for smooth enter / leave.
         * mixBlendMode:screen → purely additive, never darkens the card.
         * Peak effective opacity ≈ 12% — well below the 15% spec limit.
         */}
        <div
          ref={glareRef}
          aria-hidden="true"
          style={{
            position:      'absolute',
            inset:         0,
            borderRadius:  'inherit',
            opacity:       0,
            pointerEvents: 'none',
            zIndex:        2,
            transition:    'opacity 0.35s ease',
            mixBlendMode:  'screen',
          }}
        />

        {/**
         * Layer 3 — content slot.
         * Sits above both decorative layers (z-index: 10).
         */}
        <div className="relative h-full" style={{ zIndex: 10 }}>
          {children}
        </div>

      </div>
    </div>
  );
};

export default GithubDepthCard;
