import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import reservationRouter from "./routes/reservationRoute.js";
import { errorMiddleware } from "./middlewares/error.js";

dotenv.config({ path: "./.env" });

const app = express();

// Database Connection
dbConnection();

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5173", // No trailing slash
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Enable credentials
  })
);

// Handle Preflight Requests
app.options("*", cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/reservation", reservationRouter);

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running!" });
});

// Test CORS Route
app.get("/test-cors", (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:5173");
  res.set("Access-Control-Allow-Credentials", "true");
  res.status(200).json({ success: true, message: "CORS Test Successful" });
});

// Error Middleware
app.use(errorMiddleware);

// Export App
export default app;
