import React, { useEffect, useState, useRef } from 'react';
import './styles/sections.css';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

function Stars({ n = 5 }) {
  return <span className="stars">{'★'.repeat(n)}</span>;
}

export default function Testimonials() {
  const [items, setItems] = useState([]);
  const idx = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    async function fetch() {
      try {
        const snap = await getDocs(collection(db, 'testimonials'));
        setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) { console.error(e); }
    }
    fetch();
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      idx.current = (idx.current + 1) % Math.max(1, items.length || 1);
      setActive(idx.current);
    }, 4500);
    return () => clearInterval(t);
  }, [items.length]);

  const list = items.length ? items : [
    { id: 1, name: 'Jane Doe', company: 'Patient', text: 'Dr. Morgan helped me finally get my health under control — compassionate and thorough care.', rating: 5 }
  ];

  return (
    <section id="testimonials" className="testimonials-section">
  <h2>Patient Stories</h2>
      <div className="test-carousel">
        {list.map((t, i) => (
          <div key={t.id} className={`test-item ${i === active ? 'active' : ''}`}>
            <p className="quote">“{t.text}”</p>
            <div className="meta"><strong>{t.name}</strong> — {t.company} <Stars n={t.rating || 5} /></div>
          </div>
        ))}
      </div>
    </section>
  );
}
