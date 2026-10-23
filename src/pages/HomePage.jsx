import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import SkillsGrid from '../components/sections/SkillsGrid';
import Experience from '../components/sections/Experience';
import Projects from '../components/sections/Projects';
import GithubShowcase from '../components/sections/GithubShowcase';
import Education from '../components/sections/Education';
import Contact from '../components/sections/Contact';

const HomePage = () => {
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
