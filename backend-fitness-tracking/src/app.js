// src/app.js - configure Express middleware and routes
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import workoutRoutes from "./routes/workout.routes.js";
import progressRoutes from "./routes/progress.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import { connectDB } from "./config/database.js";

const app = express();

// Connect to MySQL database (top-level await allowed with ES modules)
await connectDB();

// Global middleware
app.use(cors()); // Allow cross-origin requests (for frontend)
app.use(express.json()); // Parse JSON request bodies

// API routes
app.use("/api/auth", authRoutes); // Authentication endpoints
app.use("/api/workouts", workoutRoutes); // Workout CRUD endpoints
app.use("/api/progress", progressRoutes); // Progress analytics endpoints

// Simple health check endpoint (public)
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running" });
});

// Global error handler (must be last)
app.use(errorMiddleware);

export default app;
