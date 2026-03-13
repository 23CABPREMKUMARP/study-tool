import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashboardLayout from './components/DashboardLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AIExplainer from './pages/AIExplainer';
import CodingPractice from './pages/CodingPractice';
import Quiz from './pages/Quiz';
import InterviewSimulator from './pages/InterviewSimulator';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import RoadmapGenerator from './pages/RoadmapGenerator';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <Router>
      <div className="min-h-screen transition-colors duration-300">
        <Routes>
          {/* Public Routes with Navbar */}
          <Route element={
            <>
              <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
              <main className="container mx-auto px-4 py-8">
                <Outlet />
              </main>
            </>
          }>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Dashboard Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ask-ai" element={<AIExplainer />} />
              <Route path="/practice" element={<CodingPractice />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/interview" element={<InterviewSimulator />} />
              <Route path="/resume" element={<ResumeAnalyzer />} />
              <Route path="/roadmap" element={<RoadmapGenerator />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
