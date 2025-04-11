import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/LandDevelopment.css";

const LandDevelopment = () => {
  const subcategories = [
    { id: 1, name: "Urban Planning", description: "Developing sustainable city layouts." },
    { id: 2, name: "Agricultural Land", description: "Improving farmland and irrigation." },
    { id: 3, name: "Industrial Zones", description: "Setting up dedicated industrial areas." },
    { id: 4, name: "Environmental Projects", description: "Developing eco-friendly green spaces." },
    { id: 5, name: "Residential Expansion", description: "Expanding housing projects and apartments." }
  ];

  const budgetCategories = [
    { id: 1, name: "Infrastructure", amount: "$5M" },
    { id: 2, name: "Sustainability", amount: "$3M" },
    { id: 3, name: "Public Facilities", amount: "$2M" }
  ];

  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // ✅ Fetch Projects from Backend
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/land-development");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // ✅ Add Project
  const addProject = async () => {
    if (newProject.trim() !== "") {
      try {
        const response = await axios.post("http://localhost:5000/api/land-development/add", {
          name: newProject,
          status: "Planned"
        });

        if (response.status === 201) {
          fetchProjects(); // Refresh projects list
          setNewProject("");
          setModalOpen(false);
        }
      } catch (error) {
        console.error("Error adding project:", error);
      }
    }
  };

  return (
    <div className="land-container">
      <h2 className="land-title">Land Development</h2>
      <p className="land-subtitle">Managing sustainable and structured land development projects.</p>

      {/* Subcategories Section */}
      <div className="land-sections">
        {subcategories.map((category) => (
          <div key={category.id} className="land-card">
            <h3>{category.name}</h3>
            <p>{category.description}</p>
          </div>
        ))}
      </div>

      {/* Budget Section */}
      <div className="land-budget-section">
        <h3 className="land-section-title">Budget Allocation</h3>
        <ul>
          {budgetCategories.map((budget) => (
            <li key={budget.id}>
              <strong>{budget.name}:</strong> {budget.amount}
            </li>
          ))}
        </ul>
      </div>

      {/* Project Tracking */}
      <div className="land-project-list">
        <h3 className="land-section-title">Ongoing Projects</h3>
        <table className="land-project-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Project Button */}
      <button className="land-add-project-btn" onClick={() => setModalOpen(true)}>
        Add New Project
      </button>

      {/* Modal for Adding Projects */}
      {modalOpen && (
        <div className="land-modal-overlay">
          <div className="land-modal-content">
            <h3>Add New Project</h3>
            <input
              type="text"
              placeholder="Enter project name"
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
            />
            <div className="land-modal-buttons">
              <button onClick={addProject}>Add</button>
              <button onClick={() => setModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandDevelopment;
