import React from 'react';
import './styles/sections.css';
import { FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  const navigate = useNavigate();

  return (
    <header className="nav glass-nav">
      <div className="nav-inner">
        <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <h3>Dr. Alex Morgan</h3>
        </div>
        <nav className="nav-links">
          <button onClick={() => scrollTo('home')}>Home</button>
          <button onClick={() => scrollTo('about')}>About</button>
          <button onClick={() => scrollTo('services')}>Services</button>
          <button onClick={() => scrollTo('caseStudies')}>Case Studies</button>
          <button onClick={() => scrollTo('blog')}>Blog</button>
          <button onClick={() => scrollTo('contact')}>Contact</button>
          <Link to="/admin-dashboard"><button>Login</button></Link>
        </nav>
        <div className="nav-cta">
          <button className="glow" onClick={() => navigate('/appointment')}>Request Appointment</button>
        </div>
        <div className="mobile-menu"><FaBars /></div>
      </div>
    </header>
  );
}
