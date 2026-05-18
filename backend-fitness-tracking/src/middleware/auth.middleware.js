// src/middleware/auth.middleware.js - verify JWT token and attach user to request
import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

export const authMiddleware = async (req, res, next) => {
  let token;

  // Extract token from Authorization header (Bearer <token>)
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token" });
  }

  try {
    // Verify token using JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Fetch user from database (excluding password)
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    // Attach user object to request for use in controllers
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Not authorized, token failed" });
  }
};
