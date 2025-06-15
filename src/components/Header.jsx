import React, { useState, useEffect, useRef } from 'react';
import '../styles/components/header.css';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const linkRefs = useRef({});

  // Daftar menu navigasi
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' },
  ];

  // Ambil semua id section dari navItems (supaya sinkron)
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
    handleScroll(); // Jalankan langsung saat pertama kali mount

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

  return (
    <header className="header">
      <div className="container nav-container">
        <a
          href="/src/assets/images/CV.pdf"
          className="download-cv-btn"
          download
        >
          Download CV
        </a>
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
