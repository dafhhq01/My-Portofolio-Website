import React from 'react';
import '../styles/components/about.css';

function AboutSection() {
  return (
    <section className="about-section">
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
            Right now, I'm focused on sharpening my skills and exploring how technology—
            especially AI—can shape the future we live in.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
