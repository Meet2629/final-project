const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const router = express.Router();

// Utility: check if JWT_SECRET is set
const checkJWTSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('Missing JWT_SECRET in environment variables');
  }
};

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ name, email, password: hashedPassword });

    // Check for JWT secret
    checkJWTSecret();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ result: newUser, token });

  } catch (error) {
    console.error("Registration error:", error.message); // 👈 Log actual error
    res.status(500).json({ message: 'Something went wrong', error: error.message }); // 👈 Show it in Postman
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (!existing) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, existing.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Check for JWT secret
    checkJWTSecret();

    const token = jwt.sign({ id: existing._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ result: existing, token });

  } catch (error) {
    console.error("Login error:", error.message); // 👈 Show cause
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

module.exports = router;
