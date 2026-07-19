# Technical Requirements Document (TRD)
## Pritesh Patel — Developer Portfolio Website

| | |
|---|---|
| **Author** | Pritesh Patel |
| **Doc Type** | TRD (companion to PRD v1.0) |
| **Version** | 1.0 |
| **Date** | July 2026 |

---

## 1. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | React.js (Vite) | Fast dev server, small bundle, no SSR overhead needed for a single-page portfolio |
| Styling | Tailwind CSS | Utility-first, matches existing skillset, fast to keep spacing/grid consistent |
| Animation | GSAP + `@gsap/react` (`useGSAP` hook) + `ScrollTrigger` plugin | Best-in-class scroll-linked and timeline animation control, framerate-stable |
| Scroll experience | Lenis (smooth scroll library) paired with GSAP ScrollTrigger | Makes scroll-linked GSAP animations buttery instead of jumpy on native scroll |
| Icons | lucide-react | Lightweight, consistent stroke-style icons that fit a minimal aesthetic |
| Contact form | EmailJS (client-side) **or** a tiny serverless function (Vercel Function / Node+Express on existing VPS) | No backend needed for v1; EmailJS is fastest, existing Node/Express skillset is the upgrade path |
| Hosting | Vercel (primary) — alternative: existing Linux VPS w/ Nginx + PM2 + SSL (already in his stack) | Vercel = zero-config CI/CD for a Vite SPA; VPS documented as fallback since he already runs that stack for VegBazar |
| CI/CD | GitHub Actions → Vercel auto-deploy on push to `main` | Matches resume's existing GitHub Actions experience |
| Version control | Git/GitHub | — |

---

## 2. Architecture Overview

This is a **static, client-rendered SPA** — no database, no auth, no server-rendered content. All portfolio content (skills, projects, experience) lives in a typed JS/TS config/data file, not hardcoded inline in JSX, so updates don't require touching component logic.

```
Browser
  └── React SPA (Vite build → static HTML/JS/CSS)
        ├── Content data layer (/src/data/*.js)
        ├── UI components (/src/components)
        ├── GSAP animation hooks (/src/animations)
        └── Contact form → EmailJS API (client-side POST) 
                          → (or) Vercel serverless function → SMTP/Resend
```

No backend server is required to run the site. The only outbound network call at runtime is the contact form submission.

---

## 3. Folder Structure

```
portfolio/
├── public/
│   ├── resume.pdf
│   └── og-image.png
├── src/
│   ├── assets/               # images, project screenshots (webp)
│   ├── data/
│   │   ├── skills.js
│   │   ├── projects.js
│   │   ├── experience.js
│   │   └── socials.js
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── SkillsGrid.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Education.jsx
│   │   │   └── Contact.jsx
│   │   └── ui/
│   │       ├── DepthCard.jsx       # reusable layered/tilt card
│   │       ├── MagneticButton.jsx
│   │       └── RevealText.jsx
│   ├── animations/
│   │   ├── useScrollReveal.js
│   │   ├── useMagnetic.js
│   │   └── gsapConfig.js           # registers ScrollTrigger, defaults
│   ├── lib/
│   │   └── lenis.js                # smooth-scroll init
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js
└── vite.config.js
```

---

## 4. Component Breakdown

| Component | Responsibility |
|---|---|
| `Navbar` | Sticky, shrinks on scroll (GSAP), section anchor links, active-section indicator |
| `Hero` | Name/title reveal animation, animated background grid/noise texture, CTA buttons |
| `SkillsGrid` | CSS Grid bento layout; each tile is a `DepthCard` with hover tilt |
| `Projects` | Grid/carousel of `DepthCard`s with image, tags, impact line, live/code links |
| `Experience` | Vertical timeline (VegBazar) with scroll-driven progress line |
| `DepthCard` | Reusable: subtle 3D tilt on mouse move (bounded), layered shadow, glass border |
| `MagneticButton` | CTA buttons that subtly follow cursor within a radius (GSAP `quickTo`) |
| `RevealText` | Splits heading text into chars/words (GSAP `SplitText` or manual split) for staggered reveal |
| `Contact` | Form + validation + EmailJS/serverless submit + success/error state |

---

## 5. Animation & Interaction Spec (GSAP)

This is the core of the "fancy" requirement — details matter here more than anywhere else in the build.

### 5.1 Page load
- Preloader (optional, keep < 1s) or skip straight to Hero
- Hero headline: characters/words animate in with stagger (`opacity`, `y`, slight `rotateX` for subtle 3D pop), `duration: 0.8–1.2s`, `ease: "power4.out"`
- Nav fades/slides in after hero settles

### 5.2 Scroll-triggered reveals (every section)
- `ScrollTrigger` with `start: "top 80%"` — elements fade + rise (`y: 40 → 0`, `opacity: 0 → 1`)
- Stagger children (skills tiles, project cards) by `0.08–0.12s` per item — this is what makes a grid feel "alive" instead of static
- Use `once: true` reveals for content (no re-trigger on scroll-up) to avoid feeling gimmicky

### 5.3 Depth / 3D layering (the "trd" requirement — grid + depth)
- `DepthCard`: on `mousemove`, compute cursor position relative to card center → apply bounded `rotateX`/`rotateY` (max ±6–8°) via GSAP `quickTo` for smooth interpolation, plus a subtle `translateZ`/shadow-intensity change — gives a "lifted" glass-card feel without needing color
- Parallax: background grid pattern or subtle noise texture moves slower than foreground content on scroll (`ScrollTrigger scrub`)
- Section backgrounds use very subtle layered blur/gradient (near-mono, e.g., grayscale radial glow) to create depth without introducing new hues

