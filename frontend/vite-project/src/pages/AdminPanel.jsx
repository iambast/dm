import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPanel() {
  const [disasters, setDisasters] = useState([]);
  const [helpRequests, setHelpRequests] = useState([]);
  const [resolvedDisasters, setResolvedDisasters] = useState([]);
  const [resolvedHelps, setResolvedHelps] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/disasters')
      .then((res) => setDisasters(res.data))
      .catch((err) => console.error("Error fetching disaster reports:", err));

    axios.get('https://disaster-management-backend-5sdj.onrender.com/api/help-requests')
      .then((res) => setHelpRequests(res.data))
      .catch((err) => console.error("Error fetching help requests:", err));
  }, []);

  const handleResolveDisaster = (id) => {
    setResolvedDisasters((prev) => [...prev, id]);
  };

  const handleResolveHelp = (id) => {
    setResolvedHelps((prev) => [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Panel</h1>

      {/* Disaster Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700"> Disaster Reports</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {disasters.map((item) => (
            <div key={item._id} className="bg-white shadow-md p-4 rounded-2xl relative">
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Contact:</strong> {item.contact}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Type:</strong> {item.type}</p>
              <p><strong>Description:</strong> {item.description}</p>

              {!resolvedDisasters.includes(item._id) && (
                <button
                  onClick={() => handleResolveDisaster(item._id)}
                  className="mt-2 px-4 py-1 bg-blue-600 text-white rounded-2xl hover:bg-blue-700"
                >
                  Mark as Resolved
                </button>
              )}

              {resolvedDisasters.includes(item._id) && (
                <div className="absolute top-2 right-2 text-green-600 text-2xl font-bold">✅</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Help Requests Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-700"> Help Requests</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {helpRequests.map((item) => (
            <div key={item._id} className="bg-white shadow-md p-4 rounded-2xl relative">
              <p><strong>Name:</strong> {item.fullName}</p>
              <p><strong>Contact:</strong> {item.phoneNumber}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Need:</strong> {item.familyMembers}</p>
              <p><strong>Details:</strong> {item.helpType}</p>

              {!resolvedHelps.includes(item._id) && (
                <button
                  onClick={() => handleResolveHelp(item._id)}
                  className="mt-2 px-4 py-1 bg-blue-600 text-white rounded-2xl hover:bg-blue-700"
                >
                  Mark as Resolved
                </button>
              )}

              {resolvedHelps.includes(item._id) && (
                <div className="absolute top-2 right-2 text-blue-600 text-2xl font-bold">✅</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
