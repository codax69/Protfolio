# Product Requirements Document (PRD)
## Pritesh Patel — Developer Portfolio Website

| | |
|---|---|
| **Author** | Pritesh Patel |
| **Doc Type** | PRD |
| **Version** | 1.0 |
| **Date** | July 2026 |
| **Status** | Draft for build |

---

## 1. Overview

A personal portfolio website for Pritesh Patel, a self-taught Full Stack MERN developer, built to replace/support the resume during job applications and freelance client outreach. The site should feel **modern, minimal, and premium** — restrained color palette, generous whitespace, grid-based layout, and layered depth — brought to life with GSAP-driven scroll and interaction animations. The goal is a site that reads as "highly crafted" through motion and layout, not through color or clutter.

---

## 2. Goals & Objectives

1. **Get shortlisted faster** — give recruiters/HR a 30-second scannable proof of skills + real production project (VegBazar) instead of a static PDF.
2. **Prove production credibility** — VegBazar (600+ users, 1,500+ orders) and two freelance client projects should read as *shipped*, not "tutorial-level."
3. **Win freelance trust** — the site's own build quality (animation, polish, performance) is itself a portfolio piece — a visitor should think "if my site looks like this, I'd hire him."
4. **Single source of truth** — one place linking resume (PDF download), GitHub, LinkedIn, and live project links.

---

## 3. Target Audience

| Visitor | What they need to see fast |
|---|---|
| Recruiters / HR (fresher-junior roles) | Stack match, real deployed project, contact info, resume download |
| Freelance clients | Live project links, before/after value delivered (time saved, leads generated), WhatsApp/email contact |
| Fellow developers / GitHub visitors | Code quality signal, project depth, GitHub link |

---

## 4. Success Metrics

- Average session time > 45 seconds (indicates scroll-through, not bounce)
- Resume download / contact-click rate
- All project links (vegbazar.store, yourcarwasher.in, vhmagnet.in, QR attendance app) clicked-through at least once per session on average
- Lighthouse performance score ≥ 90 despite heavy animation (see TRD for how)

---

## 5. Scope

### In scope (v1)
- Single-page scrolling site (one URL, anchor-linked sections) — standard for a fresher/junior dev portfolio, fastest to build and easiest to keep "fancy" cohesive
- Sections: Hero, About, Skills, Experience, Projects (Freelance + Personal), Education, Contact/Footer
- Resume PDF download button
- Dark, minimal, single-accent-color theme with light-mode optional (stretch)
- GSAP scroll-triggered reveal animations, magnetic/hover micro-interactions, smooth-scroll, subtle 3D/depth layering on cards
- Fully responsive (mobile-first)
- Contact form or direct mailto/WhatsApp CTA

### Out of scope (v1)
- Blog / CMS-driven content
- Admin dashboard for editing content (content is hardcoded/config-driven instead)
- Multi-language support
- User accounts / authentication

---

## 6. Site Structure & Content Mapping (from resume)

### 6.1 Hero Section
- Name: **Pritesh Patel**
- Role headline: "Full Stack Developer — MERN Stack"
- One-line hook (from resume summary): self-taught, co-founded a live platform with 600+ users and 1,500+ orders
- Primary CTA: "View Work" (scroll to Projects)
- Secondary CTA: "Download Resume"
- Socials: GitHub (`github.com/codax69`), LinkedIn (`linkedin.com/in/devpritesh`)

### 6.2 About
- Short narrative: self-taught journey → co-founder → freelance delivery
- Quick facts strip: Based in Surat, Gujarat · Open to fresher/junior roles

### 6.3 Skills (grid section — this is where "grid + depth" shines)
Categorized bento-grid cards, each a depth-layered tile:
- **Frontend:** React.js, Tailwind CSS, HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express.js, REST APIs, JWT Auth
- **Database:** MongoDB, Mongoose
- **DevOps/Infra:** Linux VPS, Nginx, PM2, SSL/HTTPS, DNS
- **CI/CD:** GitHub Actions, Docker
- **Integrations:** Razorpay, Cloudinary, Google Sheets API
- **Tools:** Git, GitHub, Postman, VS Code

