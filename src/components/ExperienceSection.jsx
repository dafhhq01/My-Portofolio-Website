import React, { useRef, useState, useEffect, useCallback } from 'react';
import experiences from '../data/experiences';
import ExperienceCard from './ExperienceCard';
import '../styles/components/experience.css';

function ExperienceCards() {
  const sliderRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(300);
  const [isHovered, setIsHovered] = useState(false);
  const autoScrollIntervalRef = useRef(null);
  const autoScrollTimeoutRef = useRef(null);
  const lastScrollLeftRef = useRef(0); // posisi terakhir yang dilacak

  // Inisialisasi lebar card
  useEffect(() => {
    if (sliderRef.current?.children.length > 0) {
      const firstCard = sliderRef.current.children[0];
      setCardWidth(firstCard.offsetWidth + 24);
    }
  }, []);

  // Auto scroll handler dibuat stabil dengan useCallback
  const startAutoScroll = useCallback(() => {
    clearInterval(autoScrollIntervalRef.current);
    autoScrollIntervalRef.current = setInterval(() => {
      if (!isHovered && sliderRef.current) {
        lastScrollLeftRef.current += cardWidth;
        sliderRef.current.scrollTo({ left: lastScrollLeftRef.current, behavior: 'smooth' });
      }
    }, 3000);
  }, [cardWidth, isHovered]);

  // Auto scroll initializer
  useEffect(() => {
    startAutoScroll();
    return () => clearInterval(autoScrollIntervalRef.current);
  }, [startAutoScroll]);

  // Delay restart auto scroll
  const resetAutoScrollDelay = useCallback(() => {
    clearInterval(autoScrollIntervalRef.current);
    clearTimeout(autoScrollTimeoutRef.current);

    autoScrollTimeoutRef.current = setTimeout(() => {
      startAutoScroll();
    }, 5000);
  }, [startAutoScroll]);

  // Manual scroll handler
  const scrollTo = useCallback((direction) => {
    const container = sliderRef.current;
    if (!container) return;

    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    const newScrollLeft = container.scrollLeft + scrollAmount;

    container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    lastScrollLeftRef.current = newScrollLeft; // update posisi terakhir

    resetAutoScrollDelay();
  }, [cardWidth, resetAutoScrollDelay]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!sliderRef.current) return;
      if (e.key === 'ArrowRight') {
        scrollTo('right');
      } else if (e.key === 'ArrowLeft') {
        scrollTo('left');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [scrollTo]);

  return (
    <section className="experiences-section">
      <h2 className="experience-title">Experience</h2>
      <p className="experience-subtitle">My journey through learning, building, and earning.</p>

      <div className="slider-container">
        <button
          className="slider-button left"
          onClick={() => scrollTo('left')}
          aria-label="Scroll left"
        >
          ←
        </button>
        <div
          className="experience-grid"
          ref={sliderRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onScroll={() => {
            if (sliderRef.current) {
              lastScrollLeftRef.current = sliderRef.current.scrollLeft;
            }
          }}
        >
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} certificate={exp} />
          ))}
        </div>
        <button
          className="slider-button right"
          onClick={() => scrollTo('right')}
          aria-label="Scroll right"
        >
          →
        </button>
      </div>
    </section>
  );
}

export default ExperienceCards;
