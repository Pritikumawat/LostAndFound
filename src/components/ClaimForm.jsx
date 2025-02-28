import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ClaimForm = () => {
  const { id } = useParams(); // Get found item ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    additionalInfo: "",
    proof: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, proof: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await axios.post(`http://localhost:5000/api/claim-item/${id}`, data);
      alert("Claim request sent successfully!");
      navigate("/found");
    } catch (error) {
      console.error("Error submitting claim:", error);
      alert("Failed to submit claim request.");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Claim Found Item</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg border border-gray-200 text-black">
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />

        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />

        <textarea name="additionalInfo" placeholder="Additional Info" value={formData.additionalInfo} onChange={handleChange} className="w-full p-2 border rounded"></textarea>

        <input type="file" name="proof" onChange={handleFileChange} className="w-full p-2 border rounded" required />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Submit Claim</button>
      </form>
    </div>
  );
};

export default ClaimForm;
