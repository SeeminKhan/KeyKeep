const express = require('express');
const router = express.Router();
const Password = require('../models/Password');

// Get all passwords
router.get('/', async (req, res) => {
  try {
    const passwords = await Password.find();
    res.json(passwords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new password
router.post('/', async (req, res) => {
  const { website, username, password } = req.body;

  if (!website || !username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newPassword = new Password({
    website,
    username,
    password
  });

  try {
    const savedPassword = await newPassword.save();
    res.status(201).json(savedPassword);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a password
router.put('/:id', async (req, res) => {
  const { website, username, password } = req.body;

  try {
    const updatedPassword = await Password.findByIdAndUpdate(
      req.params.id,
      { website, username, password },
      { new: true }
    );

    if (!updatedPassword) {
      return res.status(404).json({ message: 'Password not found' });
    }

    res.json(updatedPassword);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// Delete a password
router.delete('/:id', async (req, res) => {
  try {
    const deletedPassword = await Password.findByIdAndDelete(req.params.id);
    if (!deletedPassword) {
      return res.status(404).json({ message: 'Password not found' });
    }
    res.json({ message: 'Password deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
