import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import SkillsGrid from './components/sections/SkillsGrid';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import GithubShowcase from './components/sections/GithubShowcase';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';
import { initLenis } from './lib/lenis';

function App() {
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
    <div className="relative min-h-screen bg-base text-text selection:bg-accent/30 selection:text-text overflow-hidden">
      <Navbar />
      <main>
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
  );
}

export default App;
