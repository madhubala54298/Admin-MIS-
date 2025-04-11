import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/roadconstruction.css";

const RoadConstruction = () => {
    const [projects, setProjects] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    // ✅ Subcategories displayed under Road Construction
    const subcategories = [
        { id: 1, name: "Highways", description: "Major roads designed for fast traffic flow." },
        { id: 2, name: "Urban Roads", description: "Roads within cities for local transportation." },
        { id: 3, name: "Rural Roads", description: "Smaller roads connecting remote areas." },
        { id: 4, name: "Expressways", description: "High-speed roads with controlled entry." },
        { id: 5, name: "Concrete Roads", description: "Durable roads made with reinforced concrete." },
        { id: 6, name: "Asphalt Roads", description: "Flexible pavement roads made from bitumen." },
    ];

    const [newProject, setNewProject] = useState({
        project_name: "",
        location: "",
        subcategory: "Highways",
        material_cost: "",
        labor_cost: "",
        equipment_cost: "",
        maintenance_cost: "",
        status: "Planning",
        start_date: "",
        end_date: "",
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get("http://localhost:5000/road-construction");
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
                await axios.put(`http://localhost:5000/road-construction/${editingProject}`, newProject);
                alert("✅ Project updated successfully!");
            } else {
                await axios.post("http://localhost:5000/road-construction", newProject);
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
                await axios.delete(`http://localhost:5000/road-construction/${id}`);
                fetchProjects();
                alert("✅ Project deleted successfully!");
            } catch (error) {
                alert("❌ Error deleting project");
            }
        }
    };

    const filteredProjects = projects
        .filter((proj) => statusFilter === "All" || proj.status === statusFilter)
        .filter((proj) => proj.project_name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="road-container">
            <h2>🚧 Road Construction Projects</h2>

            {/* ✅ New Section: Subcategories (Displayed separately) */}
            <div className="subcategory-section">
                <h3>📌 Road Construction Categories</h3>
                <div className="subcategory-list">
                    {subcategories.map((sub) => (
                        <div key={sub.id} className="subcategory-card">
                            <h4>{sub.name}</h4>
                            <p>{sub.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ✅ Search and Sorting */}
            <div className="filter-section">
                <input
                    type="text"
                    placeholder="🔍 Search projects..."
                    className="search-box"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select className="status-filter" onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            <button className="add-project-btn" onClick={() => setShowForm(true)}>+ Add New Project</button>

            {/* ✅ Updated: Removed "Subcategory" from table */}
            <div className="project-table-container">
                <table className="project-table">
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>Location</th>
                            <th>Budget</th>
                            <th>Status</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProjects.map((proj) => (
                            <tr key={proj.id}>
                                <td>{proj.project_name}</td>
                                <td>{proj.location}</td>
                                <td>${proj.material_cost + proj.labor_cost + proj.equipment_cost + proj.maintenance_cost}</td>
                                <td className={`status-${proj.status.toLowerCase().replace(" ", "-")}`}>{proj.status}</td>
                                <td>{proj.start_date}</td>
                                <td>{proj.end_date}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => handleEdit(proj)}>✏️ Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(proj.id)}>❌ Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>{editingProject ? "Edit Road Project" : "Add New Road Project"}</h3>
                        <form onSubmit={handleAddOrUpdateProject}>
                            <input type="text" name="project_name" placeholder="Project Name" value={newProject.project_name} onChange={handleChange} required />
                            <input type="text" name="location" placeholder="Location" value={newProject.location} onChange={handleChange} required />
                            <select name="subcategory" onChange={handleChange} value={newProject.subcategory}>
                                {subcategories.map((sub) => (
                                    <option key={sub.id} value={sub.name}>{sub.name}</option>
                                ))}
                            </select>
                            <input type="number" name="material_cost" placeholder="Material Cost" value={newProject.material_cost} onChange={handleChange} required />
                            <input type="number" name="labor_cost" placeholder="Labor Cost" value={newProject.labor_cost} onChange={handleChange} required />
                            <input type="number" name="equipment_cost" placeholder="Equipment Cost" value={newProject.equipment_cost} onChange={handleChange} required />
                            <input type="number" name="maintenance_cost" placeholder="Maintenance Cost" value={newProject.maintenance_cost} onChange={handleChange} required />
                            <input type="date" name="start_date" value={newProject.start_date} onChange={handleChange} required />
                            <input type="date" name="end_date" value={newProject.end_date} onChange={handleChange} required />
                            <button type="submit">{editingProject ? "Update Project" : "Add Project"}</button>
                            <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoadConstruction;
