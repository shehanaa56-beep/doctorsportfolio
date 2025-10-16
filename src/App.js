import React from 'react';
import './App.css';
import './components/styles/sections.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import CaseStudies from './components/CaseStudies';
import Process from './components/Process';
import CTA from './components/CTA';
import AppointmentPage from './components/AppointmentPage';
import FAQ from './components/FAQ';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
// ... AdminPanel is used inside AdminDashboard; ProtectedRoute not needed for consolidated dashboard

function App() {
  return (
    <BrowserRouter>
      <div className="App">
  <Header />
        <main>
          <Routes>
            <Route path="/" element={<>
              <Hero />
              <About />
              <Services />
              <Testimonials />
              <CaseStudies />
              <Process />
              <CTA />
              <FAQ />
              <Blog />
              <Contact />
            </>} />
            <Route path="/appointment" element={<AppointmentPage />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
