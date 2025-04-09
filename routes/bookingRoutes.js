const express = require("express");

const {
  createBooking,
  getUserBookings,
  cancelBooking,
} = require("../Controller/bookingController");
const { protectedRoute } = require("../middleware/protectedRoutes");


const router = express.Router();

router.post("/bookTicket", createBooking);
router.get("/getAllBooking", getUserBookings);
router.delete("/deleteBooking", cancelBooking);

module.exports = router;
