import React from "react";
import "../styles/components/hero.css";
import profilePic from "../assets/profile-image-1.jpg";
import SkillCards from "./SkillCards";

function Hero() { 
  return (
    <section className="hero">
      <div className="hero-content">
        <img src={profilePic} alt="Foto Profil" className="hero-img" />
        <div>
          <h1>
            From curiosity to code  —
            <br /> I’m Daffa, a software engineer 
            <br /> who turns ideas into digital reality.
          </h1>
          {/* <p>
            Seorang developer yang menguasai Front-End, Back-End, dan Machine
            Learning. Saya membangun website profesional dan scalable dengan
            pendekatan fullstack modern.
          </p> */}
          <a href="/contact" className="hero-btn">
            Hubungi Saya
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
