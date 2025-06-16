import React from 'react';
import { motion } from 'framer-motion';
import '../styles/components/contact.css';

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.15,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <motion.div
        className="contact-overlay"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="contact-content" variants={childVariants}>
          <h2>Contact Me</h2>
          <p>Have an idea or collaboration in mind? Let's talk.</p>
        </motion.div>
        <motion.form
          className="contact-form"
          action="https://getform.io/f/bmdmjzna"
          method="POST"
        >
          <motion.input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            variants={childVariants}
          />
          <motion.input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            variants={childVariants}
          />
          <motion.textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            required
            variants={childVariants}
          />
          <motion.button type="submit" variants={childVariants}>
            Send Message
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
}

export default Contact;
