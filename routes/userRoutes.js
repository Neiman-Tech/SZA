const express = require('express');
const session = require('express-session');
const User = require('../models/User');

const router = express.Router();

// Use session middleware
router.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false
}));

// Create new user
router.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists." });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "Account created successfully!" }); // Send success response
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials, please check and try again" });
    }

    req.session.user = {
      id: user._id,
      email: user.email
    };

    res.status(200).json({ message: "Login successful" }); // Send success response
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update user
router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
