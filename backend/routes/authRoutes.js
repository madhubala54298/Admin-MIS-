import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// MySQL Database Connection
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "admin_mis",
});

// **Login Route (Without Hashed Password)**
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );

    if (rows.length > 0) {
      res.json({
        success: true,
        message: "Login successful",
        user: rows[0], // Send user data (excluding sensitive fields)
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
