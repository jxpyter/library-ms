const express = require('express');
const router = express.Router();
const User = require('../models/User');
// const jwt = require('jsonwebtoken'); // Assuming we use JWT

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, password, membershipType } = req.body;
    // In a real app, hash password here
    const newUser = new User({ username, password, membershipType });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login (Simple)
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    // Return user info (and token in real app)
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
