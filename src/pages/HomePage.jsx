import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import SkillsGrid from '../components/sections/SkillsGrid';
import Experience from '../components/sections/Experience';
import Projects from '../components/sections/Projects';
import GithubShowcase from '../components/sections/GithubShowcase';
import Education from '../components/sections/Education';
import Contact from '../components/sections/Contact';
import useSEO from '../hooks/useSEO';

const HomePage = () => {
  useSEO({
    title: 'Pritesh Patel | MERN Stack Developer | WebDev & Web Development Portfolio',
    description: 'Pritesh Patel is a Full Stack MERN Stack Web Developer (WebDev) and co-founder of VegBazar. Specialized in modern web development, React, Node.js, Express, MongoDB, and production VPS cloud deployments.',
    keywords: 'Pritesh Patel, pritesh patel, mernstack, mern stack, MERN stack developer, webdev, webdevelopment, web development, web developer, full stack developer, react developer, node.js, express.js, mongodb, javascript, portfolio, vegbazar, surat, gujarat',
    canonical: 'https://pritesh.site/',
  });

  return (
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
  );
};

export default HomePage;
