// src/routes/workout.routes.js - workout CRUD endpoints (all protected)
import express from "express";
import { body } from "express-validator";
import {
  createWorkout,
  getWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
} from "../controllers/workout.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// All workout routes require authentication
router.use(authMiddleware);

// Validation for creating/updating a workout
const workoutValidation = [
  body("exercises")
    .isArray({ min: 1 })
    .withMessage("At least one exercise required"),
  body("exercises.*.name").notEmpty(),
  body("exercises.*.sets").isInt({ min: 1 }),
  body("exercises.*.reps").isInt({ min: 1 }),
  body("exercises.*.weight").isFloat({ min: 0 }),
];

router.post("/", workoutValidation, createWorkout);
router.get("/", getWorkouts);
router.get("/:id", getWorkoutById);
router.put("/:id", workoutValidation, updateWorkout);
router.delete("/:id", deleteWorkout);

export default router;
