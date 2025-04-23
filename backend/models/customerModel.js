const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Customer name is required"] },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true, unique: true },
    address: { type: String },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["active", "inactive", "lead"],
      default: "active",
    },
    notes: { type: String },
  },
  { timeStamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
