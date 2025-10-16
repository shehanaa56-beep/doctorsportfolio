import React from 'react';
import './styles/sections.css';
import { FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-wrapper glass-card">
        <div className="footer-inner">
          <div className="footer-col about">
            <h3>Dr. Alex Morgan</h3>
            <p className="muted">Board-certified physician focused on compassionate, evidence-based care to help patients live healthier lives.</p>
            <div className="footer-social">
              <button aria-label="Twitter" className="social-link"><FaTwitter/></button>
              <button aria-label="LinkedIn" className="social-link"><FaLinkedin/></button>
              <button aria-label="Facebook" className="social-link"><FaFacebook/></button>
            </div>
          </div>

          <div className="footer-col links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#services">Specialties</a></li>
              <li><a href="#casestudies">Patient Stories</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="/appointment">Request Appointment</a></li>
            </ul>
          </div>

          <div className="footer-col contact">
            <h4>Contact</h4>
            <p className="muted">appointments@dralexmorgan.com<br/>+1 (555) 987-6543</p>
            <div className="office-hours">
              <strong>Office Hours</strong>
              <p className="muted">Mon–Fri 9:00am — 5:00pm</p>
            </div>
            {/* newsletter removed per request */}
          </div>
        </div>
      </div>

      <div className="copyright">© {new Date().getFullYear()} Dr. Alex Morgan. All rights reserved.</div>
    </footer>
  );
}
