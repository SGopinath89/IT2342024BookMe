const express = require("express");
const bookingRoutes = express.Router();
const Booking = require("../Models/BookingSchema.js");
const Seat = require("../Models/Seat.js");
const verifyToken = require("../middleware/verifyToken");
// Add booking routes here
bookingRoutes.post("/addBooking", verifyToken, async (req, res) => {
  const { busId, seatId, userId } = req.body;

  const booking = new Booking({ bus: busId, seat: seatId, user: userId });

  try {
    const savedBooking = await booking.save();
    await Seat.findByIdAndUpdate(seatId, { isBooked: true, bookedBy: userId });

    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Other booking-related routes

module.exports = bookingRoutes;
