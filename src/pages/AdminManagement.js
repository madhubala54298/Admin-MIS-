import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/adminmanagement.css";

const AdminManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const sections = [
    { path: "/employee-management", label: "👥 Employee Management" },
    { path: "/department-management", label: "🏢 Department Management" },
    { path: "/leave-payroll-management", label: "📅 Leave & Payroll" },
    { path: "/document-management", label: "📂 Document Management" },
    { path: "/task-management", label: "✅ Task & Project Management" },
  ];

  const filteredSections = sections.filter((section) =>
    section.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-container">
      <h1>📁 Administrative Management</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search Management..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Sections */}
      <div className="admin-sections">
        {filteredSections.length > 0 ? (
          filteredSections.map((section, index) => (
            <Link key={index} to={section.path} className="admin-card">
              {section.label}
            </Link>
          ))
        ) : (
          <p className="no-results">⚠️ No matching section found.</p>
        )}
      </div>

      {/* Live Statistics */}
      <div className="admin-stats">
        <div className="stat-card">
          <h3>👥 Employees</h3>
          <p>350+</p>
        </div>
        <div className="stat-card">
          <h3>⏳ Pending Tasks</h3>
          <p>28</p>
        </div>
        <div className="stat-card">
          <h3>📌 Active Projects</h3>
          <p>12</p>
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;
