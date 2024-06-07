// Import necessary modules
const mongoose = require("mongoose");

// Define the seat schema
const SeatSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus" }, // Reference to the Bus model
  seatNumber: String,
  isBooked: { type: Boolean, default: false },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  }, // Reference to the User model
});

// Create and export the Seat model
module.exports = mongoose.model("Seat", SeatSchema);
