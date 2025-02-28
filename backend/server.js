const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const itemRoutes = require("./routes/itemRoutes");
const claimRoutes = require("./routes/claimRoutes");
const FoundclaimRoutes = require("./routes/FoundclaimRoutes");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected")).catch(err => console.log("connection failed",err));
app.get("/", (req, res) => {
    res.send("Hello, MERN App is Running!");
});
  

app.use('/api', itemRoutes);  
app.use("/api", claimRoutes); // ✅ Claim Request Routes
app.use("/api", FoundclaimRoutes);


  app.listen(5000, () => console.log(`🚀 Server running on port 5000`));