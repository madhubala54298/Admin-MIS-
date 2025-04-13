import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import "../styles/dashboard.css";
import Chatbot from "../pages/Chatbot"; // ✅ correct path from your dashboard file




const Dashboard = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  const projectStats = [
    { name: "Jan", projects: 4 },
    { name: "Feb", projects: 7 },
    { name: "Mar", projects: 3 },
    { name: "Apr", projects: 8 },
    { name: "May", projects: 6 },
  ];

  const activityData = [
    { month: "Jan", activity: 30 },
    { month: "Feb", activity: 50 },
    { month: "Mar", activity: 20 },
    { month: "Apr", activity: 80 },
    { month: "May", activity: 40 },
  ];

  return (
    <div className={`dashboard-container ${darkMode ? "dark-mode" : ""}`}>
      
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile-card">
          <h3>Welcome, Admin</h3>
          <p>Role: System Administrator</p>
        </div>
        <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {/* Main Dashboard */}
      <div className="main-dashboard">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
        </div>

        {/* Dashboard Sections */}
        <div className="dashboard-sections">
          <Link to="/administration" className="dashboard-card">
            <h3>📁 Administration</h3>
          </Link>
          <Link to="/civilwork" className="dashboard-card">
            <h3>🚧 Civil Work</h3>
          </Link>
          <Link to="/security" className="dashboard-card">
            <h3>🔒 Security</h3>
          </Link>
        </div>

        {/* Charts Section */}
        <div className="charts-container">
          <div className="chart-card">
            <h3>📈 Projects Over Time</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={projectStats}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="projects" fill="#3498DB" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>📌 Activity Trends</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={activityData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="activity" stroke="#FF5733" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="extra-features">
          <div className="feature-card">
            <h3>📌 Recent Activity</h3>
            <ul>
              <li>✅ Updated Civil Work Report</li>
              <li>🔔 New Security Task Assigned</li>
              <li>📅 Administration Meeting Scheduled</li>
            </ul>
          </div>
          <div className="feature-card">
            <h3>📊 Overall Statistics</h3>
            <p>📌 Active Projects: <strong>12</strong></p>
            <p>⏳ Pending Tasks: <strong>5</strong></p>
            <p>✅ Completion Rate: <strong>85%</strong></p>
          </div>
        </div>
        <Chatbot />

      </div>
    </div>
  );
};

export default Dashboard;
