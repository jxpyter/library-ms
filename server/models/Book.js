const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Available', 'Borrowed'], 
    default: 'Available' 
  },
  borrowedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  dueDate: { type: Date, default: null }
});

module.exports = mongoose.model('Book', BookSchema);
