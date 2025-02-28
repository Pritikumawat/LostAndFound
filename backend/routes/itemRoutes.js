const express = require("express");
const multer = require("multer");
const fs = require("fs"); // ✅ File System Module
const Item = require("../models/item");

const router = express.Router();
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Multer Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ POST API: Report Lost/Found Item
router.post("/report-item", upload.single("image"), async (req, res) => {
    try {
        // ✅ Step 1: Check if file is uploaded
        if (!req.file) {
          console.error("❌ Image upload failed: No file received!");
          return res.status(400).json({ error: "Image is required!" });
        }
    
        // ✅ Step 2: Validate Required Fields
        const { name, description, category, location, contact, status, lat, lng } = req.body;
        if (!name || !description || !category || !location || !contact || !status || !lat || !lng) {
          return res.status(400).json({ error: "All fields are required!" });
        }
    

    const newItem = new Item({
      name,
      description,
      category,
      location,
      contact,
      imageUrl: `/uploads/${req.file.filename}`,
      lat: parseFloat(lat),  // ✅ Ensure lat/lng are numbers
      lng: parseFloat(lng),
      status,
    });

    await newItem.save();
    res.status(201).json({ message: "Item reported successfully", newItem });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

router.get("/locations", async (req, res) => {
  try {
    const locations = await Item.find({}, "name status lat lng"); // Fetch only relevant fields
    res.json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ error: "Failed to fetch locations." });
  }
});

// ✅ GET API: Fetch all Lost Items
router.get("/lost-items", async (req, res) => {
  try {
    const items = await Item.find({ status: "lost" }).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    console.error("❌ Error fetching lost items:", error).sort({ createdAt: -1 });;
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// ✅ GET API: Fetch all Found Items
router.get("/found-items", async (req, res) => {
  try {
    const items = await Item.find({ status: "found" }).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    console.error("❌ Error fetching lost items:", error).sort({ createdAt: -1 });;
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
