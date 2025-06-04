import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import SkillCards from './components/SkillCards.jsx';
import Experience from './pages/Experience.jsx';
import Contact from './pages/Contact.jsx';
import Footer from './components/Footer.jsx';
// import Projects from './pages/Projects.jsx';
// import Certificates from './pages/Certificates.jsx';
// import Bootcamps from './pages/Bootcamps.jsx';







function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/skillcard" element={<SkillCards />} /> */}
        {/*<Route path="/projects" element={<Projects />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/bootcamps" element={<Bootcamps />} /> */}
        <Route path="/experience" element={<Experience />} /> 
        <Route path="/contact" element={<Contact />} /> 
      </Routes>
      {/* <SkillCards /> */}
      <Footer />
    </Router>
  );
}

export default App;

console.log("App loaded");
