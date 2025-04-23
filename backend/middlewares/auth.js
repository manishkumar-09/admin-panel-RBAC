const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Role = require("../models/roleModel");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers?.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer"))
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access: No token" });

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.jwt_secret);
    // Fetch user with populated role
    // console.log(decoded);
    const user = await User.findById(decoded.id).populate("role");

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "User no longer exists" });

    req.user = user;
    next();
  } catch (err) {
    console.error(" Auth error:", err.message);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

// check for admin
const isAdmin = (req, res, next) => {
  if (req.user.role.name !== "admin") {
    return res.status(403).json({
      message: "Access denied : Admins only",
    });
  }
  next();
};

const allowFirstAdminOnly = async (req, res, next) => {
  try {
    const adminRole = await Role.findOne({ name: "admin" });
    const adminExists = await User.findOne({ role: adminRole._id });

    if (adminExists)
      return res.status(403).json({
        success: false,
        message: "Admin already exists. Please login as admin to create users",
      });
    next();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

module.exports = { auth, isAdmin, allowFirstAdminOnly };
