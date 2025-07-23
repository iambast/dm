import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import shieldLogo from '../assets/shield.png';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isAdmin = localStorage.getItem('role') === 'admin';

  return (
    <nav className="w-full bg-[#667EEE] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-white">
          <img src={shieldLogo} alt="DisasterGuard Logo" className="h-10 w-10" />
          <h1 className="text-2xl font-bold">DisasterGuard</h1>
        </Link>

        <div className="flex gap-3">
          <Link
            to="/"
            className="px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-[#4A5AE1] transition"
          >
            Home
          </Link>
          <Link
            to="/report"
            className="px-4 py-2 bg-[#3B46C7] hover:bg-[#333EA0] text-white rounded-md text-sm font-semibold shadow"
          >
            Report Disaster
          </Link>
          <Link
            to="/help"
            className="px-4 py-2 bg-[#4A5AE1] hover:bg-[#3B46C7] text-white rounded-md text-sm font-semibold shadow"
          >
            Request Help
          </Link>

          {token && isAdmin ? (
            <>
              <Link
                to="/admin"
                className="px-4 py-2 border border-white text-white text-sm rounded-md hover:bg-[#8EA8F6] hover:text-[#1C204A] transition"
              >
                Admin Panel
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-white text-sm rounded-md hover:bg-[#E5EFFF] hover:text-[#1C204A] transition border border-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/AdminRegister"
                className="px-4 py-2 border border-white text-white text-sm rounded-md hover:bg-white hover:text-[#1C204A] transition"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 bg-white text-[#30397F] font-medium text-sm rounded-md hover:bg-[#EEF5FF] transition"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
