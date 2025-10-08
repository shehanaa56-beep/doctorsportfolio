import React, { useEffect, useState } from 'react';
import './styles/sections.css';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function CaseStudies() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        const snap = await getDocs(collection(db, 'caseStudies'));
        setCases(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) { console.error(e); }
    }
    fetch();
  }, []);

  const list = cases.length ? cases : [
    { id: 1, year: 2024, title: 'Patient Recovery Story', summary: 'Improved chronic condition management leading to better quality of life.', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80' }
  ];

  return (
    <section id="caseStudies" className="casestudies-section">
      <h2>Patient Recovery Stories</h2>
      <div className="case-grid">
        {list.map(c => (
          <div key={c.id} className="case-card glass-card">
            <div className="case-img"><img src={c.image} alt={c.title} /></div>
            <div className="case-body">
              <span className="year">{c.year}</span>
              <h3>{c.title}</h3>
              <p>{c.summary}</p>
              <button className="read-more">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
