import React, { useState } from 'react';
import './styles/sections.css';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'contacts'), { ...form, createdAt: new Date() });
      setStatus('Thanks! We received your message.');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('There was an error.');
    }
  };

  return (
    <section id="contact" className="contact-section">
      <h2>Start The Dialogue. We're Listening.</h2>
      <div className="contact-inner">
        <form className="contact-form glass-card" onSubmit={submit}>
          <input name="name" value={form.name} onChange={handle} placeholder="Name" required />
          <input name="email" value={form.email} onChange={handle} placeholder="Email" type="email" required />
          <textarea name="message" value={form.message} onChange={handle} placeholder="Message" required />
          <button type="submit" className="primary">Send Message</button>
          {status && <p className="status">{status}</p>}
        </form>
        <div className="contact-map glass-card">
          <img src="https://www.shutterstock.com/image-photo/doctor-hand-touching-contact-us-260nw-376794199.jpg" alt="map" />
        </div>
      </div>
    </section>
  );
}
