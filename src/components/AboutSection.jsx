import React, { useEffect, useRef, useState } from 'react';
import '../styles/components/about.css';

function AboutSection() {
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
      id="about"
      className={`about-section ${isVisible ? 'animate-about' : ''}`}
      ref={sectionRef}
    >
      <div className="about-overlay">
        <div className="about-content">
          <h2>about-</h2>
          <p>
            I'm a self-taught software engineer with a strong curiosity for the digital world.
            <br />
            My passion lies in turning ideas into real, functional products—especially in the
            field of artificial intelligence.
            <br /><br />
            I started my journey combining self-learning with bootcamp training, which led me
            to build deep learning models using TensorFlow and Keras. I enjoy working
            independently, diving deep into problems, and building things from the ground up.
            <br /><br />
            Right now, I'm focused on sharpening my skills and exploring how technology—especially AI—can shape the future we live in.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
