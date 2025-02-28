const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
  name: String,
  email: String,
  additionalInfo: String,
  proof: String, // Image proof stored as a URL or base64
  createdAt: { type: Date, default: Date.now },
});

const Claim = mongoose.model("Claim", claimSchema);
module.exports = Claim;