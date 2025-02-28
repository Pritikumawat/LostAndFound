const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const Item = require("../models/item");

dotenv.config();
const router = express.Router();

// ✅ Multer Setup for Proof Image
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ Setup Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ POST API: Send Claim Email to Item Reporter
router.post("/verify-claim", upload.single("proofImage"), async (req, res) => {
  try {
    const { name, email, itemId } = req.body;
    if (!req.file) return res.status(400).json({ error: "Proof image is required!" });

    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ error: "Lost item not found!" });

    // ✅ Send Email to Reporter
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: item.contact, // ✅ Send email to the original reporter
      subject: `Lost Item Claim Request for ${item.name}`,
      html: `
        <p><b>${name}</b> wants to claim your lost item <b>${item.name}</b>.</p>
        <p>Email: ${email}</p>
        <p>Proof Image:</p>
    <img src="http://localhost:5000/uploads/${req.file.filename}" width="300"/>
    <p><a href="http://localhost:5000/uploads/${req.file.filename}">View Proof</a></p>
        <p>If this is your item, please confirm.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Claim request sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

module.exports = router;
