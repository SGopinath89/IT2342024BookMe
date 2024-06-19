const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.post("/addBooking", bookingController.addBooking);
router.get("/reservation", bookingController.getReservation);

module.exports = router;
