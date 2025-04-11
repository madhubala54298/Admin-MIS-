const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Ensure you have a db.js file for MySQL connection

// Get all Building Maintenance Projects
router.get('/', (req, res) => {
    const sql = "SELECT * FROM building_maintenance";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error fetching data:", err);
            res.status(500).json({ message: "Server error" });
        } else {
            res.json(result);
        }
    });
});

// Add New Project
router.post('/add', (req, res) => {
    const { project_name, location, total_budget, status, start_date, end_date } = req.body;

    if (!project_name || !location || !total_budget) {
        return res.status(400).json({ message: "Required fields are missing!" });
    }

    const sql = "INSERT INTO building_maintenance (project_name, location, total_budget, status, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [project_name, location, total_budget, status, start_date, end_date], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            res.status(500).json({ message: "Failed to add project" });
        } else {
            res.json({ message: "Project added successfully!", id: result.insertId });
        }
    });
});

module.exports = router;
