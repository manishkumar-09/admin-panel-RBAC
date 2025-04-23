const { Router } = require("express");
const { isAdmin, auth } = require("../middlewares/auth");
const {
  getUsers,
  deleteUser,
  getMe,
  assignRole,
} = require("../controllers/userController");
const checkPermission = require("../middlewares/checkPermission");
const router = Router();

// Admin-only user management routes
router.get("/all-users", auth, checkPermission("create_user"), getUsers);
router.post("/:id", auth, isAdmin, deleteUser);
router.patch("/:id/role", auth, isAdmin, assignRole);

//user info
router.get("/me", auth, getMe);

module.exports = router;
