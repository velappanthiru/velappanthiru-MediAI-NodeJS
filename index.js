require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const routes = require("./routes"); // Import merged routes
const { sequelize } = require("./models");
const ErrorHandler = require("./utils/errorHandler");

const app = express();
const PORT = process.env.PORT || 3100;

app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:5000', 'https://mediai-cqe9.onrender.com/']; // Add your domains here

  // Check if the origin of the request is in the allowedOrigins array
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


// Middleware to parse JSON
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/uploads", express.static("uploads"));

// All route
app.use("/api", routes);

app.use((err, req, res, next) => {
  // Check if the error is an instance of ErrorHandler
  if (err instanceof ErrorHandler) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }

  // Handle unexpected errors
  res.status(500).json({
    status: "error",
    message: "Something went wrong"
  });
});

// Sync database & start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
