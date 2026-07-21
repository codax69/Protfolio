# Developer Portfolio — Agent Guidelines & Context

This file serves as the context sheet and style rules document for any AI agents working on Pritesh Patel's MERN Full Stack Developer portfolio.

## 🚀 Tech Stack

- **Framework**: React.js (built with Vite)
- **Styling**: Tailwind CSS v4 (native compilation via `@tailwindcss/vite` plugin in `vite.config.js`)
- **Theme Manager**: `next-themes` (linked using `<ThemeProvider attribute="class" defaultTheme="dark">` inside `main.jsx`)
- **Animations**: GSAP + `@gsap/react` (`useGSAP` hook) + `ScrollTrigger` plugin
- **Scroll System**: Lenis (synchronized to GSAP's ticker in `src/lib/lenis.js`)
- **Icons**: `lucide-react`
- **Contact Form**: EmailJS (client-side submission to `dev.pritesh1@gmail.com`)

---

## 🎨 Design System & Styling Rules

A theme-driven, highly disciplined minimal design system supporting both Light (warm alabaster) and Dark (deep gray/black) modes. Do not deviate.

### Color Palette (Theme Variables)
All colors must be resolved dynamically using the Tailwind utility classes mapped to CSS variables inside `src/index.css`:
- **Base Background**: `bg-base` (maps to `#0A0A0A` in Dark, `#F8F7F2` in Light)
- **Surface**: `bg-surface` (maps to `#141414` in Dark, `#EFEFE9` in Light)
- **Border**: `border-border` (maps to `#2A2A2A` in Dark, `#DFDFD8` in Light)
- **Main Text**: `text-text` (maps to `#EDEDED` in Dark, `#1A1916` in Light)
- **Muted Text**: `text-muted` (maps to `#8A8A8A` in Dark, `#7A7870` in Light)
- **Accent Color**: `text-accent`, `bg-accent`, `border-accent` (maps to `#7C5CFF` purple in both modes)

### Claymorphic Card Component (`.clay-card`)
Custom 3D card tilt containers (`DepthCard` and `GithubDepthCard`) must utilize the `.clay-card` utility class:
- **Card Backgrounds**: Strictly white (`#FFFFFF`) in light mode and dark surface charcoal (`#141414`) in dark mode. Do not inject lavender or other background tinting colors.
- **Double Inset Highlights**: Shadows must use neutral black/white values:
  - Top-left inset highlight is white (`rgba(255, 255, 255, ...)`).
  - Bottom-right inset shadow is dark gray/black (`rgba(0, 0, 0, ...)`).
- **Interactive Tilting**: Inside dynamic frame-tick shadow generators, preserve the double inset highlights (`inset 6px 6px 14px ...` and `inset -8px -8px 16px ...`) as the card translates.

### Global Grid Layout
- Every page section must include the background grid pattern:
  `<div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0" />`
- The section wrapper element **must** have `relative overflow-hidden` to prevent grid bleed.
- Child content must have `relative z-10` to sit cleanly above the grid.

---

## ⚡ Interactive & Animation Patterns

### 1. Themed Hover Buttons
- Action and CTA buttons use the dynamic hover properties:
  `hover:bg-btn-hover-bg hover:text-btn-hover-text hover:border-btn-hover-border`
- **Behavior**:
  - In light mode, hovers turn button background to charcoal gray (`#1A1916`) and text to white (`#FAF9F6`).
  - In dark mode, hovers turn button background to solid white (`#FFFFFF`) and text/icon to purple accent (`#7C5CFF`).
- Internal SVG icons must be sized to `size={14}` with a line weight of `className="stroke-[2.5]"` to fit the sleeker size.

### 2. Badge & Tag Styling (Skills/Projects/About)
- Badges representing technical competencies or marquee/profile characteristics are styled with a solid dark theme color to keep them prominent:
  `className="bg-gradient-to-br from-[#1c1c1c] to-[#0d0d0d] border border-white/5 text-muted hover:text-accent hover:border-[#7C5CFF]/40 shadow-[2px_2px_5px_rgba(0,0,0,0.5),inset_1px_1px_2px_rgba(255,255,255,0.05),inset_-1px_-1px_2px_rgba(0,0,0,0.7)]"`

### 3. Timeline Progress Indicators (Experience & Education)
- Vertical progress lines must scrub using GSAP `ScrollTrigger` bound to a specific inner wrapper ref (`timelineRef`), **not** the outer section container.
- Use the following ScrollTrigger settings for robust bottom-of-page rendering:
  `start: "top 75%", end: "bottom 70%"`

### 4. Project Slider
- Screenshots must auto-play by sliding horizontally every **4 seconds**.
- Manual navigation arrows (`ChevronLeft`, `ChevronRight`) must reset the autoplay interval immediately upon click to prevent scrolling conflicts.
- Render numerical indicators like `1 / 3` in the bottom-right corner.

### 5. GitHub Showcase
- Dynamically fetches user profile stats and the 6 most recently updated repositories from the GitHub API.
- Star, fork, and repository cards use custom 3D card tilt behaviors (`DepthCard` / `GithubDepthCard`) and custom language dot colors.

---

## 🛠️ Verification & Compilation
- Avoid installing extra libraries (e.g. use native browser `fetch` instead of `axios` for API tasks).
- Always verify changes by running a production build:
  `npm run build`
- Ensure compilation finishes cleanly with zero errors before ending the turn.
