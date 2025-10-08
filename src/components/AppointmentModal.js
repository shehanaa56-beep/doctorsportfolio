import React, { useEffect, useState } from 'react';
import './styles/sections.css';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function AppointmentModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', preferredDate: '', note: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-appointment', handler);
    return () => window.removeEventListener('open-appointment', handler);
  }, []);

  const close = () => { setOpen(false); setStatus(''); setForm({ name: '', email: '', phone: '', preferredDate: '', note: '' }); };

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

  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={close}>
      <div className="modal-card glass-card" onClick={e => e.stopPropagation()}>
        <h3>Request an Appointment</h3>
        <form onSubmit={submit}>
          <input name="name" placeholder="Full name" value={form.name} onChange={handle} required />
          <input name="email" placeholder="Email" type="email" value={form.email} onChange={handle} required />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handle} />
          <input name="preferredDate" placeholder="Preferred date (YYYY-MM-DD)" value={form.preferredDate} onChange={handle} />
          <textarea name="note" placeholder="Notes or reason for visit" value={form.note} onChange={handle} />
          <div style={{display:'flex', gap:8}}>
            <button className="primary" type="submit">Send Request</button>
            <button type="button" onClick={close}>Cancel</button>
          </div>
        </form>
        {status && <div style={{marginTop:8}}>{status}</div>}
      </div>
    </div>
  );
}
