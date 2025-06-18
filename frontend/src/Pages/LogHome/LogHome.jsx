import React, { useState } from 'react';
import "../../App.css";
import profileImage from '../../Assets/image.png';
import { useNavigate } from 'react-router-dom';

const LogHome = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (role === 'superadmin') {
      navigate('/SuperAdminLogin');
    } else if (role === 'financialadmin') {
      navigate('/financialadminloging');
    } else if (role === 'profile_jobHandling') {
        navigate('/ProfileAdminLogin');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-orange-100 to-orange-200">
      <div className="p-8 text-center bg-white rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-100 h-80 rounded-lg shadow-md"
            />
          </div>
        </div>
        <div className='justify-center text-center'>
          <h1 className="mb-6 text-4xl font-bold text-orange-600">Part Time Sri Lanka</h1>
          <div className="flex flex-col items-center mb-6">
            <select
              className="px-4 py-2 mb-4 border rounded-full w-64 text-center appearance-none bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="" disabled>Select Admin Role</option>
              <option value="superadmin">Super Admin</option>
              <option value="financialadmin">Financial Admin</option>
              <option value="profile_jobHandling">Profile & Job Handling Admin</option>
            </select>
          </div>
          <div className="flex space-x-4 justify-center text-center">
            <button
              onClick={handleLogin}
              className="px-6 py-3 text-orange-500 transition bg-white border-2 border-orange-500 rounded-full hover:bg-orange-500 hover:text-white font-semibold transform hover:scale-110 duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogHome;