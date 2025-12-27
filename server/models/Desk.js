const mongoose = require('mongoose');

const DeskSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true },
  isOccupied: { type: Boolean, default: false }
});

module.exports = mongoose.model('Desk', DeskSchema);
