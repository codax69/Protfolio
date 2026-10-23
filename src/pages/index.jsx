import Head from 'next/head';
import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import SkillsGrid from '../components/sections/SkillsGrid';
import Experience from '../components/sections/Experience';
import Projects from '../components/sections/Projects';
import GithubShowcase from '../components/sections/GithubShowcase';
import Education from '../components/sections/Education';
import Contact from '../components/sections/Contact';
import { initLenis } from '../lib/lenis';

const DOMAIN = 'https://priteshpatel.dev';

export default function Home() {
  // Initialize smooth scroll (Lenis) and link to GSAP Ticker
  useEffect(() => {
    const lenis = initLenis();
    return () => {
      if (lenis && typeof lenis.destroyInstance === 'function') {
        lenis.destroyInstance();
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Pritesh Patel | Full Stack MERN Developer — React, Node.js, MongoDB</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Pritesh Patel is a self-taught Full Stack MERN Developer from Gujarat, India. Co-founder of VegBazar — a live grocery platform serving 600+ users. Skilled in React.js, Node.js, Express.js, MongoDB, and Linux VPS deployment. Open to junior developer roles and freelance projects."
        />
        <meta
          name="keywords"
          content="Pritesh Patel, Full Stack Developer, MERN Stack Developer, React Developer, Node.js Developer, JavaScript Developer, Web Developer Gujarat, Web Developer India, Full Stack Developer Gujarat, MERN Stack Gujarat, MongoDB Developer, Express.js Developer, Software Engineer India, Junior Developer India, Freelance Web Developer"
        />
        <meta name="author" content="Pritesh Patel" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href={DOMAIN} />

        {/* Open Graph */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={DOMAIN} />
        <meta property="og:site_name" content="Pritesh Patel Portfolio" />
        <meta property="og:title" content="Pritesh Patel | Full Stack MERN Developer" />
        <meta
          property="og:description"
          content="Self-taught Full Stack MERN Developer from Gujarat, India. Co-founder of VegBazar serving 600+ users. Building production-grade web applications with React, Node.js, MongoDB, and Linux VPS."
        />
        <meta property="og:image" content={`${DOMAIN}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Pritesh Patel — Full Stack MERN Developer Portfolio" />
        <meta property="og:locale" content="en_IN" />
        <meta property="profile:first_name" content="Pritesh" />
        <meta property="profile:last_name" content="Patel" />
        <meta property="profile:username" content="codax69" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={DOMAIN} />
        <meta name="twitter:title" content="Pritesh Patel | Full Stack MERN Developer" />
        <meta
          name="twitter:description"
          content="Self-taught Full Stack MERN Developer from Gujarat, India. Co-founder of VegBazar serving 600+ users. Open to junior roles and freelance projects."
        />
        <meta name="twitter:image" content={`${DOMAIN}/og-image.png`} />
        <meta name="twitter:image:alt" content="Pritesh Patel — Full Stack MERN Developer Portfolio" />
      </Head>

      <div className="relative min-h-screen bg-base text-text selection:bg-accent/30 selection:text-text overflow-hidden">
        <Navbar />
        <main id="main-content">
          <Hero />
          <About />
          <SkillsGrid />
          <Experience />
          <Projects />
          <GithubShowcase />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
