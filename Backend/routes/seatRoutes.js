const express = require("express");
const router = express.Router();
const seatController = require("../controllers/seatController");

router.post("/", seatController.addSeat);
router.get("/seat-booking/:busId", seatController.getSeatsByBus);
router.post("/addSeat", seatController.addSeatToBus);
router.post("/book-seat", seatController.bookSeat);

module.exports = router;
