// src/models/User.model.js - functions to interact with 'users' table
import bcrypt from "bcryptjs";
import { promisePool } from "../config/database.js";

export const User = {
  // Create a new user (register)
  create: async ({ username, email, password }) => {
    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await promisePool.execute(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
    );
    return { id: result.insertId, username, email };
  },

  // Find user by email (optionally include password for login)
  findByEmail: async (email, includePassword = false) => {
    let query = "SELECT id, username, email, preferences_unit";
    if (includePassword) query += ", password";
    query += " FROM users WHERE email = ?";
    const [rows] = await promisePool.execute(query, [email]);
    return rows[0]; // undefined if not found
  },

  // Find user by username (for uniqueness check)
  findByUsername: async (username) => {
    const [rows] = await promisePool.execute(
      "SELECT id, username, email FROM users WHERE username = ?",
      [username],
    );
    return rows[0];
  },

  // Find user by ID (used in authentication middleware)
  findById: async (id) => {
    const [rows] = await promisePool.execute(
      "SELECT id, username, email, preferences_unit FROM users WHERE id = ?",
      [id],
    );
    return rows[0];
  },

  // Update user preferences (unit: kg or lbs)
  updatePreferences: async (id, unit) => {
    await promisePool.execute(
      "UPDATE users SET preferences_unit = ? WHERE id = ?",
      [unit, id],
    );
  },
};
