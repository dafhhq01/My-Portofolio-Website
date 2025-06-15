import React, { useRef, useState, useEffect, useCallback } from 'react';
import '../styles/components/portfolio.css';
import portfolios from '../data/portfolios.js';

function PortfolioSection() {
  const sliderRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(300);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('right');
  const autoScrollIntervalRef = useRef(null);
  const autoScrollTimeoutRef = useRef(null);
  const lastScrollLeftRef = useRef(0);

  // Hitung lebar card saat pertama render
  useEffect(() => {
    if (sliderRef.current?.children.length > 0) {
      const firstCard = sliderRef.current.children[0];
      setCardWidth(firstCard.offsetWidth + 24);
    }
  }, []);

  // Auto scroll ping-pong
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

  // Delay saat scroll manual
  const resetAutoScrollDelay = useCallback(() => {
    clearInterval(autoScrollIntervalRef.current);
    clearTimeout(autoScrollTimeoutRef.current);

    autoScrollTimeoutRef.current = setTimeout(() => {
      startAutoScroll();
    }, 5000);
  }, [startAutoScroll]);

  // Scroll kiri/kanan manual
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

  // Keyboard navigation (optional)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!sliderRef.current) return;
      if (e.key === 'ArrowRight') scrollTo('right');
      if (e.key === 'ArrowLeft') scrollTo('left');
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [scrollTo]);

  return (
    <section className="portfolio-section">
      <h2 className="portfolio-title">Portofolio</h2>
      <div className="slider-container">
        <button
          className="slider-btn left"
          onClick={() => scrollTo('left')}
          aria-label="Scroll left"
        >
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
            <div className="portfolio-card" key={index}>
              <img src={item.image} alt={item.title} />
              <div className="portfolio-text">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="slider-btn right"
          onClick={() => scrollTo('right')}
          aria-label="Scroll right"
        >
          ❯
        </button>
      </div>
    </section>
  );
}

export default PortfolioSection;
