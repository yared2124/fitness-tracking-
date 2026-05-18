// src/middleware/error.middleware.js - global error handler
// This catches any errors passed via next(error) in controllers
const errorMiddleware = (err, req, res, next) => {
  console.error(err); // Log full error for debugging

  // Handle MySQL duplicate entry error (code 1062)
  if (err.code === "ER_DUP_ENTRY") {
    return res.status(400).json({ error: "Duplicate entry" });
  }

  // Default error response
  res.status(500).json({ error: err.message || "Server error" });
};

export default errorMiddleware;
