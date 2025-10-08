import React, { useState } from 'react';
import './styles/sections.css';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function AppointmentPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', preferredDate: '', note: '' });
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'contacts'), { ...form, type: 'appointment', createdAt: new Date() });
      setStatus('Appointment request sent. We will contact you to confirm.');
      setForm({ name: '', email: '', phone: '', preferredDate: '', note: '' });
    } catch (err) {
      console.error(err);
      setStatus('Error sending request.');
    }
  };

  return (
    <section id="appointment" className="contact-section">
      <h2>Request an Appointment</h2>
      <div className="contact-inner">
        <form className="contact-form glass-card" onSubmit={submit}>
          <input name="name" value={form.name} onChange={handle} placeholder="Full name" required />
          <input name="email" value={form.email} onChange={handle} placeholder="Email" type="email" required />
          <input name="phone" value={form.phone} onChange={handle} placeholder="Phone" />
          <input name="preferredDate" value={form.preferredDate} onChange={handle} placeholder="Preferred date (YYYY-MM-DD)" />
          <textarea name="note" value={form.note} onChange={handle} placeholder="Reason for visit / notes" />
          <div style={{display:'flex', gap:8}}>
            <button className="primary" type="submit">Send Request</button>
            <button type="button" onClick={() => navigate(-1)}>Back</button>
          </div>
          {status && <p style={{marginTop:12}}>{status}</p>}
        </form>

        <div className="contact-map glass-card">
          <h3>Appointment Details</h3>
          <p>Please include any relevant medical history, insurance information, and preferred times. Our office will contact you within 1-2 business days to confirm the appointment.</p>
          <p><strong>Office</strong>: 123 Wellness Ave, Suite 100</p>
          <p><strong>Phone</strong>: +1 (555) 987-6543</p>
          <p><strong>Hours</strong>: Mon–Fri 9:00–17:00</p>
        </div>
      </div>
    </section>
  );
}
