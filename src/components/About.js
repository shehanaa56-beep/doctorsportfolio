import React, { useEffect, useState } from 'react';
import './styles/sections.css';
import { db } from '../firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';

export default function About() {
  const [content, setContent] = useState({ title: '', body: '' });

  useEffect(() => {
    const ref = doc(db, 'site', 'about');
    const unsub = onSnapshot(ref, (d) => {
      if (d.exists()) setContent(d.data());
  else setContent({ title: "About Dr. Alex Morgan", body: 'Board-certified physician with a focus on preventive care, chronic disease management, and patient education. Dr. Morgan combines modern diagnostics with a compassionate approach to help patients achieve lasting health.' });
    }, (err) => console.error('about:onSnapshot', err));
    return () => unsub();
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="container two-col">
        <div className="about-text glass-card">
          <h2>{content.title || "About Dr. Alex Morgan"}</h2>
          <p>{content.body || 'Board-certified physician focused on preventive care, chronic disease management, and patient education.'}</p>
        </div>
        <div className="about-media glass-card">
          <img alt="team" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSOEWTmUggLzdX1Iz9EAmFgj92FgHGYY-ETQ&s" />
        </div>
      </div>
    </section>
  );
}
