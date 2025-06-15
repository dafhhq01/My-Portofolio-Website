import React from 'react';
import Hero from '../components/Hero.jsx';
import About from '../components/AboutSection.jsx';
import Services from '../components/ServicesSection.jsx';
import SkillCards from '../components/SkillCards.jsx';
import Portofolio from '../components/PortfolioSection.jsx';
import CertificateSection from '../components/CertificateSection.jsx';
import Contact from '../components/ContactForm.jsx';
// import CTASection from '../components/CTASection.jsx';

function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <SkillCards />
      <Portofolio />
      <CertificateSection />
      <Contact />
      {/* <CTASection /> */}
    </main>
  );
}

export default Home;
