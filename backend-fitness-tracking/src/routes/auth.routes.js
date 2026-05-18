// src/routes/auth.routes.js - authentication endpoints
import express from "express";
import { body } from "express-validator";
import { register, login, getMe } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Validation rules for registration
router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password min 6 characters"),
  ],
  register,
);

// Login (no validation needed besides presence)
router.post("/login", login);

// Protected route: get current user
router.get("/me", authMiddleware, getMe);

export default router;
