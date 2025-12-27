const express = require('express');
const router = express.Router();
const Desk = require('../models/Desk');
const Reservation = require('../models/Reservation');

// Get all desks
router.get('/', async (req, res) => {
  try {
    const desks = await Desk.find();
    res.json(desks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create Desk (Admin)
router.post('/', async (req, res) => {
  try {
    const newDesk = new Desk(req.body);
    await newDesk.save();
    res.status(201).json(newDesk);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reserve a desk
router.post('/reserve', async (req, res) => {
  try {
    const { userId, deskId, startTime, endTime } = req.body;
    
    // Logic: Duration must be between 1 and 4 hours
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationHours = (end - start) / (1000 * 60 * 60);

    if (durationHours < 1 || durationHours > 4) {
      return res.status(400).json({ 
        error: 'Reservation must be between 1 and 4 hours',
        logic: 'Check durationHours >= 1 && durationHours <= 4'
      });
    }

    // Check availability (Mocking simple overlap check)
    // In real app, check if existing reservation overlaps
    
    const newReservation = new Reservation({
      user: userId,
      desk: deskId,
      startTime,
      endTime
    });
    
    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
