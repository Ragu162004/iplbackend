const Booking = require("../model/bookingModel");
const Match = require("../model/matchModel");
const User = require("../model/userModel");

const createBooking = async (req, res) => {
  try {
    const { userId, matchId, seats, seatNumber } = req.body;

    if (!userId || !matchId || !seats || !seatNumber) {
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found", success: false });

    const match = await Match.findById(matchId);
    if (!match)
      return res
        .status(404)
        .json({ message: "Match not found", success: false });

    if (match.availableSeats < seats) {
      return res
        .status(400)
        .json({ message: "Not enough seats available", success: false });
    }

    const booking = new Booking({
      userId,
      matchId,
      seats,
      seatNumber,
      bookingDate: new Date(),
    });

    await booking.save();
    match.availableSeats -= seats;


    user.tickets.push({
      matchId: match._id,
      seatNumber: seatNumber,
      bookingDate: new Date(),
    });
    await user.save();
    await match.save();

    res
      .status(201)
      .json({ message: "Booking successful", success: true, booking });
  } catch (error) {
    res.status(500).json({
      message: `Error occurred in Booking Controller`,
      error: error.message,
      success: false,
    });
  }
};
const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.body;

    const bookings = await Booking.find({ userId }).populate("matchId");

    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user", success: false });
    }

    res.status(200).json({
      message: "Successfully fetched the User ticket",
      bookings,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error occurred in GetUserBookings Controller`,
      error: error.message,
      success: false,
    });
  }
};


const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking)
      return res
        .status(404)
        .json({ message: "Booking not found", success: false });

    const match = await Match.findById(booking.match);
    if (match) {
      match.availableSeats += booking.seats;
      await match.save();
    }

    await Booking.findByIdAndDelete(bookingId);

    res
      .status(200)
      .json({ message: "Booking canceled successfully", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  cancelBooking,
};
