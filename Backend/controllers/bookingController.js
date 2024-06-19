const Booking = require("../Models/BookingSchema");
const Seat = require("../Models/Seat");

exports.addBooking = async (req, res) => {
  const { busId, seatId, userId } = req.body;
  const booking = new Booking({ bus: busId, seat: seatId, user: userId });
  try {
    const savedBooking = await booking.save();
    await Seat.findByIdAndUpdate(seatId, { isBooked: true, bookedBy: userId });
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReservation = async (req, res) => {
  const { busId, seatNumber } = req.query;
  try {
    const reservation = await Reservation.findOne({ busId, seatNumber });
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.status(200).json({ referenceNumber: reservation.referenceNumber });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
