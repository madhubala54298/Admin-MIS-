import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/securitymanagement.css";

const SecurityManagement = () => {
  const [logs, setLogs] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [newLog, setNewLog] = useState({
    guard_name: "",
    shift_time: "",
    date: "",
    remarks: ""
  });

  const [newVisitor, setNewVisitor] = useState({
    name: "",
    purpose: "",
    entry_time: "",
    exit_time: ""
  });

  useEffect(() => {
    fetchLogs();
    fetchVisitors();
  }, []);

  const fetchLogs = async () => {
    const res = await fetch("http://localhost:5000/api/security/logs");
    const data = await res.json();
    setLogs(data);
  };

  const fetchVisitors = async () => {
    const res = await fetch("http://localhost:5000/api/security/visitors");
    const data = await res.json();
    setVisitors(data);
  };

  const handleAddLog = async () => {
    if (!newLog.guard_name || !newLog.shift_time || !newLog.date) {
      toast.error("Fill all guard fields!");
      return;
    }

    await fetch("http://localhost:5000/api/security/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLog)
    });

    setNewLog({ guard_name: "", shift_time: "", date: "", remarks: "" });
    toast.success("Log added successfully!");
    fetchLogs();
  };

  const handleAddVisitor = async () => {
    if (!newVisitor.name || !newVisitor.purpose || !newVisitor.entry_time) {
      toast.error("Fill all visitor fields!");
      return;
    }

    await fetch("http://localhost:5000/api/security/visitors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newVisitor)
    });

    setNewVisitor({ name: "", purpose: "", entry_time: "", exit_time: "" });
    toast.success("Visitor added!");
    fetchVisitors();
  };

  const handleDeleteLog = async (id) => {
    await fetch(`http://localhost:5000/api/security/logs/${id}`, {
      method: "DELETE"
    });
    toast.info("Log deleted");
    fetchLogs();
  };

  const handleDeleteVisitor = async (id) => {
    await fetch(`http://localhost:5000/api/security/visitors/${id}`, {
      method: "DELETE"
    });
    toast.info("Visitor removed");
    fetchVisitors();
  };

  return (
    <div className="security-container">
      <ToastContainer />
      <h1>🔐 Security Management</h1>

      <div className="form-section">
        <h2>Guard Log Entry</h2>
        <input placeholder="Guard Name" value={newLog.guard_name} onChange={(e) => setNewLog({ ...newLog, guard_name: e.target.value })} />
        <input placeholder="Shift Time" value={newLog.shift_time} onChange={(e) => setNewLog({ ...newLog, shift_time: e.target.value })} />
        <input type="date" value={newLog.date} onChange={(e) => setNewLog({ ...newLog, date: e.target.value })} />
        <input placeholder="Remarks" value={newLog.remarks} onChange={(e) => setNewLog({ ...newLog, remarks: e.target.value })} />
        <button className="add-btn" onClick={handleAddLog}>➕ Add Log</button>
      </div>

      <div className="form-section">
        <h2>Visitor Entry</h2>
        <input placeholder="Visitor Name" value={newVisitor.name} onChange={(e) => setNewVisitor({ ...newVisitor, name: e.target.value })} />
        <input placeholder="Purpose" value={newVisitor.purpose} onChange={(e) => setNewVisitor({ ...newVisitor, purpose: e.target.value })} />
        <input type="datetime-local" value={newVisitor.entry_time} onChange={(e) => setNewVisitor({ ...newVisitor, entry_time: e.target.value })} />
        <input type="datetime-local" value={newVisitor.exit_time} onChange={(e) => setNewVisitor({ ...newVisitor, exit_time: e.target.value })} />
        <button className="add-btn" onClick={handleAddVisitor}>➕ Add Visitor</button>
      </div>

      <h2>🧍‍♂️ Visitors</h2>
      <table className="security-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Purpose</th>
            <th>Entry Time</th>
            <th>Exit Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map(visitor => (
            <tr key={visitor.id}>
              <td>{visitor.name}</td>
              <td>{visitor.purpose}</td>
              <td>{visitor.entry_time}</td>
              <td>{visitor.exit_time || "—"}</td>
              <td><button onClick={() => handleDeleteVisitor(visitor.id)}>🗑</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>🛡 Guard Logs</h2>
      <table className="security-table">
        <thead>
          <tr>
            <th>Guard</th>
            <th>Shift</th>
            <th>Date</th>
            <th>Remarks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id}>
              <td>{log.guard_name}</td>
              <td>{log.shift_time}</td>
              <td>{log.date}</td>
              <td>{log.remarks}</td>
              <td><button onClick={() => handleDeleteLog(log.id)}>🗑</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SecurityManagement;
