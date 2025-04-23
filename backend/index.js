require("./configs/db");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const commonRouter = require("./routes/commonRouter");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(commonRouter);

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
