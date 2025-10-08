import React, { useEffect, useState } from 'react';
import './styles/sections.css';
import heroImg from '../assets/hero.jpg';
import { db } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

export default function Hero() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const col = collection(db, 'features');
    const unsub = onSnapshot(col, (snap) => {
      setFeatures(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => console.error(err));
    return () => unsub();
  }, []);

  const list = features.length ? features : [
    { id: 'a', title: 'Patient-centered Care' },
    { id: 'b', title: 'Evidence-based Treatment' },
    { id: 'c', title: 'Advanced Diagnostics' }
  ];

  return (
    <section id="home" className="hero-section">
      <div className="hero-inner">
        <div className="hero-card glass-card">
          <h1>Comprehensive Care. Compassionate Medicine.</h1>
          <p>Dr. Alex Morgan provides personalized medical care focused on long-term wellbeing — thorough diagnosis, up-to-date treatments, and attentive follow-up.</p>
          <div className="hero-actions">
            {list.map(f => (
              <button key={f.id}>{f.title}</button>
            ))}
          </div>
        </div>
        <div className="hero-image">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZnNKiPN7RVFP6o1jwlEDyq9m0xn50PnhUHg&s" alt="Confident professional" />
        </div>
      </div>
    </section>
  );
}
