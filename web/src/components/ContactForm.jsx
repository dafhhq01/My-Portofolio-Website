import React from 'react';
import '../styles/components/contact.css';

function Contact() {
  return (
    <section className="contact-section">
      <div className="contact-overlay">
        <div className="contact-content">
          <h2>Contact Me</h2>
          <p>Have an idea or collaboration in mind? Let's talk.</p>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows="5" required />
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
