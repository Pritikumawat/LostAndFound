import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Found = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/found-items")
      .then(async (response) => {
        let fetchedItems = Array.isArray(response.data) ? response.data : [];

        setItems(fetchedItems);
      })
      .catch((error) => {
        console.error("Error fetching found items:", error);
        setItems([]); // ✅ Prevent errors if API fails
      });
  }, []);

  // ✅ Filter items only when searchTerm is not empty
  const displayedItems =
    searchTerm === ""
      ? items
      : items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Found Items</h2>

      {/* Search & Report Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-10">
        <div className="w-full md:w-1/2 flex justify-end">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            placeholder="Search found items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <button
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600"
            onClick={() => navigate("/report?status=found")}
          >
            Report Found Item
          </button>
        </div>
      </div>

      {/* Found Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <p className="text-gray-600">Location: {item.location || "Unknown"}</p>
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