### 6.4 Experience
- **VegBazar — Co-Founder & Full Stack Developer** (Nov 2025 – Apr 2026)
  - Architected & deployed production MERN app, 600+ active users, 1,500+ orders
  - REST APIs: product mgmt, cart, order processing, filtering, pagination, lazy loading
  - Full Admin Panel for inventory/order management
  - End-to-end VPS deployment: Nginx, PM2, SSL, DNS
  - Link: vegbazar.store

### 6.5 Projects
**Freelance:**
1. **Car Wash Booking System** — yourcarwasher.in (Jan 2026)
   - Slot-based booking, real-time conflict prevention, ~80% less manual scheduling effort
   - Google Sheets API as live backend
2. **WhatsApp E-commerce (Customized Products)** — vhmagnet.in (Mar 2026)
   - Cloudinary-powered product showcase + personalization
   - WhatsApp ordering flow integration for lead gen

**Personal:**
3. **QR Attendance Management System** (MERN)
   - Adopted by 120+ students at ITI institute (3-month trial)
   - Department-based QR attendance, role-based access, real-time tracking, exportable analytics
   - Live: attendance-two-ruddy.vercel.app

Each project card: thumbnail/mock screenshot, tech tags, 2-line impact statement, "Live" + "Code" links.

### 6.6 Education
- ICTSM — ITI Pardi (2025)
- GSHSEB — 10th Standard (2020)
*(kept minimal — a small timeline element, not a heavy section, since production experience is the stronger signal)*

### 6.7 Contact / Footer
- Email, phone (click-to-call), GitHub, LinkedIn
- CTA: "Let's build something" + resume download repeated
- Simple contact form (name, email, message) → email delivery (see TRD)

---

## 7. Design Principles

1. **Minimal color, maximum contrast** — near-black or near-white base, one accent color used sparingly (buttons, active states, glow accents) — not a rainbow of section colors.
2. **Depth over decoration** — depth communicated via layered z-axis cards, soft shadows, subtle glassmorphism, and parallax — not gradients/illustrations.
3. **Grid-first layout** — CSS Grid / bento-style asymmetric grids for Skills and Projects sections instead of plain stacked lists.
4. **Motion with restraint** — every animation should support scannability (staggered reveal, scroll-linked progress) not distract from it; nothing loops infinitely except very subtle ambient elements.
5. **Typography does the "fancy" work** — a strong display font for headings + clean sans for body carries most of the premium feel, reducing reliance on color.

---

## 8. Key User Flows

1. **Recruiter flow:** Land on Hero → skim Skills grid → check Experience (VegBazar) → download Resume → click LinkedIn.
2. **Client flow:** Land on Hero → jump to Projects → open live project link → return → use Contact form/WhatsApp.
3. **Developer flow:** Land on Hero → click GitHub → browse Projects → check code links.

---

## 9. Non-Functional Requirements

- **Performance:** First Contentful Paint < 1.5s on 4G; animations must not block scroll (see TRD performance section)
- **Responsiveness:** Mobile-first; grid sections collapse gracefully to single/double column on small screens
- **Accessibility:** Respect `prefers-reduced-motion`; sufficient color contrast despite minimal palette; keyboard-navigable nav
- **SEO:** Meta tags, Open Graph image, semantic HTML for name/role/projects (recruiters do Google the name)
- **Cross-browser:** Latest Chrome, Firefox, Safari, Edge; graceful animation degradation on older browsers

---

## 10. Assumptions & Constraints

- Content is static/config-driven (no CMS) — Pritesh edits a data file to update projects/skills, no backend admin needed for v1
- Hosting target: Vercel/Netlify (fastest for a React+Vite SPA); VPS deployment (his existing Nginx/PM2 skillset) kept as a documented alternative in TRD
- Single-page site chosen over multi-page for v1 to keep the "fancy scroll" experience cohesive; can split into routed pages later if content grows

---

## 11. Milestones (suggested)

| Phase | Deliverable |
|---|---|
| 1 | Design tokens + static layout (all sections, no animation) |
| 2 | GSAP scroll animations + micro-interactions |
| 3 | Responsive pass + accessibility pass |
| 4 | Performance optimization + SEO + deploy |
| 5 | Content polish (real screenshots, resume PDF wired, contact form tested) |