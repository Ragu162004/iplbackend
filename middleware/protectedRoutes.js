const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: No token provided",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized: Invalid token",
        success: false,
      });
    }
    const user = await userModel.findById(decoded.user_id).select("-password");
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized: User not found",
        success: false,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: `Error Occured in Protect Route Middleware: ${error}`,
      success: false,
    });
  }
};

module.exports = { protectedRoute };
