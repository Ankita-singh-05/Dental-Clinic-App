const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// dotenv config
dotenv.config();

// mongodb connection
connectDB();

// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use("/api/v1/users", require("./routes/userRoutes"));

// port
const port = process.env.PORT || 8081

// listen port
app.listen(port, () => {
  console.log(
    `Server is Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgGreen.white
  );
});
