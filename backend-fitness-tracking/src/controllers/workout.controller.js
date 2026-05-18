// src/controllers/workout.controller.js - workout CRUD operations
import { validationResult } from "express-validator";
import { Workout } from "../models/Workout.model.js";

// @desc    Create a new workout log
// @route   POST /api/workouts
// @access  Private
export const createWorkout = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { date, exercises, notes } = req.body;
    const workout = await Workout.create(req.user.id, {
      date,
      exercises,
      notes,
    });
    res.status(201).json(workout);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all workouts of logged-in user (with optional date filter)
// @route   GET /api/workouts?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
// @access  Private
export const getWorkouts = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    const workouts = await Workout.findByUserId(req.user.id, {
      startDate,
      endDate,
    });
    res.json(workouts);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single workout by ID
// @route   GET /api/workouts/:id
// @access  Private
export const getWorkoutById = async (req, res, next) => {
  try {
    const workout = await Workout.findById(req.params.id, req.user.id);
    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }
    res.json(workout);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a workout (full replacement)
// @route   PUT /api/workouts/:id
// @access  Private
export const updateWorkout = async (req, res, next) => {
  try {
    const success = await Workout.update(req.params.id, req.user.id, req.body);
    if (!success) {
      return res.status(404).json({ error: "Workout not found" });
    }
    res.json({ message: "Workout updated" });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a workout
// @route   DELETE /api/workouts/:id
// @access  Private
export const deleteWorkout = async (req, res, next) => {
  try {
    const deleted = await Workout.delete(req.params.id, req.user.id);
    if (!deleted) {
      return res.status(404).json({ error: "Workout not found" });
    }
    res.json({ message: "Workout removed" });
  } catch (error) {
    next(error);
  }
};
