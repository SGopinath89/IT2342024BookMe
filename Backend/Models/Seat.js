const mongoose = require("mongoose");

const SeatSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus" },
  seatNumber: String,
  isBooked: { type: Boolean, default: false },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reservation",
    default: null,
  },
});

module.exports = mongoose.model("Seat", SeatSchema);
