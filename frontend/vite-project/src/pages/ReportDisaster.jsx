import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ReportDisaster() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    location: '',
    type: '',
    description: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "contact" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://disaster-management-backend-5sdj.onrender.com/api/disasters/report', formData);
      console.log('Disaster Report Submitted:', response.data);

      alert('Disaster reported successfully!');
      setFormData({
        name: '',
        contact: '',
        location: '',
        type: '',
        description: '',
      });

      //navigate('/live-alerts'); // or your desired page
    } catch (error) {
      console.error('Error reporting disaster:', error);
      alert('Failed to report disaster. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF5FF] py-10 px-6 md:px-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Report a Disaster</h1>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#667EEE]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            name="contact"
            pattern="[0-9]{10}"
            title="Phone number must be 10 digits"
            required
            value={formData.contact}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#667EEE]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#667EEE]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Disaster Type</label>
          <select
            name="type"
            required
            value={formData.type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#667EEE]"
          >
            <option value="">Select Type</option>
            <option value="Flood">Flood</option>
            <option value="Earthquake">Earthquake</option>
            <option value="Fire">Fire</option>
            <option value="Landslide">Landslide</option>
            <option value="Cyclone">Cyclone</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            rows="4"
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#667EEE]"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-[#667EEE] hover:bg-[#4A5AE1] text-white font-semibold py-2 px-4 rounded-md transition"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
}
