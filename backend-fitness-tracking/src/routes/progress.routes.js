// src/routes/progress.routes.js - analytics endpoints
import express from "express";
import {
  getVolumeOverTime,
  getExerciseProgress,
} from "../controllers/progress.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();
router.use(authMiddleware); // All progress routes require login

router.get("/volume-over-time", getVolumeOverTime);
router.get("/exercise-progress", getExerciseProgress);

export default router;
