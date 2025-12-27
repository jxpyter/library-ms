const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Check food access
router.get('/:userId/access', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    let access = { food: false, drink: false, description: '' };
    
    if (user.membershipType === 'VIP') {
      access = { food: true, drink: true, description: 'Unlimited Food & Drink' };
    } else if (user.membershipType === 'Premium') {
      access = { food: false, drink: true, description: 'Free Hot Drinks' };
    } else {
      access = { food: false, drink: false, description: 'Water only' };
    }
    
    res.json(access);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
