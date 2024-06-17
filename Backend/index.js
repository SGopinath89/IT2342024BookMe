const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const busModel = require("./Models/Bus.js");

const mongoDBUrl = "mongodb://127.0.0.1:27017/BookMe";
const Booking = require("./Models/BookingSchema.js");
const Seat = require("./Models/Seat.js");
const authRoutes = require("./routes/auth.js");
const Reservation = require("./Models/reservationModel.js");
const port = 8080;
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/auth", authRoutes);
//const cors = require("cors");
app.use(express.json());
mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log("The database is Connected");
  })
  .catch((error) => {
    console.log(error);
  });
// Route to insert values for the seat model
app.post("/", async (req, res) => {
  const { busId, seatNumber, isBooked, bookedBy } = req.body;

  try {
    // Create a new seat document
    const newSeat = new Seat({
      busId,
      seatNumber,
      isBooked,
      bookedBy,
    });

    // Save the seat document to the database
    const savedSeat = await newSeat.save();

    // Return the saved seat as JSON response
    res.status(201).json(savedSeat);
  } catch (error) {
    // Handle error
    console.error("Error inserting seat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// API to fetch seat details for a specific bus
app.get("/seat-booking/:busId", async (req, res) => {
  try {
    const busId = req.params.busId;
    const seats = await Seat.find({ busId: busId });
    res.status(200).json(seats);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Route to add a new seat
app.post("/addSeat", async (req, res) => {
  const { seatNumber, busId } = req.body;

  const seat = new Seat({ seatNumber });
  try {
    const savedSeat = await seat.save();

    await Bus.findByIdAndUpdate(busId, { $push: { seats: savedSeat._id } });

    res.status(201).json(savedSeat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post("/addBooking", async (req, res) => {
  const { busId, seatId, userId } = req.body;

  const booking = new Booking({
    bus: busId,
    seat: seatId,
    user: userId,
  });

  try {
    const savedBooking = await booking.save();

    // Update seat status
    await Seat.findByIdAndUpdate(seatId, { isBooked: true, bookedBy: userId });
    if (isBooked == true) {
      res.status(201).json(savedBooking);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/getBuses", async (req, res) => {
  try {
    const buses = await BusModel.find();
    return res.status(200).json(buses);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
app.post("/searchBuses", async (req, res) => {
  const { departureCity, arrivalCity, travelDate } = req.body;

  // console.log("Search criteria:", { departureCity, arrivalCity, travelDate });

  try {
    const buses = await busModel.find({
      Departure_City: { $regex: new RegExp(departureCity, "i") },
      Arrival_City: { $regex: new RegExp(arrivalCity, "i") },
      Travel_Date: travelDate,
    });

    if (buses.length === 0) {
      console.log("No buses found matching the criteria.");
    } else {
      //console.log("Found buses:", buses);
    }

    return res.status(200).json(buses);
  } catch (error) {
    console.error("Error fetching buses:", error);
    res.status(500).send({ message: error.message });
  }
});
// Get bus details by ID
app.get("/bus/:busId", async (req, res) => {
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
app.get("/buses", async (req, res) => {
  const { departureCity, arrivalCity } = req.query;

  console.log("Query Params:", { departureCity, arrivalCity });

  try {
    const buses = await busModel.find({
      Departure_City: departureCity,
      Arrival_City: arrivalCity,
    });

    console.log("Found Buses:", buses);
    res.status(200).json(buses);
  } catch (error) {
    console.error("Error fetching buses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/cities", async (req, res) => {
  try {
    // Get unique departure and arrival cities from BusDetails collection
    const departureCities = await busModel.distinct("Departure_City");
    const arrivalCities = await busModel.distinct("Arrival_City");

    // Combine and send the unique cities as response
    const cities = [...departureCities, ...arrivalCities];
    res.json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.post("/book-seat", async (req, res) => {
  const { busId, seatNumber, userId } = req.body;

  try {
    // Find the bus by ID
    const bus = await busModel.findById(busId).populate("seats");

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    // Find the seat by seatNumber
    const seat = await Seat.findOne({ busId, seatNumber });

    if (!seat) {
      return res.status(404).json({ message: "Seat not found" });
    }

    // Check if the seat is already booked
    if (seat.isBooked) {
      return res.status(400).json({ message: "Seat already booked" });
    }

    // Create a reservation
    const referenceNumber = generateUniqueReference(); // Implement this function
    const reservation = new Reservation({
      busId,
      seatNumber,
      userId,
      referenceNumber,
    });
    await reservation.save();

    // Update the seat status and reference to the reservation
    seat.isBooked = true;
    seat.bookedBy = userId;
    seat.reservation = reservation._id;
    await seat.save();

    res
      .status(200)
      .json({ message: "Seat successfully booked", referenceNumber });
  } catch (error) {
    console.error("Error booking seat:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Function to generate a unique reference number (example implementation)
function generateUniqueReference() {
  return Math.random().toString(36).substr(2, 9); // Example of generating a random alphanumeric string
}

// Endpoint to add a new bus
app.post("/buses", async (req, res) => {
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

  const newBus = new busModel({
    BusID,
    Departure_City,
    Departure_Time,
    Arrival_City,
    Arrival_Time,
    Route_No,
    Price,
    Seat_No,
    Travel_Date,
    seats: [], // Assuming seats are initially empty
  });

  try {
    const savedBus = await newBus.save();
    res.status(201).json(savedBus);
  } catch (error) {
    res.status(500).json({ message: "Error adding bus" });
  }
});

app.listen(port, () => {
  console.log("App listing port is ", port);
});
//app.use(cors());
