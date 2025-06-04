import React from 'react';
import Hero from '../components/Hero.jsx';
import SkillCards from '../components/SkillCards.jsx';
import About from '../components/AboutSection.jsx';
import Contact from '../components/ContactForm.jsx';
import ExperienceSection from '../components/ExperienceSection.jsx';
// import CTASection from '../components/CTASection.jsx';

function Home() {
  return (
    <main>
      <Hero />
      <About />
      <SkillCards />
      <ExperienceSection />
      <Contact />
      {/* <CTASection /> */}
    </main>
  );
}

export default Home;
