import React from 'react';
import '../styles/components/contact.css';

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-overlay">
        <div className="contact-content">
          <h2>Contact Me</h2>
          <p>Have an idea or collaboration in mind? Let's talk.</p>
          <form
            className="contact-form"
            action="https://getform.io/f/bmdmjzna"
            method="POST"
          >
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" rows="5" required />
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
