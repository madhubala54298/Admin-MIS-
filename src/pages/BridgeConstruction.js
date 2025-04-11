import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/bridgeconstruction.css";

const BridgeConstruction = () => {
  const subcategories = [
    { id: 1, name: "Suspension Bridges", description: "Large-scale bridges supported by cables." },
    { id: 2, name: "Beam Bridges", description: "Simple and strong horizontal structures." },
    { id: 3, name: "Arch Bridges", description: "Bridges using curved arch support." },
    { id: 4, name: "Cable-Stayed Bridges", description: "Bridges with a central tower and cables." },
    { id: 5, name: "Concrete Bridges", description: "Durable and widely used structures." }
  ];

  const [projects, setProjects] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState({
    projectName: "",
    location: "",
    materialCost: "",
    laborCost: "",
    maintenanceCost: "",
    status: "Planning",
    startDate: "",
    endDate: ""
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  // Fetch Projects from Backend
  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bridge-construction");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  // Add New Project to Database
  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/bridge-construction", newProject);
      alert("✅ Project added successfully!");
      setShowForm(false);
      fetchProjects(); // Refresh List
      setNewProject({
        projectName: "",
        location: "",
        materialCost: "",
        laborCost: "",
        maintenanceCost: "",
        status: "Planning",
        startDate: "",
        endDate: ""
      });
    } catch (error) {
      alert("❌ Error adding project!");
      console.error(error);
    }
  };

  const filteredProjects = statusFilter === "All" ? projects : projects.filter((proj) => proj.status === statusFilter);

  return (
    <div className="bridge-container">
      <h1 className="title">🌉 Bridge Construction 🌉</h1>
      <p className="subtitle">Explore different types of bridges and their construction projects.</p>

      <div className="bridge-sections">
        {subcategories.map((subcategory) => (
          <div key={subcategory.id} className="bridge-card">
            <div className="card-inner">
              <div className="card-front">
                <h3>{subcategory.name}</h3>
              </div>
              <div className="card-back">
                <p>{subcategory.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="project-list">
        <h2 className="project-title">Bridge Construction Projects</h2>
        
        <label className="filter-label">Filter by Status:</label>
        <select className="filter-select" onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Planning">Planning</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <table className="project-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Project Name</th>
              <th>Location</th>
              <th>Material Cost</th>
              <th>Labor Cost</th>
              <th>Maintenance Cost</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((proj) => (
              <tr key={proj.id}>
                <td>{proj.id}</td>
                <td>{proj.projectName}</td>
                <td>{proj.location}</td>
                <td>${proj.materialCost}</td>
                <td>${proj.laborCost}</td>
                <td>${proj.maintenanceCost}</td>
                <td>{proj.status}</td>
                <td>{proj.startDate}</td>
                <td>{proj.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="add-project-btn" onClick={() => setShowForm(true)}>+ Add New Project</button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Bridge Project</h3>
            <form onSubmit={handleAddProject}>
              <input type="text" name="projectName" placeholder="Project Name" onChange={handleChange} required />
              <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
              <input type="number" name="materialCost" placeholder="Material Cost" onChange={handleChange} required />
              <input type="number" name="laborCost" placeholder="Labor Cost" onChange={handleChange} required />
              <input type="number" name="maintenanceCost" placeholder="Maintenance Cost" onChange={handleChange} required />
              <select name="status" onChange={handleChange}>
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <input type="date" name="startDate" onChange={handleChange} />
              <input type="date" name="endDate" onChange={handleChange} />

              <div className="modal-buttons">
                <button type="submit">Add Project</button>
                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Link to="/civil-work" className="back-button">⬅ Back to Civil Work</Link>
    </div>
  );
};

export default BridgeConstruction;
