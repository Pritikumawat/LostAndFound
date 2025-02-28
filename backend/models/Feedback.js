const mongoose = require("mongoose");

// ✅ Feedback Schema
const FeedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// ✅ Export Model
module.exports = mongoose.model("Feedback", FeedbackSchema);