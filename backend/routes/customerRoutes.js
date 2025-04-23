const { Router } = require("express");
const router = Router();
const { auth, isAdmin } = require("../middlewares/auth");
const {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
} = require("../controllers/customerController");
const checkPermission = require("../middlewares/checkPermission");

// Create a new customer (Admin or HR)
router.post(
  "/create-customer",
  auth,
  checkPermission("manage_leads"),
  createCustomer
);

router.get(
  "/customers",
  auth,
  checkPermission("view_all_customers"),
  getCustomers
);

router.get(
  "/:id",
  auth,
  checkPermission("view_customer_info"),
  getCustomerById
);

router.patch("/:id", auth, checkPermission("manage_leads"), updateCustomer);

router.delete("/:id", auth, checkPermission("delete_user"), deleteCustomer);

module.exports = router;
