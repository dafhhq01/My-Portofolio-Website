import React, { useEffect, useRef, useState } from 'react';
import '../styles/components/certificate.css';

export default function CertificateCard({ certificate }) {
  const { title, institution, date, story, image, link } = certificate;
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`certificate-card fade-up ${isVisible ? 'show' : ''}`}
    >
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
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="certificate-link"
          >
            Lihat Sertifikat
          </a>
        )}
      </div>
    </div>
  );
}
