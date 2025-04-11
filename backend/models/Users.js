const db = require("./CivilWork");

const createCivilWorkTable = () => {
  const sql = `CREATE TABLE IF NOT EXISTS civil_work (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(255),
    description TEXT,
    budget DECIMAL(10,2),
    status ENUM('Planning', 'In Progress', 'Completed') DEFAULT 'Planning'
  )`;

  db.query(sql, (err) => {
    if (err) console.error("Error creating Civil Work table:", err);
  });
};

createCivilWorkTable();
