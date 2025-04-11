import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/taskmanagement.css";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", assignedTo: "" });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  const handleAddTask = async () => {
    if (newTask.title && newTask.assignedTo) {
      try {
        await axios.post("http://localhost:5000/api/tasks", newTask);
        fetchTasks();
        setNewTask({ title: "", assignedTo: "" });
      } catch (err) {
        console.error("Error adding task", err);
      }
    }
  };

  const updateTaskStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, { status });
      fetchTasks();
    } catch (err) {
      console.error("Error updating task", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  const pendingTasks = tasks.filter(task => task.status === "Pending");
  const completedTasks = tasks.filter(task => task.status === "Completed");

  return (
    <div className="task-management-container">
      <h1>✅ Task & Project Management</h1>

      <div className="task-form">
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Assigned To"
          value={newTask.assignedTo}
          onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
        />
        <button onClick={handleAddTask} className="add-task-btn">➕ Add Task</button>
      </div>

      <div className="task-section">
        <h2>📋 Pending Tasks</h2>
        <table className="task-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Task</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingTasks.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.assignedTo}</td>
                <td>{task.status}</td>
                <td>
                  <button onClick={() => updateTaskStatus(task.id, "Completed")} className="complete-btn">✔ Complete</button>
                  <button onClick={() => deleteTask(task.id)} className="delete-btn">🗑 Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="task-section">
        <h2>✅ Completed Tasks</h2>
        <table className="task-table completed-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Task</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {completedTasks.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.assignedTo}</td>
                <td>{task.status}</td>
                <td>
                  <button onClick={() => deleteTask(task.id)} className="delete-btn">🗑 Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskManagement;
