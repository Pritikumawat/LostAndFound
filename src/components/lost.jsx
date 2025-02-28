import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const Lost = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(""); // ✅ Category Filter
  const [locationFilter, setLocationFilter] = useState(""); // ✅ Location Filter
  const navigate = useNavigate();

  useEffect(() => {
      axios
          .get("http://localhost:5000/api/lost-items")
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
            console.error("Error fetching lost items:", error);
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
  // Filter items only when searchTerm is not empty
  const displayedItems =
    searchTerm === ""
      ? items
      : items.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <div className="mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Lost Items</h2>

      {/* Search & Report Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-10">
        <div className="w-full md:w-1/2 flex justify-end">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            placeholder="Search lost items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600"
            onClick={() => navigate("/report?status=lost")}
          >
            Report Lost Item
          </button>
        </div>
      </div>

      {/* Lost Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedItems.length > 0 ? (
          displayedItems.map((item) => (
              <div key={item._id} className="bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:shadow-xl transition"
              onClick={() => navigate(`/verified/${item._id}`)}>
              <img
                src={item.imageUrl ? `http://localhost:5000${item.imageUrl}` : "/default-image.png"}
                alt={item.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-lg font-bold mt-2">{item.name}</h3>
              <p className="text-gray-600">Location: {item.placeName}</p>
              <p className="text-gray-500 text-sm">Date: {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Unknown"}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 w-full">No lost items found.</p>
        )}
      </div>
    </div>
  );
};

export default Lost;
