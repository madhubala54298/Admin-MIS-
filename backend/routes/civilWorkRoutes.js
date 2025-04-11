import express from "express";
import db from "../config/db.js";

const router = express.Router();

// Get all civil work projects
router.get("/", async (req, res) => {
  try {
    const [projects] = await db.execute("SELECT * FROM civil_work");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
