const Bus = require("../Models/Bus");
const Seat = require("../Models/Seat");

exports.getBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    return res.status(200).json(buses);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getBusById = async (req, res) => {
  const { busId } = req.params;
  try {
    const bus = await Bus.findOne({ _id: busId });
    if (bus) {
      return res.status(200).json(bus);
    } else {
      return res.status(404).send({ message: "Bus not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getBusesByCities = async (req, res) => {
  const { departureCity, arrivalCity } = req.query;
  try {
    const buses = await Bus.find({
      Departure_City: departureCity,
      Arrival_City: arrivalCity,
    });
    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addBus = async (req, res) => {
  const {
    BusID,
    Departure_City,
    Departure_Time,
    Arrival_City,
    Arrival_Time,
    Route_No,
    Price,
    Seat_No,
    Travel_Date,
  } = req.body;

  const newBus = new Bus({
    BusID,
    Departure_City,
    Departure_Time,
    Arrival_City,
    Arrival_Time,
    Route_No,
    Price,
    Seat_No,
    Travel_Date,
    seats: [],
  });

  try {
    const savedBus = await newBus.save();
    res.status(201).json(savedBus);
  } catch (error) {
    res.status(500).json({ message: "Error adding bus" });
  }
};

exports.getCities = async (req, res) => {
  try {
    const departureCities = await Bus.distinct("Departure_City");
    const arrivalCities = await Bus.distinct("Arrival_City");
    const cities = [...departureCities, ...arrivalCities];
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
