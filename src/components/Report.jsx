import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom"; // ✅ useSearchParams used
import MapReport from "./MapReport"; // ✅ Map for selecting location

const ReportItem = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // ✅ Get Query Parameters
  const isLost = searchParams.get("status") === "lost"; // ✅ Check if 'status' is 'lost' or 'found'

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Electronics",
    location: "",
    contact: "",
    status: isLost ? "lost" : "found",
    image: null,
    lat: "",
    lng: "",
  });

  // ✅ Update input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // ✅ Handle map location selection
  const handleMapSelect = (lat, lng, placeName) => {
    setFormData({ ...formData, lat, lng, location: placeName || `Lat: ${lat}, Lng: ${lng}` });
  };

  // ✅ Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await axios.post("http://localhost:5000/api/report-item", data);
      alert(`${isLost ? "Lost" : "Found"} item reported successfully!`);
      navigate("/"); // ✅ Redirect to home or lost items page
    } catch (error) {
      console.error("Error reporting item:", error);
      alert(`Failed to report ${isLost ? "Lost" : "Found"} item.`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* ✅ Dynamic Header Based on Lost or Found */}
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isLost ? "Report Lost Item" : "Report Found Item"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow-lg border border-gray-200 text-black"
      >
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        ></textarea>

        {/* ✅ New Category Dropdown */}
        <label className="block font-medium text-gray-700">Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-white"
          required
        >
          <option value="Electronics">Electronics</option>
          <option value="Wallet">Wallet</option>
          <option value="Documents">Documents</option>
          <option value="Clothing">Clothing</option>
          <option value="Keys">Keys</option>
          <option value="Jewelry">Jewelry</option>
          <option value="Others">Others</option>
        </select>

        {/* ✅ New Map Component for Selecting Location */}
        <label className="block font-medium text-gray-700">
          Mark {isLost ? "Last Seen" : "Found"} Location:
        </label>
        <div className="w-full h-[300px] border border-gray-300 rounded-lg overflow-hidden">
          <MapReport onSelectLocation={handleMapSelect} />
        </div>

        {/* ✅ Location Field (Auto-updated on map click) */}
        <input
          type="text"
          name="location"
          placeholder="Click on the map to select location"
          value={formData.location}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
          required
        />

        {/* ✅ Marked Latitude & Longitude Fields */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="lat"
            placeholder="Latitude"
            value={formData.lat}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
            required
          />
          <input
            type="text"
            name="lng"
            placeholder="Longitude"
            value={formData.lng}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
            required
          />
        </div>

        <input
          type="text"
          name="contact"
          placeholder="Email"
          value={formData.contact}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Report this {isLost ? "Lost" : "Found"} Item
        </button>
        {console.log("Form Data before submitting:", formData)}

      </form>
    </div>
  );
};

export default ReportItem;
