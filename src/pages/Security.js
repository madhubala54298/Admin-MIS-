import React from "react";
import SecurityManagement from "../pages/SecurityManagement"; // default import
import "../styles/security.css";

const Security = () => {
  return (
    <div className="security-page">
      <h1>🔒 Security Management</h1>
      <SecurityManagement />
    </div>
  );
};

export default Security;
