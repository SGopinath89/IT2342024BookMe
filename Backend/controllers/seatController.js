const Seat = require("../Models/Seat");
const Bus = require("../Models/Bus");

exports.addSeat = async (req, res) => {
  const { busId, seatNumber, isBooked, bookedBy } = req.body;
  try {
    const newSeat = new Seat({ busId, seatNumber, isBooked, bookedBy });
    const savedSeat = await newSeat.save();
    res.status(201).json(savedSeat);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getSeatsByBus = async (req, res) => {
  try {
    const busId = req.params.busId;
    const seats = await Seat.find({ busId: busId });
    res.status(200).json(seats);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.addSeatToBus = async (req, res) => {
  const { seatNumber, busId } = req.body;
  const seat = new Seat({ seatNumber });
  try {
    const savedSeat = await seat.save();
    await Bus.findByIdAndUpdate(busId, { $push: { seats: savedSeat._id } });
    res.status(201).json(savedSeat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.bookSeat = async (req, res) => {
  const { busId, seatNumber, userId } = req.body;
  try {
    const bus = await Bus.findById(busId).populate("seats");
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
    res.status(500).json({ message: "Server error" });
  }
};

function generateUniqueReference() {
  return Math.random().toString(36).substr(2, 9);
}
