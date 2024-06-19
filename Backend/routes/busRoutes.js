const express = require("express");
const router = express.Router();
const busController = require("../controllers/busController");

router.get("/getBuses", busController.getBuses);
router.get("/bus/:busId", busController.getBusById);
router.get("/buses", busController.getBusesByCities);
router.post("/buses", busController.addBus);
router.get("/cities", busController.getCities);

module.exports = router;
