const express = require("express");
const busRoutes = express.Router();
const busModel = require("../Models/Bus.js");
const Seat = require("../Models/Seat.js");
const verifyToken = require("../middleware/verifyToken");
// API to fetch seat details for a specific bus
busRoutes.get("/seat-booking/:busId", verifyToken, async (req, res) => {
  try {
    const busId = req.params.busId;
    const seats = await Seat.find({ busId: busId });
    res.status(200).json(seats);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Route to add a new bus
// busRoutes.post("/buses", verifyToken, async (req, res) => {
//   const {
//     BusID,
//     Departure_City,
//     Departure_Time,
//     Arrival_City,
//     Arrival_Time,
//     Route_No,
//     Price,
//     Seat_No,
//     Travel_Date,
//   } = req.body;

//   const newBus = new busModel({
//     BusID,
//     Departure_City,
//     Departure_Time,
//     Arrival_City,
//     Arrival_Time,
//     Route_No,
//     Price,
//     Seat_No,
//     Travel_Date,
//     seats: [], // Assuming seats are initially empty
//   });

//   try {
//     const savedBus = await newBus.save();
//     res.status(201).json(savedBus);
//   } catch (error) {
//     res.status(500).json({ message: "Error adding bus" });
//   }
// });

// Get bus details by ID
busRoutes.get("/bus/:busId", verifyToken, async (req, res) => {
  const { busId } = req.params;
  try {
    const bus = await busModel.findOne({ _id: busId });
    if (bus) {
      return res.status(200).json(bus);
    } else {
      return res.status(404).send({ message: "Bus not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Search buses endpoint
busRoutes.post("/searchBuses", verifyToken, async (req, res) => {
  const { departureCity, arrivalCity } = req.body;

  try {
    const buses = await busModel.find({
      Departure_City: departureCity,
      Arrival_City: arrivalCity,
    });

    const busDetailsWithSeats = await Promise.all(
      buses.map(async (bus) => {
        const availableSeats = await Seat.countDocuments({
          busId: bus._id,
          isBooked: false,
        });
        return { ...bus.toObject(), availableSeats };
      })
    );

    res.status(200).json(busDetailsWithSeats);
  } catch (error) {
    console.error("Error searching buses:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch unique cities
busRoutes.get("/cities", verifyToken, async (req, res) => {
  try {
    const departureCities = await busModel.distinct("Departure_City");
    const arrivalCities = await busModel.distinct("Arrival_City");

    const cities = [...departureCities, ...arrivalCities];
    res.json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = busRoutes;
