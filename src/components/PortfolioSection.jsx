import React, { useRef, useState, useEffect, useCallback } from 'react';
import '../styles/components/portfolio.css';
import portfolios from '../data/portfolios.js';

function PortfolioSection() {
  const sliderRef = useRef(null);
  const sectionRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(300);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('right');
  const autoScrollIntervalRef = useRef(null);
  const autoScrollTimeoutRef = useRef(null);
  const lastScrollLeftRef = useRef(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (sliderRef.current?.children.length > 0) {
      const firstCard = sliderRef.current.children[0];
      setCardWidth(firstCard.offsetWidth + 24);
    }
  }, []);

  const startAutoScroll = useCallback(() => {
    clearInterval(autoScrollIntervalRef.current);
    autoScrollIntervalRef.current = setInterval(() => {
      if (!isHovered && sliderRef.current) {
        const container = sliderRef.current;
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        let newScrollLeft = lastScrollLeftRef.current;

        if (scrollDirection === 'right') {
          newScrollLeft += cardWidth;
          if (newScrollLeft >= maxScrollLeft) {
            newScrollLeft = maxScrollLeft;
            setScrollDirection('left');
          }
        } else {
          newScrollLeft -= cardWidth;
          if (newScrollLeft <= 0) {
            newScrollLeft = 0;
            setScrollDirection('right');
          }
        }

        container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
        lastScrollLeftRef.current = newScrollLeft;
      }
    }, 3000);
  }, [cardWidth, isHovered, scrollDirection]);

  useEffect(() => {
    startAutoScroll();
    return () => clearInterval(autoScrollIntervalRef.current);
  }, [startAutoScroll]);

  const resetAutoScrollDelay = useCallback(() => {
    clearInterval(autoScrollIntervalRef.current);
    clearTimeout(autoScrollTimeoutRef.current);
    autoScrollTimeoutRef.current = setTimeout(() => {
      startAutoScroll();
    }, 5000);
  }, [startAutoScroll]);

  const scrollTo = useCallback(
    (direction) => {
      const container = sliderRef.current;
      if (!container) return;

      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      const newScrollLeft = container.scrollLeft + scrollAmount;

      container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
      lastScrollLeftRef.current = newScrollLeft;

      resetAutoScrollDelay();
    },
    [cardWidth, resetAutoScrollDelay]
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!sliderRef.current) return;
      if (e.key === 'ArrowRight') scrollTo('right');
      if (e.key === 'ArrowLeft') scrollTo('left');
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [scrollTo]);

  // Intersection Observer untuk trigger animasi saat masuk viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="portfolio"
      className={`portfolio-section ${isVisible ? 'animate-portfolio' : ''}`}
      ref={sectionRef}
    >
      <h2 className="portfolio-title">Portofolio</h2>
      <div className="slider-container">
        <button className="slider-btn left" onClick={() => scrollTo('left')}>
          ❮
        </button>
        <div
          className="portfolio-slider"
          ref={sliderRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onScroll={() => {
            if (sliderRef.current) {
              lastScrollLeftRef.current = sliderRef.current.scrollLeft;
            }
          }}
        >
          {portfolios.map((item, index) => (
            <div
              className="portfolio-card"
              key={index}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <img src={item.image} alt={item.title} />
              <div className="portfolio-text">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="slider-btn right" onClick={() => scrollTo('right')}>
          ❯
        </button>
      </div>
    </section>
  );
}

export default PortfolioSection;
