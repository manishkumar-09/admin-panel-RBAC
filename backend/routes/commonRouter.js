const { Router } = require("express");
const router = Router();
const authRouter = require("../routes/authRoutes");
const userRouter = require("../routes/userRoutes");
const customerRouter = require("../routes/customerRoutes");

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/customer", customerRouter);

module.exports = router;
