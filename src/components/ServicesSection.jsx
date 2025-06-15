import React from "react";
import "../styles/components/services.css";
import checklist from "../assets/icons/ceklis.svg";
import robot from "../assets/icons/robot.svg";
import rocket from "../assets/icons/rocket-2.svg";

const Services = () => {
  return (
    <section className="services-section">
      <h2 className="services-title">Services</h2>
      <div className="services-cards">
        <div className="service-card">
          <h3>Website Hight <br /> Conversion</h3>
          <img src={rocket} alt="Rocket Icon" />
          <p>Bukan sekadar tampil cantik, tapi mendatangkan pembeli.</p>
        </div>
        <div className="service-card">
          <h3>AI Integrated <br /> Marketing</h3>
          <img src={robot} alt="Robot Icon" />
          <p>
            Chatbot otomatis, rekomendasi produk, hingga sistem penilaian pelanggan berbasis AI.
          </p>
        </div>
        <div className="service-card">
          <h3>End to end <br /> Strategist </h3>
          <img src={checklist} alt="Checklist Icon" />
          <p>
            Mulai dari perencanaan, eksekusi, edukasi, hingga support pasca proyek.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
