const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ["admin", "hr", "employee"],
      unique: true,
      required: true,
    },
    permissions: {
      type: [String], //eg,  ["create_user","view_all_user"...etc]
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", roleSchema);