### 5.4 Micro-interactions
- `MagneticButton`: button + label move fractionally toward cursor within a bounding radius, snap back on `mouseleave` (`gsap.to` + `power3.out`)
- Nav underline / active-state slides between links via GSAP timeline instead of CSS transition, for easing consistency
- Project card image: subtle scale-up (1.0 → 1.04) + shadow deepen on hover

### 5.5 Smooth scroll
- Lenis initialized once in `lib/lenis.js`, synced to GSAP's ticker (`lenis.on('scroll', ScrollTrigger.update)`) so scroll-linked animations stay frame-accurate

### 5.6 Reduced motion
- Wrap all animation initialization in a check for `window.matchMedia('(prefers-reduced-motion: reduce)')` — if true, skip transforms/parallax and show content in final state directly (opacity fade only)

---

## 6. Styling System (Tailwind config)

**Color tokens (minimal palette):**
```js
colors: {
  base: '#0A0A0A',      // near-black background
  surface: '#141414',   // card surface
  border: '#2A2A2A',    // hairline borders
  text: '#EDEDED',      // primary text
  muted: '#8A8A8A',     // secondary text
  accent: '#7C5CFF',    // single accent — used for CTAs, links, glow only
}
```
*(Exact accent hue is a preference call — violet/electric-blue/lime are common "premium dev portfolio" choices; pick one and use it sparingly.)*

**Typography:**
- Display/heading font: a distinctive geometric or grotesk font (e.g., self-hosted variable font) for hero/section titles
- Body font: clean system-adjacent sans (Inter/similar) for readability
- Type scale via Tailwind `fontSize` extension, consistent modular scale (e.g., 1.25 ratio)

**Grid system:**
- Skills & Projects sections use CSS Grid (`grid-template-columns: repeat(12, 1fr)` at desktop) with asymmetric spans for a bento-box feel rather than uniform equal tiles
- Consistent gutter via Tailwind `gap-*` tokens, not custom margins

---

## 7. Responsive Design Strategy

- Mobile-first Tailwind breakpoints: base (mobile) → `md` (tablet) → `lg`/`xl` (desktop)
- Bento grid collapses: 12-col desktop → 2-col tablet → 1-col mobile (stacked, animations simplified to fade+rise only, tilt/magnetic effects disabled on touch devices)
- Detect touch vs pointer (`(hover: hover) and (pointer: fine)`) to conditionally enable tilt/magnetic interactions — these only make sense with a mouse

---

## 8. Performance Optimization

- Code-split heavy sections with `React.lazy` if bundle grows (Projects/Contact)
- Images: `webp`/`avif`, responsive `srcset`, lazy-loaded below the fold
- GSAP: import only needed plugins (`ScrollTrigger`), avoid importing the full GSAP bonus bundle unless `SplitText`/others are actually used
- Limit simultaneous animated elements per viewport (batch `ScrollTrigger` reveals, don't animate everything at once) to keep frame rate at 60fps on mid-range mobile
- Target Lighthouse Performance ≥ 90, even with animation — verify via throttled CPU test in Chrome DevTools

---

## 9. SEO & Meta

- Semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`), one `<h1>` (name), `<h2>` per section
- `<title>` and meta description including name + "Full Stack MERN Developer"
- Open Graph + Twitter card tags with `og-image.png`
- `sitemap.xml` + `robots.txt` (simple, single-page)
- Structured data (`Person` schema via JSON-LD) — helps name/role show correctly if Googled

---

## 10. Deployment & CI/CD

**Primary path (Vercel):**
1. Push to GitHub `main`
2. Vercel auto-builds (`vite build`) and deploys on push — zero config
3. Custom domain + SSL handled by Vercel

**Alternative path (existing VPS skillset — documented for consistency with resume):**
1. GitHub Actions workflow: build on push → `scp`/rsync `dist/` to VPS
2. Nginx serves static `dist/` build, existing SSL/DNS config reused
3. PM2 not required (no Node process needed for a static build) unless a serverless contact endpoint is self-hosted via a small Express server

---

## 11. Accessibility Considerations

- Respect `prefers-reduced-motion` (Section 5.6)
- Color contrast checked against the minimal dark palette (text `#EDEDED` on `#0A0A0A` passes AA/AAA; verify `muted` text against `surface`)
- All interactive elements keyboard-reachable and focus-visible (custom focus ring styled to match minimal aesthetic, not browser default blue)
- `alt` text on all project images
- Form fields properly labeled for screen readers

---

## 12. Third-Party Integrations

- **EmailJS** (or serverless function) for the contact form — no backend DB needed
- **Resume PDF** served as a static asset in `/public`, linked directly (no page navigation)
- **Analytics** (optional, stretch): privacy-friendly option (Plausible/Vercel Analytics) to track section engagement without heavy tracking scripts

---

## 13. Testing Strategy

- Manual cross-browser check (Chrome, Firefox, Safari, Edge) focused on GSAP/ScrollTrigger behavior differences
- Mobile device testing (real device, not just DevTools emulation) for touch interaction fallback and scroll smoothness
- Lighthouse audit (Performance/Accessibility/SEO/Best Practices) before final deploy
- `prefers-reduced-motion` manual toggle test
- Contact form end-to-end submission test