// server.js - Entry point for the backend
import "dotenv/config";
import app from "./src/app.js";
import { connectDB } from "./src/config/database.js";

const PORT = process.env.PORT || 5000;

// Connect to MySQL, then start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server due to database error:", err.message);
    process.exit(1);
  });
