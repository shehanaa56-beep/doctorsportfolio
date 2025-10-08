import React, { useEffect, useState } from 'react';
import './styles/sections.css';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        const snap = await getDocs(collection(db, 'faqs'));
        setFaqs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) { console.error(e); }
    }
    fetch();
  }, []);

  const list = faqs.length ? faqs : [
    { id: 1, q: 'Do you accept new patients?', a: 'Yes — we welcome new patients. Use the Request Appointment form to submit your details and preferred times.' },
    { id: 2, q: 'Do you accept insurance?', a: 'We accept most major insurers and can provide superbills for out-of-network patients. Please bring your insurance card to your first visit.' },
    { id: 3, q: 'What should I bring to my first appointment?', a: 'Bring a list of current medications, relevant medical records, and your insurance information. Arrive 10 minutes early to complete intake paperwork.' }
  ];

  return (
    <section id="faq" className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {list.map(f => (
          <details key={f.id} className="glass-card">
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
  <div className="tip-box">Pro Tip: For faster triage, include relevant symptoms and prior medications in your appointment request.</div>
    </section>
  );
}
