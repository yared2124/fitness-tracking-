import mysql from "mysql2";
import "dotenv/config";

// Create a pool of connections (better performance than single connections)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true, // Queue connections when pool is busy
  connectionLimit: 10, // Maximum number of simultaneous connections
  queueLimit: 0, // Unlimited queue size
});

// Promise wrapper for async/await usage
const promisePool = pool.promise();

// Function to test the database connection
export const connectDB = async () => {
  try {
    const connection = await promisePool.getConnection();
    console.log("MySQL connected successfully");
    connection.release(); // Release connection back to pool
  } catch (error) {
    console.error(`MySQL connection error: ${error.message}`);
    process.exit(1); // Exit if database is unavailable
  }
};

// Export the promise pool so models can execute queries
export { promisePool };
