import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/employeemanagement.css";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: "", role: "", department: "" });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get("http://localhost:5000/api/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error("Failed to fetch employees:", err));
  };

  const handleInputChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const addEmployee = () => {
    if (newEmployee.name && newEmployee.role && newEmployee.department) {
      axios
        .post("http://localhost:5000/api/employees", {
          name: newEmployee.name,
          role: newEmployee.role,
          department: newEmployee.department,
          salary: 0,
        })
        .then(() => {
          fetchEmployees();
          setNewEmployee({ name: "", role: "", department: "" });
        })
        .catch((err) => console.error("Error adding employee:", err));
    }
  };

  const deleteEmployee = (id) => {
    axios
      .delete(`http://localhost:5000/api/employees/${id}`)
      .then(() => setEmployees((prev) => prev.filter((emp) => emp.id !== id)))
      .catch((err) => console.error("Error deleting employee:", err));
  };

  return (
    <div className="employee-container">
      <h1>👥 Employee Management</h1>

      <div className="employee-form">
        <input
          type="text"
          name="name"
          placeholder="Enter Employee Name"
          value={newEmployee.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="role"
          placeholder="Enter Role"
          value={newEmployee.role}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="department"
          placeholder="Enter Department"
          value={newEmployee.department}
          onChange={handleInputChange}
        />
        <button onClick={addEmployee}>➕ Add Employee</button>
      </div>

      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.role}</td>
              <td>{employee.department}</td>
              <td>
                <button className="delete-btn" onClick={() => deleteEmployee(employee.id)}>
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeManagement;
