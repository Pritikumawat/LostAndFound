const express = require("express");
const Feedback = require("../models/Feedback");

const router = express.Router();

// ✅ POST API: Save Feedback to Database
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // ✅ Data Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // ✅ New Feedback Entry
    const newFeedback = new Feedback({ name, email, message });
    await newFeedback.save();

    res.status(201).json({ message: "✅ Feedback submitted successfully!" });
  } catch (error) {
    console.error("❌ Error saving feedback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ GET API: Fetch All Feedbacks (Optional)
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("❌ Error fetching feedbacks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;