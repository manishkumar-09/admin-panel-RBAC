const Customer = require("../models/customerModel");

const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, address, notes } = req.body;
    const newCustomer = new Customer({ name, email, phone, address, notes });
    await newCustomer.save();
    res.status(201).json({
      success: true,
      message: "Customer created successfully",
      customer: newCustomer,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error", err });
  }
};

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json({ success: true, customers });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error", err });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedCustomer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }
    res.status(200).json({ success: true, updatedCustomer });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
};
