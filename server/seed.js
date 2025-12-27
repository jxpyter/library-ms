const mongoose = require('mongoose');
const Book = require('./models/Book');
const Desk = require('./models/Desk');
require('dotenv').config();

const books = [
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', status: 'Available' },
  { title: '1984', author: 'George Orwell', status: 'Available' },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee', status: 'Borrowed' }, // Will need user, but for now just status
  { title: 'Pride and Prejudice', author: 'Jane Austen', status: 'Available' },
  { title: 'Moby Dick', author: 'Herman Melville', status: 'Available' },
];

const desks = Array.from({ length: 10 }, (_, i) => ({ number: i + 1, isOccupied: false }));

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    await Book.deleteMany({});
    await Desk.deleteMany({});
    // await User.deleteMany({}); // Optional: reset users too if needed, but per request just book logic

    // Create a Mock User for assignment
    // const User = require('./models/User'); // Ensure User model is required if not globally
    // Actually let's assume valid user exists or create one inline if we had the model imported.
    // Since I didn't import User model at top of seed.js, let me fix import first or just use ObjectId if I don't validate ref strictly on save (Mongoose checks ref exist usually).
    
    // Better strategy: Create a user properly.
    const User = require('./models/User'); 
    await User.deleteMany({});
    const validUser = new User({ username: 'john_doe', password: '123', membershipType: 'Basic' });
    await validUser.save();

    const booksWithStatus = [
        { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', status: 'Available' },
        { title: '1984', author: 'George Orwell', status: 'Available' },
        { 
            title: 'To Kill a Mockingbird', 
            author: 'Harper Lee', 
            status: 'Borrowed',
            borrowedBy: validUser._id,
            dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days overdue
        },
        { title: 'Pride and Prejudice', author: 'Jane Austen', status: 'Available' },
        { title: 'Moby Dick', author: 'Herman Melville', status: 'Available' },
    ];

    await Book.insertMany(booksWithStatus);
    await Desk.insertMany(desks);

    console.log('Database Seeded with Overdue Book!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
