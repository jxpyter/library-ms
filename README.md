# Library Management System - Learning Project 📚

A full-stack library management application designed as an educational tool to demonstrate core web development logic, state management, and full-stack integration.

Built with **Next.js 16**, **Express.js**, and **MongoDB**.

## 🚀 Features

### for Users
- **Desk Reservation System**: users can reserve desks for specific time slots (Logic: 1h min - 4h max).
- **Book Lending**: Borrow books, view due dates, and see automatic fine calculations for overdue items.
- **Membership Tiers**: 
  - **Basic**: Water only.
  - **Premium**: Free Hot Drinks.
  - **VIP**: Unlimited Food & Drink access.
- **"Explain Logic" Mode**: Interactive tutorials (powered by `intro.js`) that explain the underlying code logic to the user in real-time.

### for Developers (Learning Goals)
- **Monorepo Structure**: Separate Client and Server handling.
- **DB Modeling**: Mongoose schemas for complex relationships (User -> Reservation -> Desk).
- **Logic Validation**: Backend validation sharing logic with Frontend UI.
- **Dynamic Time Calculation**: Real-time overdue fine calculation.

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 (App Router), TailwindCSS, Lucide React, Axios.
- **Backend**: Node.js, Express.js, Mongoose.
- **Database**: MongoDB (Local or Atlas).
- **Tools**: Intro.js (for tutorials).

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB installed locally or a URI for Atlas.

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/library-management-system.git
cd library-management-system
```

### 2. Backend Setup
```bash
cd server
npm install
```

**Configure Environment:**
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/library-sys
```

**Seed Database (Optional):**
Populate the database with dummy books, desks, and users.
```bash
node seed.js
```

**Run Server:**
```bash
npm run dev
```
*Server runs on http://localhost:5000*

### 3. Frontend Setup
Open a new terminal:
```bash
cd client
npm install
npm run dev
```
*Client runs on http://localhost:3000*

## 🧪 Usage Guide

1. **Register/Login**: use `john_doe` / `123` (created by seed) or register a new user.
2. **Dashboard**: Check your membership status and privileges.
3. **Desks**: Click "Explain Logic" to understand how the reservation system works code-wise.
4. **Books**: Borrow a book. If you are logged in as `john_doe`, check "To Kill a Mockingbird" to see the **Overdue Fine** logic in action.

## 📝 License
This project is for educational purposes.
