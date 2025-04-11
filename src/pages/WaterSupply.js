import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/watersupply.css";

const WaterSupply = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: "", progress: 0, status: "Pending" });

  // Fetch projects from API
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/water-supply");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // Add new project (API)
  const addProject = async () => {
    if (newProject.name.trim() !== "") {
      try {
        await axios.post("http://localhost:5000/water-supply", newProject);
        fetchProjects(); // Refresh list after adding
        setNewProject({ name: "", progress: 0, status: "Pending" });
      } catch (error) {
        console.error("Error adding project:", error);
      }
    }
  };

  // Subcategories for Water Supply
  const subcategories = [
    { id: 1, name: "Pipeline Network", description: "Expansion and maintenance of water pipelines." },
    { id: 2, name: "Water Treatment", description: "Purification and quality control of drinking water." },
    { id: 3, name: "Reservoir Construction", description: "Building reservoirs for water storage." },
    { id: 4, name: "Irrigation Systems", description: "Developing irrigation channels for agriculture." },
    { id: 5, name: "Sewage Management", description: "Improving wastewater disposal systems." }
  ];

  // Budget categories
  const budgetCategories = [
    { id: 1, category: "Infrastructure", amount: "₹5 Cr", description: "Pipeline expansion and repairs." },
    { id: 2, category: "Purification", amount: "₹3 Cr", description: "Water treatment and filtration systems." },
    { id: 3, category: "Storage", amount: "₹2 Cr", description: "Reservoir construction and maintenance." },
  ];

  return (
    <div className="water-container">
      <h2 className="title">Water Supply Management</h2>
      <p className="subtitle">Efficient water distribution and infrastructure development.</p>

      {/* Subcategories Section */}
      <div className="water-sections">
        {subcategories.map((item) => (
          <div key={item.id} className="water-card">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      {/* Budget Categories */}
      <div className="water-budget">
        <h3 className="budget-title">Budget Allocation</h3>
        <ul>
          {budgetCategories.map((item) => (
            <li key={item.id}>
              <strong>{item.category}</strong> - {item.amount} ({item.description})
            </li>
          ))}
        </ul>
      </div>

      {/* Project Tracking */}
      <div className="project-list">
        <h3 className="project-title">Project Tracking</h3>
        <table className="project-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Progress</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.progress}%</td>
                <td>{project.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Project */}
        <div className="add-project-form">
          <input
            type="text"
            placeholder="Enter Project Name"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
          />
          <button className="add-project-btn" onClick={addProject}>Add Project</button>
        </div>
      </div>
    </div>
  );
};

export default WaterSupply;
