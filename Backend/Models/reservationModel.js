const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus" },
  seatNumber: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  referenceNumber: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Reservation", ReservationSchema);
