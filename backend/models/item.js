const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  contact: { type: String, required: true },
  imageUrl: { type: String, required: true }, // Image URL
  lat: { type: Number, required: true }, // Latitude
  lng: { type: Number, required: true }, // Longitude
  status: { type: String, enum: ["lost", "found"], default: "lost" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Item", ItemSchema);
