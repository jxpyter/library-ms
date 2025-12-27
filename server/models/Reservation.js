const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  desk: { type: mongoose.Schema.Types.ObjectId, ref: 'Desk', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { type: String, enum: ['Active', 'Completed', 'Cancelled'], default: 'Active' }
});

module.exports = mongoose.model('Reservation', ReservationSchema);
