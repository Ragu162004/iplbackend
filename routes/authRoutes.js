const express = require("express");

const {
  login,
  register,
  logout,
  getMe,
} = require("../Controller/authController");
const { protectedRoute } = require("../middleware/protectedRoutes");

const router = express.Router();

router.get("/me", protectedRoute, getMe);
router.post("/logout", logout);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
