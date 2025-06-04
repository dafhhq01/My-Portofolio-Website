import React from 'react';
import '../styles/components/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <p className="copyright">
          © {new Date().getFullYear()} My Portfolio. All rights reserved.
        </p>
        <div className="footer-links">
          <a href="https://github.com/dafhhq01" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/usernamewww.linkedin.com/in/daffa-dhiya-ulhaq-983a05353" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:dafhhq01@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
