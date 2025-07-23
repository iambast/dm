import React, { useState } from 'react';

export default function AdminRegister() {
  const [formData, setFormData] = useState({
    adminName: '',
    adminId: '',
    username: '',
    password: '',
    mobile: '',
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
      const res = await fetch('https://disaster-management-backend-5sdj.onrender.com/api/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Admin registered successfully!');
        setFormData({ adminName: '', adminId: '', username: '', password: '', mobile: '' });
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      alert('Error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">Admin Registration</h2>

        <input
          type="text"
          name="adminName"
          placeholder="Admin Name"
          value={formData.adminName}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
        />

        <input
          type="text"
          name="adminId"
          placeholder="Admin ID"
          value={formData.adminId}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
        />

        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          required
          pattern="[0-9]{10}"
          className="w-full p-2 border rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Register Admin
        </button>
      </form>
    </div>
  );
}
