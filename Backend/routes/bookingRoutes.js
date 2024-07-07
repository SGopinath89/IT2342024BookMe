const express = require("express");
const bookingRoutes = express.Router();
const Booking = require("../Models/BookingSchema.js");
const Seat = require("../Models/Seat.js");
const verifyToken = require("../middleware/verifyToken");
const Reservation = require("../Models/reservationModel.js");
const Bus = require("../Models/Bus.js");
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

// Controller function to get user's reservations
bookingRoutes.get("/my-reservations", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId; // Use req.user.userId from middleware
    const reservations = await Reservation.find({ userId }).populate("busId");
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ message: "Error fetching reservations", error });
  }
});
module.exports = bookingRoutes;
