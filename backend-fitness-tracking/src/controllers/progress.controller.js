// src/controllers/progress.controller.js - analytics for charts
import { Workout } from "../models/Workout.model.js";

// @desc    Get total volume (sets*reps*weight) per day for last N days
// @route   GET /api/progress/volume-over-time?days=30
// @access  Private
export const getVolumeOverTime = async (req, res, next) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const data = await Workout.getVolumeOverTime(req.user.id, days);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// @desc    Get progression of a specific exercise (max weight over time)
// @route   GET /api/progress/exercise-progress?exerciseName=Bench%20Press
// @access  Private
export const getExerciseProgress = async (req, res, next) => {
  try {
    const { exerciseName } = req.query;
    if (!exerciseName) {
      return res.status(400).json({ error: "exerciseName is required" });
    }
    const progress = await Workout.getExerciseProgress(
      req.user.id,
      exerciseName,
    );
    // Add estimated 1RM using Epley formula: weight * (1 + reps/30)
    const enriched = progress.map((p) => ({
      ...p,
      estimated1RM: Math.round(p.maxWeight * (1 + p.reps / 30)),
    }));
    res.json(enriched);
  } catch (error) {
    next(error);
  }
};
