import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import ProofOfWorkPage from './pages/ProofOfWorkPage';
import { initLenis } from './lib/lenis';

// Layout wrapper for the homepage (has Navbar + Footer)
const HomeLayout = () => {
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
      <HomePage />
      <Footer />
    </div>
  );
};

function App() {
  const { pathname } = useLocation();

  // Scroll to top on route change (project pages handle this themselves)
  useEffect(() => {
    if (pathname === '/') {
      // Check if there's a hash to scroll to (from /#projects link)
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} />
      <Route path="/proof-of-work" element={<ProofOfWorkPage />} />
      <Route path="/proof-of-work/:id" element={<ProjectPage />} />
    </Routes>
  );
}

export default App;
