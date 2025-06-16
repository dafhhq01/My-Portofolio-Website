// src/components/SkillCards.jsx
import React, { useEffect, useRef, useState } from 'react';
import skills from '../data/skills';
import '../styles/components/skillcards.css';

function SkillCards() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let hasScrolled = false;

    const handleScroll = () => {
      hasScrolled = true;
    };

    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasScrolled) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      id="skills"
      className={`skills-section ${isVisible ? 'animate-skills' : ''}`}
      ref={sectionRef}
    >
      <h2 className="section-bg-text">Keahlian Saya</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="skill-card"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className="skill-icon">
              <img
                src={skill.icon}
                alt={`${skill.name} icon`}
                className="skill-img-icon"
              />
            </div>
            <h3 className="skill-name">{skill.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SkillCards;
