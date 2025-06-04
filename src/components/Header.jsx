import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/header.css';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

  useEffect(() => {
    const handleResize = () => {
      const currentlyMobile = window.innerWidth <= 800;
      setIsMobile(currentlyMobile);
      if (!currentlyMobile) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="header">
      <div className="container nav-container">
        <h1 className="logo">
          <Link to="/">My Portfolio</Link>
        </h1>

        <button
          className={`hamburger ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {isMobile && (
          <div className={`mobile-menu-overlay ${isOpen ? 'open' : 'close'}`}>
            <nav className="nav-links">
              <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/about" onClick={() => setIsOpen(false)}>Tentang</Link>
              <Link to="/projects" onClick={() => setIsOpen(false)}>Proyek</Link>
              <Link to="/experience" onClick={() => setIsOpen(false)}>Pengalaman</Link>
              <Link to="/contact" onClick={() => setIsOpen(false)}>Kontak</Link>
            </nav>
          </div>
        )}

        {!isMobile && (
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about">Tentang</Link>
            <Link to="/projects">Proyek</Link>
            <Link to="/experience">Pengalaman</Link>
            <Link to="/contact">Kontak</Link>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
