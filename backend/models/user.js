//sign up ka user data
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true // Ensure no duplicate emails
    },
    password: {
      type: String,
      required: true
    }
  }, { timestamps: true }); // Adds createdAt & updatedAt
  
  // Create Model
  const User = mongoose.model("User", userSchema);
  
  module.exports = User;