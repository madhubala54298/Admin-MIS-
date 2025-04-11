import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/departmentmanagement.css";

const DepartmentManagement = () => {
  // Sample Department Data
  const sampleData = [
    { id: 1, name: "Human Resources", head: "John Doe" },
    { id: 2, name: "IT Department", head: "Jane Smith" },
    { id: 3, name: "Marketing", head: "Alice Johnson" },
  ];

  const [departments, setDepartments] = useState(sampleData);
  const [newDepartment, setNewDepartment] = useState({ name: "", head: "" });

  // Fetch departments from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/departments")
      .then((res) => {
        if (res.data.length > 0) {
          setDepartments(res.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching departments from backend. Using sample data.", err);
        setDepartments(sampleData);
      });
  }, []);

  const handleInputChange = (e) => {
    setNewDepartment({ ...newDepartment, [e.target.name]: e.target.value });
  };

  const addDepartment = () => {
    if (newDepartment.name && newDepartment.head) {
      axios
        .post("http://localhost:5000/api/departments", newDepartment)
        .then(() => axios.get("http://localhost:5000/api/departments"))
        .then((res) => {
          setDepartments(res.data);
          setNewDepartment({ name: "", head: "" });
        })
        .catch((err) => {
          console.error("Error adding department:", err);
        });
    }
  };

  const deleteDepartment = (id) => {
    axios
      .delete(`http://localhost:5000/api/departments/${id}`)
      .then(() => {
        setDepartments((prev) => prev.filter((department) => department.id !== id));
      })
      .catch((err) => {
        console.error("Error deleting department:", err);
      });
  };

  return (
    <div className="department-container">
      <h1>🏢 Department Management</h1>

      {/* Add New Department Form */}
      <div className="department-form">
        <input
          type="text"
          name="name"
          placeholder="Enter Department Name"
          value={newDepartment.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="head"
          placeholder="Enter Department Head"
          value={newDepartment.head}
          onChange={handleInputChange}
        />
        <button onClick={addDepartment}>➕ Add Department</button>
      </div>

      {/* Department List Table */}
      <table className="department-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Department Name</th>
            <th>Department Head</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td>{department.id}</td>
              <td>{department.name}</td>
              <td>{department.head}</td>
              <td>
                <button className="delete-btn" onClick={() => deleteDepartment(department.id)}>🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentManagement;
