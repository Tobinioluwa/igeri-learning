import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { LandingPage } from './pages/LandingPage';
import { Onboarding } from './pages/Onboarding';
import { ChildDashboard } from './pages/ChildDashboard';
import { ChatInterface } from './pages/ChatInterface';
import { ParentDashboard } from './pages/ParentDashboard';
import { TeacherDashboard } from './pages/TeacherDashboard';
import SafetyCenter from './pages/SafetyCenter';
import ParentsGuide from './pages/ParentsGuide';
import Schools from './pages/Schools';
import HowItWorks from './pages/HowItWorks';
import Curriculum from './pages/Curriculum';
import Safety from './pages/Safety';
import ForSchools from './pages/ForSchools';
import Contact from './pages/Contact';
import { useStore } from './lib/store';
import { AnimatePresence } from 'framer-motion';

function App() {
  const { user, profile } = useStore();
  
  return (
    <Router>
      <div className="min-h-screen bg-parchment font-sans text-earth-brown selection:bg-nigerian-green/20 selection:text-nigerian-green">
        <AnimatePresence mode="wait">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/safety-center" element={<SafetyCenter />} />
            <Route path="/parents-guide" element={<ParentsGuide />} />
            <Route path="/schools" element={<Schools />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/for-schools" element={<ForSchools />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={profile ? <ChildDashboard /> : <Navigate to="/onboarding" />} 
            />
            <Route 
              path="/chat" 
              element={profile ? <ChatInterface /> : <Navigate to="/onboarding" />} 
            />
            <Route 
              path="/parent" 
              element={user ? <ParentDashboard /> : <Navigate to="/onboarding" />} 
            />
            <Route 
              path="/teacher" 
              element={<TeacherDashboard />} 
            />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AnimatePresence>
        <Toaster position="top-center" richColors />
      </div>
    </Router>
  );
}

export default App;