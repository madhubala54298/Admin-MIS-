import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/buildingmaintenance.css";

const BuildingMaintenance = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const subcategories = [
    { id: 1, name: "Plumbing Repairs", description: "Fixing leaks, pipes, and drainage systems." },
    { id: 2, name: "Electrical Maintenance", description: "Upgrading wiring, circuits, and power supply." },
    { id: 3, name: "Roof Repairs", description: "Waterproofing, fixing damages, and sealing leaks." },
    { id: 4, name: "Painting & Renovation", description: "Repainting and aesthetic improvements." },
    { id: 5, name: "HVAC Systems", description: "Maintaining heating, ventilation, and cooling systems." }
  ];

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    contractor: "",
    estimated_cost: "",
    approval_status: "Pending",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/building-maintenance");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateProject = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await axios.put(`http://localhost:5000/api/building-maintenance/${editingProject}`, newProject);
        alert("✅ Project updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/building-maintenance", newProject);
        alert("✅ Project added successfully!");
      }
      setShowForm(false);
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      alert("❌ Error processing request");
    }
  };

  const handleEdit = (project) => {
    setNewProject(project);
    setEditingProject(project.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`http://localhost:5000/api/building-maintenance/${id}`);
        fetchProjects();
        alert("✅ Project deleted successfully!");
      } catch (error) {
        alert("❌ Error deleting project");
      }
    }
  };

  const filteredProjects = projects
    .filter((proj) => statusFilter === "All" || proj.approval_status === statusFilter)
    .filter((proj) => proj.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="building-container">
      <h2>🏗️ Building Maintenance Projects</h2>

      <div className="subcategory-section">
        <h3>📌 Maintenance Categories</h3>
        <div className="subcategory-list">
          {subcategories.map((sub) => (
            <div key={sub.id} className="subcategory-card">
              <h4>{sub.name}</h4>
              <p>{sub.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <input type="text" placeholder="🔍 Search projects..." className="search-box" onChange={(e) => setSearchQuery(e.target.value)} />
        <select className="status-filter" onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <button className="add-project-btn" onClick={() => setShowForm(true)}>+ Add New Project</button>

      <div className="project-list">
        {filteredProjects.map((proj) => (
          <div key={proj.id} className="project-card">
            <h4>{proj.name}</h4>
            <p>📝 {proj.description}</p>
            <p>👷 Contractor: {proj.contractor}</p>
            <p>💰 Estimated Cost: ${proj.estimated_cost}</p>
            <p>📅 {proj.start_date} ➝ {proj.end_date}</p>
            <p>🛠️ Status: <strong>{proj.approval_status}</strong></p>
            <button className="edit-btn" onClick={() => handleEdit(proj)}>✏️ Edit</button>
            <button className="delete-btn" onClick={() => handleDelete(proj.id)}>❌ Delete</button>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editingProject ? "Edit Project" : "Add New Project"}</h3>
            <form onSubmit={handleAddOrUpdateProject}>
              <input type="text" name="name" placeholder="Project Name" value={newProject.name} onChange={handleChange} required />
              <input type="text" name="description" placeholder="Description" value={newProject.description} onChange={handleChange} required />
              <input type="text" name="contractor" placeholder="Contractor Name" value={newProject.contractor} onChange={handleChange} required />
              <input type="number" name="estimated_cost" placeholder="Estimated Cost ($)" value={newProject.estimated_cost} onChange={handleChange} required />
              <input type="date" name="start_date" value={newProject.start_date} onChange={handleChange} required />
              <input type="date" name="end_date" value={newProject.end_date} onChange={handleChange} required />
              <select name="approval_status" onChange={handleChange} value={newProject.approval_status}>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Completed">Completed</option>
              </select>
              <button type="submit">{editingProject ? "Update Project" : "Add Project"}</button>
              <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuildingMaintenance;
