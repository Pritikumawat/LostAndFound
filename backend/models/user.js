//sign up ka user data
const mongoose = require("mongoose");
const multer = require("multer");

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    username: { type: String, unique: true },
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