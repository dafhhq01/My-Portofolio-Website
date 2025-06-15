import React from "react";
import "../styles/components/hero.css";
import profilePic from "../assets/profile-image-1.jpg";
import SkillCards from "./SkillCards";

function Hero() { 
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <img src={profilePic} alt="Foto Profil" className="hero-img" />
        <div>
          <h1>
            Hello I'm Daffa —
            <br /> Web Strategist And 
            <br /> AI-Integrated Developer
          </h1>
          {/* <p>
            Seorang developer yang menguasai Front-End, Back-End, dan Machine
            Learning. Saya membangun website profesional dan scalable dengan
            pendekatan fullstack modern.
          </p> */}
          <a href="#contact" className="hero-btn">
            Hubungi Saya
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
