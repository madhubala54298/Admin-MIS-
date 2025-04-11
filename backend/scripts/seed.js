const db = require("../config/db");

// Sample data insertion script
const insertData = () => {
  const queries = [
    `INSERT INTO users (username, password) VALUES ('admin', 'password123');`,

    `INSERT INTO civil_work (name, description) VALUES
    ('Road Construction', 'Construction and maintenance of roads'),
    ('Building Maintenance', 'Repairs and improvements of buildings'),
    ('Water Supply', 'Ensuring clean water supply infrastructure'),
    ('Drainage System', 'Managing drainage systems effectively'),
    ('Bridge Construction', 'Development of bridges for transport'),
    ('Land Development', 'Preparing land for construction');`,

    `INSERT INTO subcategories (civil_work_id, name, description) VALUES
    (1, 'Road Repair', 'Fixing potholes and damages on roads'),
    (1, 'Highway Development', 'Upgrading highways for better transport'),
    (1, 'Rural Roads', 'Connecting rural areas to urban zones'),
    (1, 'Pavement Construction', 'Creating durable roads for long-term use'),
    (1, 'Expressway Projects', 'Developing high-speed expressways');`,

    `INSERT INTO projects (name, location, status, budget, civil_work_id) VALUES
    ('National Highway 45', 'Delhi to Mumbai', 'In Progress', 50000000, 1),
    ('City Road Renovation', 'Lucknow', 'Planning', 12000000, 1),
    ('Village Road Development', 'Bihar', 'Completed', 8000000, 1);`,

    `INSERT INTO budget (project_id, amount) VALUES
    (1, 20000000),
    (2, 5000000),
    (3, 8000000);`
  ];

  queries.forEach((query, index) => {
    db.query(query, (err, result) => {
      if (err) {
        console.error(`Error inserting data at step ${index + 1}:`, err);
      } else {
        console.log(`Step ${index + 1} data inserted successfully ✅`);
      }
    });
  });

  db.end();
};

// Run the script
insertData();
