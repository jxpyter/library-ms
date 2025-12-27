const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Simple plain text for learning or hashed later
  membershipType: { 
    type: String, 
    enum: ['Basic', 'Premium', 'VIP'], 
    default: 'Basic' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
