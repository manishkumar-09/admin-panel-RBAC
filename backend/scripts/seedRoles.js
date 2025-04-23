const mongoose = require("../configs/db");
const Role = require("../models/roleModel");

const roles = [
  {
    name: "admin",
    permissions: [
      "create_user",
      "delete_user",
      "view_all_customers",
      "manage_leads",
      "view_reports",
      "view_customer_info",
    ],
  },
  {
    name: "hr",
    permissions: [
      "view_all_customers",
      "manage_leads",
      "view_reports",
      "view_customer_info",
    ],
  },
  {
    name: "employee",
    permissions: ["view_self", "view_customer_info"],
  },
];

(async () => {
  try {
    await Role.deleteMany(); //clear exiting roles
    await Role.insertMany(roles); //adding new roles
    console.log("Roles created");
    await mongoose.disconnect();
  } catch (err) {
    console.log("Error seeding roles", err);
  }
})();
