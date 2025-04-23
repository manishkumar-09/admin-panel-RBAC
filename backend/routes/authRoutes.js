const express = require("express");
const { register, login } = require("../controllers/authController");
const { allowFirstAdminOnly, isAdmin, auth } = require("../middlewares/auth");
const router = express.Router();

router.post("/admin-registration", allowFirstAdminOnly, register);
router.post("/admin/user-register", auth, isAdmin, register);
router.post("/login", login);

module.exports = router;
