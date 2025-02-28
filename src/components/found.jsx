import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Found = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(""); // ✅ Category Filter
  const [locationFilter, setLocationFilter] = useState(""); // ✅ Location Filter
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/found-items")
      .then(async (response) => {
        let fetchedItems = Array.isArray(response.data) ? response.data : [];
// ✅ Fetch place names for items with latitude & longitude
const updatedItems = await Promise.all(
  fetchedItems.map(async (item) => {
    if (item.lat && item.lng) {
      const placeName = await getPlaceName(item.lat, item.lng);
      return { ...item, placeName };
    }
    return { ...item, placeName: "Unknown Location" };
  })
);
        setItems(updatedItems);
      })
      .catch((error) => {
        console.error("Error fetching found items:", error);
        setItems([]); // ✅ Prevent errors if API fails
      });
  }, []);
    // ✅ Function to fetch location name using Nominatim API
    const getPlaceName = async (lat, lon) => {
      try {
          const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );
          return response.data.display_name || "Unknown Location";
      } catch (error) {
          console.error("Error fetching place name:", error);
          return "Unknown Location";
      }
  };
  // ✅ Filter items based on Search, Category & Location
  const displayedItems = items.filter((item) => {
    const matchesSearch = searchTerm === "" || item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "" || item.category === categoryFilter;
    const matchesLocation = locationFilter === "" || item.placeName.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesCategory && matchesLocation;
  });
  return (
    <div className="mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Found Items</h2>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">

        <input
          className="w-full sm:w-[30%] min-w-[180px] p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 border border-gray-300"
          placeholder="Search by name..."
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full sm:w-[30%] min-w-[120px] p-3 border border-gray-300 rounded-lg outline-none bg-white hover:bg-gray-100"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Wallet">Wallet</option>
          <option value="Documents">Documents</option>
          <option value="Others">Others</option>
        </select>

        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="w-full sm:w-[30%] min-w-[120px] p-3 border border-gray-300 rounded-lg outline-none bg-white hover:bg-gray-100"
        >
          <option value="">All Locations</option>
          {items.map((item) => (
            <option key={item._id} value={item.placeName}>
              {item.placeName}
            </option>
          ))}
        </select>

        <button onClick={() => navigate("/report?status=found")}
          className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Report Found Item
        </button>
      </div>
      {/* Found Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {console.log(displayedItems)}
        {displayedItems.length > 0 ? (
          displayedItems.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:shadow-xl transition"
              onClick={() => navigate(`/claim/${item._id}`)} // ✅ Navigates to Claim Form
            >
              {console.log("Image URL:", item.imageUrl)} {/* ✅ Debugging Image URL */}

              <img
                src={item.imageUrl ? `http://localhost:5000${item.imageUrl}` : "/default-image.png"}
                alt={item.name}
                className="w-full h-48 object-cover rounded-md"
              />

              <h3 className="text-lg font-bold mt-2">{item.name}</h3>
              <p className="text-gray-600">Location: {item.placeName || "Unknown"}</p>
              <p className="text-gray-500 text-sm">
                Date: {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Unknown"}
              </p>

              {/* ✅ Add "Claim Item" Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevents parent `onClick` navigation
                  navigate(`/claim/${item._id}`);
                }}
                className="w-full bg-blue-500 text-white p-2 mt-3 rounded hover:bg-blue-600"
              >
                Claim This Item
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 w-full">
            No found items available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Found;
