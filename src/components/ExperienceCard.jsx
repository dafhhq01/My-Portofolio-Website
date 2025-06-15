import React from 'react';
import '../styles/components/certificate.css';

function ExperienceCard({ certificate }) {
  return (
    <div className="experience-card">
      <img src={certificate.image} alt={certificate.title} className="experience-image" />
      <div className="experience-content">
        <h3 className="experience-title-text">{certificate.title}</h3>
        <p className="experience-description">{certificate.description}</p>
        {certificate.button && (
          <a href={certificate.button.link} className="experience-button">
            {certificate.button.text}
          </a>
        )}
      </div>
    </div>
  );
}

export default ExperienceCard;
