import React, { useEffect, useState } from 'react';
import './styles/sections.css';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        const snap = await getDocs(collection(db, 'blogs'));
        setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) { console.error(e); }
    }
    fetch();
  }, []);

  const list = posts.length ? posts : [
    { id: 1, title: 'Managing Chronic Conditions: Practical Tips', date: '2025-01-10', summary: 'Actionable advice for patients to manage chronic illnesses day-to-day.', image: 'https://images.unsplash.com/photo-1588774068891-98f1a1b2d8c8?w=800&q=80' }
  ];

  return (
    <section id="blog" className="blog-section">
  <h2>Clinical Insights & Patient Resources</h2>
      <div className="blog-grid">
        {list.slice(0,4).map(p => (
          <div key={p.id} className="blog-card glass-card">
            <img src="https://cdn.prod.website-files.com/65fda7b5fdef3cef45c71e36/660a8f8a51567d22e94ca353_65676da128834428b5947ca0_b23a9efe-9414-4fc4-91d0-0ae1b72923ce.png" alt={p.title} />
            <div className="blog-body">
              <small>{p.date}</small>
              <h3>{p.title}</h3>
              <p>{p.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
