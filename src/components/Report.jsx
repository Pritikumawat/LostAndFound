// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";
// import Mapcomponent from "./Mapcomponent";
// import MapReport from "./MapReport";
// const ReportItem = () => {
//   const location = useLocation();
//   const isLost = location.pathname.includes("lost");
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     category: "Electronics",
//     location: "",
//     contact: "",
//     status: isLost ? "lost" : "found",
//     image: null,
//     lat: null,
//     lng: null,
//   });

//   const navigate = useNavigate();
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   // ✅ Handle map click selection
//   const handleMapSelect = (lat, lng) => {
//     setFormData({ ...formData, lat, lng });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       data.append(key, formData[key]);
//     });

//     try {
//       await axios.post("http://localhost:5000/api/report-item", data);
//       alert(`${isLost ? "Lost" : "Found"} item reported successfully!`);
//       navigate("/"); // Redirect to home or lost items page
//     } catch (error) {
//       console.error("Error reporting item:", error);
//       alert(`Failed to report ${isLost ? "Lost" : "Found"} item.`);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 max-w-lg ">
//       <h2 className="text-2xl font-bold mb-4 text-center">
//         RReport {isLost ? "Lost" : "Found"} Item
//       </h2>
//       <form
//         onSubmit={handleSubmit}
//         className="space-y-4 bg-white p-6 rounded-lg shadow-lg border border-gray-200 text-black"
//       >
//         <input
//           type="text"
//           name="name"
//           placeholder="Item Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         ></textarea>

//         {/* ✅ Map Component for Location Selection */}
//         <label className="block font-medium text-gray-700">
//           Mark {isLost ? "Last Seen" : "Found"}
//         </label>
//         <div className="w-full h-[300px] border border-gray-300 rounded-lg overflow-hidden">
//           <Mapcomponent onSelectLocation={handleMapSelect} />
//         </div>

//         {/* ✅ Location Field (Auto-updated on map click) */}
//         <input
//           type="text"
//           name="location"
//           placeholder="Click on the map to select location"
//           value={formData.location}
//           readOnly
//           className="w-full p-2 border rounded bg-gray-100"
//           required
//         />

//         <input
//           type="text"
//           name="contact"
//           placeholder="Contact Info"
//           value={formData.contact}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="file"
//           name="image"
//           onChange={handleFileChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-green-500 text-black p-2 rounded hover:bg-blue-600"
//         >
//           Report this {isLost ? "lost" : "found"} item
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ReportItem;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import MapReport from "./MapReport"; // ✅ Using MapReport for selecting location

const ReportItem = () => {
  const location = useLocation();
  const isLost = location.pathname.includes("lost");

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

  const navigate = useNavigate();

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
    setFormData({ ...formData, lat, lng, location: placeName });
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
    <div className="container mx-auto p-4 max-w-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Report {isLost ? "Lost" : "Found"} Item
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
          placeholder="Contact Info"
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
      </form>
    </div>
  );
};

export default ReportItem;
