import express from "express";
import mysql from "mysql2";
import cors from "cors";


const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());



// ✅ Connect to MySQL Database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MK14@pdkmm",  // 🔹 Add your MySQL root password here
    database: "admin_mis"
});


db.connect((err) => {
    if (err) {
        console.error("❌ MySQL Connection Error:", err);
    } else {
        console.log("✅ MySQL Database Connected!");
    }
});

// ✅ USER LOGIN API
app.post("/api/auth/login", (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "❌ Server Error!" });
        }
        if (result.length === 0) {
            return res.status(401).json({ message: "❌ Invalid username or password" });
        }
        res.json({ message: "✅ Login Successful!", user: result[0] });
    });
});

// ✅ Fetch All Road Construction Projects
app.get("/road-construction", (req, res) => {
    db.query("SELECT * FROM road_construction", (err, results) => {
        if (err) return res.status(500).send("Error fetching projects: " + err.message);
        res.json(results);
    });
});

// ✅ Add a New Road Construction Project
app.post("/road-construction", (req, res) => {
    const { project_name, location, material_cost, labor_cost, equipment_cost, maintenance_cost, status, start_date, end_date } = req.body;

    const sql = `
        INSERT INTO road_construction (project_name, location, material_cost, labor_cost, equipment_cost, maintenance_cost, status, start_date, end_date) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [project_name, location, material_cost, labor_cost, equipment_cost, maintenance_cost, status, start_date, end_date], (err, result) => {
        if (err) return res.status(500).send("Error adding project: " + err.message);
        res.status(201).send({ message: "Project added successfully ✅", id: result.insertId });
    });
});

// ✅ Delete a Project
app.delete("/road-construction/:id", (req, res) => {
    const projectId = req.params.id;
    db.query("DELETE FROM road_construction WHERE id = ?", [projectId], (err, result) => {
        if (err) return res.status(500).send("Error deleting project: " + err.message);
        res.send({ message: "Project deleted successfully ❌" });
    });
});

// ✅ Update a Project
app.put("/road-construction/:id", (req, res) => {
    const projectId = req.params.id;
    const { project_name, location, material_cost, labor_cost, equipment_cost, maintenance_cost, status, start_date, end_date } = req.body;

    const sql = `
        UPDATE road_construction 
        SET project_name=?, location=?, material_cost=?, labor_cost=?, equipment_cost=?, maintenance_cost=?, status=?, start_date=?, end_date=?
        WHERE id=?
    `;

    db.query(sql, [project_name, location, material_cost, labor_cost, equipment_cost, maintenance_cost, status, start_date, end_date, projectId], (err, result) => {
        if (err) return res.status(500).send("Error updating project: " + err.message);
        res.send({ message: "Project updated successfully ✏️" });
    });
});
    //building-maintenace
// Fetch All Projects
app.get("/api/building-maintenance", (req, res) => {
    db.query("SELECT * FROM building_maintenance", (err, result) => {
      if (err) {
        res.status(500).send("Error fetching projects");
      } else {
        res.json(result);
      }
    });
  });
  
  // Add New Project
  app.post("/api/building-maintenance", (req, res) => {
    const { name, description, contractor, estimated_cost, approval_status, start_date, end_date } = req.body;
    const sql = "INSERT INTO building_maintenance (name, description, contractor, estimated_cost, approval_status, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?)";
    
    db.query(sql, [name, description, contractor, estimated_cost, approval_status, start_date, end_date], (err, result) => {
      if (err) {
        res.status(500).send("Error adding project");
      } else {
        res.status(201).json({ message: "Project Added Successfully!" });
      }
    });
  });
  
  // Update Project
  app.put("/api/building-maintenance/:id", (req, res) => {
    const { id } = req.params;
    const { name, description, contractor, estimated_cost, approval_status, start_date, end_date } = req.body;
    const sql = "UPDATE building_maintenance SET name=?, description=?, contractor=?, estimated_cost=?, approval_status=?, start_date=?, end_date=? WHERE id=?";
    
    db.query(sql, [name, description, contractor, estimated_cost, approval_status, start_date, end_date, id], (err, result) => {
      if (err) {
        res.status(500).send("Error updating project");
      } else {
        res.json({ message: "Project Updated Successfully!" });
      }
    });
  });
  
  // Delete Project
  app.delete("/api/building-maintenance/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM building_maintenance WHERE id = ?", [id], (err, result) => {
      if (err) {
        res.status(500).send("Error deleting project");
      } else {
        res.json({ message: "Project Deleted Successfully!" });
      }
    });
  });
    

  // Get All Water Supply Projects
app.get("/water-supply", (req, res) => {
    const query = "SELECT * FROM water_supply";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Database Query Error:", err);
        return res.status(500).json({ message: "❌ Server error" });
      }
      res.json(results);
    });
  });
  
  // Add New Project
  app.post("/water-supply", (req, res) => {
    const { name, progress, status } = req.body;
    const query = "INSERT INTO water_supply (name, progress, status) VALUES (?, ?, ?)";
    db.query(query, [name, progress, status], (err) => {
      if (err) {
        console.error("Insert Error:", err);
        return res.status(500).json({ message: "❌ Error adding project" });
      }
      res.json({ message: "✅ Project added successfully!" });
    });
  });

  // Fetch all drainage projects
app.get("/api/drainage-projects", (req, res) => {
    const query = "SELECT * FROM drainage_system";
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "❌ Error fetching projects!" });
      }
      res.json(results);
    });
  });
  
  app.post("/api/drainage-projects", (req, res) => {
    const { name, budget, status } = req.body;
    if (!name || !budget) {
      return res.status(400).json({ message: "❌ Project name and budget are required!" });
    }
    
    const query = "INSERT INTO drainage_system (name, budget, status) VALUES (?, ?, ?)";
    db.query(query, [name, budget, status || "Pending"], (err, result) => {
      if (err) {
        console.error("❌ Database Insert Error:", err);
        return res.status(500).json({ message: "❌ Error adding project!" });
      }
      res.status(201).json({ message: "✅ Project added successfully!" });
    });
  });
  

  // Fetch all bridge projects
app.get("/api/bridge-construction", (req, res) => {
    const query = "SELECT * FROM bridge_construction";
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "❌ Error fetching projects!" });
      }
      res.json(results);
    });
  });
  
  // Add new bridge project
  app.post("/api/bridge-construction", (req, res) => {
    const { projectName, location, materialCost, laborCost, maintenanceCost, status, startDate, endDate } = req.body;
    const query = "INSERT INTO bridge_construction (projectName, location, materialCost, laborCost, maintenanceCost, status, startDate, endDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(query, [projectName, location, materialCost, laborCost, maintenanceCost, status, startDate, endDate], (err) => {
      if (err) {
        return res.status(500).json({ message: "❌ Error adding project!" });
      }
      res.json({ message: "✅ Project added successfully!" });
    });
  });
  
  // ✅ Get All Projects
app.get("/api/land-development", (req, res) => {
    db.query("SELECT * FROM land_development", (err, results) => {
      if (err) {
        console.error("Database Query Error:", err);
        return res.status(500).json({ message: "❌ Server Error" });
      }
      res.json(results);
    });
  });
  // ✅ Add New Project
app.post("/api/land-development/add", (req, res) => {
    const { name, status } = req.body;
    const query = "INSERT INTO land_development (name, status) VALUES (?, ?)";
  
    db.query(query, [name, status], (err, results) => {
      if (err) {
        console.error("Database Insert Error:", err);
        return res.status(500).json({ message: "❌ Error Adding Project" });
      }
      res.status(201).json({ message: "✅ Project Added Successfully!" });
    });
  });


  // SECURITY MANAGEMENT

// Guard Logs
app.get("/api/security/logs", (req, res) => {
  db.query("SELECT * FROM security_logs", (err, result) => {
    if (err) res.status(500).json(err);
    else res.json(result);
  });
});

app.post("/api/security/logs", (req, res) => {
  const { guard_name, shift_time, date, remarks } = req.body;
  db.query(
    "INSERT INTO security_logs (guard_name, shift_time, date, remarks) VALUES (?, ?, ?, ?)",
    [guard_name, shift_time, date, remarks],
    (err) => {
      if (err) res.status(500).json(err);
      else res.sendStatus(200);
    }
  );
});

app.delete("/api/security/logs/:id", (req, res) => {
  db.query("DELETE FROM security_logs WHERE id = ?", [req.params.id], (err) => {
    if (err) res.status(500).json(err);
    else res.sendStatus(200);
  });
});

// Visitor Entry
app.get("/api/security/visitors", (req, res) => {
  db.query("SELECT * FROM security_visitors", (err, result) => {
    if (err) res.status(500).json(err);
    else res.json(result);
  });
});

app.post("/api/security/visitors", (req, res) => {
  const { name, purpose, entry_time, exit_time } = req.body;
  db.query(
    "INSERT INTO security_visitors (name, purpose, entry_time, exit_time) VALUES (?, ?, ?, ?)",
    [name, purpose, entry_time, exit_time],
    (err) => {
      if (err) res.status(500).json(err);
      else res.sendStatus(200);
    }
  );
});

app.delete("/api/security/visitors/:id", (req, res) => {
  db.query("DELETE FROM security_visitors WHERE id = ?", [req.params.id], (err) => {
    if (err) res.status(500).json(err);
    else res.sendStatus(200);
  });
});

// =====================================
// ✅ ADMIN MANAGEMENT SECTION START
// =====================================

// EMPLOYEES
// Get all employees
app.get("/api/employees", (req, res) => {
  db.query("SELECT * FROM employee", (err, results) => {
    if (err) {
      console.error("Error fetching employees:", err);
      return res.status(500).json({ error: "Failed to fetch employees" });
    }
    res.json(results);
  });
});

// Add employee
app.post("/api/employees", (req, res) => {
  const { name, role, department, salary } = req.body;
  const sql = "INSERT INTO employee (name, role, department, salary) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, role, department, salary], (err, result) => {
    if (err) {
      console.error("Error inserting employee:", err);
      return res.status(500).json({ error: "Failed to add employee" });
    }
    res.json({ message: "Employee added successfully" });
  });
});

// Delete employee
app.delete("/api/employees/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM employee WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error deleting employee:", err);
      return res.status(500).json({ error: "Failed to delete employee" });
    }
    res.json({ message: "Employee deleted successfully" });
  });
});


// DEPARTMENTS

// GET all departments
app.get("/api/departments", (req, res) => {
  db.query("SELECT * FROM departments", (err, results) => {
    if (err) {
      console.error("Error fetching departments:", err);
      res.status(500).send("Failed to fetch departments");
    } else {
      res.json(results);
    }
  });
});

// POST a new department
app.post("/api/departments", (req, res) => {
  const { name, head } = req.body;
  if (!name || !head) {
    return res.status(400).send("Missing name or head");
  }

  db.query(
    "INSERT INTO departments (name, head) VALUES (?, ?)",
    [name, head],
    (err, result) => {
      if (err) {
        console.error("Error adding department:", err);
        res.status(500).send("Failed to add department");
      } else {
        res.status(201).send("Department added");
      }
    }
  );
});

// DELETE a department by ID
app.delete("/api/departments/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM departments WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error deleting department:", err);
      res.status(500).send("Failed to delete department");
    } else {
      res.send("Department deleted");
    }
  });
});


//////////////////////
// Leave Management //
//////////////////////

// Get all leave requests
app.get("/api/leaves", (req, res) => {
  db.query("SELECT * FROM leave_requests", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// Add a new leave request
app.post("/api/leaves", (req, res) => {
  const { employee, type, status } = req.body;
  db.query(
    "INSERT INTO leave_requests (employee, type, status) VALUES (?, ?, ?)",
    [employee, type, status],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, employee, type, status });
    }
  );
});

// Update leave request status
app.put("/api/leaves/:id", (req, res) => {
  const { status } = req.body;
  db.query(
    "UPDATE leave_requests SET status = ? WHERE id = ?",
    [status, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
});

///////////////////////
// Payroll Management //
///////////////////////

// Get all payroll data
//app.get("/api/payroll", (req, res) => {
  //db.query("SELECT * FROM payroll", (err, result) => {
    //if (err) return res.status(500).send(err);
    //res.json(result);
  //});
//});


// ===== Payroll Management Routes =====

// GET all payroll entries
app.get("/api/payroll", (req, res) => {
  const query = "SELECT * FROM payroll";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching payroll data:", err);
      res.status(500).json({ error: "Failed to fetch payroll data" });
    } else {
      res.json(results);
    }
  });
});

// POST new payroll entry
app.post("/api/payroll", (req, res) => {
  const { employee, salary, status } = req.body;
  const query = "INSERT INTO payroll (employee, salary, status) VALUES (?, ?, ?)";
  db.query(query, [employee, salary, status], (err, result) => {
    if (err) {
      console.error("Error inserting payroll entry:", err);
      res.status(500).json({ error: "Failed to insert payroll entry" });
    } else {
      const newPayroll = { id: result.insertId, employee, salary, status };
      res.status(201).json(newPayroll);
    }
  });
});

// PUT update payroll status
app.put("/api/payroll/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const query = "UPDATE payroll SET status = ? WHERE id = ?";
  db.query(query, [status, id], (err) => {
    if (err) {
      console.error("Error updating payroll status:", err);
      res.status(500).json({ error: "Failed to update payroll status" });
    } else {
      res.json({ message: "Payroll status updated successfully" });
    }
  });
});

// DELETE payroll entry
app.delete("/api/payroll/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM payroll WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) {
      console.error("Error deleting payroll entry:", err);
      res.status(500).json({ error: "Failed to delete payroll entry" });
    } else {
      res.json({ message: "Payroll entry deleted successfully" });
    }
  });
});


// DOCUMENTS

// Get all documents
app.get("/api/documents", (req, res) => {
  db.query("SELECT * FROM documents", (err, results) => {
    if (err) {
      console.error("Error fetching documents:", err);
      res.status(500).send("Failed to fetch documents");
    } else {
      res.json(results);
    }
  });
});

// Add a new document
app.post("/api/documents", (req, res) => {
  const { name, type, uploadedBy } = req.body;

  if (!name || !type || !uploadedBy) {
    return res.status(400).send("Missing required fields");
  }

  const sql = "INSERT INTO documents (name, type, uploadedBy) VALUES (?, ?, ?)";
  db.query(sql, [name, type, uploadedBy], (err, result) => {
    if (err) {
      console.error("Error adding document:", err);
      res.status(500).send("Failed to add document");
    } else {
      res.status(201).send("Document added successfully");
    }
  });
});

// Delete a document by ID
app.delete("/api/documents/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM documents WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error deleting document:", err);
      res.status(500).send("Failed to delete document");
    } else {
      res.send("Document deleted successfully");
    }
  });
});

  // TASK MANAGEMENT ROUTES
app.get("/api/tasks", (req, res) => {
  const query = "SELECT * FROM task_management";
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post("/api/tasks", (req, res) => {
  const { title, assignedTo } = req.body;
  const query = "INSERT INTO task_management (title, assignedTo, status) VALUES (?, ?, 'Pending')";
  db.query(query, [title, assignedTo], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(201);
  });
});

app.put("/api/tasks/:id", (req, res) => {
  const { status } = req.body;
  const query = "UPDATE task_management SET status = ? WHERE id = ?";
  db.query(query, [status, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

app.delete("/api/tasks/:id", (req, res) => {
  const query = "DELETE FROM task_management WHERE id = ?";
  db.query(query, [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

// =====================================
// ✅ ADMIN MANAGEMENT SECTION END
// =====================================


//Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
