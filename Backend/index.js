const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth.js");
const bookingRoutes = require("./routes/bookingRoutes");
const busRoutes = require("./routes/busRoutes");
const seatRoutes = require("./routes/seatRoutes");

const mongoDBUrl = "mongodb://127.0.0.1:27017/BookMe";
const port = 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/booking", bookingRoutes);
app.use("/bus", busRoutes);
app.use("/seat", seatRoutes);

mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log("The database is connected");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

app.listen(port, () => {
  console.log("App listening on port", port);
});
