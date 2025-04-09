const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateTokenAndSetCookie = (user_id, res) => {
  const token = jwt.sign({ user_id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  
  res.cookie("jwt", token, {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    httponly: false,
    sameSite: "strict",
    secure: false,
  });
};

module.exports = { generateTokenAndSetCookie };
