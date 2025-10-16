import React from 'react';
import './styles/sections.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function CTA() {
  const navigate = useNavigate();
  return (
    <section id="cta" className="cta-section">
      <div className="cta-card glass-card">
  <h2>Book an Appointment</h2>
        <motion.button whileHover={{ scale: 1.04 }} className="primary" onClick={() => navigate('/appointment')}>Request an Appointment</motion.button>
      </div>
    </section>
  );
}
