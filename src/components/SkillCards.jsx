// src/components/SkillCards.jsx
import React from 'react';
import skills from '../data/skills';
import '../styles/components/skillcards.css';

function SkillCards() {
  return (
    <section className="skills-section">
      <h2 className="section-bg-text">Keahlian Saya</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div key={index} className="skill-card">
            <div className="skill-icon">{skill.icon}</div>
            <h3 className="skill-name">{skill.name}</h3>
            <p className="skill-level">{skill.level}</p>
          </div>
        ))}
      </div>
    </section>

  );
}

export default SkillCards;
