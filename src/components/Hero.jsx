import React from "react";
import { motion } from "framer-motion";
import "../styles/components/hero.css";
import profilePic from "../assets/profile-image-1.jpg";

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <motion.img
          src={profilePic}
          alt="Foto Profil"
          className="hero-img"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          <h1>
            Hello I'm Daffa — <br />
            Web Strategist And <br />
            AI-Integrated Developer
          </h1>

          <motion.a
            href="#contact"
            className="hero-btn"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          >
            Hubungi Saya
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
