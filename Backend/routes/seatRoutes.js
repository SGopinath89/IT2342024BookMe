const express = require("express");
const seatRoutes = express.Router();
const Seat = require("../Models/Seat.js");
const Reservation = require("../Models/reservationModel.js");
const busModel = require("../Models/Bus.js");
const verifyToken = require("../middleware/verifyToken");
// Route to add a new seat
seatRoutes.post("/addSeat", verifyToken, async (req, res) => {
  const { seatNumber, busId } = req.body;
  const seat = new Seat({ seatNumber });

  try {
    const savedSeat = await seat.save();
    await busModel.findByIdAndUpdate(busId, {
      $push: { seats: savedSeat._id },
    });
    res.status(201).json(savedSeat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to book a seat
seatRoutes.post("/book-seat", verifyToken, async (req, res) => {
  const { busId, seatNumber } = req.body;
  const userId = req.user.userId; // Get the userId from the request object

  try {
    const bus = await busModel.findById(busId).populate("seats");
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    const seat = await Seat.findOne({ busId, seatNumber });
    if (!seat) {
      return res.status(404).json({ message: "Seat not found" });
    }

    if (seat.isBooked) {
      return res.status(400).json({ message: "Seat already booked" });
    }

    const referenceNumber = generateUniqueReference();
    const reservation = new Reservation({
      busId,
      seatNumber,
      userId,
      referenceNumber,
    });
    await reservation.save();

    seat.isBooked = true;
    seat.bookedBy = userId;
    seat.reservation = reservation._id;
    await seat.save();

    res
      .status(200)
      .json({ message: "Seat successfully booked", referenceNumber });
  } catch (error) {
    console.error("Error booking seat:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// Fetch reservation details
seatRoutes.get("/reservation", verifyToken, async (req, res) => {
  const { busId, seatNumber } = req.query;

  try {
    const reservation = await Reservation.findOne({ busId, seatNumber });
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.status(200).json({ referenceNumber: reservation.referenceNumber });
  } catch (error) {
    console.error("Error fetching reservation details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

function generateUniqueReference() {
  return Math.random().toString(36).substr(2, 9);
}

module.exports = seatRoutes;
