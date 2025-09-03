const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const dbConnection = require('./config/database');
const ApiError = require("./utils/apiError");
const globalErrorHandler = require("./middlewares/errorMiddleware");
const categoryRoute = require("./routes/categoryRoute");

const app = express();

// Load environment variables
dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));
console.log(`Environment: ${process.env.NODE_ENV}`);

// Connect to database
dbConnection();

// Mount Routes
app.use("/api/v1/categories", categoryRoute);

// Unhandled routes
app.use((req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl}`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});