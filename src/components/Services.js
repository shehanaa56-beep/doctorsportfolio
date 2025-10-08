import React, { useEffect, useState } from 'react';
import './styles/sections.css';
import { db } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import { FaChartLine, FaCogs, FaMoneyBillWave, FaGlobe } from 'react-icons/fa';

const icons = {
  strategy: <FaChartLine />,
  operations: <FaCogs />,
  finance: <FaMoneyBillWave />,
  market: <FaGlobe />
};

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const col = collection(db, 'services');
    const unsub = onSnapshot(col, (snap) => {
      setServices(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => console.error('services:onSnapshot', err));
    return () => unsub();
  }, []);

  const fallback = [
    { id: 1, title: 'Primary Care & Wellness', key: 'strategy', desc: 'Preventive care, annual exams, and personalized wellness planning.' },
    { id: 2, title: 'Chronic Disease Management', key: 'operations', desc: 'Ongoing care for diabetes, hypertension, and other conditions.' },
    { id: 3, title: 'Minor Procedures & Office-based Treatments', key: 'finance', desc: 'In-office procedures performed with comfort and safety.' },
    { id: 4, title: 'Diagnostic Services', key: 'market', desc: 'On-site testing and coordination with specialty diagnostics.' }
  ];

  const list = services.length ? services : fallback;

  return (
    <section id="services" className="services-section">
  <h2>Clinical Specialties & Services</h2>
      <div className="services-grid">
        {list.map(s => (
          <div key={s.id} className="service-card glass-card">
            <div className="icon">{icons[s.key] || <FaChartLine />}</div>
            <h3>{s.title}</h3>
            <p>{s.desc || s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
