import React, { useState } from 'react';

export default function RequestHelp() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    location: '',
    familyMembers: '',
    helpType: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://disaster-management-backend-5sdj.onrender.com/api/help-requests/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Help request submitted successfully!');
        setFormData({
          fullName: '',
          phoneNumber: '',
          location: '',
          familyMembers: '',
          helpType: '',
        });
      } else {
        console.error('Server error:', data);
        alert('Error submitting help request.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Failed to submit help request. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF5FF] py-10 px-6 md:px-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Request Help</h1>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#667EEE]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            required
            value={formData.phoneNumber}
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Family Members</label>
          <input
            type="number"
            name="familyMembers"
            required
            min="1"
            value={formData.familyMembers}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#667EEE]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type of Help Needed</label>
          <textarea
            name="helpType"
            rows="3"
            required
            value={formData.helpType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#667EEE]"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-[#667EEE] hover:bg-[#4A5AE1] text-white font-semibold py-2 px-4 rounded-md transition"
        >
          Submit Help Request
        </button>
      </form>
    </div>
  );
}
