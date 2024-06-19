const express = require("express");
const Booking = require("../Models/BookingSchema");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// Endpoint to get bookings for the logged-in user
router.get("/my-bookings", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId; // Get the user ID from the token payload
    const bookings = await Booking.find({ user: userId }).populate("bus seat");

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
