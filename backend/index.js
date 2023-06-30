const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/vehicles", require("./routes/vehicleRoutes"));
app.use("/api/fees", require("./routes/feeRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
