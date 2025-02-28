app.post("/signup", async (req, res) => {
    const { name, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const newUser = new User({ name, username, email, password: hashedPassword });
      await newUser.save();
  
      // ✅ JWT Token generate karein
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.json({ message: "Signup successful!", token }); // Token frontend me bhejenge
    } catch (error) {
      res.status(500).json({ error: "Error signing up" });
    }
  });
  