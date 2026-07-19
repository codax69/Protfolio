# Developer Portfolio — Agent Guidelines & Context

This file serves as the context sheet and style rules document for any AI agents working on Pritesh Patel's MERN Full Stack Developer portfolio.

## 🚀 Tech Stack

- **Framework**: React.js (built with Vite)
- **Styling**: Tailwind CSS v4 (native compilation via `@tailwindcss/vite` plugin in `vite.config.js`)
- **Animations**: GSAP + `@gsap/react` (`useGSAP` hook) + `ScrollTrigger` plugin
- **Scroll System**: Lenis (synchronized to GSAP's ticker in `src/lib/lenis.js`)
- **Icons**: `lucide-react`
- **Contact Form**: EmailJS (client-side submission to `dev.pritesh1@gmail.com`)

---

## 🎨 Design System & Styling Rules

A minimal, highly disciplined dark design system. Do not deviate.

### Color Palette
- **Base Background**: `#0A0A0A` (applied via `bg-base`)
- **Surface**: `#141414` (applied via `bg-surface`)
- **Border**: `#2A2A2A` (applied via `border-border`)
- **Main Text**: `#EDEDED` (applied via `text-text`)
- **Muted Text**: `#8A8A8A` (applied via `text-muted`)
- **Accent Color**: `#7C5CFF` (applied via `text-accent`, `bg-accent`, `border-accent` — used sparingly for highlights/CTAs)

### Global Grid Layout
- Every page section must include the background grid pattern:
  `<div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0" />`
- The section wrapper element **must** have `relative overflow-hidden` to prevent grid bleed.
- Child content must have `relative z-10` to sit cleanly above the grid.

---

## ⚡ Interactive & Animation Patterns

### 1. Magnetic Buttons (`<MagneticButton>`)
- Base styling defaults to `text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full whitespace-nowrap`.
- **Hover transition rule**: Both hero buttons must turn to a solid white background with a purple text/icon on hover:
  `hover:bg-white hover:text-accent hover:border-white`
- Internal SVG icons must be sized to `size={14}` with a line weight of `className="stroke-[2.5]"` to fit the sleeker size.

### 2. Timeline Progress Indicators (Experience & Education)
- Vertical progress lines must scrub using GSAP `ScrollTrigger` bound to a specific inner wrapper ref (`timelineRef`), **not** the outer section container.
- Use the following ScrollTrigger settings for robust bottom-of-page rendering:
  `start: "top 75%", end: "bottom 70%"`

### 3. Project Slider
- Screenshots must auto-play by sliding horizontally every **4 seconds**.
- Manual navigation arrows (`ChevronLeft`, `ChevronRight`) must reset the autoplay interval immediately upon click to prevent scrolling conflicts.
- Render numerical indicators like `1 / 3` in the bottom-right corner.

### 4. GitHub Showcase
- Dynamically fetches user profile stats and the 6 most recently updated repositories from the GitHub API.
- Star, fork, and repository cards use custom 3D card tilt behaviors (`DepthCard`) and custom language dot colors.

---

## 🛠️ Verification & Compilation
- Avoid installing extra libraries (e.g. use native browser `fetch` instead of `axios` for API tasks).
- Always verify changes by running a production build:
  `npm run build`
- Ensure compilation finishes cleanly with zero errors before ending the turn.
