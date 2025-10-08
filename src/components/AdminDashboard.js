import React from 'react';
import './styles/sections.css';
import AdminPanel from './AdminPanel';

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <header className="glass-card" style={{padding:16, marginBottom:12}}>
      </header>
      <main>
        {/* Reuse AdminPanel for content management */}
        <AdminPanel />
      </main>
    </div>
  );
}
