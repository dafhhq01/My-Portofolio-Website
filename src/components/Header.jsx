import React, { useState, useEffect, useRef } from 'react';
import '../styles/components/header.css';
import CV from '../assets/images/CV.pdf';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const linkRefs = useRef({});

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' },
  ];

  const sectionIds = navItems.map(item => item.id);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
      if (window.innerWidth > 800) setIsOpen(false);
    };

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(id);
          const activeLink = linkRefs.current[id];
          if (activeLink && indicatorRef.current) {
            const { offsetLeft, offsetWidth } = activeLink;
            indicatorRef.current.style.transform = `translateX(${offsetLeft}px)`;
            indicatorRef.current.style.width = `${offsetWidth}px`;
          }
        }
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds]);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(CV);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'CV-Daffa-HQ.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download gagal:', error);
    }
  };

  return (
    <header className="header">
      <div className="container nav-container">
        <button className="download-cv-btn" onClick={handleDownload}>
          Download CV
        </button>
        <button
          className={`hamburger ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {isMobile ? (
          <div className={`mobile-menu-overlay ${isOpen ? 'open' : 'close'}`}>
            <nav className="nav-links" ref={navRef}>
              <div className="active-indicator" ref={indicatorRef}></div>
              {navItems.map((item) => (
                <a
                  key={item.id}
                  ref={(el) => (linkRefs.current[item.id] = el)}
                  onClick={() => scrollToSection(item.id)}
                  className={activeSection === item.id ? 'active' : ''}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        ) : (
          <nav className="nav-links" ref={navRef}>
            <div className="active-indicator" ref={indicatorRef}></div>
            {navItems.map((item) => (
              <a
                key={item.id}
                ref={(el) => (linkRefs.current[item.id] = el)}
                onClick={() => scrollToSection(item.id)}
                className={activeSection === item.id ? 'active' : ''}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
