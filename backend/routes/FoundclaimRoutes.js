const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const Item = require("../models/item");
const Claim = require("../models/Foundclaim");// ✅ Import Claim Model
const router = express.Router();

// ✅ Multer setup for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// ✅ Claim Request API
router.post("/claim-item/:id", upload.single("proof"), async (req, res) => {
  try {
    const { name, email, additionalInfo } = req.body;
    const proof = req.file ? req.file.buffer.toString("base64") : null;
    const item = await Item.findById(req.params.id);

    if (!item) return res.status(404).json({ error: "Item not found" });

    // ✅ Store Claim Request in DB
    const newClaim = new Claim({ itemId: req.params.id, name, email, additionalInfo, proof });
    await newClaim.save();

    // ✅ Send Email to the Finder
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "your-email@gmail.com",
      to: item.contact, // ✅ Send email to the person who reported the found item
      subject: "Claim Request for Found Item",
      html: `<p>${name} wants to claim the found item.</p>
             <p>Email: ${email}</p>
             <p>Additional Info: ${additionalInfo}</p>
             <p>Proof:</p>
             <img src="data:image/png;base64,${proof}" style="max-width:200px;"/>
             <p>
               <a href="http://localhost:5000/api/approve-claim/${newClaim._id}">✅ Approve Claim</a>
               &nbsp;&nbsp;
               <a href="http://localhost:5000/api/reject-claim/${newClaim._id}">❌ Reject Claim</a>
             </p>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Claim request sent successfully!" });
  } catch (error) {
    console.error("Error processing claim:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// ✅ Approve Claim API (Removes Found Item)
router.get("/approve-claim/:id", async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);
    if (!claim) return res.status(404).json({ error: "Claim not found" });

    await Item.findByIdAndDelete(claim.itemId); // ✅ Remove item from DB
    await Claim.findByIdAndDelete(req.params.id); // ✅ Remove claim request

    res.send("✅ Claim Approved! The item has been removed from the database.");
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// ✅ Reject Claim API
router.get("/reject-claim/:id", async (req, res) => {
  try {
    await Claim.findByIdAndDelete(req.params.id);
    res.send("❌ Claim Rejected!");
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

module.exports = router;
