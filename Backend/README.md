# 🚌 BookMe — Backend API

A RESTful backend API for the **BookMe** bus ticket booking platform, built with **Node.js**, **Express**, and **MongoDB**.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Data Models](#data-models)
- [Getting Started](#getting-started)
- [Environment & Configuration](#environment--configuration)
- [Scripts](#scripts)

---

## Overview

The BookMe backend serves as the core API layer for the bus ticket reservation system. It handles:

- **User authentication** — registration, login, and JWT-based session management
- **Bus management** — listing available buses and routes
- **Seat management** — viewing and reserving seats per bus
- **Booking management** — creating, retrieving, and managing ticket bookings

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Express.js** v4 | Web framework & routing |
| **MongoDB** | NoSQL database |
| **Mongoose** v8 | ODM for MongoDB |
| **bcrypt** v5 | Password hashing |
| **jsonwebtoken** v9 | JWT authentication |
| **cors** | Cross-Origin Resource Sharing |
| **nodemon** | Development auto-restart |

---

## Project Structure

```
Backend/
├── index.js              # App entry point — Express setup, DB connection
├── package.json          # Project metadata and dependencies
├── .gitignore
├── middleware/
│   └── authMiddleware.js # JWT verification middleware
├── Models/
│   ├── user.js           # User schema (name, email, password)
│   ├── Bus.js            # Bus schema (route, schedule, seats)
│   ├── Seat.js           # Seat schema (bus reference, seat number, status)
│   ├── BookingSchema.js  # Booking schema (user, bus, seats, payment)
│   └── reservationModel.js # Reservation schema
└── routes/
    ├── auth.js           # Authentication routes (register, login)
    ├── busRoutes.js      # Bus listing and search routes
    ├── seatRoutes.js     # Seat availability and reservation routes
    └── bookingRoutes.js  # Booking CRUD routes
```

---

## API Endpoints

### 🔐 Authentication — `/auth`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/auth/register` | Register a new user | ❌ |
| `POST` | `/auth/login` | Login and receive JWT token | ❌ |

### 🚌 Buses — `/bus`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/bus` | Get all available buses | ✅ |
| `GET` | `/bus/search` | Search buses by route/date | ✅ |
| `POST` | `/bus` | Add a new bus | ✅ |

### 💺 Seats — `/seat`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/seat/:busId` | Get seat availability for a bus | ✅ |
| `PUT` | `/seat/reserve` | Reserve selected seats | ✅ |

### 🎫 Bookings — `/booking`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/booking` | Create a new booking | ✅ |
| `GET` | `/booking/my` | Get bookings for logged-in user | ✅ |
| `GET` | `/booking/:id` | Get booking by ID | ✅ |

> **Auth Required ✅** — requests must include a valid JWT in the `Authorization: Bearer <token>` header.

---

## Data Models

### User
```js
{
  name: String,
  email: String (unique),
  password: String (hashed)
}
```

### Bus
```js
{
  route: String,
  departure: Date,
  arrival: Date,
  totalSeats: Number,
  price: Number
}
```

### Seat
```js
{
  busId: ObjectId (ref: Bus),
  seatNumber: String,
  isBooked: Boolean
}
```

### Booking
```js
{
  userId: ObjectId (ref: User),
  busId: ObjectId (ref: Bus),
  seats: [String],
  totalAmount: Number,
  status: String,
  createdAt: Date
}
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/) running locally on port `27017`

### Installation

```bash
# 1. Navigate to the Backend directory
cd Backend

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The server will start on **http://localhost:8080**

---

## Environment & Configuration

The following values are currently hardcoded in `index.js`. For production, move these to a `.env` file:

| Variable | Default Value | Description |
|---|---|---|
| `MONGO_URI` | `mongodb://127.0.0.1:27017/BookMe` | MongoDB connection string |
| `PORT` | `8080` | Server port |
| `JWT_SECRET` | *(set in auth routes)* | Secret key for JWT signing |

**Recommended `.env` setup:**
```env
MONGO_URI=mongodb://127.0.0.1:27017/BookMe
PORT=8080
JWT_SECRET=your_secret_key_here
```

---

## Scripts

| Command | Description |
|---|---|
| `npm start` | Start server using Node.js |
| `npm run dev` | Start server with nodemon (auto-restart on changes) |

---

## Related

- 📦 [Frontend (React + Vite)](../Frontend/README.md) — The BookMe user interface
