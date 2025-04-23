require("dotenv").config();
const mongoose = require("mongoose");
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl);

mongoose.connection.on("error", (err) => {
  console.log("mongoose connection error");
});

mongoose.connection.on("connected", () => {
  console.log("mongodb connected");
});

module.exports = mongoose;
