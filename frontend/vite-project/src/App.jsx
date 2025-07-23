import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import Home from './pages/Home';
import ReportDisaster from './pages/ReportDisaster';
import RequestHelp from './pages/RequestHelp';
import AdminRegister from './pages/AdminRegister';

function App() {
  return (
    <AuthProvider>
     
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/report" element={<ReportDisaster />} />
          <Route path="/help" element={<RequestHelp />} />
          <Route path="/adminregister" element={<AdminRegister />} />
        </Routes>
      
    </AuthProvider>
  );
}

export default App;
