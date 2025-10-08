import React, { useEffect, useState } from 'react';
import './styles/sections.css';
import { auth, db } from '../firebaseConfig';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, doc, setDoc, deleteDoc, getDoc, onSnapshot, query, where, orderBy, updateDoc } from 'firebase/firestore';
import useAdmin from '../hooks/useAdmin';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const { user, isAdmin, loading } = useAdmin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ title: '', key: '', desc: '' });
  const [editingService, setEditingService] = useState(null);
  const [about, setAbout] = useState({ title: '', body: '' });
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState({ title: '' });
  const [editingFeature, setEditingFeature] = useState(null);
  const [adminsDoc, setAdminsDoc] = useState(null);
  const [appointments, setAppointments] = useState([]);

  // user is provided by useAdmin

  async function login(e) {
    e.preventDefault();
    try { await signInWithEmailAndPassword(auth, email, password); } catch (err) { alert(err.message); }
  }

  const navigate = useNavigate();

  // redirect to dashboard after successful login for specific admin
  useEffect(() => {
    if (user && user.email === 'shehanaa@gmail.com') {
      navigate('/admin-dashboard');
    }
  }, [user, navigate]);

  async function logout() { await signOut(auth); }

  async function loadServices() {
    const snap = await getDocs(collection(db, 'services'));
    setServices(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  }

  // real-time subscription for services so admin list updates automatically
  useEffect(() => {
    if (!user || !isAdmin) return;
    const col = collection(db, 'services');
    const unsub = onSnapshot(col, (snap) => {
      setServices(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => console.error('admin services onSnapshot', err));
    return () => unsub();
  }, [user, isAdmin]);

  async function loadFeatures() {
    try {
      const snap = await getDocs(collection(db, 'features'));
      setFeatures(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) { console.error(e); }
  }

  useEffect(() => { if (user && isAdmin) loadServices(); }, [user, isAdmin]);
  useEffect(() => { if (user && isAdmin) loadFeatures(); }, [user, isAdmin]);
  useEffect(() => {
    if (!user || !isAdmin) return;
    const col = collection(db, 'contacts');
    const q = query(col, where('type', '==', 'appointment'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setAppointments(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => console.error('appointments:onSnapshot', err));
    return () => unsub();
  }, [user, isAdmin]);
  useEffect(() => {
    // load the site/admins doc for debugging and clarity (doesn't affect permissions)
    async function fetchAdmins() {
      if (!user) { setAdminsDoc(null); return; }
      try {
        const d = await getDoc(doc(db, 'site', 'admins'));
        if (d.exists()) setAdminsDoc(d.data()); else setAdminsDoc(null);
      } catch (err) { console.error('fetchAdmins', err); setAdminsDoc({ error: String(err) }); }
    }
    fetchAdmins();
  }, [user]);
  

  async function addService(e) {
    e.preventDefault();
    try {
      if (editingService) {
        // update existing service
        await setDoc(doc(db, 'services', editingService.id), newService, { merge: true });
        setEditingService(null);
      } else {
        await addDoc(collection(db, 'services'), newService);
      }
      setNewService({ title: '', key: '', desc: '' });
    } catch (e) { console.error(e); }
  }

  function editService(s) {
    setEditingService(s);
    setNewService({ title: s.title || '', key: s.key || '', desc: s.desc || '' });
  }

  async function deleteServiceById(id) {
    try {
      await deleteDoc(doc(db, 'services', id));
    } catch (e) { console.error(e); }
  }

  async function addFeature(e) {
    e.preventDefault();
    try {
      if (editingFeature) {
        // update
        await setDoc(doc(db, 'features', editingFeature.id), { title: newFeature.title }, { merge: true });
        setEditingFeature(null);
      } else {
        await addDoc(collection(db, 'features'), newFeature);
      }
      setNewFeature({ title: '' });
      loadFeatures();
    } catch (e) { console.error(e); }
  }


  async function editFeature(f) {
    setEditingFeature(f);
    setNewFeature({ title: f.title });
  }

  async function deleteFeature(id) {
    try {
      await deleteDoc(doc(db, 'features', id));
      loadFeatures();
    } catch (e) { console.error(e); }
  }

  async function confirmAppointment(id) {
    try {
      const ref = doc(db, 'contacts', id);
      await updateDoc(ref, { status: 'confirmed', confirmedAt: new Date() });
    } catch (e) { console.error('confirmAppointment', e); }
  }

  async function deleteAppointment(id) {
    try {
      await deleteDoc(doc(db, 'contacts', id));
    } catch (e) { console.error('deleteAppointment', e); }
  }

  async function saveAbout(e) {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'site', 'about'), about);
      alert('Saved');
    } catch (e) { console.error(e); }
  }

  // restore the original business-consulting about text
  async function restoreOldAbout() {
    const original = {
      title: "We Don't Just Consult — We Build Success.",
      body: 'We partner with clients to design and execute practical strategies that drive measurable growth.'
    };
    try {
      await setDoc(doc(db, 'site', 'about'), original, { merge: true });
      setAbout(original);
      alert('About restored to original content');
    } catch (e) { console.error('restoreOldAbout', e); alert('Failed to restore'); }
  }

  // eslint-disable-next-line no-unused-vars
  async function seedExampleData() {
    // add a few example docs for a doctor portfolio
    const examples = [
      { title: 'Primary Care & Wellness', key: 'strategy', desc: 'Preventive care and personalized wellness planning.' },
      { title: 'Chronic Disease Management', key: 'operations', desc: 'Ongoing care for diabetes, hypertension, and more.' }
    ];
    for (const ex of examples) {
      await addDoc(collection(db, 'services'), ex);
    }
    await setDoc(doc(db, 'site', 'about'), { title: 'About Dr. Alex Morgan', body: 'Board-certified physician focused on preventive care, chronic disease management, and patient education.' });
    loadServices();
    alert('Seeded example data');
  }

  if (!user) return (
    <section className="admin-panel glass-card">
      <h2>Login</h2>
      <form onSubmit={login}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button className="primary" type="submit">Sign In</button>
      </form>
    </section>
  );

  if (loading) return <div className="glass-card">Loading...</div>;

  if (!isAdmin) return (
    <section className="admin-panel glass-card">
      <h2>Access Denied</h2>
      <p>Your account is not listed as an admin. Ask the project owner to add your email to `site/admins`.</p>
      <div style={{marginTop:12}}>
        <strong>Debug:</strong>
        <div>Signed in as: {user ? user.email : 'not signed in'}</div>
        <div style={{marginTop:8}}>site/admins document read by app:</div>
        <pre style={{whiteSpace:'pre-wrap', background:'#0f1720', color:'#d1d5db', padding:8, borderRadius:6}}>{adminsDoc ? JSON.stringify(adminsDoc, null, 2) : 'Document not found or not readable'}</pre>
        <div style={{marginTop:8}}>Make sure the document path is <code>site/admins</code> and it has a field <code>emails</code> with an array of admin emails (exact match).</div>
      </div>
      <div><button onClick={logout}>Sign out</button></div>
    </section>
  );

  return (
    <section className="admin-panel">
      <div className="admin-header glass-card">
        <h2>Admin</h2>
        <div>Signed in as {user.email} <button onClick={logout}>Sign out</button></div>
      </div>

      <div className="admin-section glass-card">
        <h3>About</h3>
        <form onSubmit={saveAbout}>
          <input placeholder="Title" value={about.title} onChange={e=>setAbout({...about,title:e.target.value})} />
          <textarea placeholder="Body" value={about.body} onChange={e=>setAbout({...about,body:e.target.value})} />
          <div style={{display:'flex', gap:8}}>
            <button className="primary" type="submit">Save About</button>
            <button type="button" onClick={seedExampleData}>Seed Example Data</button>
            <button type="button" onClick={restoreOldAbout}>Restore Original About</button>
          </div>
        </form>
      </div>

      <div className="admin-section glass-card">
        <h3>Services</h3>
        <form onSubmit={addService}>
          <input placeholder="Title" value={newService.title} onChange={e=>setNewService({...newService,title:e.target.value})} />
          <input placeholder="Key (strategy|operations|finance|market)" value={newService.key} onChange={e=>setNewService({...newService,key:e.target.value})} />
          <input placeholder="Short description" value={newService.desc} onChange={e=>setNewService({...newService,desc:e.target.value})} />
          <div style={{display:'flex', gap:8}}>
            <button className="primary" type="submit">{editingService ? 'Update Service' : 'Add Service'}</button>
            {editingService && <button type="button" onClick={() => { setEditingService(null); setNewService({ title: '', key: '', desc: '' }); }}>Cancel</button>}
            <button type="button" onClick={seedExampleData}>Seed Example Data</button>
          </div>
        </form>

        <div className="service-list">
          {services.map(s=> (
            <div key={s.id} className="glass-card" style={{marginTop:8, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>
                <strong>{s.title}</strong>
                <div>{s.desc}</div>
              </div>
              <div>
                <button onClick={()=>editService(s)}>Edit</button>
                <button onClick={()=>{ if(window.confirm('Delete this service?')) deleteServiceById(s.id); }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="admin-section glass-card">
        <h3>Appointment Requests</h3>
        <p>New appointment requests submitted via the site.</p>
        <div style={{marginTop:12}}>
          {appointments.length === 0 ? <div className="glass-card">No appointment requests.</div> : (
            appointments.map(a => (
              <div key={a.id} className="glass-card" style={{marginTop:8}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div>
                    <strong>{a.name}</strong> — {a.email} {a.phone && `• ${a.phone}`}
                    <div style={{fontSize:13, color:'#d1d5db'}}>{a.preferredDate ? `Preferred: ${a.preferredDate}` : ''}</div>
                    <p style={{marginTop:8}}>{a.note}</p>
                    <div style={{fontSize:12, color:'#9fbfdc'}}>Status: {a.status || 'pending'}</div>
                  </div>
                  <div style={{display:'flex', gap:8}}>
                    {a.status !== 'confirmed' && <button onClick={()=>confirmAppointment(a.id)}>Confirm</button>}
                    <button onClick={()=>{ if(window.confirm('Delete this appointment request?')) deleteAppointment(a.id); }}>Delete</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      

      <div className="admin-section glass-card">
        <h3>Hero Features</h3>
        <form onSubmit={addFeature}>
          <input placeholder="Feature title" value={newFeature.title} onChange={e=>setNewFeature({ title: e.target.value })} />
          <div style={{display:'flex', gap:8}}>
            <button className="primary" type="submit">{editingFeature ? 'Update Feature' : 'Add Feature'}</button>
            {editingFeature && <button type="button" onClick={()=>{ setEditingFeature(null); setNewFeature({title:''}); }}>Cancel</button>}
          </div>
        </form>

        <div className="feature-list" style={{marginTop:12}}>
          {features.map(f => (
            <div key={f.id} className="glass-card" style={{marginTop:8, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>{f.title}</div>
              <div>
                <button onClick={()=>editFeature(f)}>Edit</button>
                <button onClick={()=>{ if(window.confirm('Delete this feature?')) deleteFeature(f.id); }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
