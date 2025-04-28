const express = require('express');
const User = require('../models/User');  
const router = express.Router();

router.post('/users', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.status(201).json(user); 
  } catch (err) {
    res.status(400).json({ error: err.message });  
  }
});


router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);  
  } catch (err) {
    res.status(500).json({ error: err.message });  
  }
});

router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, age }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);  
  } catch (err) {
    res.status(400).json({ error: err.message });  
  }
});

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
