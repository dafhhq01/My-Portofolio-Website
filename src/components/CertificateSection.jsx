import React, { useRef, useState, useEffect, useCallback } from 'react';
import certificates from '../data/certificate.js';
import CertificateCard from './CertificateCard';
import '../styles/components/certificate.css';

function CertificateCards() {
  const sliderRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(300);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('right');
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

  // Auto scroll handler (ping-pong)
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
    <section className="certificates-section">
      <h2 className="certificates-title">Certificate</h2>

      <div className="slider-container-certificate">
        <button
          className="slider-button-certificate left"
          onClick={() => scrollTo('left')}
          aria-label="Scroll left"
        >
          ←
        </button>
        <div
          className="certificates-grid"
          ref={sliderRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onScroll={() => {
            if (sliderRef.current) {
              lastScrollLeftRef.current = sliderRef.current.scrollLeft;
            }
          }}
        >
          {certificates.map((exp, index) => (
            <CertificateCard key={index} certificate={exp} />
          ))}
        </div>
        <button
          className="slider-button-certificate right"
          onClick={() => scrollTo('right')}
          aria-label="Scroll right"
        >
          →
        </button>
      </div>
    </section>
  );
}

export default CertificateCards;
