const User = require("../models/userModel");
const Role = require("../models/roleModel");
//get all user (admin only);

const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("role", "name");
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error", err });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User soft deleted", user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error", err });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.status(200).json({
      success: true,
      message: "User information",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role.name,
        permissions: user.role.permissions,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

const assignRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { roleName } = req.body;

    const user = await User.findById(id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const role = await Role.findOne({ name: roleName });
    if (!role)
      return res.status(400).json({ success: false, message: "Invalid role" });

    //updating user role
    user.role = role._id;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: `Role updated to ${roleName}` });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error", err });
  }
};

module.exports = { getUsers, deleteUser, getMe, assignRole };
