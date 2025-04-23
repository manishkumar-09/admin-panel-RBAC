const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Role = require("../models/roleModel");
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
  const { name, email, password, roleName } = req.body;

  try {
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(400).json({
        success: false,
        message: "user is already registered with this email",
      });
    }

    const role = await Role.findOne({ name: roleName });
    if (!role)
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const isAdminBeingCreated = roleName === "admin";
    const isAdminExist = await User.findOne({ role: role._id });

    //prevent anyone from createing admin if one already exist
    if (isAdminBeingCreated && isAdminExist) {
      return res.status(403).json({
        message: "Admin already exist. Only existing admin can create users",
      });
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role._id,
    });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: generateToken(user),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).populate("role");

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    res.status(200).json({
      success: true,
      messsage: "Login successfull",
      token: generateToken(user),
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

module.exports = { register, login };
