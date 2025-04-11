import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/leavepayrollmanagement.css";

const LeavePayrollManagement = () => {
  // Leave & Payroll States
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, employee: "John Doe", type: "Sick Leave", status: "Pending" },
    { id: 2, employee: "Jane Smith", type: "Casual Leave", status: "Approved" },
  ]);

  const [payrollData, setPayrollData] = useState([
    { id: 1, employee: "John Doe", salary: "$5000", status: "Paid" },
    { id: 2, employee: "Jane Smith", salary: "$4500", status: "Pending" },
  ]);

  const [newLeave, setNewLeave] = useState({ employee: "", type: "" });
  const [newPayroll, setNewPayroll] = useState({ employee: "", salary: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/api/leaves")
      .then(res => setLeaveRequests(res.data))
      .catch(() => console.log("Using sample leave data"));

    axios.get("http://localhost:5000/api/payroll")
      .then(res => setPayrollData(res.data))
      .catch(() => console.log("Using sample payroll data"));
  }, []);

  // Leave Status Update
  const updateLeaveStatus = (id, status) => {
    axios.put(`http://localhost:5000/api/leaves/${id}`, { status })
      .then(() => {
        setLeaveRequests(prev =>
          prev.map(req => req.id === id ? { ...req, status } : req)
        );
      });
  };

  // Leave Request Submission
  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    if (newLeave.employee && newLeave.type) {
      const newEntry = {
        ...newLeave,
        status: "Pending"
      };
      axios.post("http://localhost:5000/api/leaves", newEntry)
        .then(res => {
          setLeaveRequests([...leaveRequests, res.data]);
          setNewLeave({ employee: "", type: "" });
        });
    }
  };

  // Payroll Status Update
  const updatePayrollStatus = (id, status) => {
    axios.put(`http://localhost:5000/api/payroll/${id}`, { status })
      .then(() => {
        setPayrollData(prev =>
          prev.map(pay => pay.id === id ? { ...pay, status } : pay)
        );
      });
  };

  // Payroll Entry Submission
  const handlePayrollSubmit = (e) => {
    e.preventDefault();
    if (newPayroll.employee && newPayroll.salary) {
      const newEntry = {
        ...newPayroll,
        status: "Pending"
      };
      axios.post("http://localhost:5000/api/payroll", newEntry)
        .then(res => {
          setPayrollData([...payrollData, res.data]);
          setNewPayroll({ employee: "", salary: "" });
        });
    }
  };

  // Generate Payroll Report
  const generatePayrollReport = () => {
    const reportContent = payrollData.map(
      (pay) => `Employee: ${pay.employee}, Salary: ${pay.salary}, Status: ${pay.status}`
    ).join("\n");

    const blob = new Blob([reportContent], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Payroll_Report.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="leave-payroll-container">
      <h1>📅 Leave & Payroll Management</h1>

      {/* Leave Requests Section */}
      <div className="leave-section">
        <h2>🛑 Leave Requests</h2>
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Leave Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.employee}</td>
                <td>{request.type}</td>
                <td>{request.status}</td>
                <td>
                  {request.status === "Pending" && (
                    <>
                      <button className="approve-btn" onClick={() => updateLeaveStatus(request.id, "Approved")}>✔ Approve</button>
                      <button className="reject-btn" onClick={() => updateLeaveStatus(request.id, "Rejected")}>✖ Reject</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add New Leave Request */}
        <h3>Add New Leave Request</h3>
        <form onSubmit={handleLeaveSubmit}>
          <input
            type="text"
            placeholder="Employee Name"
            value={newLeave.employee}
            onChange={(e) => setNewLeave({ ...newLeave, employee: e.target.value })}
            required
          />
          <select
            value={newLeave.type}
            onChange={(e) => setNewLeave({ ...newLeave, type: e.target.value })}
            required
          >
            <option value="">Select Leave Type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Annual Leave">Annual Leave</option>
            <option value="Maternity Leave">Maternity Leave</option>
            <option value="Unpaid Leave">Unpaid Leave</option>
            <option value="Work From Home">Work From Home</option>
          </select>
          <button type="submit" className="add-btn">➕ Add Leave</button>
        </form>
      </div>

      {/* Payroll Section */}
      <div className="payroll-section">
        <h2>💰 Payroll Processing</h2>
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.map((pay) => (
              <tr key={pay.id}>
                <td>{pay.employee}</td>
                <td>{pay.salary}</td>
                <td>{pay.status}</td>
                <td>
                  {pay.status !== "Paid" && (
                    <button
                      className="approve-btn"
                      onClick={() => updatePayrollStatus(pay.id, "Paid")}
                    >
                      💸 Mark as Paid
                    </button>
                  )}
                  {pay.status === "Paid" && (
                    <button
                      className="reject-btn"
                      onClick={() => updatePayrollStatus(pay.id, "Pending")}
                    >
                      🔄 Mark as Pending
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add New Payroll Entry */}
        <h3>Add New Payroll Entry</h3>
        <form onSubmit={handlePayrollSubmit}>
          <input
            type="text"
            placeholder="Employee Name"
            value={newPayroll.employee}
            onChange={(e) =>
              setNewPayroll({ ...newPayroll, employee: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Salary Amount"
            value={newPayroll.salary}
            onChange={(e) =>
              setNewPayroll({ ...newPayroll, salary: e.target.value })
            }
            required
          />
          <button type="submit" className="add-btn">
            ➕ Add Payroll
          </button>
        </form>

        <button className="report-btn" onClick={generatePayrollReport}>
          📄 Generate Payroll Report
        </button>
      </div>
    </div>
  );
};

export default LeavePayrollManagement;
