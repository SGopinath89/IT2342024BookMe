const mongoose = require("mongoose");
const BusSchema = new mongoose.Schema({
  BusID: String,
  Departure_City: String,
  Departure_Time: String,
  Arrival_City: String,
  Arrival_Time: String,
  Route_No: Number,
  Price: Number,
  Seat_No: Number,
  Travel_Date: String,
  seats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seat",
    },
  ],
});
const Bus = mongoose.model("busdetails", BusSchema);
module.exports = Bus;
