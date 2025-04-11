const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Change if different
    password: "", // Change if different
    database: "admin_mis"
});

db.connect((err) => {
    if (err) {
        console.error("MySQL Connection Failed:", err);
        return;
    }
    console.log("Connected to MySQL Database");
});

module.exports = db;

