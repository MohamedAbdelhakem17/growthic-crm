// ====== Load Environment Variables ======
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

// Try multiple .env file locations in order of priority
const envFiles = [
  path.join(__dirname, "../.env"),
  path.join(__dirname, "../.env.local"),
];

// Find the first existing .env file
const envPath = envFiles.find((filePath) => fs.existsSync(filePath));

// Load the environment variables
if (envPath) {
  dotenv.config({ path: envPath });
} else {
  console.warn(" No .env file found. Using system environment variables.");
  dotenv.config({ path: path.join(__dirname, "../.env.local") });
}

const express = require("express");

const cors = require("cors");

const databaseConnect = require("./config/database-connection");
const HTTP_STATUS_TEXT = require("./libs/constant/http-status.constant");
const errorMiddlewareHandler = require("./middleware/error-handler.middleware");
const AppError = require("./libs/utils/app-error");
const AppRouterV1 = require("./api/v1/routes");

const app = express();

// ====== Serve Static Uploads ======
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ========== Database connection ==========
databaseConnect();

// ========== Body Parser ==========
app.use(express.json());

// ========== CORS  ==========
const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",")
  : ["http://localhost:3000"];

app.use(
  cors({
    origin: corsOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// ========== APP ROUTER ==========
AppRouterV1(app);

// ========== ROUTE NOT FOUND ==========
app.all(/.*/, (req, res, next) => {
  next(
    new AppError(
      404,
      HTTP_STATUS_TEXT.ERROR,
      `This route ${req.originalUrl} not found.`,
    ),
  );
});

// ========== GLOBAL ERROR HANDLER ==========
app.use(errorMiddlewareHandler);

// ====== Start Server ======
const PORT = process.env.PORT || 7000;
const server = app.listen(PORT, () => {
  console.log(
    `Server running on port: ${PORT} in ${process.env.ENVIRONMENT_MODE} mode`,
  );
});

// ====== Handle Unhandled Promise Rejections ======
process.on("unhandledRejection", (error) => {
  console.error(`Unhandled Rejection: ${error.name} | ${error.message}`);
  server.close(() => process.exit(1));
});
