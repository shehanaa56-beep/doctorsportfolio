import React from 'react';
import './styles/sections.css';
import { FaLightbulb, FaTools, FaChartLine } from 'react-icons/fa';

export default function Process() {
  const steps = [
    { icon: <FaLightbulb />, title: 'Comprehensive Assessment', text: 'Thorough medical history, focused physical exam, and targeted diagnostic testing to identify root causes.' , examples: ['Detailed history-taking', 'Targeted labs and imaging', 'Medication review']},
    { icon: <FaTools />, title: 'Personalized Treatment Plan', text: 'A treatment plan built from best-practice guidelines and tailored to your goals, lifestyle, and preferences.' , examples: ['Medication optimization', 'Lifestyle and nutrition plans', 'Referrals to specialists when needed']},
  { icon: <FaChartLine />, title: 'Ongoing Follow-up', text: 'Regular monitoring, outcome tracking, and iterative adjustments to keep you on a steady path toward better health.' , examples: ['Regular check-ins and remote monitoring', 'Lab result follow-up', 'Long-term care coordination'] }
  ];
  return (
    <section id="process" className="process-section">
      <h2>Our Clinical Approach</h2>
      <p style={{maxWidth:800, margin:'0 auto 18px', textAlign:'center'}}>We combine modern diagnostics, guideline-driven medicine, and shared decision-making to create care plans that fit each patient. Below is how we typically work together from first visit through long-term care.</p>
      <div className="process-steps">
        {steps.map((s, i) => (
          <div className="process-card glass-card" key={i}>
            <div className="proc-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            {s.examples && (
              <ul style={{textAlign:'left', marginTop:8}}>
                {s.examples.map((ex, idx) => <li key={idx} style={{fontSize:13, color:'#d1eaf8'}}>{ex}</li>)}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
