import React from 'react';
import '../styles/components/certificate.css';

export default function CertificateCard({ certificate, isActive }) {
  const { title, institution, date, story, image, link } = certificate;

  return (
    <div className={`certificate-card ${isActive ? 'active' : ''}`}>
      <div
        className="certificate-image"
        style={{ backgroundImage: `url(${image})` }}
        aria-label={`Certificate of ${title}`}
      />
      <div className="certificate-info">
        <h3 className="certificate-title">{title}</h3>
        <p className="certificate-institution">{institution}</p>
        <p className="certificate-date">{date}</p>
        <p className="certificate-story">{story}</p>
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="certificate-link">
            Lihat Sertifikat
          </a>
        )}
      </div>
    </div>
  );
}