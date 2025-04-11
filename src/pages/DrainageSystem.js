import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/drainagesystem.css"; // Importing CSS file

const DrainageSystem = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: "", budget: "", status: "Pending" });

  const subcategories = [
    { id: 1, name: "Stormwater Drainage", description: "Managing excess rainwater flow." },
    { id: 2, name: "Sewage Treatment", description: "Processing waste and water recycling." },
    { id: 3, name: "Culvert Installation", description: "Constructing underground drainage tunnels." },
    { id: 4, name: "Urban Drainage", description: "Preventing flooding in cities." },
    { id: 5, name: "Canal Construction", description: "Building artificial water channels." }
  ];

  const budgetCategories = [
    { id: 1, name: "Government Funding", amount: "$500,000" },
    { id: 2, name: "Private Investment", amount: "$250,000" },
    { id: 3, name: "Municipal Budget", amount: "$300,000" }
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  // Fetch projects from API
  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/drainage-projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // Add new project to the database
  const handleAddProject = async () => {
    if (!newProject.name.trim() || !newProject.budget.trim()) {
      alert("❌ Please enter project name and budget!");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/drainage-projects", newProject);
      if (response.status === 201) {
        alert("✅ Project added successfully!");
        setNewProject({ name: "", budget: "", status: "Pending" });
        fetchProjects(); // Refresh project list
      } else {
        alert("❌ Failed to add project!");
      }
    } catch (error) {
      alert("❌ Error: Unable to connect to the server!");
      console.error("Error adding project:", error);
    }
  };
  

  return (
    <div className="drainage-container">
      <h2 className="title">Drainage System Management</h2>
      <p className="subtitle">Efficient water management for better infrastructure.</p>

      {/* Subcategories */}
      <div className="drainage-sections">
        {subcategories.map((item) => (
          <div key={item.id} className="drainage-card">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      {/* Budget Tracking */}
      <div className="drainage-budget">
        <h3 className="budget-title">Budget Allocation</h3>
        <ul>
          {budgetCategories.map((item) => (
            <li key={item.id}>
              {item.name}: <strong>{item.amount}</strong>
            </li>
          ))}
        </ul>
      </div>

      {/* Project Management */}
      <div className="project-list">
        <h3 className="project-title">Project Tracking</h3>
        <table className="project-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Budget</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan="3">No projects added yet.</td>
              </tr>
            ) : (
              projects.map((project, index) => (
                <tr key={index}>
                  <td>{project.name}</td>
                  <td>${project.budget}</td>
                  <td>{project.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Add Project Form */}
        <div className="add-project-form">
          <input
            type="text"
            placeholder="Project Name"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Budget ($)"
            value={newProject.budget}
            onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
          />
          <button className="add-project-btn" onClick={handleAddProject}>
            Add Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrainageSystem;
