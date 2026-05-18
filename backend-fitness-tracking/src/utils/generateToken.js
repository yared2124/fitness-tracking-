// src/utils/generateToken.js - create JWT token for authenticated users
import jwt from "jsonwebtoken";

export const generateToken = (id) => {
  // Token expires in 7 days
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
