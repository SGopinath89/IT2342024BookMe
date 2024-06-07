// models/Reservation.js
const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  BusID: String,
  Departure_City: String,
  Departure_Time: String,
  Arrival_City: String,
  Travel_Date: String,
});

const ReservationModel = mongoose.model("BusReservation", ReservationSchema);

module.exports = ReservationModel;
